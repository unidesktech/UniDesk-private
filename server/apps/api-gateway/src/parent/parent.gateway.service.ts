import { ResponseDto } from '@app/dto/response.dto';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ParentGatewayService {
  private baseUrl = `${process.env.ENDPOINTURL}:${process.env.PARENTPORT}/parent`;

  async saveParent(body: any): Promise<ResponseDto<string>> {
    const response = await axios.post<ResponseDto<string>>(
      `${this.baseUrl}/save`,
      body,
    );

    return response.data;
  }

  async getAllParent(params?: {
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

  async getParentStats(): Promise<ResponseDto<string>> {
    const response = await axios.get<ResponseDto<string>>(
      `${this.baseUrl}/stats`,
    );
    return response.data;
  }

  // Get student by ID
  async getParentById(id: string): Promise<ResponseDto<any>> {
    const response = await axios.get<ResponseDto<any>>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  // Soft delete student by ID
  async softDeleteParent(
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
