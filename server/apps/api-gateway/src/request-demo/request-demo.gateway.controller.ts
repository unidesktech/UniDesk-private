import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RequestDemoGateWayService } from './request-demo.gateway.service';
import { Track } from '@app/common/logger/track.decorator';

@Controller('request-demo')
export class RequestDemoGatewayController {
  constructor(private readonly requestDemoService: RequestDemoGateWayService) {}

  @Post('save')
  @Track()
  saveDemo(@Body() body: any) {
    return this.requestDemoService.saveDemo(body);
  }

  @Post('save/:id')
  @Track()
  updateDemo(@Body() body: any, @Param('id') id?: string) {
    return this.requestDemoService.saveDemo(body, id);
  }

  @Get('get')
  getAllDemos() {
    return this.requestDemoService.getDemo();
  }

  @Get('get/:id')
  getDemo(@Param('id') id?: string) {
    return this.requestDemoService.getDemo(id);
  }
}
