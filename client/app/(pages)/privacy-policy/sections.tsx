"use client";

import { cn } from "@/app/lib/utils";
import { PolicySection } from "@/app/models/privacy-policy-config.model";
import { JSX } from "react";

interface Props {
  section: PolicySection;
  level?: number;
  path?: number[];
}

export const PolicySectionRenderer = ({
  section,
  level = 1,
  path = [],
}: Props) => {
  const Heading = `h${Math.min(level, 6)}` as JSX.ElementType;

  const sectionNumber = path.length > 0 ? path.map((p) => p + 1).join(".") : "";

  return (
    <section id={section.id} className="mb-10 text-gray-900 scroll-mt-28">
      {/* Title */}
      {section.title && (
        <Heading className={`mb-4 text-2xl font-semibold pb-3 border-b text-gray-700 border-gray-200 ${path.length > 1 ? "text-xl" : "text-2xl"}`}>
          <span>
            {sectionNumber}
            {". "}
          </span>
          {section.title}
        </Heading>
      )}

      {/* Descriptions */}
      {section.descriptions?.map((d, i) => (
        <p key={i} className="text-gray-600 text-sm mb-2">
          {d}
        </p>
      ))}

      {/* Bullets */}
      {section.bullets && (
        <ul
          className={cn(
            "pl-6 space-y-2 mb-4",
            section.bullets.sequence === "ol" ? "list-decimal" : "list-disc"
          )}
        >
          {section.bullets.items.map((b, i) => (
            <li key={i}>
              {b.title && (
                <strong className="text-gray-700">{b.title}: </strong>
              )}
              {b.description}
            </li>
          ))}
        </ul>
      )}

      {/* Dialogues */}
      {section.dialogues?.map((d, i) => (
        <div
          key={i}
          className={cn(
            "p-4 rounded-lg border mb-4 text-sm",
            d.variant === "info" && "bg-cyan-50 border-cyan-200",
            d.variant === "success" && "bg-green-50 border-green-200",
            d.variant === "warning" && "bg-yellow-50 border-yellow-200",
            d.variant === "error" && "bg-red-50 border-red-200"
          )}
        >
          <div className="flex items-center">
            {d.icon && (
              <d.icon
                color={
                  d.variant === "info"
                    ? "#0e7490"
                    : d.variant === "success"
                    ? "#15803d"
                    : d.variant === "warning"
                    ? "#b45309"
                    : "#b91c1c"
                }
                className={cn(
                  "h-5 mr-2 w-5 text-gray-500",
                  d.variant === "info" && "bg-cyan-50 border-cyan-200",
                  d.variant === "success" && "bg-green-50 border-green-200",
                  d.variant === "warning" && "bg-yellow-50 border-yellow-200",
                  d.variant === "error" && "bg-red-50 border-red-200"
                )}
              />
            )}
            <div className="w-[90%]">
              <strong>{d.title}</strong>
              <p>{d.description}</p>
            </div>
          </div>
        </div>
      ))}

      {section.subsections?.map((sub, index) => (
        <PolicySectionRenderer
          key={index}
          section={sub}
          level={level + 1}
          path={[...path, index]}
        />
      ))}
    </section>
  );
};
