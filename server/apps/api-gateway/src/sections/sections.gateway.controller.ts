import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SectionGatewayService } from './sections.gateway.service';

@Controller('section')
export class SectionGatewayController {
  constructor(
    private readonly sectionGatewayService: SectionGatewayService,
  ) {}

  @Post('/save')
  save(@Body() body: any) {
    return this.sectionGatewayService.saveSection(body);
  }

  @Get('getAll')
  getAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.sectionGatewayService.getAllSections({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.sectionGatewayService.getSectionById(id);
  }

  @Post(':id/delete')
  softDelete(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.sectionGatewayService.softDeleteSection(id, body);
  }
}
