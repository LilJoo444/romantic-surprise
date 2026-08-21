import React from 'react';
import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  currentStepIndex: number;
  totalSteps: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStepIndex,
  totalSteps,
}) => {
  const progressPercent = Math.min(100, Math.round(((currentStepIndex + 1) / totalSteps) * 100));

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 pt-3 pb-2 bg-gradient-to-b from-lilac-50/90 to-transparent backdrop-blur-[2px]">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs font-medium text-lilac-700">
          <span className="w-2 h-2 rounded-full bg-lilac-500 animate-ping" />
          <span>Perjalanan Cinta</span>
        </div>
        
        <div className="flex-1 max-w-[140px] h-1.5 bg-lilac-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-lilac-400 to-purple-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <span className="text-xs font-semibold text-lilac-600">
          {progressPercent}%
        </span>
      </div>
    </header>
  );
};