"use client";

import { SidebarItem } from "@/app/models/sidebar-config.model";
import { getSidebar } from "@/app/services/me.service";
import { useAppSelector } from "@/app/store/hooks";
import { brand } from "@/app/utils/constants";
import clsx from "clsx";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  UserCircle,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { resolveIcon } from "@/app/lib/icon-registry";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { FaBars } from "react-icons/fa6";
import { sidebarUserMenuItems } from "@/app/config/sidebar.config";
import { useHandleAction } from "@/app/hooks/use-handle-action";

const Sidebar = () => {
  const pathName = usePathname();
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<SidebarItem[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const user = useAppSelector((state) => state.app.user);
  const sidebarUserActions = sidebarUserMenuItems();
  const handleAction = useHandleAction();

  useEffect(() => {
    const fetchSidebarItems = async () => {
      const sidebarItems = await getSidebar();
      setMenuItems(sidebarItems);
    };
    fetchSidebarItems();
  }, [pathName]);

  const handleParentClick = (item: SidebarItem) => {
    if (item.children) {
      setOpenMenuId(openMenuId === item.key ? null : item.key);
      return;
    }
    if (item.path) router.push(item.path);
  };

  const handleChildClick = (path?: string) => {
    if (!path) return;
    router.push(path);
  };

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow"
      >
        <Menu />
      </button>

      <aside
        className={clsx(
          "hidden md:flex sticky z-10 top-0 h-screen bg-white border-r flex-col transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* HEADER */}
        <div
          className={clsx(
            "flex items-center px-4 py-4 border-b shrink-0",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          {!collapsed && (
            <h1 className="text-lg font-semibold tracking-tight">
              {brand.title}
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* MENU SCROLL AREA (ISOLATED) */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 py-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = resolveIcon(item.icon);
              const isOpen = openMenuId === item.key;
              const isActive = item.path && pathName.startsWith(item.path);

              return (
                <div key={item.key}>
                  <button
                    onClick={() => handleParentClick(item)}
                    className={clsx(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition",
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50",
                      collapsed && "justify-center"
                    )}
                  >
                    {Icon && <Icon className="w-5 h-5 shrink-0" />}
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left truncate">
                          {item.label}
                        </span>
                        {item.children && (
                          <ChevronDown
                            size={16}
                            className={clsx(
                              "transition-transform",
                              isOpen && "rotate-180"
                            )}
                          />
                        )}
                      </>
                    )}
                  </button>

                  {item.children && isOpen && !collapsed && (
                    <div className="ml-8 mt-1 space-y-1 border-l pl-3">
                      {item.children.map((child) => {
                        const ChildIcon = resolveIcon(child.icon);
                        const childActive = pathName === child.path;

                        return (
                          <button
                            key={child.key}
                            onClick={() => handleChildClick(child.path)}
                            className={clsx(
                              "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition",
                              childActive
                                ? "bg-gray-100 text-gray-900 font-medium"
                                : "text-gray-600 hover:bg-gray-50"
                            )}
                          >
                            <ChildIcon className="w-4 h-4 shrink-0" />
                            {child.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* FOOTER (NO OVERFLOW ANCESTOR) */}
        <div className="shrink-0 border-t px-3 py-2 bg-white">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-gray-100">
                {user?.profile_photo_url ? (
                  <Image
                    src={user.profile_photo_url}
                    alt="User"
                    height={32}
                    width={32}
                    className="rounded-full"
                  />
                ) : (
                  <UserCircle className="w-8 h-8 text-gray-400" />
                )}

                {!collapsed && (
                  <>
                    <div className="flex flex-col text-sm leading-tight">
                      <span className="font-medium truncate">{user?.name}</span>
                      <span className="text-xs text-gray-500 truncate">
                        {user?.role}
                      </span>
                    </div>
                    <FaBars className="ml-auto text-gray-500" />
                  </>
                )}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="right"
              align="start"
              sideOffset={12}
              collisionPadding={16}
              className="z-50 w-60 rounded-xl border border-gray-200 bg-white shadow-xl p-1"
            >
              <div className="px-3 py-2 rounded-lg bg-gray-50">
                <p className="text-sm font-semibold truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>

              <DropdownMenuSeparator className="my-1" />

              {sidebarUserActions.map((item, index) =>
                item.key === "separator" ? (
                  <DropdownMenuSeparator key={index} />
                ) : (
                  <DropdownMenuItem
                    key={index}
                    onClick={() =>
                      handleAction.handleAction(
                        item.action as "api" | "navigate",
                        item.actionValue,
                        ""
                      )
                    }
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                  >
                    <item.icon className="w-4 h-4 text-gray-500" />
                    {item.label}
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-64 h-full bg-white flex flex-col">
            {/* reuse same structure */}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
