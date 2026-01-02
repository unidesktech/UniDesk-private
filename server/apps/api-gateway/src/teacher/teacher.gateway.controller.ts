import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TeacherGatewayService } from './teacher.gateway.service';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { PermissionGuard } from '@app/common/guards/permission.guard';
import { RequirePermission } from '@app/common/permissions/permission.decorator';
import { AuthenticatedRequest } from '@app/dto/types/request';

@Controller('teacher')
@UseGuards(AuthGuard, PermissionGuard)
export class TeacherGatewayController {
  constructor(private readonly teacherGatewayService: TeacherGatewayService) {}

  @Post('/save')
  @RequirePermission('management.teachers.edit')
  save(@Body() body: any, @Req() req: AuthenticatedRequest) {
    return this.teacherGatewayService.saveTeacher(
      body,
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }

  @Get('getAll')
  @RequirePermission('management.teachers.view')
  getAll(
    @Req() req: AuthenticatedRequest,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.teacherGatewayService.getAllTeachers(
      {
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
      },
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }

  @Get('stats')
  @RequirePermission('management.teachers.view')
  getStats(@Req() req: AuthenticatedRequest) {
    return this.teacherGatewayService.getTeacherStats(
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }

  @Get(':id')
  @RequirePermission('management.teachers.view')
  getById(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.teacherGatewayService.getTeacherById(
      id,
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }

  @Delete('delete/:id')
  @RequirePermission('management.teachers.delete')
  softDelete(
    @Param('id') id: string,
    @Body() body: { reason: string },
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teacherGatewayService.softDeleteTeacher(
      id,
      body,
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }
}
