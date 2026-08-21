import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Hand } from 'lucide-react';
import { appConfig } from '../data/config';

interface EnvelopeOpenProps {
  onOpened: () => void;
}

export const EnvelopeOpen: React.FC<EnvelopeOpenProps> = ({ onOpened }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPinPopped, setIsPinPopped] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen) return;

    setIsPinPopped(true);
    setIsOpen(true);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#D8B4FE', '#C084FC', '#FAF5FF', '#F472B6', '#9333EA']
    });

    // Waktu animasi amplop & setengah kertas meluncur sebelum masuk ke surat
    setTimeout(() => {
      onOpened();
    }, 2200);
  };

  return (
    <div className="w-full max-w-md mx-auto text-center px-4 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-6 md:p-8 rounded-3xl border border-lilac-200 shadow-2xl relative overflow-hidden"
      >
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-lilac-600 uppercase tracking-widest mb-1">
          <Sparkles size={12} /> Surat Cinta
        </span>

        <h2 className="font-heading text-xl md:text-2xl font-bold text-lilac-950 mb-1">
          Sebuah Surat Untukmu 💌
        </h2>

        {/* 3D-Like Realistic Lilac Envelope */}
        <div 
          onClick={handleOpenEnvelope}
          className="relative w-64 sm:w-72 h-44 mx-auto my-6 cursor-pointer select-none group"
          style={{ perspective: 1200 }}
        >
          {/* 1. Latar Belakang Bagian Dalam Amplop (Warna Ungu Paling Gelap) */}
          <div className="absolute inset-0 rounded-2xl bg-[#4C1D95] shadow-2xl border border-purple-900/50 overflow-hidden">
            {/* Bayangan kedalaman ruang dalam amplop */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
          </div>

          {/* 2. Kertas Surat (Sama Sekali Tidak Terlihat Saat Tertutup, Meluncur Naik Setengah Saat Terbuka) */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={
              isOpen 
                ? { y: -72, opacity: 1, scale: 1.02 } 
                : { y: 20, opacity: 0 }
            }
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="absolute inset-x-3.5 top-2 bottom-2 rounded-xl bg-gradient-to-b from-white via-lilac-50 to-[#FAF5FF] border border-lilac-200 shadow-xl p-3 flex flex-col items-center justify-start pt-3.5 z-10"
          >
            <div className="w-10 h-1 bg-lilac-300 rounded-full mb-1.5" />
            <div className="w-20 h-1 bg-lilac-200 rounded-full mb-2.5" />
            
            <p className="font-handwriting text-xl text-purple-900 font-bold leading-tight">
              Untuk {appConfig.recipientName} 💜
            </p>
            <span className="text-[10px] text-lilac-600 mt-1 font-medium">Dibuat khusus dengan cinta</span>
          </motion.div>

          {/* 3. Lipatan Sayap Kiri (Warna Ungu Menengah dengan Bayangan Garis) */}
          <div 
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#7E22CE] to-[#6B21A8] z-20"
            style={{ 
              clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)',
              filter: 'drop-shadow(2px 0 3px rgba(0,0,0,0.15))'
            }}
          />

          {/* 4. Lipatan Sayap Kanan (Warna Ungu Sedikit Lebih Gelap untuk Efek Cahaya) */}
          <div 
            className="absolute inset-0 rounded-2xl bg-gradient-to-l from-[#6B21A8] to-[#581C87] z-20"
            style={{ 
              clipPath: 'polygon(100% 0%, 100% 100%, 50% 50%)',
              filter: 'drop-shadow(-2px 0 3px rgba(0,0,0,0.15))'
            }}
          />

          {/* 5. Lipatan Kantong Depan Bawah (Warna Ungu Lebih Terang di Depan) */}
          <div 
            className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#7E22CE] via-[#8B2FE0] to-[#9333EA] z-20"
            style={{ 
              clipPath: 'polygon(0% 100%, 100% 100%, 50% 48%)',
              filter: 'drop-shadow(0 -3px 4px rgba(0,0,0,0.18))'
            }}
          />

          {/* 6. Penutup Segitiga Atas (Menutup Rapat ke Bawah & Terlipat ke Atas Saat Dibuka) */}
          <motion.div
            animate={isOpen ? { rotateX: 180, zIndex: 5 } : { rotateX: 0, zIndex: 30 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              transformOrigin: 'top center',
              clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
              filter: isOpen ? 'none' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.25))'
            }}
            className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#A855F7] via-[#9333EA] to-[#7E22CE] rounded-t-2xl border-t border-purple-300/40"
          />

          {/* 7. Pin Segel Hati (Presisi di Ujung Runcing Segitiga Penutup) */}
          <AnimatePresence>
            {!isPinPopped && (
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.25 } }}
                className="absolute top-[40%] left-[41%] -translate-x-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-gradient-to-tr from-[#6B21A8] via-[#C084FC] to-[#F472B6] p-[2px] shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                {/* Lingkaran dalam putih dengan logo hati */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-700 to-fuchsia-600 flex items-center justify-center border-2 border-white shadow-inner">
                  <Heart size={20} className="text-white fill-white drop-shadow" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Prompt */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-lilac-800 font-medium mt-3 min-h-[24px]">
          {!isOpen ? (
            <div className="flex items-center gap-1.5">
              <Hand size={14} className="animate-bounce text-purple-600" />
              <span>Ketuk untuk membuka segel cintanya </span>
            </div>
          ) : (
            <span className="text-purple-700 font-semibold animate-pulse">
              Membuka surat romantis untukmu... 💜
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
};