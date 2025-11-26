import { Controller, Get, Post } from '@nestjs/common';
import { RequestDemoService } from './request-demo.service';
import { ResponseDto } from '@app/dto/response.dto';
import { Track } from '@app/common/logger/track.decorator';

@Controller('request-demo')
export class RequestDemoController {
  constructor(private readonly requestDemoService: RequestDemoService) {}

  @Get('create')
  @Track()
  createDemo(): Promise<ResponseDto<null>> {
    return this.requestDemoService.createDemo();
  }
}
