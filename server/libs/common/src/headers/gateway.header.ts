import { AxiosHeaders } from 'axios';
import { uuidv7 } from 'uuidv7';

export function gatewayHeaders(userId: string, schoolId: string): AxiosHeaders {
  return AxiosHeaders.from({
    'x-user-id': userId,
    'x-school-id': schoolId,
    'x-request-id': uuidv7(),
  });
}
