"use client";
import React from "react";
import { featureConfig } from "../../config/features.config";
import { Sparkles, Check, X } from "lucide-react";
import { DynamicRenderer } from "@/app/utils/dynamic-render";

export default function FeaturesPage() {
  const config = featureConfig();

  return (
    <div>
      <div
        className={`min-h-screen ${config.styles.classNames} ${config.styles.inlineStyles}`}
      >
        <div className="max-w-7xl mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-5xl text-gray-900 mb-6 text-left">
              {config.title}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-8 text-left">
              {config.description}
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

          <div>
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 overflow-hidden">
              <img
                src={config.image}
                alt={config.title}
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {config.sections.map((section, index) => {
        switch (section.type) {
          case "iconcard":
            return (
              <section
                key={index}
                className={`py-24 bg-linear-to-b from-white to-gray-50 `}
              >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl text-gray-900 mb-4">
                      {section.title}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                      {section.description}
                    </p>
                  </div>
                  {section.type && (
                    <DynamicRenderer config={section} index={index} />
                  )}
                </div>
              </section>
            );

          case "imgModule":
            return (
              <DynamicRenderer key={index} config={section} index={index} />
            );

          case "premium-feature":
            return (
              <section
                key={index}
                className={`py-24 ${section.styles.classNames} ${section.styles.inlineStyles}`}
              >
                {section.badges && (
                  <div className="mb-4 flex justify-center">
                    {section.badges.map((b, idx) => (
                      <span
                        key={idx}
                        className={`
                          px-4 py-2 rounded-full text-sm font-medium 
                          border shadow-sm flex items-center gap-2
                          text-purple-600
                          ${b.color}
                        `}
                      >
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        {b.label}
                      </span>
                    ))}
                  </div>
                )}

                <div className="text-center mb-16">
                  <h2 className="text-4xl text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    {section.description}
                  </p>
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
                  {section.items.map((item, i) => {
                    return (
                      <div
                        key={i}
                        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-left hover:-translate-y-1 hover:shadow-xl transition"
                      >
                        <div
                          className="w-15 h-15 rounded-xl flex items-center justify-center mb-4"
                          style={{ backgroundColor: item.bgColor }}
                        >
                            <item.icon className="w-8 h-8 text-white" />
                        </div>

                        <h3 className="text-2xl font-normal text-gray-900 mb-3 text-left">
                          {item.title}
                        </h3>

                        <p className="text-gray-600 text-left">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            );

          case "stats":
            return (
              <section
                key={index}
                className={`text-center ${section.styles.classNames} ${section.styles.inlineStyles}`}
              >
                <h2 className="text-4xl font-semibold text-gray-900 mb-3">
                  {section.title}
                </h2>
                <p className="text-gray-600 text-lg mb-14">
                  {section.description}
                </p>

                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8">
                  {section.items.map((stat, i) => {
                    return (
                      <div
                        key={i}
                        className="p-8 rounded-2xl bg-white shadow-lg border hover:shadow-xl transition hover:-translate-y-2 text-left"
                      >
                        <div
                          className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center mb-4`}
                        >
                         <stat.icon className="w-7 h-7 text-white" />
                        </div>

                        <h3 className="text-3xl font-semibold text-gray-900">
                          {stat.value}
                        </h3>
                        <p className="text-gray-600">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            );

          case "comparison-table":
            return (
              <section
                key={index}
                className={`py-24 ${section.styles.classNames} ${section.styles.inlineStyles}`}
              >
                <div className="max-w-6xl mx-auto px-4">
                  <h2 className="text-4xl font-semibold text-center mb-2">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 text-center mb-10">
                    {section.description}
                  </p>

                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="grid grid-cols-3 bg-sky-50/70 px-6 py-4 text-sm font-medium text-gray-500">
                      <div className=" px-5 py-3 text-left">
                        {section.headers?.feature}
                      </div>
                      {section.columns?.map((col) => (
                        <div key={col.key} className="flex justify-center">
                          <span
                            className={`px-5 py-3 rounded-sm font-semibold
                        ${col.highlight ? `${col.color} text-white` : ""}`}
                          >
                            {section.headers?.[col.key] || col.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="divide-y divide-gray-100">
                      {section.rows?.map((row, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-3 px-6 py-4 items-center hover:bg-sky-50/40 transition"
                        >
                          <div className="text-left">
                            <div className="font-medium text-gray-900">
                              {row.feature}
                            </div>
                            <div className="text-sm text-gray-500">
                              {row.description}
                            </div>
                          </div>

                          {section.columns?.map((col) => {
                            const value = row.values[col.key];
                            const isCheck = value === "check";

                            return (
                              <div
                                key={col.key}
                                className="flex justify-center"
                              >
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
                </div>
              </section>
            );

          case "accordian":
            return (
              <section
                key={index}
                className={`py-24 ${section.styles?.classNames || ""} ${
                  section.styles?.inlineStyles || ""
                }`}
              >
                <div className="max-w-4xl mx-auto px-6">
                  {section.title && (
                    <div className="text-center mb-12">
                      <h2 className="text-4xl font-semibold text-gray-900 mb-4">
                        {section.title}
                      </h2>
                      {section.description && (
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                          {section.description}
                        </p>
                      )}
                    </div>
                  )}
                  <DynamicRenderer config={section} index={index} />
                </div>
              </section>
            );
          case "cta-section":
            return (
              <section
                key={index}
                className={`${section.styles.className} ${section.styles.inlineStyle}`}
              >
                <div className="max-w-4xl mx-auto px-6 text-center">
                  <h2 className="text-5xl font-bold mb-6 leading-tight">
                    {section.title}
                  </h2>

                  <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed">
                    {section.subtitle}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                    {section.primaryButton?.label && (
                      <a
                        href={section.primaryButton.link}
                        className="bg-white text-blue-700 font-semibold py-4 px-10 rounded-2xl text-lg shadow-lg hover:scale-105 transition inline-flex items-center gap-2 hover:shadow-xl min-w-[200px] justify-center"
                      >
                        {section.primaryButton.label}
                        <span className="text-xl">→</span>
                      </a>
                    )}

                    {section.secondaryButton?.label && (
                      <a
                        href={section.secondaryButton.link}
                        className="bg-transparent border-2 border-white text-white font-semibold py-4 px-10 rounded-2xl text-lg hover:bg-white hover:text-blue-700 transition inline-flex items-center gap-2 min-w-[200px] justify-center"
                      >
                        {section.secondaryButton.label}
                        <span className="text-xl">→</span>
                      </a>
                    )}
                  </div>

                  <div className="flex flex-wrap justify-center gap-8 mt-12">
                    {section.highlights?.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-white text-base opacity-90"
                      >
                        <span className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          ✓
                        </span>
                        {h.label}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
