import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SubjectGatewayService } from './subject.gateway.service';

@Controller('subject')
export class SubjectGatewayController {
  constructor(private readonly subjectGatewayService: SubjectGatewayService) {}

  @Post('/save')
  save(@Body() body: any) {
    return this.subjectGatewayService.saveSubject(body);
  }

  @Get('getAll')
  getAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.subjectGatewayService.getAllSubject({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
  }

  @Get('stats')
  getStats() {
    return this.subjectGatewayService.getSubjectStats();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.subjectGatewayService.getSubjectById(id);
  }

  @Post(':id/delete')
  softDelete(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.subjectGatewayService.softDeleteSubject(id, body);
  }
}
