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
import { SubjectGatewayService } from './subject.gateway.service';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { PermissionGuard } from '@app/common/guards/permission.guard';
import { Track } from '@app/common/logger/track.decorator';
import { RequirePermission } from '@app/common/permissions/permission.decorator';
import { AuthenticatedRequest } from '@app/dto/types/request';

@Controller('subject')
@UseGuards(AuthGuard, PermissionGuard)
export class SubjectGatewayController {
  constructor(private readonly subjectGatewayService: SubjectGatewayService) {}

  @Post('/save')
  @Track()
  @RequirePermission('management.subjects.edit')
  save(@Body() body: any, @Req() req: AuthenticatedRequest) {
    return this.subjectGatewayService.saveSubject(
      body,
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }

  @Get('getAll')
  @Track()
  @RequirePermission('management.subjects.view')
  getAll(
    @Req() req: AuthenticatedRequest,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.subjectGatewayService.getAllSubject(
      {
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
      },
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }

  @Get('stats')
  @Track()
  @RequirePermission('management.subjects.view')
  getStats(@Req() req: AuthenticatedRequest) {
    return this.subjectGatewayService.getSubjectStats(
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }

  @Get(':id')
  @Track()
  @RequirePermission('management.subjects.view')
  getById(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.subjectGatewayService.getSubjectById(
      id,
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }

  @Delete('delete/:id')
  @Track()
  @RequirePermission('management.subjects.delete')
  softDelete(
    @Param('id') id: string,
    @Body() body: { reason: string },
    @Req() req: AuthenticatedRequest,
  ) {
    return this.subjectGatewayService.softDeleteSubject(
      id,
      body,
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }
}
