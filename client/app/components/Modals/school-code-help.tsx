import { motion, AnimatePresence } from 'motion/react';
import { X, School, CreditCard, FileText, Mail } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              {/* Header */}
              <div className="relative p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                      <School className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl text-slate-900 dark:text-white">
                      Where to Find Your School Code?
                    </h2>
                  </div>
                  
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Your school code is a unique identifier provided by your institution. You can find it in several places:
                </p>

                <div className="space-y-3">
                  {/* Location 1 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center shrink-0">
                      <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm text-slate-900 dark:text-white mb-1">
                        Student ID Card
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Check the back of your student ID card or library card
                      </p>
                    </div>
                  </motion.div>

                  {/* Location 2 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700"
                  >
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 dark:bg-teal-500/20 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h4 className="text-sm text-slate-900 dark:text-white mb-1">
                        Parent Portal Leaflet
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Find it in welcome documents or admission papers
                      </p>
                    </div>
                  </motion.div>

                  {/* Location 3 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-sm text-slate-900 dark:text-white mb-1">
                        Welcome Email
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Check your school&apos;s welcome or onboarding email
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Info box */}
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
                  <p className="text-xs text-blue-800 dark:text-blue-300">
                    <strong>Still can&apos;t find it?</strong> Contact your school administrator or reach out to the school office for assistance.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={onClose}
                  className="w-full py-3 cursor-pointer px-4 rounded-xl bg-linear-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white transition-all duration-200 shadow-lg shadow-blue-500/20"
                >
                  Got it, Thanks!
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
