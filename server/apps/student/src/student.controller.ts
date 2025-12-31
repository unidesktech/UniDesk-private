import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { AuthenticatedRequest } from '@app/dto/types/request';
import { SaveStudentDto } from '@app/dto/student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('save')
  async save(@Body() body: SaveStudentDto, @Req() req: AuthenticatedRequest) {
    const schoolId = req.user?.school_id;
    const creator = req.user?.user_id;
    return this.studentService.save(body, schoolId, creator);
  }

  @Get('stats')
  async getStats(@Headers('x-school-id') schoolId: string) {
    if (!schoolId)
      throw new UnauthorizedException('School ID and User ID missing');
    return this.studentService.getStats(schoolId);
  }

  @Get('getAll')
  async getAll(
    @Headers('x-school-id') schoolId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    if (!schoolId)
      throw new UnauthorizedException('School ID and User ID missing');
    return this.studentService.getAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      schoolId,
    });
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.studentService.getById(id);
  }

  @Post(':id/delete')
  async softDelete(
    @Param('id') id: string,
    @Body() body: { reason: string },
    @Req() req: AuthenticatedRequest,
  ) {
    const updatedBy = req.user?.user_id;
    return this.studentService.softDelete(id, body, updatedBy);
  }
}
