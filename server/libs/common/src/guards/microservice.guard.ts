import { AuthenticatedRequest } from '@app/dto/types/request';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import crypto from 'crypto';

function getHeaderValue(value: string | string[] | undefined): string {
  if (!value) return '';
  return Array.isArray(value) ? value[0] : value;
}

@Injectable()
export class MircoServiceGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: AuthenticatedRequest = context.switchToHttp().getRequest();

    const userId = getHeaderValue(req.headers['x-user-id']);
    const schoolId = getHeaderValue(req.headers['x-school-id']);
    const requestId = getHeaderValue(req.headers['x-request-id']);
    const timestamp = getHeaderValue(req.headers['x-timestamp']);
    const signature = getHeaderValue(req.headers['x-signature']);

    if (!userId || !schoolId || !requestId || !timestamp || !signature) {
      throw new UnauthorizedException('Missing internal auth headers');
    }

    const payload = `${userId}:${schoolId}:${requestId}:${timestamp}`;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.INTERNAL_SERVICE_SECRET!)
      .update(payload)
      .digest('hex');

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature),
      )
    ) {
      throw new UnauthorizedException('Invalid internal signature');
    }

    const now = Date.now();
    if (Math.abs(now - Number(timestamp)) > 5 * 60 * 1000) {
      throw new UnauthorizedException('Request expired');
    }

    req.user = {
      user_id: userId,
      school_id: schoolId,
    };

    return true;
  }
}
