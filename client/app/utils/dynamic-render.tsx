
import { ImgModule, ModuleItems } from "../components/ImgModule/img-module";
import FaqAccordion, { FaqItem } from "../components/FAQAccordion/faq-accordion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CheckCircle } from "lucide-react";
import StatCard from "../components/Cards/stat-card";
import { CSSProperties } from "react";
import CardRenderer from "../components/Cards/card-renderer";
import { barData, lineData } from "../models/chart.model";
import { Plan, Pricing } from "../components/PricingComponent/pricing";

interface ConfigItem {
  type: string;
  items?: any[];
  lineData?: lineData[];
  barData?: barData[];
  features?: string[];
  styles?: {
    inlineStyles?: CSSProperties | undefined;
    classNames?: string;
  };
}

interface DynamicRendererProps {
  config: ConfigItem;
  index?: number;
  onClick?: () => void;
}

export const DynamicRenderer: React.FC<DynamicRendererProps> = ({
  config,
  index,
  onClick,
}) => {
  if (!config) return null;
  switch (config.type?.toLowerCase()) {
    case "card":
      return <CardRenderer config={config} />;
    case "dashboardmockup":
      return (
        <section className="bg-linear-to-b from-white to-gray-50">
          <div className="bg-linear-to-br from-gray-50 to-blue-50/30 rounded-2xl p-8 border border-gray-200 shadow-2xl">
            <div className="flex flex-wrap gap-6 mb-8">
              {(config.items ?? []).map((item, i) => (
                <div key={i} className="flex-1 min-w-[150px]">
                  <StatCard item={item} />
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-white w-full rounded-xl p-6 border shadow-sm">
                <h3 className="text-gray-900 mb-4 text-sm md:text-base">
                  Student Enrollment Trend
                </h3>
                <div className="w-full h-[250px]">
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={config?.lineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-xl w-full p-6 border shadow-sm">
                <h3 className="text-gray-900 mb-4 text-sm md:text-base">
                  Weekly Attendance
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={config?.barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Bar
                      dataKey="attendance"
                      fill="#14b8a6"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-6 mt-12">
              {(config.features ?? []).map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border"
                >
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-900">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "imgmodule":
      return <ImgModule modules={config.items as ModuleItems[]} />;

    case "pricing":
      return <Pricing plans={config.items as Plan[]} />;
    case "accordian":
      return <FaqAccordion faqs={config.items as FaqItem[]} />;
  }
};
