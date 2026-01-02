import { gatewayHeaders } from '@app/common/headers/gateway.header';
import { gatewayAxios } from '@app/common/middlewares/gatewayAxios.middleware';
import { ResponseDto } from '@app/dto/response.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ParentGatewayService {
  private baseUrl = `${process.env.ENDPOINT_URL}:${process.env.MANAGEMENT_PARENT_PORT}/parent`;

  async saveParent(
    body: any,
    userId?: string,
    schoolId?: string,
  ): Promise<ResponseDto<string>> {
    if (!userId || !schoolId) {
      throw new UnauthorizedException('UserId or SchoolId is missing');
    }
    const response = await gatewayAxios.post<ResponseDto<string>>(
      `${this.baseUrl}/save`,
      body,
      { headers: gatewayHeaders(userId, schoolId) },
    );

    return response.data;
  }

  async getAllParent(
    params?: {
      page?: number;
      limit?: number;
    },
    userId?: string,
    schoolId?: string,
  ): Promise<ResponseDto<any>> {
    if (!userId || !schoolId) {
      throw new UnauthorizedException('UserId or SchoolId is missing');
    }
    const response = await gatewayAxios.get<ResponseDto<any>>(
      `${this.baseUrl}/getAll`,
      {
        params,
        headers: gatewayHeaders(userId, schoolId),
      },
    );
    return response.data;
  }

  async getParentStats(
    userId?: string,
    schoolId?: string,
  ): Promise<ResponseDto<string>> {
    if (!userId || !schoolId) {
      throw new UnauthorizedException('UserId or SchoolId is missing');
    }
    const response = await axios.get<ResponseDto<string>>(
      `${this.baseUrl}/stats`,
      { headers: gatewayHeaders(userId, schoolId) },
    );
    return response.data;
  }

  // Get student by ID
  async getParentById(
    id: string,
    userId?: string,
    schoolId?: string,
  ): Promise<ResponseDto<any>> {
    if (!userId || !schoolId) {
      throw new UnauthorizedException('UserId or SchoolId is missing');
    }
    const response = await gatewayAxios.get<ResponseDto<any>>(
      `${this.baseUrl}/${id}`,
      { headers: gatewayHeaders(userId, schoolId) },
    );
    return response.data;
  }

  // Soft delete student by ID
  async softDeleteParent(
    id: string,
    body: { reason: string },
    userId?: string,
    schoolId?: string,
  ): Promise<ResponseDto<null>> {
    if (!userId || !schoolId) {
      throw new UnauthorizedException('UserId or SchoolId is missing');
    }
    const response = await gatewayAxios.post<ResponseDto<null>>(
      `${this.baseUrl}/delete/${id}`,
      body,
      { headers: gatewayHeaders(userId, schoolId) },
    );
    return response.data;
  }
}
