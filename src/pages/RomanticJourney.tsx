import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { RomanticButton } from '../components/RomanticButton';
import { SecretPasscode } from '../components/SecretPasscode';
import { EnvelopeOpen } from '../components/EnvelopeOpen';
import { LoveLetter } from '../components/LoveLetter';
import { MemoryGallery } from '../components/MemoryGallery';
import { Timeline } from '../components/Timeline';
import { RomanticQuote } from '../components/RomanticQuote';
import { FinalMessage } from '../components/FinalMessage';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { MusicPlayer } from '../components/MusicPlayer';
import { BackgroundEffects } from '../components/BackgroundEffects';

const STORAGE_KEY = 'romantic_journey_step';

export type JourneyStep = 
  | 'OPENING'
  | 'PASSCODE'
  | 'ENVELOPE_OPEN'
  | 'LOVE_LETTER'
  | 'MEMORIES'
  | 'TIMELINE'
  | 'ROMANTIC_QUOTE'
  | 'FINAL_MESSAGE';

const STEPS_ORDER: JourneyStep[] = [
  'OPENING',
  'PASSCODE',
  'ENVELOPE_OPEN',
  'LOVE_LETTER',
  'MEMORIES',
  'TIMELINE',
  'ROMANTIC_QUOTE',
  'FINAL_MESSAGE'
];

export const RomanticJourney: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<JourneyStep>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return (saved && STEPS_ORDER.includes(saved as JourneyStep)) ? (saved as JourneyStep) : 'OPENING';
    } catch {
      return 'OPENING';
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const goToStep = (step: JourneyStep) => {
    setCurrentStep(step);
    try {
      localStorage.setItem(STORAGE_KEY, step);
    } catch (e) {
      console.warn("Storage tidak tersedia", e);
    }
  };

  const handleReset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Gagal menghapus storage", e);
    }
    setCurrentStep('OPENING');
  };

  const currentStepIndex = STEPS_ORDER.indexOf(currentStep);

  // Loading Screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#FAF5FF] flex flex-col items-center justify-center z-50">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="w-16 h-16 rounded-full bg-lilac-200 flex items-center justify-center mb-4 shadow-lg shadow-lilac-300/40"
        >
          <Heart size={32} className="text-purple-600 fill-purple-400" />
        </motion.div>
        <p className="font-heading font-semibold text-lilac-900 text-sm">
          Menyiapkan sesuatu untukmu... 💜
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center py-16 px-4 overflow-hidden">
      <BackgroundEffects />
      
      {/* Top Stepper Indicator */}
      <ProgressIndicator currentStepIndex={currentStepIndex} totalSteps={STEPS_ORDER.length} />

      {/* Main Animated Stage */}
      <main className="relative z-10 w-full flex items-center justify-center my-auto">
        <AnimatePresence mode="wait">
          {/* 1. OPENING */}
          {currentStep === 'OPENING' && (
            <motion.div
              key="OPENING"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md text-center"
            >
              <div className="glass-card p-8 md:p-10 rounded-3xl border border-lilac-200/80 shadow-2xl">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-lilac-100 flex items-center justify-center border border-lilac-300 shadow-inner"
                >
                  <Heart size={32} className="text-purple-600 fill-purple-400" />
                </motion.div>

                <h1 className="font-heading text-3xl md:text-4xl font-bold text-lilac-950 mb-2">
                  Hai, Sayang... 
                </h1>
                <p className="text-sm md:text-base text-lilac-700 mb-8 font-medium">
                  Aku punya sedikit kejutan kecil khusus buat kamu hari ini.
                </p>

                <RomanticButton
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('START_ROMANTIC_MUSIC'));
                    goToStep('PASSCODE');
                  }}
                  className="w-full"
                >
                  <Sparkles size={18} />
                  <span>Mulai Kejutan </span>
                </RomanticButton>
              </div>
            </motion.div>
          )}

          {/* 2. SECRET PASSCODE INPUT */}
          {currentStep === 'PASSCODE' && (
            <motion.div
              key="PASSCODE"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <SecretPasscode onSuccess={() => goToStep('ENVELOPE_OPEN')} />
            </motion.div>
          )}

          {/* 3. ENVELOPE OPENING ANIMATION (Langsung menuju surat) */}
          {currentStep === 'ENVELOPE_OPEN' && (
            <motion.div
              key="ENVELOPE_OPEN"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <EnvelopeOpen onOpened={() => goToStep('LOVE_LETTER')} />
            </motion.div>
          )}

          {/* 4. LOVE LETTER */}
          {currentStep === 'LOVE_LETTER' && (
            <motion.div
              key="LOVE_LETTER"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <LoveLetter onFinish={() => goToStep('MEMORIES')} />
            </motion.div>
          )}

          {/* 5. MEMORIES GALLERY */}
          {currentStep === 'MEMORIES' && (
            <motion.div
              key="MEMORIES"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <MemoryGallery onNext={() => goToStep('TIMELINE')} />
            </motion.div>
          )}

          {/* 6. RELATIONSHIP TIMELINE */}
          {currentStep === 'TIMELINE' && (
            <motion.div
              key="TIMELINE"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Timeline onNext={() => goToStep('ROMANTIC_QUOTE')} />
            </motion.div>
          )}

          {/* 7. ROMANTIC QUOTE */}
          {currentStep === 'ROMANTIC_QUOTE' && (
            <motion.div
              key="ROMANTIC_QUOTE"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <RomanticQuote onNext={() => goToStep('FINAL_MESSAGE')} />
            </motion.div>
          )}

          {/* 8. FINAL SCENE */}
          {currentStep === 'FINAL_MESSAGE' && (
            <motion.div
              key="FINAL_MESSAGE"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <FinalMessage onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Music Player */}
      <MusicPlayer />
    </div>
  );
};