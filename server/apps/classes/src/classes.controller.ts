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
import { ClassesService } from './classes.service';
import { AuthenticatedRequest } from '@app/dto/types/request';
import { Track } from '@app/common/logger/track.decorator';
import { MircoServiceGuard } from '@app/common/guards/microservice.guard';
import { SaveClassDTO } from '@app/dto/class.dto';

@Controller('class')
@UseGuards(MircoServiceGuard)
export class ClassesController {
  constructor(private readonly classService: ClassesService) {}

  @Post('save')
  @Track()
  async save(@Body() body: SaveClassDTO, @Req() req: AuthenticatedRequest) {
    const schoolId = req.user?.school_id;
    const creator = req.user?.user_id;
    return this.classService.save(body, creator, schoolId);
  }

  @Get('getAll')
  @Track()
  async getAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Req() req?: AuthenticatedRequest,
  ) {
    const schoolId = req?.user?.school_id;
    return this.classService.getAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      schoolId,
    });
  }
  @Get('stats')
  @Track()
  async getStats(@Req() req: AuthenticatedRequest) {
    const schoolId = req?.user?.school_id;
    if (!schoolId) throw new UnauthorizedException('School ID missing');
    return this.classService.getStats(schoolId);
  }

  @Get(':id')
  @Track()
  async getById(@Param('id') id: string) {
    return this.classService.getById(id);
  }

  @Post('delete/:id')
  @Track()
  async softDelete(
    @Param('id') id: string,
    @Body() body: { reason: string },
    @Req() req: AuthenticatedRequest,
  ) {
    const updatedBy = req.user?.user_id;
    return this.classService.softDelete(id, body, updatedBy);
  }
}
