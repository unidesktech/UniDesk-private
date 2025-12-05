import React, { CSSProperties } from "react";
import IconCard from "./icon-card";
import StatCard from "./stat-card";
import TestimonialCard from "./testimonial-card";
import { barData, lineData } from "@/app/models/chart.model";
import TeamCard from "./team-card";

interface CardRendererProps {
  config: {
    type: string;
    cardType?: string;
    items?: any[];
    lineData?: lineData[];
    barData?: barData[];
    features?: string[];
    styles?: {
      inlineStyles?: CSSProperties | undefined;
      className?: string;
    };
  };
}

const CardRenderer: React.FC<CardRendererProps> = ({ config }) => {
  switch (config?.cardType?.toLowerCase()) {
    case "iconcard":
      return (
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${config?.styles?.className}`}
          style={config.styles?.inlineStyles || {}}
        >
          {(config.items || []).map((item, i) => (
            <IconCard
              key={i}
              Icon={item?.Icon || item?.icon}
              title={item?.title}
              desc={item?.desc}
              styles={item?.styles}
            />
          ))}
        </div>
      );
    case "testimonial":
      return (
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${config?.styles?.className}`}
          style={config.styles?.inlineStyles || {}}
        >
          {(config.items || []).map((item, i) => (
            <TestimonialCard
              key={i}
              name={item.name}
              quote={item.quote}
              role={item.role}
              rating={item.rating}
              img={item.rating}
            />
          ))}
        </div>
      );
    case "statcard":
      return (
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${config?.styles?.className}`}
          style={config.styles?.inlineStyles || {}}
        >
          {(config.items || []).map((item, i) => (
            <StatCard key={i} item={item} styles={item.styles} />
          ))}
        </div>
      );
    case "teamcard":
      return (
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${config?.styles?.className}`}
          style={config.styles?.inlineStyles || {}}
        >
          {(config.items || []).map((item, i) => (
            <TeamCard
              key={i}
              bio={item.bio}
              name={item.name}
              role={item.role}
              AvatarIcon={item.AvatarIcon}
              icons={item.icons}
              img={item.img}
              styles={item.styles}
            />
          ))}
        </div>
      );

    default:
      return <p>Invalid card type!</p>;
  }
};

export default CardRenderer;
