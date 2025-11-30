import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Track } from '@app/common/logger/track.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('add-inital-user')
  @Track()
  addIntialUser(@Body() body: any) {
    return this.authService.addInitialUser(body);
  }
}
