import { Body, Controller, Get, Param, Post, Query, Req,} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { AuthenticatedRequest } from '@app/dto/types/request';

@Controller('section')
export class SectionsController {
  constructor(private readonly sectionService: SectionsService) {}

  @Post('save')
  async save(@Body() body: any, @Req() req: AuthenticatedRequest) {
    const schoolId = req.user?.school_id;
    const creator = req.user?.user_id;
    return this.sectionService.save(body, creator, schoolId);
  }

  @Get('getAll')
  async getAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Req() req?: AuthenticatedRequest,
  ) {
    const schoolId = req?.user?.school_id;
    return this.sectionService.getAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      schoolId,
    });
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.sectionService.getById(id);
  }

  @Post(':id/delete')
  async softDelete(
    @Param('id') id: string,
    @Body() body: { reason: string },
  ) {
    return this.sectionService.softDelete(id, body);
  }
}
