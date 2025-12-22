import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { StudentGatewayService } from './student.gateway.service';
@Controller('student')
export class StudentGatewayController {
  constructor(private readonly studentGatewayService: StudentGatewayService) {}

  @Post('/save')
  save(@Body() body: any) {
    return this.studentGatewayService.saveStudent(body);
  }

  @Get('getAll')
  getAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.studentGatewayService.getAllStudents({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.studentGatewayService.getStudentById(id);
  }

  @Post(':id/delete')
  softDelete(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.studentGatewayService.softDeleteStudent(id, body);
  }
}
