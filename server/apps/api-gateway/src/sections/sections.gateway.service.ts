import { ResponseDto } from '@app/dto/response.dto';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SectionGatewayService {
  private baseUrl = `${process.env.ENDPOINT_URL}:${process.env.MANAGEMENT_SECTIONS_PORT}/section`;

  async saveSection(body: any): Promise<ResponseDto<any>> {
    const response = await axios.post<ResponseDto<any>>(
      `${this.baseUrl}/save`,
      body,
    );
    return response.data;
  }

  async getAllSections(params?: {
    page?: number;
    limit?: number;
  }): Promise<ResponseDto<any>> {
    const response = await axios.get<ResponseDto<any>>(
      `${this.baseUrl}/getAll`,
      { params },
    );
    return response.data;
  }

  async getSectionById(id: string): Promise<ResponseDto<any>> {
    const response = await axios.get<ResponseDto<any>>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async softDeleteSection(
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
