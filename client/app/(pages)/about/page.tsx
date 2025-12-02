"use client";
import { aboutConfig } from "@/app/config/about.config";
import { aboutConfigProps } from "@/app/models/about-config.model";
import { DynamicRenderer } from "@/app/utils/dynamic-render";
import React from "react";

const Page: React.FC = () => {
  const config: aboutConfigProps = aboutConfig;

  return (
    <div className="overflow-hidden bg-linear-to-b from-blue-50/50 via-white to-white pt-12">
      {config.sections.map((section, i) => {
        return (
          <section
            key={i}
            style={section?.styles?.containerStyles?.inlineStyles || {}}
            className={section?.styles?.containerStyles?.className}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              {/* title & desc */}
              {(section.title || section.desc) && (
                <div className="text-center mb-16">
                  {section.title && (
                    <h2
                      style={section?.styles?.titleStyles?.inlineStyles || {}}
                      className={`text-xl md:text-3xl lg:text-4xl text-gray-900 md:mb-4 ${section?.styles?.titleStyles?.className}`}
                    >
                      {section.title}{" "}
                      <span className="text-blue-600">{section.title2}</span>
                    </h2>
                  )}
                  {section.desc && (
                    <p
                      style={section?.styles?.descStyles?.inlineStyles || {}}
                      className={`text-sm md:text-xl text-gray-600 max-w-2xl mx-auto ${section?.styles?.descStyles?.className}`}
                    >
                      {section.desc}
                    </p>
                  )}
                </div>
              )}
              {/* heroSection */}
              {section.type === "hero" && (
                <div className="text-center max-w-4xl mx-auto mb-12">
                  <div
                    className={section?.styles?.imgContainerStyles?.className}
                  >
                    <img
                      src={section?.img}
                      className={section?.styles?.imgStyles?.className}
                    />
                  </div>
                </div>
              )}
              {/* journeySection */}
              {section.type === "journy" && (
                <div className="relative">
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-200 via-teal-200 to-blue-200 hidden lg:block" />

                  <div className="space-y-12">
                    {section?.items?.map((i, index) => {
                      const item = i as {
                        year: string;
                        title: string;
                        description: string;
                        icon: React.ElementType;
                        color: string;
                      };
                      return (
                        <div
                          key={index}
                          className={`flex flex-col lg:flex-row items-center gap-8 ${
                            index % 2 === 0
                              ? "lg:flex-row"
                              : "lg:flex-row-reverse"
                          }`}
                        >
                          <div className="flex-1 w-full lg:w-auto">
                            <div
                              className={`bg-white rounded-2xl border border-gray-200 shadow-lg p-8 hover:shadow-xl transition-shadow ${
                                index % 2 === 0
                                  ? "lg:ml-auto lg:mr-8"
                                  : "lg:mr-auto lg:ml-8"
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                <div
                                  className={`w-12 h-12 bg-linear-to-br ${item.color} rounded-xl flex items-center justify-center shrink-0`}
                                >
                                  <item.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-lg md:text-2xl text-blue-600 md:mb-2">
                                    {item.year}
                                  </div>
                                  <h3 className="text-sm md:text-xl text-gray-900 md:mb-2">
                                    {item.title}
                                  </h3>
                                  <p className="text-sm md:text-base text-gray-600">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="hidden lg:block w-4 h-4 bg-linear-to-br from-blue-500 to-teal-500 rounded-full border-4 border-white shadow-md shrink-0 absolute left-1/2 -translate-x-1/2" />
                          <div className="flex-1 hidden lg:block" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {section.type !== "hero" &&
                section.type !== "journy" &&
                i !== 8 && <DynamicRenderer config={section} index={i} />}

              {/*cultureSection */}
              {section.type! == "culture" && (
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative h-80 lg:h-auto">
                      <img
                        src={section.img}
                        alt="Team Culture"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 to-teal-600/20" />
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <h2 className="text-2xl md:text-4xl text-gray-900 mb-4">
                        {section.heading}
                      </h2>
                      <p className="md:text-xl text-gray-600 mb-8 leading-relaxed">
                        {section.subtitle}
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {section?.items?.map((i, index) => {
                          const item = i as {
                            icon: React.ElementType;
                            label: string;
                          };
                          return (
                            <div
                              key={index}
                              className="flex items-center gap-3 bg-liner-to-br from-blue-50 to-teal-50 rounded-xl p-4 border border-blue-100"
                            >
                              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center shrink-0">
                                <item.icon className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-sm md:text-base text-gray-900">
                                {item.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* chooseUsSection */}
              {section.type && i === 8 && (
                <DynamicRenderer config={section} index={i} />
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Page;
