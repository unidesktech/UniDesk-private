import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { RedisCacheService } from 'apps/api-gateway/src/redis/redis-cache.service';
import { CACHE_VERSIONS } from 'cache-keys';

@Injectable()
export class PermissionResolverService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: RedisCacheService,
  ) {}

  private cacheKey(schoolId: string, userId: string) {
    return `perm:${CACHE_VERSIONS.PERMISSIONS}:${schoolId}:${userId}`;
  }

  async hasPermission(
    userId: string,
    schoolId: string,
    permissionKey: string,
  ): Promise<boolean> {
    const key = this.cacheKey(schoolId, userId);

    const cached = await this.cache.get<Record<string, boolean>>(key);

    if (cached) {
      return cached[permissionKey] ?? false;
    }

    const resolved = await this.resolveAllPermissions(userId, schoolId);

    await this.cache.set(key, resolved, 3600);

    return resolved[permissionKey] ?? false;
  }

  private async resolveAllPermissions(
    userId: string,
    schoolId: string,
  ): Promise<Record<string, boolean>> {
    const finalPermissions: Record<string, boolean> = {};

    const enabledModules = await this.prisma.school_modules.findMany({
      where: { school_id: schoolId, is_enabled: true },
      select: { module_id: true },
    });

    if (!enabledModules.length) return finalPermissions;

    const permissions = await this.prisma.permissions.findMany({
      where: {
        module_id: { in: enabledModules.map((m) => m.module_id) },
        is_active: true,
        is_deleted: false,
      },
    });

    const userOverrides = await this.prisma.user_permissions.findMany({
      where: { user_id: userId, is_active: true, is_deleted: false },
    });

    const overrideMap = new Map(
      userOverrides.map((p) => [p.permission_id, p.is_allowed]),
    );

    const roles = await this.prisma.user_roles.findMany({
      where: { user_id: userId, is_active: true, is_deleted: false },
      select: { role_id: true },
    });

    if (!roles.length) return finalPermissions;

    const rolePermissions = await this.prisma.role_permissions.findMany({
      where: { role_id: { in: roles.map((r) => r.role_id) } },
    });

    const roleMap = new Map(
      rolePermissions.map((p) => [p.permission_id, p.is_allowed]),
    );

    for (const perm of permissions) {
      finalPermissions[perm.permission_key] =
        overrideMap.get(perm.permission_id) ??
        roleMap.get(perm.permission_id) ??
        false;
    }

    return finalPermissions;
  }
}
