import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { Card } from "../ui/card";
import { StyleConfig } from "@/app/models/resusable.model";
import { LucideProps } from "lucide-react";
import { IconType } from "@/app/models/types/icon.type";

export interface IconCardProps {
  Icon: IconType;
  title: string;
  desc: string;
  styles?: {
    CardStyle?: StyleConfig;
    IconContainerStyle?: StyleConfig;
    IconStyle?: StyleConfig;
    TitleStyle?: StyleConfig;
    DescStyle?: StyleConfig;
  };
}

const IconCard: React.FC<IconCardProps> = ({
  Icon,
  title,
  desc,
  styles = {},
}) => {
  return (
    <Card
      className={`p-6 border gap-2 border-gray-200 hover:border-blue-300 hover:shadow-lg 
      transition-all duration-300 bg-white rounded-xl group cursor-pointer 
      ${styles.CardStyle?.className || ""}`}
      style={styles.CardStyle?.inlineStyles}
    >
      <div
        className={`w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 
        group-hover:bg-blue-600 transition-colors ${
          styles.IconContainerStyle?.className || ""
        }`}
        style={styles.IconContainerStyle?.inlineStyles}
      >
        <Icon
          className={`w-6 h-6 text-blue-600 group-hover:text-white transition-colors 
          ${styles.IconStyle?.className || ""}`}
          style={styles.IconStyle?.inlineStyles}
        />
      </div>
      <h3
        className={`text-lg font-semibold text-gray-900 mb-2 ${
          styles.TitleStyle?.className || ""
        }`}
        style={styles.TitleStyle?.inlineStyles}
      >
        {title}
      </h3>
      <p
        className={`text-gray-600 ${styles.DescStyle?.className || ""}`}
        style={styles.DescStyle?.inlineStyles}
      >
        {desc}
      </p>
    </Card>
  );
};

export default IconCard;
