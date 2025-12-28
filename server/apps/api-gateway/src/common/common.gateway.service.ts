import { Track } from '@app/common/logger/track.decorator';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class commonGateWayService {
  @Track()
  async getDistinctValues(body: any): Promise<any> {
    const url = `${process.env.ENDPOINT_URL}:${process.env.COMMON_PORT}/common/distinct-values`;
    const response = await axios.post(url, body);

    return response.data;
  }
}
