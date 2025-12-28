import { GatewayHeaders } from '@app/dto/payload';

export function gatewayHeaders(
  userId: string,
  schoolId: string,
): GatewayHeaders {
  return {
    'x-user-id': userId,
    'x-school-id': schoolId,
    'x-request-id': crypto.randomUUID(),
  };
}
