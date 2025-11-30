import { Body, Controller, Post } from '@nestjs/common';
import { AuthGatewayService } from './auth.gateway.service';
import { Track } from '@app/common/logger/track.decorator';

@Controller('auth')
export class AuthGatewayController {
  constructor(private readonly authGateWayService: AuthGatewayService) {}

  @Post('add-initial-user')
  @Track()
  addInitialUser(@Body() body: any) {
    return this.authGateWayService.addInitialUser(body);
  }
}
