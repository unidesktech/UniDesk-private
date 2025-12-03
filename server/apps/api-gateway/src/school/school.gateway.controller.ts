import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SchoolGatewayService } from './school.gateway.service';
import { Track } from '@app/common/logger/track.decorator';

@Controller('school')
export class SchoolGatewayController {
  constructor(private schoolGatewayService: SchoolGatewayService) {}

  @Post('save')
  @Track()
  createSchool(@Body() body: any) {
    return this.schoolGatewayService.saveSchool(body);
  }

  @Get('get')
  @Track()
  getAllSchool() {
    return this.schoolGatewayService.getSchool();
  }

  @Get('get/:id')
  @Track()
  getSchool(@Param('id') id: string) {
    return this.schoolGatewayService.getSchool(id);
  }

  @Get('validate-code/:code')
  @Track()
  validateSchoolCode(@Param('code') code: string) {
    return this.schoolGatewayService.validateSchoolCode(code);
  }
}
