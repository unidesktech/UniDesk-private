import { writeToConsole } from '@app/common/utils/writeToConsole';
import { ResponseDto } from '@app/dto/response.dto';
import { SchoolBasicInfoDTO } from '@app/dto/school.dto';
import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { randomUUID, randomBytes } from 'crypto';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@app/common/utils/Email';
import { getSuperAdminUserCreationEmail } from '@app/common/utils/templates/emails/User';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

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

      const user = await this.prismaService.$transaction(async (prisma) => {
        const plainPassword = randomBytes(6).toString('hex');
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
            user.password_hash ?? '',
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
}
