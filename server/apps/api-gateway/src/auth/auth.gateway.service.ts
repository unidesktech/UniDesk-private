import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthGatewayService {
  async login() {
    const response = await axios.get(
      `${process.env.ENDPOINTURL}:${process.env.AUTHPORT}/auth/login`,
    );

    return {
      gatewayModule: 'auth',
      data: response.data,
    };
  }
}
