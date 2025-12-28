import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { RedisCacheService } from 'apps/api-gateway/src/redis/redis-cache.service';
import { CACHE_VERSIONS } from 'cache-keys';

@Injectable()
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

  async invalidateUser(userId: string, schoolId: string) {
    await this.cache.del(this.cacheKey(schoolId, userId));
  }

  private async resolveAllPermissions(
    userId: string,
    schoolId: string,
  ): Promise<Record<string, boolean>> {
    const finalPermissions: Record<string, boolean> = {};

    // Enabled modules for school
    const enabledModules = await this.prisma.school_modules.findMany({
      where: {
        school_id: schoolId,
        is_enabled: true,
      },
      select: {
        module_id: true,
      },
    });

    const enabledModuleIds = enabledModules.map((m) => m.module_id);
    if (!enabledModuleIds.length) return finalPermissions;

    // all permissions in enabled modules
    const permissions = await this.prisma.permissions.findMany({
      where: {
        module_id: { in: enabledModuleIds },
        is_active: true,
        is_deleted: false,
      },
    });

    // user overrides default permissions
    const userOverrides = await this.prisma.user_permissions.findMany({
      where: {
        user_id: userId,
        is_active: true,
        is_deleted: false,
      },
    });

    const userOverrideMap = new Map(
      userOverrides.map((p) => [p.permission_id, p.is_allowed]),
    );

    // user roles
    const userRoles = await this.prisma.user_roles.findMany({
      where: {
        user_id: userId,
        is_active: true,
        is_deleted: false,
      },
      select: {
        role_id: true,
      },
    });

    const roleIds = userRoles.map((r) => r.role_id);
    if (!roleIds.length) return finalPermissions;

    // role permissions
    const rolePermissions = await this.prisma.role_permissions.findMany({
      where: {
        role_id: { in: roleIds },
        is_active: true,
        is_deleted: false,
      },
    });

    const rolePermissionMap = new Map(
      rolePermissions.map((p) => [p.permission_id, p.is_allowed]),
    );

    // 🔹 6. Final resolution
    for (const perm of permissions) {
      if (userOverrideMap.has(perm.permission_id)) {
        finalPermissions[perm.permission_key] = userOverrideMap.get(
          perm.permission_id,
        )!;
      } else {
        finalPermissions[perm.permission_key] =
          rolePermissionMap.get(perm.permission_id) ?? false;
      }
    }

    return finalPermissions;
  }

  async invalidateUserPermissions(userId: string, schoolId: string) {
    await this.cache.del(this.cacheKey(schoolId, userId));
  }
}
