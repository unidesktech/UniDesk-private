import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { ResponseDto } from '@app/dto/response.dto';
import { Track } from '@app/common/logger/track.decorator';
import { ActivityLogDTO } from '@app/dto/activitylog.dto';

@Controller('activity-log')
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @Post('save')
  @Track()
  save(@Body() body: ActivityLogDTO): Promise<ResponseDto<null>> {
    return this.activityLogService.save(body);
  }

  @Get('get')
  getAll(): Promise<ResponseDto<Array<any> | null>> {
    return this.activityLogService.get();
  }

  @Get('get/:id')
  @Track()
  get(@Param('id') id?: string): Promise<ResponseDto<any>> {
    return this.activityLogService.get(id);
  }
}
