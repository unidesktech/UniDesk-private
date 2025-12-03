import { CheckCircle, MapPin } from "lucide-react";
import React from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/ImgModule/image-with-fallback";
import { SchoolPreview } from "@/app/models/school.model";



interface SchoolPreviewCardProps {
    school: SchoolPreview
}

const SchoolPreviewCard = ({ school }: SchoolPreviewCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative"
    >
      <div
        className="absolute inset-0 rounded-xl blur-xl opacity-30 dark:opacity-20 bg-primary"
      />

      <div className="relative bg-linear-to-br from-white/90 to-slate-50/90 dark:from-slate-800/90 dark:to-slate-900/90 backdrop-blur-sm rounded-xl p-4 border-2 border-slate-200/50 dark:border-slate-700/50 shadow-lg">
        <div className="flex items-start gap-4">
          {/* School Logo */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0 bg-primary"
          >
            <ImageWithFallback
              src={school.logo_url}
              alt={school.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* School Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-slate-900 dark:text-white truncate">
                  {school.name}
                </h3>
                <div className="flex items-center gap-1 mt-1 text-xs text-slate-600 dark:text-slate-400">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">{school.address}</span>
                </div>
              </div>

              {/* Verified Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle
                  className="w-5 h-5 shrink-0 bg-primary-color"
                />
              </motion.div>
            </div>

            {/* Verified Tag */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-md text-xs bg-green-500/10 dark:bg-green-500/20 text-green-700 dark:text-green-400 border border-green-500/20"
            >
              <CheckCircle className="w-3 h-3" />
              Verified School Portal
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SchoolPreviewCard;
