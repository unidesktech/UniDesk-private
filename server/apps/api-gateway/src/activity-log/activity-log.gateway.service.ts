import { Track } from '@app/common/logger/track.decorator';
import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { ActivityLogPayload } from '@app/dto/activitylog.dto';
import { ResponseDto } from '@app/dto/response.dto';

@Injectable()
export class ActivityLogGatewayService {
  private readonly baseUrl = `${process.env.ENDPOINT_URL}:${process.env.ACTIVITY_LOG_PORT}`;

  @Track()
  async save(
    body: ActivityLogPayload,
  ): Promise<ResponseDto<null>> {
    const url = `${this.baseUrl}/activity-log/save`;

    const response: AxiosResponse<ResponseDto<null>> =
      await axios.post(url, body);

    return response.data;
  }

  @Track()
  async get(id?: string): Promise<ResponseDto<any>> {
    const url = id
      ? `${this.baseUrl}/activity-log/get/${id}`
      : `${this.baseUrl}/activity-log/get`;

    const response: AxiosResponse<ResponseDto<any>> =
      await axios.get(url);

    return response.data;
  }
}
