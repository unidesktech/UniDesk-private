import { footerConfig } from "@/app/config/header-footer.config";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";

interface footerItem {
    name: string;
    label: string;
    icon?: IconType;
    path: string;
}

const Footer = () => {
  const config = footerConfig();
  const router = useRouter();

  const handleClick = (item: footerItem) => {
    router.push(item.path)
  }

  return (
    <div>
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src={config.logo}
                  alt="UniDesk"
                  quality={100}
                  width={150}
                  height={150}
                />
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {config.title}
              </p>
              <div className="flex gap-4">
                {config.socials.map((social, i) => (
                  <div
                    key={i}
                    onClick={() => handleClick(social)}
                    aria-label={social.label}
                    className="w-10 h-10 cursor-pointer bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>

                {config.categories.map((category,index)=> (
                    <div key={index}>
                        <h1 className="text-white mb-4 text-xl">{category.label}</h1>
                        <ul className="space-y-3">

                        {category.items.map((item, idx) => (
                            <li key={idx}>
                                <div onClick={() => handleClick(item)} className="text-gray-400 cursor-pointer hover:text-white transition-colors">
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
              <p className="text-gray-400 text-sm">
                © 2026 UniDesk. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                {
                    config.legals.map((legal,index)=> (
                        <div key={index} onClick={() => handleClick(legal)} className="text-gray-400 cursor-pointer hover:text-white transition-colors">{legal.label}</div>
                    ))
                }
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
