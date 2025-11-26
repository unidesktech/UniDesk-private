import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiGatewayService {
  async login() {
    const response = await axios.get(`${process.env.AUTHENDPOINT}/auth/login`);

    return {
      gateway: true,
      data: response.data,
    };
  }
  async createDemo() {
    const response = await axios.get(
      `${process.env.REQUESTDEMOENDPOINT}/request-demo/create`,
    );

    return {
      gateway: true,
      data: response.data,
    };
  }
}
