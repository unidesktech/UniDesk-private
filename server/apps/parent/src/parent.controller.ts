import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ParentService } from './parent.service';
import { AuthenticatedRequest } from '@app/dto/types/request';

@Controller()
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  // @Get()
  // getHello(): string {
  //   return this.parentService.getHello();
  // }

  @Post('save')
  async save(@Body() body: any, @Req() req: AuthenticatedRequest) {
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

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.parentService.getById(id);
  }
  @Post(':id/delete')
  async softDelete(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.parentService.softDelete(id, body);
  }
}
