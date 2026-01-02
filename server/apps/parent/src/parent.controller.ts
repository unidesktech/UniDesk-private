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
import { ParentService } from './parent.service';
import { AuthenticatedRequest } from '@app/dto/types/request';
import { MircoServiceGuard } from '@app/common/guards/microservice.guard';
import { SaveParentDto } from '@app/dto/parent.dto';

@Controller()
@UseGuards(MircoServiceGuard)
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @Post('save')
  async save(@Body() body: SaveParentDto, @Req() req: AuthenticatedRequest) {
    const schoolId = req.user?.school_id;
    const creator = req.user?.user_id;
    return this.parentService.save(body, schoolId, creator);
  }

  @Get('getAll')
  async getAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Req() req?: AuthenticatedRequest,
  ) {
    const schoolId = req?.user?.school_id;
    return this.parentService.getAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      schoolId,
    });
  }
  @Get('stats')
  async getStats(@Req() req: AuthenticatedRequest) {
    const schoolId = req?.user?.school_id;
    if (!schoolId) throw new UnauthorizedException('School ID missing');
    return this.parentService.getStats(schoolId);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.parentService.getById(id);
  }
  @Post('delete/:id')
  async softDelete(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.parentService.softDelete(id, body);
  }
}
