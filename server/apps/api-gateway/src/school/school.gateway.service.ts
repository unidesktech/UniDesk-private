import { Track } from '@app/common/logger/track.decorator';
import { ResponseDto } from '@app/dto/response.dto';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SchoolGatewayService {
  @Track()
  async saveSchool(body: any): Promise<ResponseDto<string>> {
    const url = `${process.env.ENDPOINTURL}:${process.env.SCHOOLPORT}/school/save`;

    const schoolResponse = await axios.post<ResponseDto<string>>(url, body);

    let response;
    if (schoolResponse.data.success) {
      const url = `${process.env.ENDPOINTURL}:${process.env.APIGATEWAYPORT}/auth/add-initial-user/`;
      response = await axios.post<ResponseDto<string>>(
        url,
        schoolResponse.data.data,
      );

      return response.data;
    }
    return schoolResponse.data;
  }

  @Track()
  async getSchool(id?: string): Promise<ResponseDto<string>> {
    const url = `${process.env.ENDPOINTURL}:${process.env.SCHOOLPORT}/school/get/${id}`;

    const response = await axios.get<ResponseDto<string>>(url);
    return response.data;
  }

  @Track()
  async validateSchoolCode(code: string): Promise<ResponseDto<string>> {
    const url = `${process.env.ENDPOINTURL}:${process.env.SCHOOLPORT}/school/validate-code/${code}`;

    const response = await axios.get<ResponseDto<string>>(url);
    return response.data;
  }
}
