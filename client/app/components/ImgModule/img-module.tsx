import { StyleConfig } from "@/app/models/resusable.model";
import { CheckCircle, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface ModuleItems {
  title: string;
  desc?: string;
  subtitle: string;
  image: string;
  points: string[];
  reversed?: boolean;
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  styles?: {
    IconContainerStyle: StyleConfig;
    IconStyle: StyleConfig;
    subtitle: StyleConfig;
    title: StyleConfig;
    desc: StyleConfig;
  };
}
interface ImgModuleProps {
  modules: ModuleItems[];
}

export const ImgModule: React.FC<ImgModuleProps> = ({ modules }) => {
  return (
    <section className="md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-32">
        {modules.map((module, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row gap-16 items-center ${
              module.reversed ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="flex-1">
              {module.Icon && (
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${module.styles?.IconContainerStyle?.className}`}
                  style={module.styles?.IconContainerStyle?.inlineStyles}
                >
                  <module.Icon
                    className={`w-7 h-7 text-white ${module.styles?.IconStyle?.className}`}
                    style={module.styles?.IconStyle?.inlineStyles}
                  />
                </div>
              )}
              {module.subtitle && (
                <p
                  className={`text-blue-600 mb-2 ${module?.styles?.subtitle?.className}`}
                  style={module?.styles?.subtitle?.inlineStyles}
                >
                  {module.subtitle}
                </p>
              )}
              {module.title && (
                <h2
                  className={`text-4xl text-gray-900 mb-6 ${module.styles?.title?.className}`}
                  style={module.styles?.title?.inlineStyles}
                >
                  {module.title}
                </h2>
              )}
              {module.desc && (
                <p
                  className={`text-xl text-gray-600 mb-8 leading-relaxed ${module.styles?.desc?.className}`}
                  style={module.styles?.desc?.inlineStyles}
                >
                  {module.desc}
                </p>
              )}
              <div className="space-y-4">
                {module.points.map((point, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-600 mt-0.5" />
                    <p className="text-base md:text-lg text-gray-700">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                <img
                  src={module.image}
                  alt={module.title}
                  className="w-full h-auto"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
