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
import { SectionGatewayService } from './sections.gateway.service';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { PermissionGuard } from '@app/common/guards/permission.guard';
import { Track } from '@app/common/logger/track.decorator';
import { RequirePermission } from '@app/common/permissions/permission.decorator';
import { AuthenticatedRequest } from '@app/dto/types/request';

@Controller('section')
@UseGuards(AuthGuard, PermissionGuard)
export class SectionGatewayController {
  constructor(private readonly sectionGatewayService: SectionGatewayService) {}

  @Post('/save')
  @Track()
  @RequirePermission('management.sections.edit')
  save(@Body() body: any, @Req() req: AuthenticatedRequest) {
    return this.sectionGatewayService.saveSection(
      body,
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }

  @Get('getAll')
  @Track()
  @RequirePermission('management.sections.view')
  getAll(
    @Req() req: AuthenticatedRequest,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.sectionGatewayService.getAllSections(
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
    return this.sectionGatewayService.getSectionStats(
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }

  @Get(':id')
  @Track()
  @RequirePermission('management.sections.view')
  getById(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.sectionGatewayService.getSectionById(
      id,
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }

  @Delete('delete/:id')
  @Track()
  @RequirePermission('management.sections.delete')
  softDelete(
    @Param('id') id: string,
    @Body() body: { reason: string },
    @Req() req: AuthenticatedRequest,
  ) {
    return this.sectionGatewayService.softDeleteSection(
      id,
      body,
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }
}
