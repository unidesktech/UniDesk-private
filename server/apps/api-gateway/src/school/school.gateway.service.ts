import { Track } from '@app/common/logger/track.decorator';
import { ResponseDto } from '@app/dto/response.dto';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SchoolGatewayService {
  @Track()
  async saveSchool(body: any): Promise<ResponseDto<string>> {
    const url = `${process.env.ENDPOINTURL}:${process.env.SCHOOLPORT}/school/save`;

    const response = await axios.post<ResponseDto<string>>(url, body);
    return response.data;
  }

  @Track()
  async getSchool(id?: string): Promise<ResponseDto<string>> {
    const url = `${process.env.ENDPOINTURL}:${process.env.SCHOOLPORT}/school/get/${id}`;

    const response = await axios.get<ResponseDto<string>>(url);
    return response.data;
  }
}
