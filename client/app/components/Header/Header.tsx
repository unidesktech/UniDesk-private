"use client"

import { navConfig } from "@/app/config/header-footer.config";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import style from '../../styles/header-footer.module.css'
import { usePathname, useRouter } from "next/navigation";

interface headerItem {
    name: string;
    label: string;
    type: string;
    styles?: {
        className?: string;
    }
}

const Header = () => {
  const config = navConfig();

  const pathname = usePathname();
  const router = useRouter();
  
  const activePath = pathname.split("/")[1] || "home"

  const handleClick = (item: headerItem) => {
    switch(item.type){
        case "link": 
            router.push(item.name)
    }
  };
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer gap-2">
            <Image
              src={config.logo}
              alt="UniDesk"
              quality={100}
              width={150}
              height={150}
              onClick={() => router.push('/')}
            />
          </div>

          {/* Navigation  */}
          <nav className="hidden lg:flex items-center gap-8">
            {config.navLinks.items.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick(item)}
                className={`${config.navLinks.styles.className} ${item.name === activePath && style["nav-active"]}`}
              >
                {item.label}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {config.buttons.map((button, index) => (
              <Button
                key={index}
                onClick={() => {
                  handleClick(button);
                }}
                className={button.styles.className}
              >
                {button.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
