import { AuthGuard } from '@app/common/guards/auth.guard';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedRequest } from '@app/dto/types/request';
import { MeService } from './me.gateway.service';
import { AuthenticatedUser } from '@app/dto';

@Controller('me')
@UseGuards(AuthGuard)
export class MeGatewayController {
  constructor(private readonly meService: MeService) {}

  @Get('store-values')
  getStoreValues(@Req() req: AuthenticatedRequest) {
    return this.meService.getStoreValue(
      req?.user as AuthenticatedUser,
      req?.user?.school_id,
    );
  }

  @Get('sidebar')
  getSidebar(@Req() req: AuthenticatedRequest) {
    return this.meService.getSidebar(req?.user?.user_id, req?.user?.school_id);
  }
}
