import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { memoriesData, MemoryItem } from '../data/memories';
import { PhotoLightbox } from './PhotoLightbox';
import { RomanticButton } from './RomanticButton';
import { Camera, ArrowRight, Images } from 'lucide-react';

interface MemoryGalleryProps {
  onNext: () => void;
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({ onNext }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryItem | null>(null);

  const handleOpenPhoto = (item: MemoryItem) => {
    setSelectedPhoto(item);
  };

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = memoriesData.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % memoriesData.length;
    setSelectedPhoto(memoriesData[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = memoriesData.findIndex(p => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + memoriesData.length) % memoriesData.length;
    setSelectedPhoto(memoriesData[prevIndex]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-lilac-100 text-lilac-700 mb-2">
          <Camera size={12} /> Galeri Kenangan
        </span>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-lilac-900">
          Sedikit kenangan tentang kita 
        </h2>
        <p className="text-xs md:text-sm text-lilac-700 mt-1">
          Dari sekian banyaknya momen kita pas bareng, cuma ada 6 yang foto bareng. Sowwrryyy... 😔
        </p>
        <p className="text-xs md:text-sm text-lilac-700 mt-1">
          Klik gambar buat detailnya yaa...
        </p>
      </motion.div>

      {/* Grid Photos */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
        {memoriesData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, rotate: index % 2 === 0 ? 1 : -1 }}
            onClick={() => handleOpenPhoto(item)}
            className="glass-card p-2 md:p-3 rounded-2xl cursor-pointer hover:shadow-xl transition-all border border-lilac-200 group relative"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden bg-lilac-100 flex items-center justify-center mb-2">
              {/* Foto Sampul (Foto Pertama) */}
              <img
                src={item.images[0]}
                alt={item.caption}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Ikon Multi-Foto ala Instagram jika ada > 1 foto */}
              {item.images.length > 1 && (
                <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 backdrop-blur-sm text-white shadow-sm flex items-center gap-1">
                  <Images size={13} />
                  <span className="text-[10px] font-semibold">{item.images.length}</span>
                </div>
              )}
            </div>

            <p className="text-[11px] md:text-xs font-medium text-lilac-900 line-clamp-2 px-1 text-center">
              {item.dateText}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <RomanticButton onClick={onNext}>
          <span>Lihat Perjalanan Kita</span>
          <ArrowRight size={16} />
        </RomanticButton>
      </div>

      {/* Lightbox Modal Carousel */}
      <PhotoLightbox
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onPrev={handlePrevPhoto}
        onNext={handleNextPhoto}
      />
    </div>
  );
};