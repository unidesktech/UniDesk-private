"use client";
import { footerConfig } from "@/app/config/header-footer.config";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";

interface FooterItem {
  name: string;
  label: string;
  icon?: IconType;
  path: string;
}

const Footer = () => {
  const config = footerConfig();
  const router = useRouter();

  const handleClick = (item: FooterItem) => {
    router.push(item.path);
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 lg:pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row flex-wrap gap-12 lg:gap-24 mb-12 justify-between">
          {/* Brand Section */}
          <div className="flex-1 min-w-[250px] flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
              <Image
                src={config.logo}
                alt="UniDesk"
                quality={100}
                width={150}
                height={150}
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              {config.title}
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              {config.socials.map((social, i) => (
                <div
                  key={i}
                  onClick={() => handleClick(social)}
                  aria-label={social.label}
                  className="w-10 h-10 cursor-pointer bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-5 h-5 text-white" />
                </div>
              ))}
            </div>
          </div>

          {/* Category Sections */}
          {config.categories.map((category, index) => (
            <div
              key={index}
              className="flex-1 min-w-[140px] flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <h2 className="text-white mb-4 text-lg font-semibold">
                {category.label}
              </h2>
              <ul className="space-y-3">
                {category.items.map((item, idx) => (
                  <li key={idx}>
                    <div
                      onClick={() => handleClick(item)}
                      className="text-gray-400 cursor-pointer hover:text-white transition-colors"
                    >
                      {item.label}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2026 UniDesk. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 text-sm justify-center md:justify-end">
              {config.legals.map((legal, index) => (
                <div
                  key={index}
                  onClick={() => handleClick(legal)}
                  className="text-gray-400 cursor-pointer hover:text-white transition-colors"
                >
                  {legal.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;