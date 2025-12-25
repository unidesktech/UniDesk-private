import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ClassGatewayService } from './classes.gateway.service';

@Controller('teacher')
export class ClassesGatewayController {
  constructor(private readonly classGatewayService: ClassGatewayService) {}

  @Post('/save')
  save(@Body() body: any) {
    return this.classGatewayService.saveClass(body);
  }

  @Get('getAll')
  getAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.classGatewayService.getAllClasses({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
  }

  @Get('stats')
  getStats() {
    return this.classGatewayService.getClassesStats();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.classGatewayService.getClassById(id);
  }

  @Post(':id/delete')
  softDelete(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.classGatewayService.softDeleteClass(id, body);
  }
}
