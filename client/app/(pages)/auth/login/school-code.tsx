"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle,
  HelpCircle,
  Loader2,
  School,
  XCircle,
} from "lucide-react";
import { HelpModal } from "@/app/components/Modals/school-code-help";
import { isValidSchoolCode } from "@/app/services/school.service";
import SchoolPreviewCard from "./school-preview";
import { SchoolPreview } from "@/app/models/school.model";
import { useAppDispatch } from "@/app/store/hooks";
import { setSchool } from "@/app/store/app.slice";

const SchoolCodePage = ({
  schoolData,
  setShowLogin,
  setSchoolData
}: {
  schoolData: SchoolPreview | null
  setShowLogin: Dispatch<SetStateAction<boolean>>;
  setSchoolData: Dispatch<SetStateAction<SchoolPreview | null>>
}) => {

  const dispatch = useAppDispatch();

  const [schoolCode, setSchoolCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && schoolCode && !isValidating) {
      handleContinue();
    }
  };

  const handleChange = (value: string) => {
    setSchoolCode(value.trim());

    if (!value) {
      setError("Please enter a school code");
    }

    if (value.length > 3) {
      const timer = setTimeout(() => {
        validateSchoolCode(value);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSchoolData(null);
      setError("");
    }
  };

  const handleContinue = async () => {
    setIsValidating(true);

    const validSchool = await validateSchoolCode(schoolCode);

    if (!validSchool){
      return;
    };

    setIsTransitioning(true);
    setIsValidating(false);

    setTimeout(() => {
      setShowLogin(true);
    }, 800);
  };

  const validateSchoolCode = async (schoolCode: string): Promise<boolean> => {
    const res = await isValidSchoolCode(schoolCode);

    if (res.success) {
      dispatch(setSchool({...res.data , code: schoolCode}));
      setSchoolData({...res.data , code: schoolCode});
      setError('')
    }
    else {
      setError(res.message)
    }

    return res.success;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 dark:bg-purple-500/3 rounded-full blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: isTransitioning ? 0 : 1,
          scale: isTransitioning ? 1.05 : 1,
        }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary mb-6 shadow-xl shadow-blue-500/20 dark:shadow-blue-500/10"
          >
            <School className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl mb-3 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">
            Enter Your School Code
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-sm mx-auto">
            Access your school&apos;s portal by entering the unique school code
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <div className="relative bg-white/80  rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
            <div className="relative p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="school-code-input"
                  className="block text-sm text-slate-700 font-semibold"
                >
                  School Code
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <School className="w-5 h-5 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 dark:group-focus-within:text-teal-400 transition-colors" />
                  </div>

                  <input
                    id="school-code-input"
                    type="text"
                    value={schoolCode}
                    onChange={(e) => handleChange(e.target.value.toUpperCase())}
                    onKeyPress={handleKeyPress}
                    placeholder="e.g., DPS123, MLZS001, SCH567"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-teal-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-teal-500/20 outline-none transition-all duration-200 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  />

                  <AnimatePresence>
                    {schoolData && !error && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </motion.div>
                    )}
                    {error && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        <XCircle className="w-5 h-5 text-red-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1"
                    >
                      <XCircle className="w-4 h-4" />
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <AnimatePresence>
                {schoolData && !error && (
                  <SchoolPreviewCard school={schoolData} />
                )}
              </AnimatePresence>

              <motion.button
                onClick={handleContinue}
                disabled={!schoolData || !!error || isValidating}
                whileHover={{ scale: schoolData && !error ? 1.02 : 1 }}
                whileTap={{ scale: schoolData && !error ? 0.98 : 1 }}
                className={`
                  w-full py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden
                  ${
                    schoolData && !error
                      ? "bg-linear-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 dark:from-blue-600 dark:to-teal-600 dark:hover:from-blue-500 dark:hover:to-teal-500 text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20"
                      : "bg-slate-200 dark:bg-slate-700/50 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                  }
                `}
              >
                {isValidating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Validating...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                  </>
                )}

                {/* Glow effect */}
                {schoolData && !error && (
                  <div className="absolute inset-0 bg-linear-to-r from-blue-400/0 via-white/20 to-teal-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 space-y-3"
        >
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => setShowHelp(true)}
              className="flex items-center gap-2 cursor-pointer text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-teal-400 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              Don&apos;t know your school code?
            </button>
          </div>
        </motion.div>
      </motion.div>
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
};

export default SchoolCodePage;
