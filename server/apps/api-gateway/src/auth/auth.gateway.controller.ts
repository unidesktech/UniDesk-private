import { Controller, Post } from '@nestjs/common';
import { AuthGatewayService } from './auth.gateway.service';

@Controller('auth')
export class AuthGatewayController {
  constructor(private readonly authGateWayService: AuthGatewayService) {}

  @Post('login')
  login() {
    return this.authGateWayService.login();
  }
}
