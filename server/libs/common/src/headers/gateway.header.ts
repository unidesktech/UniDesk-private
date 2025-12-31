import { GatewayHeaders } from '@app/dto/payload';
import { uuidv7 } from 'uuidv7';

export function gatewayHeaders(
  userId: string,
  schoolId: string,
): GatewayHeaders {
  return {
    'x-user-id': userId,
    'x-school-id': schoolId,
    'x-request-id': uuidv7(),
  };
}
