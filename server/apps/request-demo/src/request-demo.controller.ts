import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RequestDemoService } from './request-demo.service';
import { ResponseDto } from '@app/dto/response.dto';
import { Track } from '@app/common/logger/track.decorator';
import { RequestDemoDTO } from '@app/dto/request-demo.dto';

@Controller('request-demo')
export class RequestDemoController {
  constructor(private readonly requestDemoService: RequestDemoService) {}

  @Post('save')
  @Track()
  save(@Body() body: RequestDemoDTO): Promise<ResponseDto<null>> {
    return this.requestDemoService.save(body);
  }

  @Post('save/:id')
  @Track()
  update(
    @Body() body: RequestDemoDTO,
    @Param('id') id?: string,
  ): Promise<ResponseDto<null>> {
    return this.requestDemoService.save(body, id);
  }

  @Get('get')
  getAll(): Promise<ResponseDto<Array<any> | null>> {
    return this.requestDemoService.get();
  }

  @Get('get/:id')
  @Track()
  get(@Param('id') id?: string): Promise<ResponseDto<any>> {
    return this.requestDemoService.get(id);
  }
}
