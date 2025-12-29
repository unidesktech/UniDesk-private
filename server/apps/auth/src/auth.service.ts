import { writeToConsole } from '@app/common/utils/writeToConsole';
import { ResponseDto } from '@app/dto/response.dto';
import { SchoolBasicInfoDTO } from '@app/dto/school.dto';
import { PrismaService } from '@app/prisma';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomUUID, randomBytes } from 'crypto';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@app/common/utils/Email';
import { getSuperAdminUserCreationEmail } from '@app/common/utils/templates/emails/User';
import { LoginDto, RequestOTPDto } from '@app/dto';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '@app/common/utils/Token';
import {
  genCsrf,
  generateOtp,
  genJti,
  hashOtp,
  hashToken,
} from '@app/common/utils/Crypto';
import { AuthenticatedRequest } from '@app/dto/types/request';
import { getPasswordResetOtpEmailTemplate } from '@app/common/utils/templates/emails/Otp';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
  };

  async addInitialUser(
    body: SchoolBasicInfoDTO,
  ): Promise<ResponseDto<string | null>> {
    try {
      const existingUser = await this.prismaService.users.findFirst({
        where: {
          email: body.email,
        },
      });

      if (existingUser) {
        return {
          success: false,
          message: 'User with this email already exists',
          data: null,
        };
      }

      const plainPassword = randomBytes(6).toString('hex');

      const user = await this.prismaService.$transaction(async (prisma) => {
        const saltRounds = parseInt(process.env.SALT_ROUNDS ?? '10', 10);
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        const prefix = (body.school_code ?? '').slice(0, -4);
        const newSuffix = String(Math.floor(Math.random() * 10000)).padStart(
          4,
          '0',
        );
        const userCode = `${prefix}${newSuffix}`;
        const user = await prisma.users.create({
          data: {
            user_id: randomUUID(),
            user_code: userCode,
            school_id: body.school_id,
            name: body.name,
            email: body.email,
            phone: body.phone,
            password_hash: hashedPassword,
            status: 'pending',
            created_by: 'system',
            updated_by: 'system',
            created_at: new Date(),
            updated_at: new Date(),
          },
        });

        await prisma.user_onboarding_status.create({
          data: {
            onboarding_id: randomUUID(),
            user_id: user.user_id,
            created_at: new Date(),
            updated_at: new Date(),
            created_by: 'system',
            updated_by: 'system',
          },
        });

        await prisma.user_preferences.create({
          data: {
            pref_id: randomUUID(),
            user_id: user.user_id,
            created_at: new Date(),
            updated_at: new Date(),
            created_by: 'system',
            updated_by: 'system',
          },
        });

        const role = await prisma.roles.create({
          data: {
            role_id: randomUUID(),
            school_id: body.school_id,
            name: 'Super-Admin',
            description: `This is the super user for ${body.name}`,
            created_at: new Date(),
            updated_at: new Date(),
            created_by: 'system',
            updated_by: 'system',
          },
        });

        await prisma.user_roles.create({
          data: {
            user_role_id: randomUUID(),
            user_id: user.user_id,
            role_id: role.role_id,
            created_at: new Date(),
            updated_at: new Date(),
            created_by: 'system',
            updated_by: 'system',
          },
        });
        return user;
      });

      if (user)
        await sendEmail(
          user.email ?? '',
          'Welcome to UniDesk , Your account has been created.',
          getSuperAdminUserCreationEmail(
            'Super-Admin',
            body.name,
            user.user_code,
            plainPassword ?? '',
            user.email ?? '',
            user.phone ?? '',
            user.name ?? '',
            body.school_branding?.logo_url ?? '',
            body.school_branding?.banner_url ?? '',
          ),
        );

      return {
        success: true,
        message: 'User created succesfully',
        data: user.user_id,
      };
    } catch (error) {
      writeToConsole.error(`Error during login: ${String(error)}`);
      return {
        success: false,
        message: 'Login failed',
        data: null,
      };
    }
  }

  async login(
    dto: LoginDto,
    req: AuthenticatedRequest,
  ): Promise<ResponseDto<any>> {
    try {
      const { schoolCode, emailOrUid, password } = dto;

      const school = await this.prismaService.schools.findFirst({
        where: {
          school_code: schoolCode,
        },
      });

      if (!school) {
        return {
          success: false,
          message: 'Invalid school code',
          data: null,
        };
      }

      const user = await this.prismaService.users.findFirst({
        where: {
          OR: [{ email: emailOrUid }, { user_code: emailOrUid }],
          AND: [{ school_id: school.school_id }],
          is_deleted: false,
        },
      });

      if (!user || !user.password_hash) {
        return {
          success: false,
          message: 'User not found',
          data: null,
        };
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return {
          success: false,
          message: 'Invalid credentials',
          data: null,
        };
      }

      const ip = req.ip;
      const ua = req.headers['user-agent'] || '';

      const jti = genJti();
      const refreshToken = signRefreshToken({ userId: user.user_id, jti });
      const accessToken = signAccessToken({
        userId: user.user_id,
        email: user.email,
      });
      const csrf = genCsrf();

      try {
        await this.prismaService.auth_tokens.create({
          data: {
            token_id: randomUUID(),
            user_id: user.user_id,
            refresh_token: hashToken(refreshToken),
            user_agent: ua,
            ip_address: ip,
            revoked: false,
            expires_at: new Date(Date.now() + 30 * 86400000),
            created_at: new Date(),
          },
        });
        await this.prismaService.refresh_tokens.create({
          data: {
            user_id: user.user_id,
            token_hash: hashToken(refreshToken),
            expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
        });
      } catch (e) {
        writeToConsole.error(`auth_tokens insert error: ${String(e)}`);
      }

      return {
        success: true,
        message: 'Login successful',
        data: {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          user_code: user.user_code,
          profile_photo_url: user.profile_photo_url,
          csrf,
        },
        cookies: [
          `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=600`,
          `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=2592000`,
          `csrfToken=${csrf}; Path=/`,
        ],
      };
    } catch (error) {
      writeToConsole.error(`Login Error: ${String(error)}`);

      return {
        success: false,
        message: 'Something went wrong during login',
        data: null,
      };
    }
  }

  async refresh(refreshToken: string): Promise<ResponseDto<null>> {
    try {
      const decoded = verifyRefreshToken(refreshToken);

      const user = await this.prismaService.users.findFirst({
        where: { user_id: decoded?.userId, is_deleted: false },
      });

      if (!user) {
        throw new UnauthorizedException();
      }

      const tokenHash = hashToken(refreshToken);

      const storedToken = await this.prismaService.refresh_tokens.findFirst({
        where: {
          user_id: user.user_id,
          token_hash: tokenHash,
          revoked: false,
          expires_at: { gt: new Date() },
        },
      });

      if (!storedToken) {
        await this.prismaService.refresh_tokens.updateMany({
          where: { user_id: user.user_id },
          data: { revoked: true },
        });

        throw new UnauthorizedException('Session compromised');
      }

      await this.prismaService.refresh_tokens.update({
        where: { id: storedToken.id },
        data: { revoked: true },
      });

      const newAccessToken = signAccessToken({
        userId: user.user_id,
        email: user.email,
      });

      const newRefreshToken = signRefreshToken({
        userId: user.user_id,
        jti: genJti(),
      });

      await this.prismaService.refresh_tokens.create({
        data: {
          user_id: user.user_id,
          token_hash: hashToken(newRefreshToken),
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });

      return {
        success: true,
        message: 'Token refreshed',
        data: null,
        cookies: [
          `accessToken=${newAccessToken}; HttpOnly; Path=/; Max-Age=600`,
          `refreshToken=${newRefreshToken}; HttpOnly; Path=/; Max-Age=2592000`,
        ],
      };
    } catch (error) {
      writeToConsole.error(`Refresh Token Error: ${String(error)}`);
      return {
        success: false,
        message: 'Failed to refresh token',
        data: null,
      };
    }
  }

  async logOut(req: AuthenticatedRequest, res: Response) {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (refreshToken) {
        await this.prismaService.refresh_tokens.updateMany({
          where: {
            token_hash: hashToken(refreshToken as string),
          },
          data: { revoked: true },
        });
      }

      res.clearCookie('accessToken');
      res.clearCookie('refreshToken', { path: '/auth/refresh' });

      return res.json({
        success: true,
        message: 'Logged out successfully',
        data: null,
      });
    } catch (error) {
      writeToConsole.error(`Logout Error: ${String(error)}`);
      return {
        success: false,
        message: 'Failed to logout',
        data: null,
      };
    }
  }

  async requestOtp(
    body: RequestOTPDto,
  ): Promise<
    ResponseDto<{ otpId: string; email: string; schoolCode: string } | null>
  > {
    try {
      const { schoolCode, email } = body;

      if (!schoolCode || !email) {
        return {
          success: false,
          message: 'School code and email are required',
          data: null,
        };
      }

      const school = await this.prismaService.schools.findFirst({
        where: {
          school_code: schoolCode,
          is_deleted: false,
        },
      });

      if (!school) {
        return {
          success: false,
          message: 'Invalid school code',
          data: null,
        };
      }

      const user = await this.prismaService.users.findFirst({
        where: {
          school_id: school.school_id,
          email,
          is_deleted: false,
        },
      });

      if (!user) {
        return {
          success: false,
          message: 'User not found for this school',
          data: null,
        };
      }

      await this.prismaService.otp.updateMany({
        where: {
          user_email: email,
          is_used: false,
          expires_at: {
            gt: new Date(),
          },
        },
        data: {
          is_used: true,
        },
      });

      const otpValue = generateOtp();
      const hashedOtp = hashOtp(otpValue);

      const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

      const otpRow = await this.prismaService.otp.create({
        data: {
          otp_id: randomUUID(),
          otp: hashedOtp,
          user_email: email,
          expires_at: expiresAt,
          is_used: false,
        },
      });

      await sendEmail(
        user.email!,
        'UniDesk password reset request',
        getPasswordResetOtpEmailTemplate(
          otpValue,
          `${process.env.FRONTEND_URL}/auth/verify-otp?id=${otpRow.otp_id}&schoolCode=${schoolCode}&email=${encodeURIComponent(
            email,
          )}`,
          5,
        ),
      );

      return {
        success: true,
        message: 'OTP sent successfully',
        data: {
          otpId: otpRow.otp_id,
          email,
          schoolCode,
        },
      };
    } catch (error) {
      writeToConsole.error(`Error in requestOtp: ${String(error)}`);
      return {
        success: false,
        message: 'Failed to generate OTP',
        data: null,
      };
    }
  }

  async verifyOtp(body: {
    schoolCode: string;
    email: string;
    otp: string;
  }): Promise<ResponseDto<{ token: string } | null>> {
    try {
      const { schoolCode, email, otp } = body;

      if (!schoolCode || !email || !otp) {
        return {
          success: false,
          message: 'School code, email and OTP are required',
          data: null,
        };
      }

      const school = await this.prismaService.schools.findFirst({
        where: { school_code: schoolCode, is_deleted: false },
      });

      if (!school) {
        return {
          success: false,
          message: 'Invalid school code',
          data: null,
        };
      }

      const user = await this.prismaService.users.findFirst({
        where: {
          school_id: school.school_id,
          email,
          is_deleted: false,
        },
      });

      if (!user) {
        return {
          success: false,
          message: 'User not found for this school',
          data: null,
        };
      }

      const hashedOtp = hashOtp(otp);

      const otpRow = await this.prismaService.otp.findFirst({
        where: {
          user_email: email,
          otp: hashedOtp,
          is_used: false,
          expires_at: {
            gt: new Date(),
          },
        },
        orderBy: { created_at: 'desc' },
      });

      if (!otpRow) {
        return {
          success: false,
          message: 'Invalid or expired OTP',
          data: null,
        };
      }

      await this.prismaService.otp.update({
        where: { otp_id: otpRow.otp_id },
        data: { is_used: true },
      });

      const token = this.jwtService.sign(
        {
          sub: user.user_id,
          email: user.email,
          purpose: 'PASSWORD_RESET',
        },
        { expiresIn: '5m' },
      );

      return {
        success: true,
        message: 'OTP verified successfully',
        data: { token },
      };
    } catch (error) {
      writeToConsole.error(`Error in verifyOtp: ${String(error)}`);
      return {
        success: false,
        message: 'Failed to verify OTP',
        data: null,
      };
    }
  }

  async resetPassword(body: {
    token: string;
    password: string;
  }): Promise<ResponseDto<null>> {
    try {
      const { token, password } = body;

      if (!token || !password) {
        return {
          success: false,
          message: 'Token and new password are required',
          data: null,
        };
      }

      let payload: { sub: string; email: string; purpose: string };

      try {
        payload = this.jwtService.verify(token);
      } catch {
        return {
          success: false,
          message: 'Invalid or expired token',
          data: null,
        };
      }

      if (payload.purpose !== 'PASSWORD_RESET') {
        return {
          success: false,
          message: 'Invalid token purpose',
          data: null,
        };
      }

      const user = await this.prismaService.users.findFirst({
        where: {
          user_id: payload.sub,
          email: payload.email,
          is_deleted: false,
        },
      });

      if (!user || !user.password_hash) {
        return {
          success: false,
          message: 'User not found',
          data: null,
        };
      }

      const isSamePassword = await bcrypt.compare(password, user.password_hash);

      if (isSamePassword) {
        return {
          success: false,
          message: 'New password cannot be same as old password',
          data: null,
        };
      }

      const saltRounds = parseInt(process.env.SALT_ROUNDS ?? '10', 10);
      const newHash = await bcrypt.hash(password, saltRounds);

      await this.prismaService.users.update({
        where: { user_id: user.user_id },
        data: {
          password_hash: newHash,
          updated_at: new Date(),
        },
      });

      return {
        success: true,
        message: 'Password reset successfully',
        data: null,
      };
    } catch (error) {
      writeToConsole.error(`Error in resetPassword: ${String(error)}`);
      return {
        success: false,
        message: 'Failed to reset password',
        data: null,
      };
    }
  }
}
