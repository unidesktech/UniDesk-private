import { ServiceErrorPayload } from '@app/dto/types/service-error.types';
import axios from 'axios';

export function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ServiceErrorPayload>(error)) {
    const payload = error.response?.data;

    if (payload) {
      if (Array.isArray(payload.message)) {
        return payload.message.join(', ');
      }

      if (typeof payload.message === 'string') {
        return payload.message;
      }
    }

    return error.message || 'Request failed';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Unexpected error occurred';
}
