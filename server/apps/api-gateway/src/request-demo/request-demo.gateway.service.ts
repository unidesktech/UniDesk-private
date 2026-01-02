import { gatewayAxios } from '@app/common/middlewares/gatewayAxios.middleware';
import { ResponseDto } from '@app/dto/response.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestDemoGateWayService {
  async saveDemo(body: any, id?: string): Promise<ResponseDto<string>> {
    let url = `${process.env.ENDPOINT_URL}:${process.env.REQUESTDEMO_PORT}/request-demo/save`;
    if (id) {
      url += `/${id}`;
    }
    const response = await gatewayAxios.post<ResponseDto<string>>(url, body);

    return response.data;
  }

  async getDemo(id?: string): Promise<ResponseDto<string>> {
    let url = `${process.env.ENDPOINT_URL}:${process.env.REQUESTDEMO_PORT}/request-demo/get`;
    if (id) {
      url += `/${id}`;
    }
    const response = await gatewayAxios.get<ResponseDto<string>>(url);
    return response.data;
  }
}
