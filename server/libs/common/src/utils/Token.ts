import jwt from 'jsonwebtoken';
import { JWTPayload } from '@app/dto/payload';

function isJwtPayload(decoded: unknown): decoded is JWTPayload {
  return typeof decoded === 'object' && decoded !== null;
}

export function signAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: '10m',
  });
}

export function signRefreshToken(payload: JWTPayload): string {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: '30d',
  });
}

export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

    if (isJwtPayload(decoded)) {
      return decoded;
    }

    return null;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);

    if (isJwtPayload(decoded)) {
      return decoded;
    }

    return null;
  } catch {
    return null;
  }
}
