"use client";

import React from "react";
import { Button } from "../ui/button";
import { MoreVertical, LucideIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { usePermissionChecker } from "@/app/hooks/use-permission-checker";

export interface ActionItem {
  key: string;
  label?: string;
  icon?: LucideIcon;
  className?: string;
  type?: "separator";
  action?: any;
  actionValue?: string;
  actionUse?: "edit" | "add" | "delete";
  permissions: string[]
}

interface ActionButtonProps {
  config: ActionItem[];
  row?: any;
  handleAction?: (
    action: string,
    actionValue?: string,
    actionUse?: "view" | "edit" | "add" | "delete",
    row?: any
  ) => void;
}

const stop = (e: React.MouseEvent) => e.stopPropagation();

const ActionButton: React.FC<ActionButtonProps> = ({
  config,
  row,
  handleAction,
}) => {
  const { can } = usePermissionChecker();
  if (!config?.length) return null;


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" onClick={stop}>
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" onClick={stop}>
        {config.map((item, i) =>
          can(item.permissions) ? item.type === "separator" ? (
            <DropdownMenuSeparator key={`sep-${item.key}+i`} />
          ) : (
            <DropdownMenuItem
              key={i}
              className={item.className}
              onClick={() => 
                handleAction?.(
                  item.action!,
                  item.actionValue,
                  row,
                  item.actionUse!,
                )
              }
            >
              {item.icon && <item.icon className="w-4 h-4 mr-2" />}
              {item.label}
            </DropdownMenuItem>
          ) : <></>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionButton;
