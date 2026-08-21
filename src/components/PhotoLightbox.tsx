import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ChevronLeft as SubLeft, ChevronRight as SubRight, Images } from 'lucide-react';
import { MemoryItem } from '../data/memories';

interface PhotoLightboxProps {
  photo: MemoryItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  onClose,
  onPrev,
  onNext,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset indeks foto kembali ke foto pertama saat berganti momen
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [photo?.id]);

  if (!photo) return null;

  const totalImages = photo.images.length;
  const currentImageUrl = photo.images[currentImageIndex];

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentImageIndex < totalImages - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-lg w-full bg-white/95 rounded-3xl p-4 md:p-6 shadow-2xl border border-lilac-200"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-lilac-100/90 text-lilac-800 hover:bg-lilac-200 transition-colors z-20 shadow-sm"
            aria-label="Tutup Galeri"
          >
            <X size={18} />
          </button>

          {/* Instagram-like Image Carousel Container */}
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-lilac-100 flex items-center justify-center mb-3 border border-lilac-200 select-none">
            
            {/* Badge Counter (Contoh: 1/3) */}
            {totalImages > 1 && (
              <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1.5 shadow-md">
                <Images size={12} />
                <span>{currentImageIndex + 1}/{totalImages}</span>
              </div>
            )}

            {/* Foto dengan Animasi Transisi Geser / Swipe */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageUrl}
                src={currentImageUrl}
                alt={`${photo.caption} - Foto ${currentImageIndex + 1}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
                className="w-full h-full object-cover"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -40 && currentImageIndex < totalImages - 1) {
                    handleNextImage();
                  } else if (info.offset.x > 40 && currentImageIndex > 0) {
                    handlePrevImage();
                  }
                }}
              />
            </AnimatePresence>

            {/* Tombol Panah Kiri (Sub-Foto) */}
            {totalImages > 1 && currentImageIndex > 0 && (
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-white/80 hover:bg-white text-lilac-900 shadow-md transition-transform active:scale-90"
                aria-label="Foto Sebelumnya"
              >
                <SubLeft size={18} />
              </button>
            )}

            {/* Tombol Panah Kanan (Sub-Foto) */}
            {totalImages > 1 && currentImageIndex < totalImages - 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-white/80 hover:bg-white text-lilac-900 shadow-md transition-transform active:scale-90"
                aria-label="Foto Berikutnya"
              >
                <SubRight size={18} />
              </button>
            )}

            {/* Instagram-style Dots Indicator di Dalam Foto */}
            {totalImages > 1 && (
              <div className="absolute bottom-3 inset-x-0 z-20 flex justify-center items-center gap-1.5">
                {photo.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex 
                        ? 'w-5 bg-purple-600 shadow' 
                        : 'w-1.5 bg-white/70 hover:bg-white'
                    }`}
                    aria-label={`Ke foto ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Caption & Tanggal */}
          <div className="text-center px-2">
            <span className="text-xs font-semibold text-lilac-600 uppercase tracking-widest">{photo.dateText}</span>
            <p className="font-heading text-sm md:text-base font-bold text-lilac-950 mt-1 max-h-24 overflow-y-auto leading-relaxed">
              "{photo.caption}"
            </p>
          </div>

          {/* Navigasi Antar Momen (Momen Sebelum / Momen Berikut) */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-lilac-100">
            <button
              onClick={onPrev}
              className="flex items-center gap-1 text-xs font-medium text-lilac-700 hover:text-lilac-950 px-3 py-1.5 rounded-full hover:bg-lilac-100 transition-colors"
            >
              <ChevronLeft size={16} /> Momen Sebelumnya
            </button>
            <button
              onClick={onNext}
              className="flex items-center gap-1 text-xs font-medium text-lilac-700 hover:text-lilac-950 px-3 py-1.5 rounded-full hover:bg-lilac-100 transition-colors"
            >
              Momen Berikutnya <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};