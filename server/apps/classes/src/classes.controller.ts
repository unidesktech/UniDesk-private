import { Body,Controller,Get,Param,Post,Query,Req,} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { AuthenticatedRequest } from '@app/dto/types/request';

@Controller('class')
export class ClassesController {
  constructor(private readonly classService: ClassesService) {}

  @Post('save')
  async save(@Body() body: any, @Req() req: AuthenticatedRequest) {
    const schoolId = req.user?.school_id;
    const creator = req.user?.user_id;
    return this.classService.save(body, creator, schoolId);
  }

  @Get('getAll')
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

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.classService.getById(id);
  }

  @Post(':id/delete')
  async softDelete(
    @Param('id') id: string,
    @Body() body: { reason: string },
  ) {
    return this.classService.softDelete(id, body);
  }
}
