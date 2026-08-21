import React from 'react';
import { motion } from 'framer-motion';
import { timelineData } from '../data/timeline';
import { RomanticButton } from './RomanticButton';
import { Sparkles, Heart, Coffee, Star, ArrowRight } from 'lucide-react';

interface TimelineProps {
  onNext: () => void;
}

export const Timeline: React.FC<TimelineProps> = ({ onNext }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'sparkles': return <Sparkles size={16} className="text-yellow-500" />;
      case 'heart': return <Heart size={16} className="text-pink-500 fill-pink-400" />;
      case 'coffee': return <Coffee size={16} className="text-purple-500" />;
      case 'star': return <Star size={16} className="text-purple-600 fill-purple-300" />;
      default: return <Heart size={16} className="text-lilac-500" />;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-lilac-100 text-lilac-700 mb-2">
          <Sparkles size={12} /> Jejak Waktu
        </span>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-lilac-900">
          Perjalanan kecil kita 💜
        </h2>
        <p className="text-xs md:text-sm text-lilac-700 mt-1">
          perjalanan dari awal kita ketemu sampe sekarang.
        </p>
      </motion.div>

      {/* Vertical Timeline */}
      <div className="relative border-l-2 border-lilac-300 ml-4 pl-6 space-y-6 my-6">
        {timelineData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            className="relative group"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[35px] top-1 w-7 h-7 rounded-full bg-white border-2 border-lilac-400 shadow-md flex items-center justify-center">
              {getIcon(item.iconType)}
            </div>

            <div className="glass-card p-4 rounded-2xl border border-lilac-200 hover:border-lilac-400 transition-all">
              <span className="text-[10px] font-bold text-lilac-600 uppercase tracking-wider">{item.date}</span>
              <h3 className="font-heading text-base font-bold text-lilac-950 mt-0.5">{item.title}</h3>
              <p className="text-xs text-lilac-800 mt-1 leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <RomanticButton onClick={onNext} className="w-full">
          <span>Kejutan Selanjutnya</span>
          <ArrowRight size={16} />
        </RomanticButton>
      </div>
    </div>
  );
};