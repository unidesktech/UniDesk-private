import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { AuthenticatedRequest } from '@app/dto/types/request';
import { AuthGuard } from '@app/common/guards/authguard';

@Controller('subject')
// @UseGuards(AuthGuard)
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  // @Get()
  // getHello(): string {
  //   return this.subjectService.getHello();
  // }
  @Post('save')
  async save(@Body() body: any, @Req() req: AuthenticatedRequest) {
    const schoolId = req.user?.school_id;
    const creator = req.user?.user_id;
    return this.subjectService.save(body, schoolId, creator);
  }
  @Get('getAll')
  async getAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Req() req?: AuthenticatedRequest,
  ) {
    const schoolId = req?.user?.school_id;
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

  @Post(':id/delete')
  async softDelete(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.subjectService.softDelete(id, body);
  }
}
