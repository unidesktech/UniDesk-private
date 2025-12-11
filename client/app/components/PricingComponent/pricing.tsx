import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Check } from "lucide-react";

export interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
}

interface PricingProps {
  plans: Plan[];
}

export const Pricing: React.FC<PricingProps> = ({ plans }) => {
  return (
    <section className="bg-white flex flex-col justify-center items-center">
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto justify-center items-stretch flex-wrap">
          {plans.map((plan, i) => (
            <Card
              key={i}
              className={`flex-1 p-8 rounded-2xl border max-w-sm ${
                plan.highlighted
                  ? 'border-blue-500 shadow-xl shadow-blue-500/20 scale-105 bg-linear-to-b from-blue-50/50 to-white'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {plan.highlighted && (
                <div className="mb-4">
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-2xl text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-5xl text-gray-900">{plan.price}</span>
                {plan.period && <span className="text-gray-500">{plan.period}</span>}
              </div>

              <Button
                className={`w-full mb-8 rounded-xl ${
                  plan.highlighted
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Choose Plan"}
              </Button>

              <div className="space-y-3">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <p className="text-center text-gray-500 mt-12">
          All plans include free updates and migrations. No setup fees.
        </p>
    </section>
  );
};
