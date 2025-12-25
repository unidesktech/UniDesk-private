import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TeacherGatewayService } from './teacher.gateway.service';

@Controller('teacher')
export class TeacherGatewayController {
  constructor(private readonly teacherGatewayService: TeacherGatewayService) {}

  @Post('/save')
  save(@Body() body: any) {
    return this.teacherGatewayService.saveTeacher(body);
  }

  @Get('getAll')
  getAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.teacherGatewayService.getAllTeachers({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
  }

  @Get('stats')
  getStats() {
    return this.teacherGatewayService.getTeacherStats();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.teacherGatewayService.getTeacherById(id);
  }

  @Post(':id/delete')
  softDelete(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.teacherGatewayService.softDeleteTeacher(id, body);
  }
}
