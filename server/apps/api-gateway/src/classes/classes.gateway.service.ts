import { ResponseDto } from '@app/dto/response.dto';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ClassGatewayService {
  private baseUrl = `${process.env.ENDPOINT_URL}:${process.env.MANAGEMENT_CLASSES_PORT}/class`;

  async saveClass(body: any): Promise<ResponseDto<any>> {
    const response = await axios.post<ResponseDto<any>>(
      `${this.baseUrl}/save`,
      body,
    );
    return response.data;
  }

  async getAllClasses(params?: {
    page?: number;
    limit?: number;
  }): Promise<ResponseDto<any>> {
    const response = await axios.get<ResponseDto<any>>(
      `${this.baseUrl}/getAll`,
      { params },
    );
    return response.data;
  }

  async getClassById(id: string): Promise<ResponseDto<any>> {
    const response = await axios.get<ResponseDto<any>>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async getClassesStats(): Promise<ResponseDto<string>> {
    const response = await axios.get<ResponseDto<string>>(
      `${this.baseUrl}/stats`,
    );
    return response.data;
  }

  async softDeleteClass(
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
