import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Logo from "../assets/UniDesk_Logo.png";

export const generalRoutes = ['/', '/home', "/about", "/feature", "/pricing", "/demo"]

export const navConfig = () => {
  return {
    logo: Logo,
    navLinks: {
      styles: {
        className: "text-gray-600 hover:text-gray-900 transition-colors cursor-pointer",
      },
      items: [
        {
          name: "home",
          label: "Home",
          type: "link",
        },
        {
          name: "about",
          label: "About Us",
          type: "link",
        },
        {
          name: "feature",
          label: "Features",
          type: "link",
        },
        {
          name: "pricing",
          label: "Pricing",
          type: "link",
        },
        {
          name: "demo",
          label: "Demo",
          type: "link",
        },
      ],
    },
    buttons: [
      {
        name: "pricing",
        type: "link",
        label: "Get Started",
        styles: {
            className: "bg-blue-600 hover:bg-blue-700 text-white rounded-xl",

        }
      },
    ],
  };
};


export const footerConfig = () => {
    return {
        logo: Logo,
        title: "The complete school management platform trusted by 200+ schools worldwide. Simplify administration and focus on what matters most - education.",
        categories: [
            {
                name: "product",
                label: "Product",
                items: [
                    {
                        name: 'features',
                        label: "Features",
                        path: "feature",
                    },
                    {
                        name: 'pricing',
                        label: "Pricing",
                        path: "pricing",
                    },
                    {
                        name: 'casestudy',
                        label: "Case Study",
                        path: "case-study",
                    },
                    {
                        name: 'demo',
                        label: "Demo",
                        path: "demo",
                    },
                ]
            },
            {
                name: "company",
                label: "Company",
                items: [
                    {
                        name: 'aboutus',
                        label: "About Us",
                        path: "about-us",
                    },
                    {
                        name: 'career',
                        label: "Careers",
                        path: "careers",
                    },
                    {
                        name: 'blog',
                        label: "Blog",
                        path: "blog",
                    },
                ]
            },
            {
                name: "resources",
                label: "Resources",
                items: [
                    {
                        name: 'documentation',
                        label: "Documentation",
                        path: "documentation",
                    },
                    {
                        name: 'helpcenter',
                        label: "Help Center",
                        path: "help-center",
                    },
                ]
            },
            {
                name: "legal",
                label: "Legal",
                items: [
                    {
                        name: 'terms-of-use',
                        label: "Terms of use",
                        path: "terms-of-use",
                    },
                    {
                        name: 'privacy-policy',
                        label: "Privacy Policy",
                        path: "privacy-policy",
                    },
                    {
                        name: 'security',
                        label: "Security",
                        path: "security",
                    },
                    {
                        name: 'legal',
                        label: "Legal",
                        path: "legal",
                    },
                ]
            },
        ],
        socials: [
            {
                name: "twitter",
                label: "Twitter",
                icon: FaTwitter, 
                path: ""
            },
            {
                name: "linkedin",
                label: "Linkedin",
                icon: FaLinkedin, 
                path: ""
            },
            {
                name: "facebook",
                label: "Facebook",
                icon: FaFacebook, 
                path: ""
            },
            {
                name: "instagram",
                label: "Instagram",
                icon: FaInstagram, 
                path: ""
            },
        ],
        legals: [
            {
                name: 'privacy',
                label: "Privacy",
                path: ''
            },
            {
                name: 'terms',
                label: "Terms",
                path: ''
            },
            {
                name: 'cookies',
                label: "Cookies",
                path: ''
            },
        ]
    }
}