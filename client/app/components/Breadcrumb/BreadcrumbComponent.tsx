"use client";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Crumb } from "@/app/models/breadcrumb.model";

export const BreadcrumbComponent = ({
  defaultRoute = { label: "Home", href: "/" },
}) => {
  const pathName = usePathname();
  const paths = pathName.split("/").filter(Boolean);
  const routes: Crumb[] = [defaultRoute];
  paths.forEach((p, i) => {
    const href = "/" + paths.slice(0, i + 1).join("/");
    routes.push({
      label: p.charAt(0).toUpperCase() + p.slice(1),
      href: i < paths.length - 1 ? href : undefined,
    });
  });
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {routes.map((route, index) => {
          const isLast = index === routes.length - 1;
          return (
            <BreadcrumbItem key={index}>
              {route.href && !isLast ? (
                <BreadcrumbLink asChild>
                  <Link
                    href={route.href}
                    className="text-gray-500 hover:text-primary text-xs md:text-base"
                  >
                    {route.label}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="text-primary font-semibold text-xs md:text-base">
                  {route.label}
                </BreadcrumbPage>
              )}

              {!isLast && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
