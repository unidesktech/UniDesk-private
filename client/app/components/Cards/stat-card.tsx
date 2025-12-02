import { StyleConfig } from "@/app/models/resusable.mode";
import React from "react";
export interface StatItem {
  label: string;
  value: string | number;
  icon: React.ElementType;
  bg?: string;
  color?: string;
}
export interface StatCardProps {
  item: StatItem;
  styles?: {
    lableStyles?: StyleConfig;
    IconContainerStyle?: StyleConfig;
    IconStyle?: StyleConfig;
    valueStyle?: StyleConfig;
  };
}

const StatCard: React.FC<StatCardProps> = ({ item, styles = {} }) => {
  const {
    label,
    value,
    icon: Icon,
    bg = "bg-gray-100",
    color = "text-gray-700",
  } = item;

  return (
    <div className="bg-white w-full rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span
          style={styles?.lableStyles?.inlineStyles || {}}
          className={`text-sm text-gray-600 ${styles?.lableStyles?.className}`}
        >
          {label}
        </span>
        <div
          style={styles?.IconContainerStyle?.inlineStyles || {}}
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${bg} ${styles?.IconContainerStyle?.className}`}
        >
          <Icon
            style={styles?.IconStyle?.inlineStyles || {}}
            className={`w-5 h-5 ${color} ${styles?.IconStyle?.className}`}
          />
        </div>
      </div>
      <p
        style={styles?.valueStyle?.inlineStyles || {}}
        className={`text-3xl text-gray-900 ${styles?.valueStyle?.className}`}
      >
        {value}
      </p>
    </div>
  );
};

export default StatCard;
