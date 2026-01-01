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
  DropdownMenuLabel,
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

  const sidebarMenuItemsConfig = sidebarUserMenuItems();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<SidebarItem[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const user = useAppSelector((state) => state.app.user);

  const handleAction = useHandleAction();

  useEffect(() => {
    if (!user) {
      // router.push("/auth/login");
    }
  }, [user]);

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

    if (item.path) {
      router.push(item.path);
      setMobileOpen(false);
    }
  };

  const handleChildClick = (path?: string) => {
    if (!path) return;
    router.push(path);
    setMobileOpen(false);
  };

  console.log(menuItems);

  const SidebarContent = (
    <>
      <div
        className={clsx(
          "flex items-center px-4 py-4 border-b",
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
          className="hidden md:flex p-2 rounded-lg hover:bg-gray-100"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = resolveIcon(item.icon);
          const isOpen = openMenuId === item.key;
          const isActive = item.path && pathName.startsWith(item.path);

          return (
            <div key={item.key}>
              {/* Parent */}

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
                    <span className="flex-1 text-left">{item.label}</span>

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

              {/* Children */}
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
                        <ChildIcon className="w-4 h-4" />
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
      <div className="border-t px-3 py-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={clsx(
                "w-full flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-gray-100",
                collapsed && "justify-center"
              )}
            >
              {user?.profile_photo_url ? (
                <Image
                  src={user?.profile_photo_url}
                  alt="User"
                  height={40}
                  width={40}
                  quality={100}
                />
              ) : (
                <UserCircle className="w-8 h-8 text-gray-400" />
              )}

              {!collapsed && (
                <div className="text-sm text-left">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>
              )}
              <FaBars
                className={`text-xl font-bold ${
                  collapsed ? "hidden" : "ml-auto"
                }`}
              />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="right" align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium">{user?.name}</span>
                <span className="text-xs text-gray-500">{user?.email}</span>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            {sidebarMenuItemsConfig.map((item, index) =>
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
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow"
      >
        <Menu />
      </button>

      {/* Desktop Sidebar */}
      <aside
        className={clsx(
          "hidden md:flex h-screen bg-white border-r flex-col transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {SidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-64 bg-white h-full flex flex-col">
            {SidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
