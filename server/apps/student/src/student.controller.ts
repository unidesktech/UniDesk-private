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
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { SaveStudentDto } from '@app/dto/student.dto';
import { MircoServiceGuard } from '@app/common/guards/microservice.guard';
import { AuthenticatedRequest } from '@app/dto/types/request';

@Controller('student')
@UseGuards(MircoServiceGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('save')
  async save(@Body() body: SaveStudentDto, @Req() req: AuthenticatedRequest) {
    return this.studentService.save(
      body,
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }

  @Get('stats')
  async getStats(@Req() req: AuthenticatedRequest) {
    const schoolId = req?.user?.school_id;
    if (!schoolId)
      throw new UnauthorizedException('School ID and User ID missing');
    return this.studentService.getStats(schoolId);
  }

  @Get('getAll')
  async getAll(
    @Req() req: AuthenticatedRequest,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const schoolId = req?.user?.school_id;
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

  @Post('delete/:id')
  async softDelete(
    @Param('id') id: string,
    @Body() body: { reason: string },
    @Req() req: AuthenticatedRequest,
  ) {
    return this.studentService.softDelete(id, body, req?.user?.user_id);
  }
}
