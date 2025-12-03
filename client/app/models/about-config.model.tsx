import { CSSProperties, ForwardRefExoticComponent, RefAttributes } from "react";
import { IconLink, StyleConfig } from "./resusable.mode";
import { LucideProps } from "lucide-react";

export interface aboutConfigProps {
  title?: string;
  description?: string;
  image?: string;
  styles?: StyleConfig;
  sections: Array<{
    type: "hero" | "journy" | "card" | "culture";
    cardType?: "iconcard" | "teamcard";
    title?: string;
    title2?: string;
    desc?: string;
    img?: string;
    heading?: string;
    subtitle?: string;
    items?: AboutSectionItem[];
    styles?: {
      titleStyles?: StyleConfig;
      containerStyles?: StyleConfig;
      imgContainerStyles?: StyleConfig;
      imgStyles?: StyleConfig;
      descStyles?: StyleConfig;
      inlineStyles?: CSSProperties;
      className?: string;
    };
  }>;
}

export type AboutSectionItem =
  | {
      year: string;
      title: string;
      description: string;
      icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
      color: string;
    }
  | {
      title: string;
      desc: string;
      Icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
      styles: {
        CardStyle?: StyleConfig;
        IconContainerStyle?: StyleConfig;
        IconStyle?: StyleConfig;
        TitleStyle?: StyleConfig;
      };
    }
  | {
      name?: string;
      role?: string;
      bio?: string;
      icons?: IconLink[];
      AvatarIcon?: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
      styles?: {
        avatarStyles?: StyleConfig;
        cardContentStyles?: StyleConfig;
        avatarIconStyles?: StyleConfig;
        titleStyles?: StyleConfig;
        roleStyles?: StyleConfig;
        bioStyles?: StyleConfig;
        iconContainerStyles?: StyleConfig;
        card?: StyleConfig;
      };
    }
  | {
      icon: React.ElementType;
      href?: string;
      label?: string;
    };
