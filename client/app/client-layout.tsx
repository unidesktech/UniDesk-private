"use client";

import React from 'react'
import Header from './components/Header/Header';
import { usePathname } from 'next/navigation';
import { generalRoutes } from './config/header-footer.config';
import Footer from './components/Footer/Footer';

const ClientLayout = ({children}: Readonly<{
  children: React.ReactNode;
}>) => {
    const pathName = usePathname()
  return (
    <>
    {generalRoutes.includes(pathName) && <Header />}
    {children}
    {generalRoutes.includes(pathName) && <Footer />}
    </>
  )
}

export default ClientLayout