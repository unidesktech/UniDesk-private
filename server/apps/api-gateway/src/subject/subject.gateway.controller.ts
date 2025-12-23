import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SubjectGatewayService } from './subject.gateway.service';

@Controller('subject')
export class StudentGatewayController {
  constructor(private readonly studentGatewayService: SubjectGatewayService) {}

  @Post('/save')
  save(@Body() body: any) {
    return this.studentGatewayService.saveSubject(body);
  }

  @Get('getAll')
  getAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.studentGatewayService.getAllSubject({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.studentGatewayService.getSubjectById(id);
  }

  @Post(':id/delete')
  softDelete(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.studentGatewayService.softDeleteSubject(id, body);
  }
}
