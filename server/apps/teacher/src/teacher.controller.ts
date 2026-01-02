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
import { TeacherService } from './teacher.service';
import { Track } from '@app/common/logger/track.decorator';
import { AuthenticatedRequest } from '@app/dto/types/request';
import { MircoServiceGuard } from '@app/common/guards/microservice.guard';
import { SaveTeacherDTO } from '@app/dto/teacher.dto';

@Controller('teacher')
@UseGuards(MircoServiceGuard)
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}
  @Post('save')
  @Track()
  async save(@Body() body: SaveTeacherDTO, @Req() req: AuthenticatedRequest) {
    return this.teacherService.save(
      body,
      req.user?.user_id,
      req.user?.school_id,
    );
  }
  @Get('getAll')
  async getAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Req() req?: AuthenticatedRequest,
  ) {
    return this.teacherService.getAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      schoolId: req?.user?.school_id,
    });
  }
  @Get('stats')
  async getStats(@Req() req: AuthenticatedRequest) {
    const schoolId = req?.user?.school_id;
    if (!schoolId) throw new UnauthorizedException('School ID missing');
    return this.teacherService.getStats(schoolId);
  }
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.teacherService.getById(id);
  }
  @Post('delete/:id')
  async softDelete(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.teacherService.softDelete(id, body);
  }
}
