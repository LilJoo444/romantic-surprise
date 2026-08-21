import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { loveLetterData } from '../data/loveLetter';
import { RomanticButton } from './RomanticButton';
import { Sparkles, ArrowRight, FastForward } from 'lucide-react';

interface LoveLetterProps {
  onFinish: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ onFinish }) => {
  const fullText = loveLetterData.paragraphs.join("\n\n");
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (displayedLength < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedLength(prev => prev + 1);
      }, 35);
      return () => clearTimeout(timeout);
    } else {
      setIsDone(true);
    }
  }, [displayedLength, fullText]);

  const handleSkip = () => {
    setDisplayedLength(fullText.length);
    setIsDone(true);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-lilac-200/80 relative overflow-hidden backdrop-blur-md"
      >
        {/* Decorative Stamp / Wax Seal */}
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-lilac-500 to-purple-700 shadow-md flex items-center justify-center text-white text-xs font-handwriting border-2 border-white">
          💌 
        </div>

        <div className="mb-4 pr-14">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-lilac-600 uppercase tracking-widest">
            <Sparkles size={12} /> Surat Istimewa
          </span>
          <h2 className="font-heading text-xl md:text-2xl font-bold text-lilac-950 mt-1">
            {loveLetterData.title}
          </h2>
        </div>

        {/* Letter Content with Typewriter */}
        <div className="text-xs md:text-sm text-lilac-950 leading-relaxed space-y-3 font-body whitespace-pre-line min-h-[220px] max-h-[360px] overflow-y-auto pr-1">
          {fullText.slice(0, displayedLength)}
          {!isDone && <span className="inline-block w-1.5 h-4 bg-purple-600 ml-1 animate-pulse" />}
        </div>

        <div className="mt-6 pt-4 border-t border-lilac-100 flex items-center justify-between gap-3">
          {!isDone ? (
            <button
              onClick={handleSkip}
              className="text-xs text-lilac-600 hover:text-lilac-900 flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-lilac-50 transition-colors"
            >
              <FastForward size={14} /> Tampilkan Semua
            </button>
          ) : (
            <p className="font-handwriting text-lg text-purple-700">
              {loveLetterData.signature}
            </p>
          )}

          {isDone && (
            <RomanticButton onClick={onFinish} className="ml-auto">
              <span>Buka Galeri Kenangan</span>
              <ArrowRight size={16} />
            </RomanticButton>
          )}
        </div>
      </motion.div>
    </div>
  );
};