import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { verifyAccessToken } from '../utils/Token';
import { Request } from 'express';

interface AuthenticatedUser {
  user_id: string;
  name: string | null;
  email: string | null;
  profile_photo_url: string | null;
  user_code: string;
}

interface AuthenticatedRequest extends Request {
  cookies: Record<string, unknown>;
  user?: AuthenticatedUser;
}

function getCookie(req: AuthenticatedRequest, key: string): string | undefined {
  const raw = req.cookies?.[key];
  return typeof raw === 'string' ? raw : undefined;
}

function getBearerToken(req: AuthenticatedRequest): string | undefined {
  const auth = req.headers.authorization;
  if (typeof auth === 'string' && auth.startsWith('Bearer ')) {
    return auth.substring(7);
  }
  return undefined;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: AuthenticatedRequest = context.switchToHttp().getRequest();

    const token = getCookie(req, 'accessToken') ?? getBearerToken(req);

    if (!token) {
      throw new UnauthorizedException('Access token missing');
    }

    const decodedUnknown = verifyAccessToken(token);

    if (!decodedUnknown || typeof decodedUnknown !== 'object') {
      throw new UnauthorizedException('Invalid token structure');
    }

    const decoded = decodedUnknown;

    if (!decoded.userId) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.prisma.users.findFirst({
      where: {
        user_id: decoded.userId,
        is_deleted: false,
      },
      select: {
        user_id: true,
        name: true,
        email: true,
        profile_photo_url: true,
        user_code: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    req.user = user;

    return true;
  }
}
