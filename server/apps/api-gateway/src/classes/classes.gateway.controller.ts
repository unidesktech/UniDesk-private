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
import { ClassGatewayService } from './classes.gateway.service';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { PermissionGuard } from '@app/common/guards/permission.guard';
import { Track } from '@app/common/logger/track.decorator';
import { AuthenticatedRequest } from '@app/dto/types/request';
import { RequirePermission } from '@app/common/permissions/permission.decorator';

@Controller('classes')
@UseGuards(AuthGuard, PermissionGuard)
export class ClassesGatewayController {
  constructor(private readonly classGatewayService: ClassGatewayService) {}

  @Post('/save')
  @Track()
  @RequirePermission('management.classes.edit')
  save(@Body() body: any, @Req() req: AuthenticatedRequest) {
    return this.classGatewayService.saveClass(
      body,
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }

  @Get('getAll')
  @Track()
  @RequirePermission('management.classes.view')
  getAll(
    @Req() req: AuthenticatedRequest,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.classGatewayService.getAllClasses(
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
  @RequirePermission('management.classes.view')
  getStats(@Req() req: AuthenticatedRequest) {
    return this.classGatewayService.getClassesStats(
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }

  @Get(':id')
  @Track()
  @RequirePermission('management.classes.view')
  getById(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.classGatewayService.getClassById(
      id,
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }

  @Delete('delete/:id')
  @Track()
  @RequirePermission('management.classes.delete')
  softDelete(
    @Param('id') id: string,
    @Body() body: { reason: string },
    @Req() req: AuthenticatedRequest,
  ) {
    return this.classGatewayService.softDeleteClass(
      id,
      body,
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }
}
