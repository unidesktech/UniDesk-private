import {
  SIDEBAR_DEFINITION,
  SidebarDefinitionItem,
} from '@app/common/constants/sidebar.defination';
import { PermissionResolverService } from '@app/common/permissions/permission-resolver.service';
import { SidebarItem } from '@app/dto/common.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SidebarService {
  constructor(private readonly permissionResolver: PermissionResolverService) {}

  async getSidebar(userId?: string, schoolId?: string): Promise<SidebarItem[]> {
    const result: SidebarItem[] = [];

    if (!userId || !schoolId) {
      return result;
    }

    for (const item of SIDEBAR_DEFINITION) {
      const resolved = await this.resolveItem(item, userId, schoolId);

      if (resolved) {
        result.push(resolved);
      }
    }

    return result;
  }

  private async resolveItem(
    item: SidebarDefinitionItem,
    userId: string,
    schoolId: string,
  ): Promise<SidebarItem | null> {
    if (!item.children || item.children.length === 0) {
      const allowed = await this.hasAnyPermission(
        item.permissions,
        userId,
        schoolId,
      );

      if (!allowed) return null;

      return {
        key: item.key,
        label: item.label,
        icon: item.icon,
        path: item.path,
      };
    }

    const children: SidebarItem[] = [];

    for (const child of item.children) {
      const resolvedChild = await this.resolveItem(child, userId, schoolId);

      if (resolvedChild) {
        children.push(resolvedChild);
      }
    }

    if (children.length === 0) return null;

    return {
      key: item.key,
      label: item.label,
      icon: item.icon,
      children,
    };
  }

  private async hasAnyPermission(
    permissions: string[] | undefined,
    userId: string,
    schoolId: string,
  ): Promise<boolean> {
    if (!permissions || permissions.length === 0) {
      return false;
    }

    for (const permission of permissions) {
      const allowed = await this.permissionResolver.hasPermission(
        userId,
        schoolId,
        permission,
      );

      if (allowed) return true;
    }

    return false;
  }
}
