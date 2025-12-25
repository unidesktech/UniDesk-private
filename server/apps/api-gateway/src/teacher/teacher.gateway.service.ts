import { ResponseDto } from '@app/dto/response.dto';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TeacherGatewayService {
  private baseUrl = `${process.env.ENDPOINTURL}:${process.env.TEACHERPORT}/teacher`;

  async saveTeacher(body: any): Promise<ResponseDto<any>> {
    const response = await axios.post<ResponseDto<any>>(
      `${this.baseUrl}/save`,
      body,
    );
    return response.data;
  }

  async getAllTeachers(params?: {
    page?: number;
    limit?: number;
  }): Promise<ResponseDto<any>> {
    const response = await axios.get<ResponseDto<any>>(
      `${this.baseUrl}/getAll`,
      { params },
    );
    return response.data;
  }

  async getTeacherById(id: string): Promise<ResponseDto<any>> {
    const response = await axios.get<ResponseDto<any>>(`${this.baseUrl}/${id}`);
    return response.data;
  }
  async getTeacherStats(): Promise<ResponseDto<string>> {
    const response = await axios.get<ResponseDto<string>>(
      `${this.baseUrl}/stats`,
    );
    return response.data;
  }

  async softDeleteTeacher(
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
