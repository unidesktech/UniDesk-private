import { Controller, Get } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { Track } from '@app/common/logger/track.decorator';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get('auth/login')
  @Track()
  login() {
    return this.apiGatewayService.login();
  }
  @Get('request-demo/create')
  @Track()
  requestDemo() {
    return this.apiGatewayService.createDemo();
  }
}
