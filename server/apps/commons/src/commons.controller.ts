import { Body, Controller, Post, Req } from '@nestjs/common';
import { CommonsService } from './commons.service';
import { DistinctValuePlayload } from '@app/dto/common.dto';
import { AuthenticatedRequest } from '@app/dto/types/request';

@Controller('common')
export class CommonsController {
  constructor(private readonly commonsService: CommonsService) {}

  @Post('distinct-values')
  getDistinctValue(
    @Req() req: AuthenticatedRequest,
    @Body() params: DistinctValuePlayload,
  ): Promise<{ id: string; value: string }[]> {
    params = { ...params, schoolId: req.user?.school_id };
    return this.commonsService.getDistinctValue(params);
  }
}
