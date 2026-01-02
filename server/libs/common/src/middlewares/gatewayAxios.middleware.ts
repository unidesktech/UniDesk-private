import axios from 'axios';
import { extractErrorMessage } from '../utils/axios-error';
import { BadRequestException } from '@nestjs/common';

export const gatewayAxios = axios.create({
  timeout: 5000,
});

gatewayAxios.interceptors.response.use(
  (res) => res,
  (error: unknown) => {
    const message = extractErrorMessage(error);
    return Promise.reject(new BadRequestException(message));
  },
);
