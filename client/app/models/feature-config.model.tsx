import { IconType } from "./types/icon.type";

export interface IconCardItem {
  icon: IconType;
  title: string;
  description: string;
  styles?: { classNames: string; inlineStyles?: string };
}

export interface ImageModuleItem {
  title: string;
  subtitle: string;
  image: string;
  points?: string[];
  reversed?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface StatsItem {
  icon: IconType;
  value: string;
  label: string;
  color: string;
}

export interface PremiumFeatureItem {
  icon: IconType;
  title: string;
  description: string;
  bgColor: string;
}

export interface IconCardSection {
  type: "iconcard";
  title: string;
  title2?: string;
  description: string;
  items: IconCardItem[];
  styles: {
    classNames?: string;
    inlineStyles?: string;
  };
}

export interface ImageModuleSection {
  type: "imgModule";
  items: ImageModuleItem[];
  styles?: {
    containerStyles?: {
      inlineStyles?: string;
      classNames?: string;
    };
  };
}

export interface PremiumFeatureSection {
  type: "premium-feature";
  badges?: { label: string; color: string }[];
  title: string;
  description: string;
  styles: {
    classNames?: string;
    inlineStyles?: string;
    itemStyles?: { classNames?: string; inlineStyles?: string };
  };
  items: PremiumFeatureItem[];
}

export interface StatsSection {
  type: "stats";
  title: string;
  description: string;
  styles: {
    inlineStyles?: string;
    classNames?: string;
  };
  items: StatsItem[];
}

export interface ComparisonTableSection {
  type: "comparison-table";
  title: string;
  description: string;
  styles: {
    inlineStyles?: string;
    classNames?: string;
    itemStyles?: { inlineStyles?: string; classNames?: string };
  };
  headers: {
    feature: string;
    ours: string;
    traditional: string;
  };
  columns: Array<{
    key?: string;
    label?: string;
    highlight?: boolean;
    color?: string;
  }>;
  rows: Array<{
    feature: string;
    description: string;
    values: { ours?: string; traditional?: string };
  }>;
  items: [];
}

export interface AccordionSection {
  type: "accordian";
  title: string;
  description: string;
  items: FaqItem[];
  styles?: {
    inlineStyles?: string;
    classNames?: string;
  };
}

export interface CtaSection {
  type: "cta-section";
  title: string;
  subtitle: string;
  primaryButton: {
    label: string;
    link: string;
  };
  secondaryButton: {
    label: string;
    link: string;
  };
  highlights: { label: string }[];
  styles: {
    className?: string;
    inlineStyle?: string;
  };
}

export type FeatureSection =
  | IconCardSection
  | ImageModuleSection
  | PremiumFeatureSection
  | StatsSection
  | ComparisonTableSection
  | AccordionSection
  | CtaSection;

export interface featureConfigType {
  title: string;
  description: string;
  image: string;
  styles: {
    inlineStyles: string;
    classNames: string;
  };
  badges?: { label: string; color: string }[];
  sections: FeatureSection[];
}
