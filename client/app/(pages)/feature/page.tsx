"use client";
import React from "react";
import { featureConfig } from "../../config/features.config";
import { Sparkles, Check, X } from "lucide-react";
import { DynamicRenderer } from "@/app/utils/dynamic-render";

export default function FeaturesPage() {
  const config = featureConfig();

  return (
    <div className="min-h-screen bg-white">
      {/* hero section */}
      <div
        className={config.styles?.className}
        style={config.styles?.inlineStyles}
      >
        <div className="max-w-7xl mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-3xl md:text-5xl text-gray-900 mb-6 text-left">
              {config.title}
            </h1>

            <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-8 text-left">
              {config.desc}
            </p>

            <div className="flex flex-wrap gap-4 text-sm">
              {config.badges?.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-gray-200 shadow-sm"
                >
                  <div className={`w-2 h-2 rounded-full ${badge.color}`} />
                  <span className="text-gray-700">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 overflow-hidden">
            <img
              src={config.image}
              alt={config.title}
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      </div>
      {config.sections.map((section, i) => {
        return (
          <section
            key={i}
            style={section?.styles?.containerStyles?.inlineStyles || {}}
            className={section?.styles?.containerStyles?.className}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
              {/* title desc */}
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
              {i < 5 && <DynamicRenderer config={section} index={i} key={i} />}
              {section.type === "comparison-table" && (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="grid grid-cols-3 bg-sky-50/70 px-6 py-4 text-sm font-medium text-gray-500">
                    <div className="px-5 py-3 text-left">
                      {section.headers?.feature}
                    </div>
                    {section.columns?.map((col) => (
                      <div key={col.key} className="flex justify-center">
                        <span
                          className={`px-5 py-3 rounded-sm font-semibold ${
                            col.key === "ours"
                              ? "bg-linear-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded-xl"
                              : null
                          }`}
                        >
                          {section?.headers?.[col.key ?? ""] || col.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="divide-y divide-gray-100">
                    {section.rows?.map((row, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-3 px-6 py-4 items-center hover:bg-sky-50/40 transition"
                      >
                        <div className="text-left">
                          <div className="font-medium text-gray-900">
                            {row.feature}
                          </div>
                          <div className="text-sm text-gray-500">
                            {row.desc}
                          </div>
                        </div>
                        {section.columns?.map((col) => {
                          const value = row?.values?.[col.key ?? ""];
                          const isCheck = value === "check";

                          return (
                            <div key={col.key} className="flex justify-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center
                    ${
                      isCheck
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                              >
                                {isCheck ? (
                                  <Check className="w-4 h-4" />
                                ) : (
                                  <X className="w-4 h-4" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {i === 5 && (
                <DynamicRenderer config={section} index={i} key={i} />
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
