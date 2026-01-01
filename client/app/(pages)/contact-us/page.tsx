"use client";
import React from "react";
import * as Icons from "lucide-react";
import { contactConfig } from "../../config/contactUs.config";
import { DynamicRenderer } from "@/app/utils/dynamic-render";

export default function ContactPage() {

  const config = contactConfig(); 
  const HeroIcon = config.badge.icon; 

  return (
    <div className={`${config.styles.classNames} ${config.styles.inlineStyles} py-24`}>

      <div className="max-w-7xl mx-auto px-6  py-12 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Left Hero Content */}
        <div>
          {/* Badge */}
          <div className="flex items-center gap-2 mb-4">
            <HeroIcon className={`w-5 h-5 ${config.badge.color}`} />
            <span className={`text-sm font-semibold ${config.badge.color}`}>
              {config.badge.label}
            </span>
          </div>

          {/* Title & Description */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {config.title}
          </h1>

          <p className="text-md text-gray-600 mb-8">{config.description}</p>

          {/* Stats */}
          <div className="flex gap-10">
            {config.stats.map((s, i) => (
              <div key={i}>
                <p className="text-xl font-bold text-blue-600">{s.value}</p>
                <p className="text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Hero Visual */}
        <div className="relative">

          {/* Floating Icons */}
          <div className="absolute -top-6 -right-6 bg-blue-600 text-white 
              w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
            <Icons.Sparkles className="w-6 h-6" />
          </div>

          <div className="absolute -bottom-6 -left-6 bg-pink-500 text-white 
              w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
            <Icons.MessageCircle className="w-6 h-6" />
          </div>

          {/* Chat Illustration */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200 space-y-6">

            {/* Chat bubble 1 */}
            <div className="p-4 bg-gray-50 rounded-xl flex gap-3 items-center">
              <div className="bg-blue-50 p-3 rounded-full">
                <Icons.MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>

            {/* Chat bubble 2 */}
            <div className="p-4 bg-blue-50 rounded-xl flex gap-3 justify-between items-center">
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-blue-200 rounded w-5/6"></div>
                <div className="h-3 bg-blue-200 rounded w-3/4"></div>
              </div>
              <div className="bg-white p-3 rounded-full border shadow">
                <Icons.Mail className="w-5 h-5 text-blue-600" />
              </div>
            </div>

            {/* Chat bubble 3 */}
            <div className="p-4 bg-gray-50 rounded-xl flex gap-3 items-center">
              <div className="bg-blue-50 p-3 rounded-full">
                <Icons.Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>

          </div>
        </div>
      </div>


      {config.sections.map((section, index) => {
        return (
          <section
            key={index}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 ">
              {/* title desc */}
              {(section.title || section.desc) && (
                <div className="text-center p-16 max-w-3xl mx-auto ">
                  {section.title && (
                    <span
                      className={`text-xl md:text-3xl lg:text-3xl text-gray-900 md:mb-4 gap-6`}
                    >
                      {section.title}
                    </span>
                  )}
                  {section.desc && (
                    <p
                      className={`text-sm md:text-xl text-gray-600 max-w-2xl mx-auto`}
                    >
                      {section.desc}
                    </p>
                  )}
                </div>
              )}
              { <DynamicRenderer config={section} index={index} key={index} />}
              {section.type === "contact-form" && (
                <div key={"key"+index} className="max-w-7xl mx-auto px-6 mt-20 grid grid-cols-1 lg:grid-cols-3 gap-10">


                {/* LEFT: FORM */}
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border">

                  <h2 className="text-2xl font-semibold mb-4">{section.title2}</h2>
                  <p className="text-gray-500 mb-8">{section.description}</p>

                  <form className="space-y-6">

                    {/* Dynamic Fields */}
                    {section.fields.map((field, i) => {

                      return (
                        <div key={i}>
                          <label className="text-sm font-medium">{field.label}</label>

                          <div className="relative mt-1">
                            {field.type === "textarea" ? (
                              <textarea
                                placeholder={field.placeholder}
                                required={field.required}
                                className="w-full border rounded-lg p-3"
                              />
                            ) : field.type === "select" ? (
                              <select
                                className="w-full border rounded-lg p-3"
                                required={field.required}
                              >
                                <option value="">Select an option</option>
                                {field.options?.map((o, idx) => (
                                  <option key={idx}>{o}</option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type={field.type}
                                placeholder={field.placeholder}
                                required={field.required}
                                className="w-full border rounded-lg p-3"
                              />
                            )}

                            {/* Input Icon */}
                            {field.icon && (
                              <field.icon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            )}
                          </div>
                        </div>
                      );

                    })}

                    {/* Attachment */}
                    <div className="border-2 border-dashed rounded-xl p-6 text-center">
                      <p className="text-gray-600">{section.attachment.label}</p>
                      <p className="text-xs text-gray-400">{section.attachment.description}</p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 w">
                      <button className="bg-primary text-white px-6 py-3 rounded-lg">
                        {section.buttons.submitLabel}
                      </button>
                      <button className="px-6 py-3 rounded-lg border">
                        {section.buttons.clearLabel}
                      </button>
                    </div>
                  </form>

                </div>

                {/* RIGHT: OFFICE INFO */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border">

                  <h2 className="text-xl font-semibold mb-4">
                    {section.officeInfo.title}
                  </h2>

                  {/* Office Info Items */}
                  {section.officeInfo.items.map((item, i) => {
                    const OfficeIcon = item.icon;
                    return (
                      <div key={i} className="flex gap-3 mb-4">
                        <OfficeIcon className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-gray-500 text-sm">{item.value}</p>
                        </div>
                      </div>
                    );
                  })}

                  {/* Map */}
                  <iframe
                    src={section.officeInfo.mapLabel}
                    className="w-full h-40 rounded-xl border mt-4"
                  ></iframe>

                  {/* Social */}
                  <h3 className="mt-10 mb-3 font-semibold">{section.socialLinks.title}</h3>
                  <div className="flex gap-4">
                    {section.socialLinks.platforms.map((p, i) => {
                      const SocialIcon = p.icon;
                      return (
                        <a key={i} href={p.url} className="p-3 border rounded-lg">
                          <SocialIcon className="w-5 h-5 text-gray-600" />
                        </a>
                      );
                    })}
                  </div>

                  {/* Newsletter */}
                  <h3 className="mt-10 mb-3 font-semibold">{section.newsletter.title}</h3>
                  <div className="flex gap-2">
                    <input
                      placeholder={section.newsletter.placeholder}
                      className="border rounded-lg p-3 flex-1"
                    />
                    <button className="bg-primary text-white px-5 rounded-lg">
                      {section.newsletter.buttonLabel}
                    </button>
                  </div>

                </div>
              </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
