"use client";

import React from "react";
import Header from "./components/Header/Header";
import { usePathname } from "next/navigation";
import {
  excludeSidebarRoutes,
  generalRoutes,
  offerRoutes,
} from "./config/header-footer.config";
import Footer from "./components/Footer/Footer";
import { Provider } from "react-redux";
import { store } from "./store";
import { OfferFooter } from "./components/Footer/Offer-footer";
import Sidebar from "./components/Sidebar/sidebar";
import { isExcludedFromSidebar } from "./utils/routes.utils";

const ClientLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathName = usePathname();
  const showHeader =
    generalRoutes.includes(pathName) || offerRoutes.includes(pathName);
  const hideSidebar = isExcludedFromSidebar(pathName, excludeSidebarRoutes);
  return (
    <Provider store={store}>
      {showHeader && <Header />}

      {!hideSidebar && <Sidebar />}

      {children}

      {generalRoutes.includes(pathName) && <Footer />}
      {offerRoutes.includes(pathName) && <OfferFooter />}
    </Provider>
  );
};

export default ClientLayout;
