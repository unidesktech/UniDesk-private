import { SetMetadata } from '@nestjs/common';

export const PERMISSION_METADATA_KEY = 'required_permission';

/**
 * Usage:
 * @RequirePermission('attendance.page.view')
 */
export const RequirePermission = (permissionKey: string) =>
  SetMetadata(PERMISSION_METADATA_KEY, permissionKey);
