import { gatewayHeaders } from '@app/common/headers/gateway.header';
import { Track } from '@app/common/logger/track.decorator';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class commonGateWayService {
  @Track()
  async getDistinctValues(
    body: any,
    userId?: string,
    schoolId?: string,
  ): Promise<any> {
    if (!userId || !schoolId) {
      throw new UnauthorizedException('User Id or School Id is missing.');
    }
    const url = `${process.env.ENDPOINT_URL}:${process.env.COMMON_PORT}/common/distinct-values`;
    const response = await axios.post(url, body, {
      headers: gatewayHeaders(userId, schoolId),
    });

    return response.data;
  }
}
