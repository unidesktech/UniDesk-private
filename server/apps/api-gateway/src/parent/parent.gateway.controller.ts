import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ParentGatewayService } from './parent.gateway.service';

@Controller('parent')
export class ParentGatewayController {
  constructor(
    private readonly parentGatewayService: ParentGatewayService,
  ) {}

  @Post('/save')
  save(@Body() body: any) {
    return this.parentGatewayService.saveParent(body);
  }

  @Get('getAll')
  getAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.parentGatewayService.getAllParent({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
  }

  @Get('stats')
  getStats(){
    return this.parentGatewayService.getParentStats()
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.parentGatewayService.getParentById(id);
  }

  @Post(':id/delete')
  softDelete(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.parentGatewayService.softDeleteParent(id, body);
  }
}
