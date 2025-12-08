import { LucideProps } from "lucide-react";
import { CSSProperties, ForwardRefExoticComponent, RefAttributes } from "react";
import { barData, lineData } from "./chart.model";
import { StyleConfig } from "./resusable.model";

export interface homeConfigProps {
  title?: string;
  description?: string;
  image?: string;
  styles?: StyleConfig;
  sections: Array<{
    type:
      | "hero"
      | "trustLogos"
      | "card"
      | "dashboardmockup"
      | "imgModule"
      | "pricing"
      | "accordian"
      | "timeTable"
      | "chart"
      | "Stats";
    cardType?: "testimonial" | "iconCard";

    title?: string;
    title2?: string;
    desc?: string;
    position?: "left" | "right";
    icon?: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;

    styles?: {
      titleStyles?: StyleConfig;
      itemStyles?: StyleConfig;
      containerStyles?: StyleConfig;
      descStyles?: StyleConfig;
      logoContainerStyles?: StyleConfig;
      title2Styles?: StyleConfig;
      inlineStyles?: CSSProperties;
      className?: string;
    };

    text?: string;

    items?: HomeSectionItem[];

    lineData?: lineData[];
    barData?: barData[];
    features?: string[];
  }>;
}
export type HomeSectionItem =
  | {
      type: "button";
      title: string;
      Icon?: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
      onClick?: () => void;
      variant?:
        | "link"
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | null
        | undefined;
      styles?: {
        inlineStyles?: CSSProperties;
        className?: string;
      };
    }
  | {
      type: "Stats";
      stat: Array<{
        label: string;
        value: string;
        color?: string;
      }>;
      styles?: {
        inlineStyles?: CSSProperties;
        className?: string;
      };
    }
  | {
      type: "chart";
      title?: string;
      charts: number[];
      styles?: {
        containerStyles?: StyleConfig;
        chartStyles?: StyleConfig;
        barsStyles?: StyleConfig;
      };
    }
  | {
      type: "timeTable";
      title?: string;
      timeTables: Array<{
        time: string;
        subject: string;
        color?: string;
      }>;
      styles?: StyleConfig;
    }
  | {
      // merged small icon/name variants (keeps shape compact)
      icon?: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
      title?: string;
      desc?: string;
      name?: string;
    }
  | {
      type: "trustLogos";
      icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
      name?: string;
    }
  | {
      label: string;
      value: string;
      icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
      color?: string;
      bg?: string;
    }
  | {
      title: string;
      subtitle: string;
      image: string;
      points?: string[];
      reversed?: boolean;
    }
  | {
      name: string;
      role: string;
      image: string;
      quote: string;
      rating: number;
    }
  | {
      name: string;
      price: string;
      period: string;
      description: string;
      features: string[];
      highlighted?: boolean;
    }
  | {
      question: string;
      answer: string;
    };
