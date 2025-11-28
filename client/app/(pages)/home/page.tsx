"use client";
import React, { useMemo } from "react";
import { homeConfig } from "@/app/config/home.config";
import { Button } from "@/app/components/ui/button";
import { DynamicRenderer } from "@/app/utils/DynamicRenderer";
import { homeConfigProps } from "@/app/models/homeConfig.models";

const HomePage: React.FC = () => {
  const config: homeConfigProps = useMemo(() => homeConfig(), []);
  return (
    <div className="relative overflow-hidden bg-linear-to-b from-blue-50/50 via-white to-white pt-32">
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute top-135 left-20 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl" />
      {/* hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 md:gap-16 items-center">
          {config.sections.map((section, index) => (
            <div key={index}>
              {section.type === "hero" && section.position === "left" && (
                <div className="space-y-5 md:space-y-8">
                  {section.icon && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/60 rounded-full border border-blue-200/50">
                      <section.icon className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-700 text-xs md:text-base">
                        {section.text}
                      </span>
                    </div>
                  )}
                  <h1 className="text-3xl md:text-4xl lg:text-6xl tracking-tight text-gray-900">
                    {section.title}{" "}
                    <span className="text-blue-600">{section.title2}</span>
                  </h1>
                  <p className="lg:text-xl text-gray-600 max-w-xl">
                    {section.desc}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    {section.items?.map((btn, i) =>
                      btn.type === "button" ? (
                        <Button
                          key={i}
                          variant={btn.variant}
                          className={btn.styles?.classNames}
                          onClick={btn.onClick}
                        >
                          {btn.title}
                          {btn.Icon && <btn.Icon className="w-5 h-5" />}
                        </Button>
                      ) : null
                    )}
                  </div>
                </div>
              )}
              {section.type === "hero" && section.position === "right" && (
                <div className="relative mt-8 md:mt-0">
                  <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 space-y-4">
                    <div className={`${section.styles?.classNames}`}>
                      <h3 className="text-gray-900 font-semibold md:text-lg">
                        {section.title}
                      </h3>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                    </div>
                    {section.items?.map((item, i) => {
                      if (item.type === "Stats") {
                        return (
                          <div key={i} className="grid grid-cols-2 gap-4">
                            {item.stat?.map((s, idx) => (
                              <div
                                key={idx}
                                className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                              >
                                <div
                                  className={`w-8 h-8 ${s.color} rounded-lg mb-2`}
                                />
                                <p className="text-xl md:text-2xl text-gray-900">
                                  {s.value}
                                </p>
                                <p className="text-xs md:text-sm text-gray-500">
                                  {s.label}
                                </p>
                              </div>
                            ))}
                          </div>
                        );
                      }
                      if (item.type === "chart") {
                        return (
                          <div
                            key={i}
                            className="bg-linear-to-br from-blue-50 to-teal-50 rounded-xl p-4 border border-blue-100"
                          >
                            <p className="text-xs md:text-sm text-gray-600 mb-3">
                              {item.title}
                            </p>
                            <div className="flex items-end gap-2 h-20">
                              {item.charts?.map((h, idx) => (
                                <div
                                  key={idx}
                                  className="flex-1 bg-linear-to-t from-blue-500 to-teal-400 rounded-t"
                                  style={{ height: `${h}%` }}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      }
                      if (item.type === "timeTable") {
                        return (
                          <div key={i} className="space-y-2">
                            <p className="text-xs md:text-sm text-gray-600">
                              {item.title}
                            </p>
                            {item.timeTables?.map((time, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                              >
                                <span className="text-xs md:text-sm text-gray-500">
                                  {time.time}
                                </span>
                                <span
                                  className={`px-3 py-1 rounded-md text-xs md:text-sm ${time.color}`}
                                >
                                  {time.subject}
                                </span>
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      {config.sections.map((section, i) => {
        if (section.type === "hero") return;
        return (
          <section
            key={i}
            style={section?.styles?.containerStyles?.inlineStyles || {}}
            className={section?.styles?.containerStyles?.classNames}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              {/* heading */}
              <div className="text-center mb-16">
                {section.title && (
                  <h2
                    style={section?.styles?.titleStyles?.inlineStyles || {}}
                    className={`text-2xl md:text-3xl lg::text-4xl text-gray-900 mb-4 ${section?.styles?.titleStyles?.classNames}`}
                  >
                    {section.title}{" "}
                    {section.title2 && (
                      <span
                        style={
                          section?.styles?.title2Styles?.inlineStyles || {}
                        }
                        className={`text-blue-600 ${section?.styles?.title2Styles?.classNames}`}
                      >
                        {section.title2}
                      </span>
                    )}
                  </h2>
                )}
                {section.desc && (
                  <p
                    style={section?.styles?.descStyles?.inlineStyles || {}}
                    className={`md:text-xl text-gray-600 max-w-2xl mx-auto ${section?.styles?.descStyles?.classNames}`}
                  >
                    {section.desc}
                  </p>
                )}
              </div>
              {/* trust logo */}
              {section.type === "trustLogos" && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                  {section.items?.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
                    >
                      <item.icon className="w-8 h-8 text-gray-600" />
                      <span className="text-xs text-gray-600 text-center">
                        {item?.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {section.type && <DynamicRenderer config={section} index={i} />}
              {section.type === "accordian" && (
                <div className="text-center mt-12">
                  <p className="text-gray-600 mb-4">Still have questions?</p>
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    Contact our support team →
                  </a>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default HomePage;
