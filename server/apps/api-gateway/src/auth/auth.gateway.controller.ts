import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthGatewayService } from './auth.gateway.service';
import { Track } from '@app/common/logger/track.decorator';
import { AuthenticatedRequest } from '@app/dto/types/request';
import { Response } from 'express';

@Controller('auth')
export class AuthGatewayController {
  constructor(private readonly authGateWayService: AuthGatewayService) {}

  @Post('add-initial-user')
  @Track()
  addInitialUser(@Body() body: any) {
    return this.authGateWayService.addInitialUser(body);
  }

  @Post('login')
  @Track()
  async login(
    @Body() body: any,
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
  ) {
    const result = await this.authGateWayService.login(body, req);

    if (Array.isArray(result.cookies)) {
      for (const cookie of result.cookies) {
        res.append('Set-Cookie', cookie);
      }
    }

    res.json({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  }

  @Post('refresh')
  @Track()
  async refresh(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    const result = await this.authGateWayService.refresh(req);
    if (Array.isArray(result.cookies)) {
      for (const cookie of result.cookies) {
        res.append('Set-Cookie', cookie);
      }
    }

    res.json({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  }

  @Post('otp/request')
  @Track()
  requestOtp(@Body() body: any) {
    return this.authGateWayService.requestOtp(body);
  }

  @Post('otp/verify')
  @Track()
  verifyOtp(@Body() body: any) {
    return this.authGateWayService.verifyOtp(body);
  }

  @Post('reset-password')
  @Track()
  resetPassword(@Body() body: any) {
    return this.authGateWayService.resetPassword(body);
  }
}
