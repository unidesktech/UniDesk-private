import { CSSProperties, ForwardRefExoticComponent, RefAttributes } from "react";
import { StyleConfig } from "./resusable.model";
import { LucideProps } from "lucide-react";
import { ModuleItems } from "../components/ImgModule/img-module";
import { IconCardProps } from "../components/Cards/icon-card";
import { TeamCardProps } from "../components/Cards/team-card";
import { FaqItem } from "../components/FAQAccordion/faq-accordion";

type featureSectionItem = IconCardProps | ModuleItems | TeamCardProps | FaqItem;
interface badgesProp {
  label: string;
  color: string;
}
export interface featureConfigProps {
  title?: string;
  desc?: string;
  image?: string;
  styles?: StyleConfig;
  badges: badgesProp[];
  sections: Array<{
    type: "imgModule" | "comparison-table" | "card" | "accordian";
    cardType?: "iconcard" | "teamcard";
    title?: string;
    title2?: string;
    desc?: string;
    headers?: {
      [key: string]: string | undefined;
    };
    columns?: {
      key?: string;
      label?: string;
      highlight?: boolean;
      color?: string;
    }[];
    rows?: {
      feature?: string;
      desc?: string;
      values?: {
        [key: string]: string | undefined;
      };
    }[];
    badges?: badgesProp[];
    items?: featureSectionItem[];
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
