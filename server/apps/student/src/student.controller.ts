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
import { StudentService } from './student.service';
import { AuthGuard } from '@app/common/guards/authguard';
import { AuthenticatedRequest } from '@app/dto/types/request';

@Controller('student')
// @UseGuards(AuthGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  // @Get()
  // getHello(): string {
  //   return this.studentService.getHello();
  // }
  @Post('save')
  async save(@Body() body: any, @Req() req: AuthenticatedRequest) {
    const schoolId = req.user?.school_id;
    const creator = req.user?.user_id;
    return this.studentService.save(body, schoolId, creator);
  }
  @Get('getAll')
  async getAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Req() req?: AuthenticatedRequest,
  ) {
    const schoolId = req?.user?.school_id;
    return this.studentService.getAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      schoolId,
    });
  }

  @Get(':id')
  async getById(@Param('id') id: string,) {
    return this.studentService.getById(id);
  }

  @Post(':id/delete')
  async softDelete(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.studentService.softDelete(id, body);
  }
}
