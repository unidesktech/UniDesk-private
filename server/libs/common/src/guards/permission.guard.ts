import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_METADATA_KEY } from '../permissions/permission.decorator';
import { PermissionResolverService } from '../permissions/permission-resolver.service';
import { AuthenticatedRequest } from '@app/dto/types/request';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionResolver: PermissionResolverService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.get<string>(
      PERMISSION_METADATA_KEY,
      context.getHandler(),
    );

    if (!requiredPermission) return true;

    const request: AuthenticatedRequest = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user?.user_id || !user?.school_id) {
      throw new ForbiddenException('Invalid user context');
    }

    const allowed = await this.permissionResolver.hasPermission(
      user.user_id,
      user.school_id,
      requiredPermission,
    );

    if (!allowed) {
      throw new ForbiddenException(`Permission denied: ${requiredPermission}`);
    }

    return true;
  }
}
