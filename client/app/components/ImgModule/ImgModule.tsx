import { CheckCircle } from "lucide-react";

import Image from "next/image";

export interface ModuleItems {
  title: string;
  subtitle: string;
  image: string;
  points: string[];
  reversed?: boolean;
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
              <p className="text-blue-600 mb-2">{module.subtitle}</p>
              <h2 className="text-4xl text-gray-900 mb-6">{module.title}</h2>

              <div className="space-y-4">
                {module.points.map((point, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-600 mt-0.5" />
                    <p className="text-lg text-gray-700">{point}</p>
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
