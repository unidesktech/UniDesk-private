import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Mail, MessageCircle, Ticket, Headphones } from "lucide-react";

const ACTIONS = [
  {
    label: "Live Chat",
    icon: MessageCircle,
    variant: "default",
    badge: "Instant",
    disabled: true,
    className:
      "bg-linear-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-lg hover:shadow-xl",
  },
  {
    label: "Email Support",
    icon: Mail,
    variant: "outline",
    disabled: false,
  },
  {
    label: "Submit a Ticket",
    icon: Ticket,
    variant: "outline",
    disabled: true,
  },
];

const STATS = [
  { value: "< 2 hrs", label: "Avg Response Time" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Available Support" },
];

export function SupportCard() {
  return (
    <Card className="relative overflow-hidden border-2 border-gray-200/50 dark:border-gray-700/50 shadow-2xl bg-linear-to-br from-white via-blue-50/30 to-teal-50/30 dark:from-gray-800 dark:via-blue-950/20 dark:to-teal-950/20">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-400 dark:bg-teal-400 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-teal-400 dark:bg-blue-400 rounded-full blur-3xl" />
      </div>

      <CardContent className="relative p-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-blue-600 to-teal-500 flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Headphones className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-gray-900 dark:text-white mb-3">
            Still need help?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 md:text-xl mb-8 max-w-2xl mx-auto">
            Our support team is here for you 24/7. Choose your preferred way to get
            in touch.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-4">
            {ACTIONS.map(({ label, icon: Icon, badge, className, variant, disabled }) => (
              <Button
                key={label}
                size="lg"
                variant={variant as "link" | "default" | "outline" | "destructive" | "secondary" | "ghost" | null | undefined}
                disabled={disabled}
                className={`h-14 px-8 gap-3 ${
                  variant === "outline"
                    ? "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    : className
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
                {badge && (
                  <span className="px-2 py-1 rounded-full bg-white/20 text-xs">
                    {badge}
                  </span>
                )}
              </Button>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t-2 border-gray-200 dark:border-gray-700">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="md:text-3xl text-gray-900 dark:text-white mb-1">
                  {value}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}