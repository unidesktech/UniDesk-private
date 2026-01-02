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
import { ParentGatewayService } from './parent.gateway.service';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { PermissionGuard } from '@app/common/guards/permission.guard';
import { Track } from '@app/common/logger/track.decorator';
import { RequirePermission } from '@app/common/permissions/permission.decorator';
import { AuthenticatedRequest } from '@app/dto/types/request';

@Controller('parent')
@UseGuards(AuthGuard, PermissionGuard)
export class ParentGatewayController {
  constructor(private readonly parentGatewayService: ParentGatewayService) {}

  @Post('/save')
  @Track()
  @RequirePermission('management.parents.edit')
  save(@Body() body: any, @Req() req: AuthenticatedRequest) {
    return this.parentGatewayService.saveParent(
      body,
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }

  @Get('getAll')
  @Track()
  @RequirePermission('management.parents.view')
  getAll(
    @Req() req: AuthenticatedRequest,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.parentGatewayService.getAllParent(
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
  @RequirePermission('management.parents.view')
  getStats(@Req() req: AuthenticatedRequest) {
    return this.parentGatewayService.getParentStats(
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }

  @Get(':id')
  @Track()
  @RequirePermission('management.parents.view')
  getById(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.parentGatewayService.getParentById(
      id,
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }

  @Delete('delete/:id')
  @Track()
  @RequirePermission('management.parents.delete')
  softDelete(
    @Param('id') id: string,
    @Body() body: { reason: string },
    @Req() req: AuthenticatedRequest,
  ) {
    return this.parentGatewayService.softDeleteParent(
      id,
      body,
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }
}
