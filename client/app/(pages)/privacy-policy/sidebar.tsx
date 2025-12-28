"use client";

import { PolicySection } from "@/app/models/privacy-policy-config.model";


interface Props {
  sections: PolicySection[];
  activeId?: string;
  onClick: (id: string) => void;
}

export const PolicySidebar = ({
  sections,
  activeId,
  onClick,
}: Props) => {
  return (
    <aside className="w-72 sticky top-24 h-fit bg-white border rounded-xl p-4">
      <h3 className="font-semibold mb-4">Table of Contents</h3>

      <ul className="space-y-2">
        {sections.map((section) => {
          if (!section.id) return null;

          const Icon = section.icon;

          return (
            <li key={section.id}>
              <button
                onClick={() => onClick(section.id!)}
                className={`w-full flex items-center font-semibold cursor-pointer gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                  activeId === section.id
                    ? "bg-cyan-50 text-cyan-700 border border-cyan-200"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {Icon && <Icon className="h-4" />}

                <span className="text-sm">{section.title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
