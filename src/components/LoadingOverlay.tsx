import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { JobFlowLogo } from './JobFlowLogo';

interface LoadingOverlayProps {
  visible: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-[#05060A]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
        >
          {/* Animated Gradient Ring around Logo */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            <div
              className="animate-spin-ring absolute inset-0 rounded-full p-[3px]"
              style={{
                background:
                  'conic-gradient(from 0deg, #6366F1, #8B5CF6, #EC4899, #06B6D4, transparent 85%)',
              }}
            >
              <div className="w-full h-full rounded-full bg-[#05060A]" />
            </div>
            <div className="relative flex flex-col items-center">
              <JobFlowLogo size="lg" showWordmark={false} />
            </div>
          </div>

          <p className="mt-4 text-lg font-extrabold tracking-tight text-white">
            JobFlow
          </p>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-1.5 text-sm font-medium text-[#94A3B8]"
          >
            Preparing your workspace...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
