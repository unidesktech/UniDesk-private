import { Track } from '@app/common/logger/track.decorator';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { commonGateWayService } from './common.gateway.service';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { AuthenticatedRequest } from '@app/dto/types/request';

@Controller('common')
@UseGuards(AuthGuard)
export class CommonGatewayController {
  constructor(private readonly commonGateWayService: commonGateWayService) {}

  @Post('distinct-values')
  @Track()
  getDistinctValues(@Body() body: any, @Req() req: AuthenticatedRequest) {
    return this.commonGateWayService.getDistinctValues(
      body,
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }
}
