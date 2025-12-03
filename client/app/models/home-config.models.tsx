import { LucideProps } from "lucide-react";
import { CSSProperties, ForwardRefExoticComponent, RefAttributes } from "react";
import { barData, lineData } from "./chart.model";

export interface homeConfigProps {
  title?: string;
  description?: string;
  image?: string;
  styles?: {
    inlineStyles?: CSSProperties;
    classNames?: string;
  };

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
      titleStyles?: {
        inlineStyles?: CSSProperties;
        classNames?: string;
      };
      itemStyles?: {
        inlineStyles?: CSSProperties;
        classNames?: string;
      };
      containerStyles?: {
        inlineStyles?: CSSProperties;
        classNames?: string;
      };
      descStyles?: {
        inlineStyles?: CSSProperties;
        classNames?: string;
      };
      logoContainerStyles?: {
        inlineStyles?: CSSProperties;
        classNames?: string;
      };
      title2Styles?: {
        inlineStyles?: CSSProperties;
        classNames?: string;
      };
      inlineStyles?: CSSProperties;
      classNames?: string;
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
        classNames?: string;
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
        classNames?: string;
      };
    }
  | {
      type: "chart";
      title?: string;
      charts: number[];
      styles?: {
        containerStyles?: {
          inlineStyles?: CSSProperties;
          classNames?: string;
        };
        chartStyles?: {
          inlineStyles?: CSSProperties;
          classNames?: string;
        };
        barsStyles?: {
          inlineStyles?: CSSProperties;
          classNames?: string;
        };
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
      styles?: {
        inlineStyles?: CSSProperties;
        classNames?: string;
      };
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
