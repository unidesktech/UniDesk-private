import { ResponseDto } from '@app/dto/response.dto';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class StudentGatewayService {
  private baseUrl = `${process.env.ENDPOINTURL}:${process.env.STUDENTPORT}/student`;
  async saveStudent(body: any): Promise<ResponseDto<string>> {
    const response = await axios.post<ResponseDto<string>>(`${this.baseUrl}/student`, body);

    return response.data;
  }

  async getAllStudents(params?: {
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

  // Get student by ID
  async getStudentById(id: string): Promise<ResponseDto<any>> {
    const response = await axios.get<ResponseDto<any>>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  // Soft delete student by ID
  async softDeleteStudent(
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
