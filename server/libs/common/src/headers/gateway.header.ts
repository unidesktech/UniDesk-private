import crypto from 'crypto';
import { AxiosHeaders } from 'axios';
import { uuidv7 } from 'uuidv7';

export function gatewayHeaders(userId: string, schoolId: string): AxiosHeaders {
  const requestId = uuidv7();
  const timestamp = Date.now().toString();

  const payload = `${userId}:${schoolId}:${requestId}:${timestamp}`;

  const signature = crypto
    .createHmac('sha256', process.env.INTERNAL_SERVICE_SECRET!)
    .update(payload)
    .digest('hex');

  return AxiosHeaders.from({
    'x-user-id': userId,
    'x-school-id': schoolId,
    'x-request-id': requestId,
    'x-timestamp': timestamp,
    'x-signature': signature,
  });
}
