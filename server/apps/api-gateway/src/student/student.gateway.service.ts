import { gatewayHeaders } from '@app/common/headers/gateway.header';
import { Track } from '@app/common/logger/track.decorator';
import { ResponseDto } from '@app/dto/response.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class StudentGatewayService {
  private baseUrl = `${process.env.ENDPOINT_URL}:${process.env.MANAGEMENT_STUDENT_PORT}/student`;
  async saveStudent(body: any): Promise<ResponseDto<string>> {
    const response = await axios.post<ResponseDto<string>>(
      `${this.baseUrl}/student`,
      body,
    );

    return response.data;
  }

  @Track()
  async getAllStudents(
    userId?: string,
    schoolId?: string,
    params?: {
      page?: number;
      limit?: number;
    },
  ): Promise<ResponseDto<any>> {
    if (!userId || !schoolId) {
      throw new UnauthorizedException('UserId or SchoolId is missing');
    }
    const response = await axios.get<ResponseDto<any>>(
      `${this.baseUrl}/getAll`,
      {
        params,
        headers: gatewayHeaders(userId, schoolId),
      },
    );
    return response.data;
  }

  @Track()
  async getStudentStats(userId?: string, schoolId?: string): Promise<any> {
    if (!userId || !schoolId) {
      throw new UnauthorizedException('UserId or SchoolId is missing');
    }
    const response = await axios.get(`${this.baseUrl}/stats`, {
      headers: gatewayHeaders(userId, schoolId),
    });
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
