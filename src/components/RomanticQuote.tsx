import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RomanticButton } from './RomanticButton';
import { Sparkles, ArrowRight, Hand } from 'lucide-react';

interface RomanticQuoteProps {
  onNext: () => void;
}

interface RadarWave {
  id: number;
}

export const RomanticQuote: React.FC<RomanticQuoteProps> = ({ onNext }) => {
  const [isDrawn, setIsDrawn] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [waves, setWaves] = useState<RadarWave[]>([]);
  const maxTaps = 12; // Jumlah ketukan agar terisi penuh

  const fillPercentage = Math.min(100, Math.round((tapCount / maxTaps) * 100));
  const isFull = fillPercentage >= 100;

  const handleTap = () => {
    // Hanya bisa di-tap jika garis hati sudah selesai digambar dan belum penuh
    if (!isDrawn || isFull) return;

    const newTap = tapCount + 1;
    setTapCount(newTap);

    // Efek getar halus di smartphone
    if (navigator.vibrate) {
      navigator.vibrate(35);
    }

    // Tambah gelombang radar
    const newWave: RadarWave = { id: Date.now() + Math.random() };
    setWaves(prev => [...prev, newWave]);

    // Hapus gelombang setelah animasi selesai
    setTimeout(() => {
      setWaves(prev => prev.filter(w => w.id !== newWave.id));
    }, 900);

    // Jika sudah 100% penuh
    if (newTap >= maxTaps) {
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.5 },
        colors: ['#D8B4FE', '#C084FC', '#A855F7', '#FAF5FF', '#F472B6']
      });
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto text-center px-4 select-none flex flex-col items-center justify-center min-h-[75vh]">
      
      {/* 1. Header (Hanya Muncul Setelah Garis Hati Selesai Digambar) */}
      <div className="min-h-[90px] flex flex-col items-center justify-center">
        {isDrawn && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-lilac-600 uppercase tracking-widest mb-1.5 px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-lilac-200 shadow-sm">
              <Sparkles size={12} /> Love Game
            </span>

            <h2 className="font-heading text-2xl md:text-3xl font-bold text-lilac-950 mb-1">
              {isFull ? "Yeayy Cintaku Udah Penuh Buat Kamu! " : "Isi Hati Aku Sampai Penuh 💜"}
            </h2>

            <p className="text-xs md:text-sm text-lilac-700">
              {isFull 
                ? "Makasi sayang udah mau penuhin hati aku 🥰" 
                : "Ketuk (tap-tap) bentuk hati di bawah untuk mengisi cintaku padamu!"}
            </p>
          </motion.div>
        )}
      </div>

      {/* 2. Floating Heart Area (Tanpa Kotak Card) */}
      <div 
        onClick={handleTap}
        className={`relative w-64 h-64 md:w-72 md:h-72 my-4 flex items-center justify-center select-none ${
          isDrawn ? 'cursor-pointer active:scale-95 transition-transform' : 'pointer-events-none'
        }`}
      >
        {/* Radar Waves (Gelombang memancar bebas ke luar) */}
        <AnimatePresence>
          {waves.map(wave => (
            <motion.div
              key={wave.id}
              initial={{ scale: 0.9, opacity: 0.9 }}
              animate={{ scale: 2.6, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-56 h-56 md:w-64 md:h-64 text-lilac-400 stroke-lilac-500 fill-none drop-shadow-md"
                strokeWidth="1.5"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* SVG Main Heart */}
        <svg
          viewBox="0 0 24 24"
          className="w-56 h-56 md:w-64 md:h-64 drop-shadow-2xl relative z-10 overflow-visible"
        >
          <defs>
            {/* Warna Gradient Pengisi Lilac */}
            <linearGradient id="lilacLiquidGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#6B21A8" />
              <stop offset="50%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>

            {/* Masking Bentuk Hati untuk Cairan */}
            <clipPath id="freeHeartMask">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </clipPath>
          </defs>

          {/* Latar Belakang Transparan Lembut Hati */}
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={isDrawn ? "rgba(255, 255, 255, 0.35)" : "transparent"}
            className="transition-colors duration-700"
          />

          {/* Cairan Pengisi Warna Ungu Lilac */}
          <g clipPath="url(#freeHeartMask)">
            <motion.rect
              x="0"
              y={24 - (24 * fillPercentage) / 100}
              width="24"
              height="24"
              fill="url(#lilacLiquidGrad)"
              initial={false}
              animate={{ y: 24 - (24 * fillPercentage) / 100 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            />

            {/* Kilau Permukaan Cairan */}
            {fillPercentage > 0 && fillPercentage < 100 && (
              <motion.line
                x1="0"
                y1={24 - (24 * fillPercentage) / 100}
                x2="24"
                y2={24 - (24 * fillPercentage) / 100}
                stroke="#FFFFFF"
                strokeWidth="0.6"
                strokeOpacity="0.9"
              />
            )}
          </g>

          {/* Animasi Menggambar Garis Hati (Stroke Line Drawing) */}
          <motion.path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="none"
            stroke="#9333EA"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            onAnimationComplete={() => setIsDrawn(true)}
            className={isFull ? "stroke-purple-600 animate-pulse" : ""}
          />
        </svg>

        {/* Angka Persentase di Tengah Hati */}
        {isDrawn && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute z-20 pointer-events-none"
          >
            <span className={`font-heading font-extrabold text-2xl md:text-3xl drop-shadow-md transition-colors duration-300 ${
              fillPercentage > 50 ? 'text-white' : 'text-purple-950'
            }`}>
              {fillPercentage}%
            </span>
          </motion.div>
        )}
      </div>

      {/* 3. Footer / Status / Tombol Lanjut */}
      <div className="min-h-[85px] w-full max-w-sm flex flex-col items-center justify-center">
        {isDrawn && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full flex flex-col items-center"
          >
            {!isFull ? (
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-lilac-200 text-xs font-semibold text-lilac-800 shadow-sm"
              >
                <Hand size={14} className="text-purple-600 animate-bounce" />
                <span>Ketuk terus layarnya! ({tapCount}/{maxTaps}) ✨</span>
              </motion.div>
            ) : (
              <div className="w-full space-y-4">
                <motion.p
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-handwriting text-2xl md:text-3xl text-purple-900 font-bold"
                >
                  "Hati aku udah 100% milik kamu selamanya sayang" 💜
                </motion.p>

                <RomanticButton 
                  onClick={onNext} 
                  className="w-full shadow-xl shadow-lilac-500/40"
                >
                  <span>Kejutan Terakhir </span>
                  <ArrowRight size={16} />
                </RomanticButton>
              </div>
            )}
          </motion.div>
        )}
      </div>

    </div>
  );
};