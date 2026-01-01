import { useCallback } from "react";
import { useAppSelector } from "../store/hooks";

export function usePermissionChecker() {
  const permissionMap = useAppSelector(
    (state) => state.app.permission
  );

  const can = useCallback(
    (
      permissions: string[] | string,
      mode: "all" | "any" = "all"
    ): boolean => {
      if (!permissions || permissions.length === 0) return true;
      if (!permissionMap) return false;

      const list = Array.isArray(permissions)
        ? permissions
        : [permissions];

      if (mode === "any") {
        return list.some((p) => permissionMap[p]);
      }

      return list.every((p) => permissionMap[p]);
    },
    [permissionMap]
  );

  return { can };
}
