import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Track } from '@app/common/logger/track.decorator';
import { ResponseDto } from '@app/dto/response.dto';
import { AuthenticatedRequest } from '@app/dto/types/request';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('add-inital-user')
  @Track()
  addIntialUser(@Body() body: any) {
    return this.authService.addInitialUser(body);
  }

  @Post('login')
  @Track()
  async login(
    @Body() body: any,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto<string | null> | null> {
    return await this.authService.login(body, req);
  }

  @Post('otp/request')
  @Track()
  async requestOtp(
    @Body() body: any,
  ): Promise<
    ResponseDto<{ otpId: string; email: string; schoolCode: string } | null>
  > {
    return await this.authService.requestOtp(body);
  }

  @Post('otp/verify')
  @Track()
  async verifyOtp(
    @Body() body: any,
  ): Promise<ResponseDto<{ token: string } | null>> {
    return await this.authService.verifyOtp(body);
  }

  @Post('reset-password')
  @Track()
  async resetPassword(
    @Body() body: any,
  ): Promise<ResponseDto<{ token: string } | null>> {
    return await this.authService.resetPassword(body);
  }
}
