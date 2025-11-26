import { Track } from '@app/common/logger/track.decorator';
import { writeToConsole } from '@app/common/utils/writeToConsole';
import { ResponseDto } from '@app/dto/response.dto';
import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestDemoService {
  constructor(private prisma: PrismaService) {}

  @Track()
  async createDemo(): Promise<ResponseDto<null>> {
    const result = await this.prisma.demo_requests.findMany();
    writeToConsole.log(`Creating a demo request... ${JSON.stringify(result)}`);
    return {
      success: true,
      message: 'Demo request created successfully',
      data: null,
    };
  }
}
