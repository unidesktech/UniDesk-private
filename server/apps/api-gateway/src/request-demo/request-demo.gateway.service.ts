import { ResponseDto } from '@app/dto/response.dto';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RequestDemoGateWayService {
  async saveDemo(body: any, id?: string): Promise<ResponseDto<string>> {
    let url = `${process.env.ENDPOINTURL}:${process.env.REQUESTDEMOPORT}/request-demo/save`;
    if (id) {
      url += `/${id}`;
    }
    const response = await axios.post<ResponseDto<string>>(url, body);

    return response.data;
  }

  async getDemo(id?: string): Promise<ResponseDto<string>> {
    let url = `${process.env.ENDPOINTURL}:${process.env.REQUESTDEMOPORT}/request-demo/get`;
    if (id) {
      url += `/${id}`;
    }
    const response = await axios.get<ResponseDto<string>>(url);
    return response.data;
  }
}
