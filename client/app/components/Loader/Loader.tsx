import { motion } from "motion/react";

interface LoaderProps {
  label?: string;
}

const bars = [
  { width: "w-16", gradient: "from-sky-400 to-blue-500", delay: 0 },
  { width: "w-20", gradient: "from-blue-400 to-indigo-500", delay: 0.15 },
  { width: "w-16", gradient: "from-indigo-400 to-violet-500", delay: 0.3 },
];

export function Loader({ label = "Loading..." }: LoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6">
        {/* Loader Container */}
        <div className="relative gap-4 w-56 h-14 overflow-hidden rounded-3xl bg-white/60 border border-blue-100 shadow-xl flex items-center justify-center px-6">
          {bars.map((bar, i) => (
            <motion.div
              key={i}
              className={`h-1.5 ${bar.width} rounded-full bg-linear-to-r ${bar.gradient}`}
              initial={{ x: "-100%", opacity: 0 }}
              animate={{
                x: ["-100%", "0%", "100%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.4,
                ease: "easeInOut",
                repeat: Infinity,
                delay: bar.delay,
              }}
            />
          ))}
        </div>

        {label && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-sm font-medium text-blue-700 tracking-wide"
          >
            {label}
          </motion.div>
        )}
      </div>
    </div>
  );
}
