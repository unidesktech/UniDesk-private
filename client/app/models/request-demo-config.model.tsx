import React from "react";
export type RequestDemoSectionType =
  | "HeroSection"
  | "requestForm"
  | "card"
  | "trustIcon";

export interface BaseSectionDto {
  type: RequestDemoSectionType;
}

export interface HeroSectionDto extends BaseSectionDto {
  type: "HeroSection";
  title: string;
  desc: string;
  points: string[];
  image: {
    src: string;
    alt: string;
  };
}
export interface RequestFormSectionDto extends BaseSectionDto {
  type: "requestForm";
  title: string;
  desc: string;
  form: {
    sections: unknown[];
    bottomText?: string;
  };
  helpSection?: {
    title: string;
    desc: string;
    items: {
      label: string;
      value: string;
      href: string;
    }[];
    button?: {
      label: string;
      action: string;
    };
    officeHours?: {
      label: string;
      value: string;
    };
  };
}
export interface CardSectionDto extends BaseSectionDto {
  type: "card";
  cardType: string,
  title?: string;
  title2?: string;
  desc?: string;
  styles?: {
    className?: string;
    titleStyles?: {
      className?: string;
      inlineStyles?: React.CSSProperties;
    };
    descStyles?: {
      className?: string;
      inlineStyles?: React.CSSProperties;
    };
  };
  items: unknown[];
}
export interface TrustedBySectionDto extends BaseSectionDto {
  type: "trustIcon";
  text: string;
  items: string[];
  testimonialText: string;
  testimonialName: string;
  testimonialPosition: string;
}
export type RequestDemoSectionDto =
  | HeroSectionDto
  | RequestFormSectionDto
  | CardSectionDto
  | TrustedBySectionDto;
export interface RequestDemoConfigDto {
  sections: RequestDemoSectionDto[];
}