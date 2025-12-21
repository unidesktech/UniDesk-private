import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CommonsService } from './commons.service';
import { DistinctValuePlayload } from '@app/dto/common.dto';
import { AuthGuard } from '@app/common/guards/authguard';
import { AuthenticatedRequest } from '@app/dto/types/request';

@Controller('common')
export class CommonsController {
  constructor(private readonly commonsService: CommonsService) {}

  @Post('distinct-values')
  @UseGuards(AuthGuard)
  getDistinctValue(
    @Req() req: AuthenticatedRequest,
    @Body() params: DistinctValuePlayload,
  ): Promise<{ id: string; value: string }[]> {
    params = { ...params, schoolId: req.user?.school_id };
    return this.commonsService.getDistinctValue(params);
  }
}
