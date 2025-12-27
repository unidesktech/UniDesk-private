import { Track } from '@app/common/logger/track.decorator';
import { ResponseDto } from '@app/dto/response.dto';
import { AuthenticatedRequest } from '@app/dto/types/request';
import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class AuthGatewayService {
  @Track()
  async addInitialUser(body: any): Promise<any> {
    const url = `${process.env.ENDPOINT_URL}:${process.env.AUTH_PORT}/auth/add-inital-user`;
    const response = await axios.post(url, body);

    return response.data;
  }

  @Track()
  async login(body: any, req: AuthenticatedRequest): Promise<ResponseDto<any>> {
    const url = `${process.env.ENDPOINT_URL}:${process.env.AUTH_PORT}/auth/login`;

    const forwardedIp = typeof req.ip === 'string' ? req.ip : '';
    const userAgent =
      typeof req.headers['user-agent'] === 'string'
        ? req.headers['user-agent']
        : '';
    const cookieHeader =
      typeof req.headers.cookie === 'string' ? req.headers.cookie : '';

    const response: AxiosResponse<ResponseDto<any>> = await axios.post(
      url,
      body,
      {
        headers: {
          'x-forwarded-for': forwardedIp,
          'user-agent': userAgent,
          cookie: cookieHeader,
        },
        withCredentials: true,
      },
    );

    return response.data;
  }

  async refresh(req: AuthenticatedRequest): Promise<ResponseDto<any>> {
    const url = `${process.env.ENDPOINT_URL}:${process.env.AUTH_PORT}/auth/refresh`;
    const cookieHeader =
      typeof req.headers.cookie === 'string' ? req.headers.cookie : '';
    const response: AxiosResponse<ResponseDto<any>> = await axios.post(
      url,
      {},
      {
        headers: {
          cookie: cookieHeader,
        },
        withCredentials: true,
      },
    );
    return response.data;
  }

  @Track()
  async logOut(req: AuthenticatedRequest): Promise<ResponseDto<any>> {
    const url = `${process.env.ENDPOINT_URL}:${process.env.AUTH_PORT}/auth/logout`;
    const cookieHeader =
      typeof req.headers.cookie === 'string' ? req.headers.cookie : '';
    const response: AxiosResponse<ResponseDto<any>> = await axios.post(
      url,
      {},
      {
        headers: {
          cookie: cookieHeader,
        },
        withCredentials: true,
      },
    );
    return response.data;
  }

  @Track()
  async requestOtp(body: any): Promise<any> {
    const url = `${process.env.ENDPOINT_URL}:${process.env.AUTH_PORT}/auth/otp/request`;
    const response = await axios.post(url, body);
    return response.data;
  }

  @Track()
  async verifyOtp(body: any): Promise<any> {
    const url = `${process.env.ENDPOINT_URL}:${process.env.AUTH_PORT}/auth/otp/verify`;
    const response = await axios.post(url, body);
    return response.data;
  }

  @Track()
  async resetPassword(body: any): Promise<any> {
    const url = `${process.env.ENDPOINT_URL}:${process.env.AUTH_PORT}/auth/reset-password`;
    const response = await axios.post(url, body);
    return response.data;
  }
}
