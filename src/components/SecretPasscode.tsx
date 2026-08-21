import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Lock, Unlock, Sparkles, HelpCircle, Delete } from 'lucide-react';
import { appConfig } from '../data/config';

interface SecretPasscodeProps {
  onSuccess: () => void;
}

export const SecretPasscode: React.FC<SecretPasscodeProps> = ({ onSuccess }) => {
  const [pin, setPin] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const targetPasscode = appConfig.secretPasscode;
  const maxDigits = 6; // Ditetapkan 6 digit

  const handleDigit = (digit: string) => {
    if (pin.length < maxDigits) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setIsError(false);

      if (nextPin.length === maxDigits) {
        verifyPin(nextPin);
      }
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
    setIsError(false);
  };

  const verifyPin = (inputPin: string) => {
    if (inputPin === targetPasscode) {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#D8B4FE', '#C084FC', '#A855F7', '#FAF5FF']
      });
      setTimeout(() => {
        onSuccess();
      }, 700);
    } else {
      setIsError(true);
      setTimeout(() => {
        setPin('');
      }, 600);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 md:p-8 rounded-3xl border border-lilac-200 shadow-2xl"
      >
        {/* Lock Icon Header */}
        <motion.div
          animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
          className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-tr from-lilac-400 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-lilac-400/30"
        >
          {pin === targetPasscode ? <Unlock size={26} /> : <Lock size={26} />}
        </motion.div>

      

        <h2 className="font-heading text-xl md:text-2xl font-bold text-lilac-950 mb-1">
          Masukkan Password 
        </h2>
        
        <p className="text-xs text-lilac-700 mb-6">
          Masukkan 6 digit angka spesial kita untuk membuka amplop cinta.
        </p>

        {/* 6 PIN Dots Indicator */}
        <motion.div
          animate={isError ? { x: [-12, 12, -8, 8, 0] } : {}}
          className="flex justify-center items-center gap-2.5 sm:gap-3 mb-6"
        >
          {Array.from({ length: maxDigits }).map((_, index) => {
            const isFilled = index < pin.length;
            return (
              <div
                key={index}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-200 ${
                  isError
                    ? 'border-red-400 bg-red-200 scale-105'
                    : isFilled
                    ? 'border-purple-600 bg-gradient-to-r from-lilac-500 to-purple-600 scale-110 shadow-md shadow-lilac-400/50'
                    : 'border-lilac-300 bg-white/70'
                }`}
              />
            );
          })}
        </motion.div>

        {/* Feedback Message */}
        <div className="min-h-[22px] mb-4">
          {isError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-semibold text-purple-700"
            >
              Kodenya masih belum pas nih, coba cek petunjuk ya 🥺
            </motion.p>
          )}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-2.5 max-w-[240px] mx-auto mb-3">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <motion.button
              key={num}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleDigit(num)}
              className="h-12 rounded-2xl bg-white/80 hover:bg-white text-lilac-950 font-heading font-bold text-lg border border-lilac-200 shadow-sm flex items-center justify-center transition-colors"
            >
              {num}
            </motion.button>
          ))}
          
          {/* Tombol Hint */}
          <button
            onClick={() => setShowHint(!showHint)}
            className="h-12 rounded-2xl bg-lilac-100/70 hover:bg-lilac-200/80 text-lilac-700 font-medium text-xs border border-lilac-200 flex items-center justify-center transition-colors"
            aria-label="Tampilkan petunjuk"
          >
            <HelpCircle size={18} />
          </button>

          {/* Tombol 0 */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleDigit('0')}
            className="h-12 rounded-2xl bg-white/80 hover:bg-white text-lilac-950 font-heading font-bold text-lg border border-lilac-200 shadow-sm flex items-center justify-center transition-colors"
          >
            0
          </motion.button>

          {/* Tombol Hapus */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleDelete}
            className="h-12 rounded-2xl bg-lilac-100/70 hover:bg-lilac-200/80 text-lilac-700 flex items-center justify-center border border-lilac-200 transition-colors"
            aria-label="Hapus digit"
          >
            <Delete size={18} />
          </motion.button>
        </div>

        {/* Hint Box */}
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 p-3 bg-lilac-100/80 rounded-2xl border border-lilac-200 text-left text-xs text-lilac-800"
          >
            <span className="font-semibold block mb-0.5">💡 Petunjuk:</span>
            {appConfig.passcodeHint}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};