import { AuthGuard } from '@app/common/guards/auth.guard';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { SidebarService } from './sidebar.service';
import { AuthenticatedRequest } from '@app/dto/types/request';

@Controller('me')
@UseGuards(AuthGuard)
export class MeGatewayController {
  constructor(private readonly sidebarService: SidebarService) {}

  @Get('sidebar')
  getSidebar(@Req() req: AuthenticatedRequest) {
    return this.sidebarService.getSidebar(
      req?.user?.user_id,
      req?.user?.school_id,
    );
  }
}
