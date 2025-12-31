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
import { StudentGatewayService } from './student.gateway.service';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { RequirePermission } from '@app/common/permissions/permission.decorator';
import { PermissionGuard } from '@app/common/guards/permission.guard';
import { AuthenticatedRequest } from '@app/dto/types/request';
import { Track } from '@app/common/logger/track.decorator';
@Controller('students')
@UseGuards(AuthGuard, PermissionGuard)
export class StudentGatewayController {
  constructor(private readonly studentGatewayService: StudentGatewayService) {}

  @Post('/save')
  save(@Body() body: any) {
    return this.studentGatewayService.saveStudent(body);
  }

  @Get('getAll')
  @Track()
  @RequirePermission('management.students.edit')
  getAll(
    @Req() req: AuthenticatedRequest,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.studentGatewayService.getAllStudents(
      req?.user?.user_id,
      req?.user?.school_id,
      {
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
      },
    );
  }

  @Get('stats')
  @Track()
  @RequirePermission('management.students.view')
  getStats(@Req() req: AuthenticatedRequest) {
    return this.studentGatewayService.getStudentStats(
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.studentGatewayService.getStudentById(id);
  }

  @Post(':id/delete')
  softDelete(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.studentGatewayService.softDeleteStudent(id, body);
  }
}
