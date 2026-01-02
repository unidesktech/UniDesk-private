import { gatewayHeaders } from '@app/common/headers/gateway.header';
import { gatewayAxios } from '@app/common/middlewares/gatewayAxios.middleware';
import { ResponseDto } from '@app/dto/response.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class TeacherGatewayService {
  private baseUrl = `${process.env.ENDPOINT_URL}:${process.env.MANAGEMENT_TEACHER_PORT}/teacher`;

  async saveTeacher(
    body: any,
    userId?: string,
    schoolId?: string,
  ): Promise<ResponseDto<any>> {
    if (!userId || !schoolId) {
      throw new UnauthorizedException('School Id or User Id missing');
    }
    const response = await gatewayAxios.post<ResponseDto<any>>(
      `${this.baseUrl}/save`,
      body,
      {
        headers: gatewayHeaders(userId, schoolId),
      },
    );
    return response.data;
  }

  async getAllTeachers(
    params?: {
      page?: number;
      limit?: number;
    },
    userId?: string,
    schoolId?: string,
  ): Promise<ResponseDto<any>> {
    if (!userId || !schoolId) {
      throw new UnauthorizedException('School Id or User Id missing');
    }
    const response = await gatewayAxios.get<ResponseDto<any>>(
      `${this.baseUrl}/getAll`,
      { params, headers: gatewayHeaders(userId, schoolId) },
    );
    return response.data;
  }

  async getTeacherById(
    id: string,
    userId?: string,
    schoolId?: string,
  ): Promise<ResponseDto<any>> {
    if (!userId || !schoolId) {
      throw new UnauthorizedException('School Id or User Id missing');
    }
    const response = await gatewayAxios.get<ResponseDto<any>>(
      `${this.baseUrl}/${id}`,
      {
        headers: gatewayHeaders(userId, schoolId),
      },
    );
    return response.data;
  }
  async getTeacherStats(
    userId?: string,
    schoolId?: string,
  ): Promise<ResponseDto<string>> {
    if (!userId || !schoolId) {
      throw new UnauthorizedException('School Id or User Id missing');
    }
    const response = await gatewayAxios.get<ResponseDto<string>>(
      `${this.baseUrl}/stats`,
      {
        headers: gatewayHeaders(userId, schoolId),
      },
    );
    return response.data;
  }

  async softDeleteTeacher(
    id: string,
    body: { reason: string },
    userId?: string,
    schoolId?: string,
  ): Promise<ResponseDto<null>> {
    if (!userId || !schoolId) {
      throw new UnauthorizedException('School Id or User Id missing');
    }
    const response = await gatewayAxios.post<ResponseDto<null>>(
      `${this.baseUrl}/delete/${id}`,
      body,
      {
        headers: gatewayHeaders(userId, schoolId),
      },
    );
    return response.data;
  }
}
