"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import { IconLink, StyleConfig } from "@/app/models/resusable.mode";



interface TeamCardProps {
  name: string;
  role: string;
  img?: string;
  bio: string;
  AvatarIcon?: React.ElementType;
  icons?: IconLink[];
  styles?: {
    card?: StyleConfig;
    cardContentStyles?: StyleConfig;
    titleStyles?: StyleConfig;
    roleStyles?: StyleConfig;
    bioStyles?: StyleConfig;
    avatarStyles?: StyleConfig;
    avatarIconStyles?: StyleConfig;
    iconContainerStyles?: StyleConfig;
  };
}

const TeamCard: React.FC<TeamCardProps> = ({
  img,
  name,
  role,
  bio,
  AvatarIcon,
  icons,
  styles,
}) => {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card
      className={`rounded-2xl border border-gray-200 shadow-xl hover:shadow-2xl transition-all p-8 ${
        styles?.card?.className || ""
      }`}
      style={styles?.card?.inlineStyles}
    >
      <CardContent className="p-0">
        <div
          className={`flex items-center gap-6 mb-6 ${styles?.cardContentStyles?.className}`}
          style={styles?.cardContentStyles?.inlineStyles}
        >
          <div
            className={`w-20 md:w-24 h-20 md:h-24 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden bg-primary text-white ${styles?.avatarStyles?.className}`}
            style={styles?.avatarStyles?.inlineStyles}
          >
            {img ? (
              <img
                src={img}
                alt={name}
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : AvatarIcon ? (
              <AvatarIcon
                className={`w-12 h-12 ${styles?.avatarIconStyles?.className}`}
              />
            ) : (
              <span className="text-3xl">{initials}</span>
            )}
          </div>

          <div className="flex-1">
            <h3
              className={`text-lg md:text-2xl text-gray-900 mb-1 ${
                styles?.titleStyles?.className || ""
              }`}
              style={styles?.titleStyles?.inlineStyles}
            >
              {name}
            </h3>

            {role && (
              <p
                className={`text-blue-600 mb-3 text-sm md:text-base${
                  styles?.roleStyles?.className || ""
                }`}
                style={styles?.roleStyles?.inlineStyles}
              >
                {role}
              </p>
            )}
            {icons && (
              <div
                className={`flex gap-2 ${styles?.iconContainerStyles?.className || ""}`}
                style={styles?.iconContainerStyles?.inlineStyles}
              >
                {icons.map((iconItem, index) => {
                  const IconComp = iconItem.icon;
                  return (
                    <a
                      key={index}
                      href={iconItem.href || "#"}
                      className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors"
                    >
                      <IconComp className="w-4 h-4 text-gray-600" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <p
          className={`text-gray-600 leading-relaxed text-sm md:text-base ${
            styles?.bioStyles?.className || ""
          }`}
          style={styles?.bioStyles?.inlineStyles}
        >
          {bio}
        </p>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
