import { Track } from '@app/common/logger/track.decorator';
import { gatewayAxios } from '@app/common/middlewares/gatewayAxios.middleware';
import { ResponseDto } from '@app/dto/response.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SchoolGatewayService {
  @Track()
  async saveSchool(body: any): Promise<ResponseDto<string>> {
    const url = `${process.env.ENDPOINT_URL}:${process.env.SCHOOL_PORT}/school/save`;

    const schoolResponse = await gatewayAxios.post<ResponseDto<string>>(
      url,
      body,
    );

    let response;
    if (schoolResponse.data.success) {
      const url = `${process.env.ENDPOINT_URL}:${process.env.APIGATEWAY_PORT}/auth/add-initial-user/`;
      response = await gatewayAxios.post<ResponseDto<string>>(
        url,
        schoolResponse.data.data,
      );

      return response.data;
    }
    return schoolResponse.data;
  }

  @Track()
  async getSchool(id?: string): Promise<ResponseDto<string>> {
    const url = `${process.env.ENDPOINT_URL}:${process.env.SCHOOL_PORT}/school/get/${id}`;

    const response = await gatewayAxios.get<ResponseDto<string>>(url);
    return response.data;
  }

  @Track()
  async validateSchoolCode(code: string): Promise<ResponseDto<string>> {
    const url = `${process.env.ENDPOINT_URL}:${process.env.SCHOOL_PORT}/school/validate-code/${code}`;

    const response = await gatewayAxios.get<ResponseDto<string>>(url);
    return response.data;
  }
}
