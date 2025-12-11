import { Button } from "../ui/button";
import { ArrowRight, Calendar } from "lucide-react";

export function OfferFooter() {
  return (
    <section className="pt-16 relative overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-linear-to-br from-teal-500/10 via-blue-500/10 to-purple-500/10 dark:from-teal-500/20 dark:via-blue-500/20 dark:to-purple-500/20" />
      <div className="absolute inset-0 backdrop-blur-3xl bg-white/50 dark:bg-slate-900/50" />

      {/* Glow Effects */}
      <div className="absolute top-0 left-1/5 w-100 h-100 bg-teal-400/20 dark:bg-teal-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/5 w-100 h-100 bg-blue-400/20 dark:bg-blue-400/10 rounded-full blur-3xl" />

      <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
        <h2 className="text-5xl mb-6 font-semibold">
          Experience the Future of School Management
        </h2>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Join 50+ schools already using SchoolSphere to transform their
          operations. Start your free trial today and see the difference.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="h-14 px-8 bg-linear-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105 rounded-xl text-lg"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 border-2 hover:border-teal-500 dark:hover:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-all rounded-xl text-lg"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Request a Demo
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span>14-day free trial</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span>No credit card required</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span>Full feature access</span>
          </div>
        </div>
      </div>
    </section>
  );
}
