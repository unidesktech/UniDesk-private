"use client";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { getColorClasses } from "@/app/utils/maping";

interface CategoryCardProps {
  id?: string;
  name: string;
  desc: string;
  icon: React.ElementType;
  color?: string;
  articles_count: number;
  onClick: (faq_id: string) => void;
}

export function CategoryCard({
  id,
  name,
  desc,
  icon: Icon,
  articles_count,
  color = "blue",
  onClick,
}: CategoryCardProps) {
  const colors = getColorClasses(color);
  const [hover, setHover] = useState(false)
  return (
    <Card
      onClick={() => onClick(id || "#")}
      className="border border-gray-200/50 dark:border-gray-700/50 shadow-lg dark:shadow-gray-900/50 cursor-pointer hover:scale-105 transition-all"
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
    >
      <CardContent className="px-6 py-1">
        <div
          className={`w-14 h-14 rounded-2xl ${colors.icon} flex items-center justify-center mb-4 shadow-lg ${hover && "scale-105"} transition-transform`}
        >
          <Icon className={`w-7 h-7 text-white ${hover && "scale-105"} transition-transform`} />
        </div>
        <h3 className="text-gray-900 dark:text-white mb-2">{name}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{desc}</p>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700">
          <span className={`${colors.text}`}>{articles_count} articles</span>
        </div>
      </CardContent>
    </Card>
  );
}