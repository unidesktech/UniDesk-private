import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SchoolService } from './school.service';
import { ResponseDto } from '@app/dto/response.dto';
import { SchoolBasicInfoDTO, SchoolPreview } from '@app/dto/school.dto';
import { Track } from '@app/common/logger/track.decorator';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post('save')
  @Track()
  saveSchool(
    @Body() body: any,
  ): Promise<ResponseDto<SchoolBasicInfoDTO | null>> {
    return this.schoolService.save(body);
  }

  @Get('get/:id')
  @Track()
  getSchoolInfo(
    @Param('id') id?: string,
  ): Promise<ResponseDto<Partial<SchoolBasicInfoDTO> | null>> {
    return this.schoolService.getSchoolInfo(id);
  }

  @Get('validate-code/:code')
  @Track()
  validateSchoolCode(
    @Param('code') code: string,
  ): Promise<ResponseDto<SchoolPreview | null> | null> {
    return this.schoolService.validateSchoolCode(code);
  }
}
