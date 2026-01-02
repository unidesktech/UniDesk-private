import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { AuthenticatedRequest } from '@app/dto/types/request';
import { MircoServiceGuard } from '@app/common/guards/microservice.guard';
import { SaveSectionDTO } from '@app/dto/section.dto';

@Controller('section')
@UseGuards(MircoServiceGuard)
export class SectionsController {
  constructor(private readonly sectionService: SectionsService) {}

  @Post('save')
  async save(@Body() body: SaveSectionDTO, @Req() req: AuthenticatedRequest) {
    const creator = req.user?.user_id;
    return this.sectionService.save(body, creator);
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

  @Get('stats')
  async getSectionStats(@Param('id') id: string) {
    return this.sectionService.getStats(id);
  }

  @Post('delete/:id')
  async softDelete(
    @Param('id') id: string,
    @Body() body: { reason: string },
    @Req() req: AuthenticatedRequest,
  ) {
    const updatedBy = req.user?.user_id;
    return this.sectionService.softDelete(id, body, updatedBy);
  }
}
