"use client";

import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import { usePathname, useRouter } from "next/navigation";
import {
  excludeSidebarRoutes,
  generalRoutes,
  offerRoutes,
} from "./config/header-footer.config";
import Footer from "./components/Footer/Footer";
import { OfferFooter } from "./components/Footer/Offer-footer";
import Sidebar from "./components/Sidebar/sidebar";
import { isExcludedFromSidebar } from "./utils/routes.utils";
import { getStoreValue } from "./services/me.service";
import { useAppDispatch } from "./store/hooks";
import { setSchool, setUser } from "./store/app.slice";

const ClientLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const showHeader =
    generalRoutes.includes(pathName) || offerRoutes.includes(pathName);
  const hideSidebar = isExcludedFromSidebar(pathName, excludeSidebarRoutes);

  useEffect(() => {
    const fetchStoreValues = async () => {
      if (!hideSidebar) {
        const response = await getStoreValue();

        if (response.success) {
          dispatch(setUser(response.data.user));
          dispatch(setSchool(response.data.school));
        } else {
          router.push("/auth/login");
        }
      }
    };

    fetchStoreValues();
  }, [pathName]);
  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && <Header />}

      <div className="flex flex-1">
        {!hideSidebar && <Sidebar />}

        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>

      {generalRoutes.includes(pathName) && <Footer />}
      {offerRoutes.includes(pathName) && <OfferFooter />}
    </div>
  );
};

export default ClientLayout;
