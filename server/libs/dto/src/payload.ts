import { JwtPayload } from 'jsonwebtoken';

export interface GatewayHeaders {
  'x-user-id': string;
  'x-school-id': string;
  'x-request-id': string;
}

export interface JWTPayload extends JwtPayload {
  userId: string;
  role?: string;
}
