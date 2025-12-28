"use client";

import { useState } from "react";
import { privacyPolicyConfig } from "@/app/config/privacy-policy.config";
import { PolicySidebar } from "./sidebar";
import { PolicySectionRenderer } from "./sections";

export default function PrivacyPage() {
  const sections = privacyPolicyConfig();
  const [activeId, setActiveId] = useState<string>();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveId(id);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto flex gap-8 px-6">
        <PolicySidebar
          sections={sections}
          activeId={activeId}
          onClick={scrollTo}
        />

        <main className="flex-1 bg-white p-10 rounded-2xl shadow">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

          {sections.map((section, index) => (
            <PolicySectionRenderer
              key={index}
              section={section}
              path={[index]}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
