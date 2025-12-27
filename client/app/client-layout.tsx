"use client";

import React from 'react'
import Header from './components/Header/Header';
import { usePathname } from 'next/navigation';
import { generalRoutes, offerRoutes } from './config/header-footer.config';
import Footer from './components/Footer/Footer';
import { Provider } from 'react-redux';
import { store } from './store';
import { OfferFooter } from './components/Footer/Offer-footer';
import Sidebar from './components/Sidebar/sidebar';

const ClientLayout = ({children}: Readonly<{
  children: React.ReactNode;
}>) => {
    const pathName = usePathname()
  return (
    <Provider store={store}>
    {(generalRoutes.includes(pathName) || offerRoutes.includes(pathName)) && (
        <Header />
      )}
      {!(generalRoutes.includes(pathName) || offerRoutes.includes(pathName)) && <Sidebar />}
      {children}
      {generalRoutes.includes(pathName) && <Footer />}
      {offerRoutes.includes(pathName) && <OfferFooter />}
    </Provider>
  )
}

export default ClientLayout