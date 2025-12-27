import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ActivityLogGatewayService } from './activity-log.gateway.service';
import { Track } from '@app/common/logger/track.decorator';
import { ActivityLogPayload } from '@app/dto/activitylog.dto';
import { ResponseDto } from '@app/dto/response.dto';

@Controller('activity-log')
export class ActivityLogGatewayController {
  constructor(
    private readonly activityLogGatewayService: ActivityLogGatewayService,
  ) {}

  @Post('save')
  @Track()
  save(@Body() body: ActivityLogPayload): Promise<ResponseDto<null>> {
    return this.activityLogGatewayService.save(body);
  }

  @Get('get')
  @Track()
  getAll(): Promise<ResponseDto<any[] | null>> {
    return this.activityLogGatewayService.get();
  }

  @Get('get/:id')
  @Track()
  get(@Param('id') id: string): Promise<ResponseDto<any>> {
    return this.activityLogGatewayService.get(id);
  }
}
