import { ResponseDto } from '@app/dto/response.dto';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SubjectGatewayService{
  private baseUrl = `${process.env.ENDPOINTURL}:${process.env.SUBJPORT}/subject`;
  async saveSubject(body: any): Promise<ResponseDto<string>> {
    const response = await axios.post<ResponseDto<string>>(
      `${this.baseUrl}/subject`,
      body,
    );

    return response.data;
  }

  async getAllSubject(params?: {
    page?: number;
    limit?: number;
  }): Promise<ResponseDto<any>> {
    const response = await axios.get<ResponseDto<any>>(
      `${this.baseUrl}/getAll`,
      {
        params,
      },
    );
    return response.data;
  }

  async getSubjectById(id: string): Promise<ResponseDto<any>> {
    const response = await axios.get<ResponseDto<any>>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async softDeleteSubject(
    id: string,
    body: { reason: string },
  ): Promise<ResponseDto<null>> {
    const response = await axios.post<ResponseDto<null>>(
      `${this.baseUrl}/${id}/delete`,
      body,
    );
    return response.data;
  }
}
