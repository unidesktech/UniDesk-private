import { Track } from '@app/common/logger/track.decorator';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthGatewayService {
  @Track()
  async addInitialUser(body: any): Promise<any> {
    const url = `${process.env.ENDPOINTURL}:${process.env.AUTHPORT}/auth/add-inital-user`;
    const response = await axios.post(url, body);

    return response.data;
  }

  @Track()
  async login(body: any): Promise<any> {
    const url = `${process.env.ENDPOINTURL}:${process.env.AUTHPORT}/auth/login`;
    const response = await axios.post(url, body);

    return response.data;
  }
}
