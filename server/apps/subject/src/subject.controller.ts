import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { AuthenticatedRequest } from '@app/dto/types/request';
import { SaveSubjectDto } from '@app/dto/subject.dto';
import { MircoServiceGuard } from '@app/common/guards/microservice.guard';

@Controller('subject')
@UseGuards(MircoServiceGuard)
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post('save')
  async save(@Body() body: SaveSubjectDto, @Req() req: AuthenticatedRequest) {
    const schoolId = req.user?.school_id;
    const creator = req.user?.user_id;
    if (!schoolId) throw new UnauthorizedException('School ID missing');
    return this.subjectService.save(body, schoolId, creator);
  }

  @Get('stats')
  async getStats(@Req() req: AuthenticatedRequest) {
    const schoolId = req?.user?.school_id;
    if (!schoolId) throw new UnauthorizedException('School ID missing');
    return this.subjectService.getStats(schoolId);
  }

  @Get('getAll')
  async getAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Req() req?: AuthenticatedRequest,
  ) {
    const schoolId = req?.user?.school_id;
    if (!schoolId) throw new UnauthorizedException('School ID missing');
    return this.subjectService.getAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      schoolId,
    });
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.subjectService.getById(id);
  }

  @Post('delete/:id')
  async softDelete(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.subjectService.softDelete(id, body);
  }
}
