import { Track } from '@app/common/logger/track.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { commonGateWayService } from './common.gateway.service';

@Controller('common')
export class CommonGatewayController {
  constructor(private readonly commonGateWayService: commonGateWayService) {}

  @Post('distinct-values')
  @Track()
  getDistinctValues(@Body() body: any) {
    return this.commonGateWayService.getDistinctValues(body);
  }
}
