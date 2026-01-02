import {
  Body,
  Controller,
  Headers,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommonsService } from './commons.service';
import { DistinctValuePlayload } from '@app/dto/common.dto';
import { AuthenticatedRequest } from '@app/dto/types/request';
import { MircoServiceGuard } from '@app/common/guards/microservice.guard';

@Controller('common')
@UseGuards(MircoServiceGuard)
export class CommonsController {
  constructor(private readonly commonsService: CommonsService) {}

  @Post('distinct-values')
  getDistinctValue(
    @Req() req: AuthenticatedRequest,
    @Body() params: DistinctValuePlayload,
    @Headers('x-school-id') schoolId: string,
  ): Promise<{ id: string; value: string }[]> {
    params = { ...params, schoolId };
    return this.commonsService.getDistinctValue(params);
  }
}
