import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const BackgroundEffects: React.FC = () => {
  const petals = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      size: Math.random() * 14 + 10,
      startX: Math.random() * 100,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 8,
      rotation: Math.random() * 360,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft Gradient Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-lilac-300/30 blur-3xl animate-pulse-glow" />
      <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-purple-300/25 blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-lilac-200/40 blur-3xl" />

      {/* Floating Lilac Petals */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{
            y: '-10vh',
            x: `${petal.startX}vw`,
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: '110vh',
            x: `${petal.startX + (Math.sin(petal.id) * 8)}vw`,
            rotate: petal.rotation + 360,
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: 'linear',
          }}
          className="absolute"
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 24 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-lilac-400/50 drop-shadow-sm"
          >
            <path
              d="M12 0C12 0 0 10 0 20C0 26.6274 5.37258 32 12 32C18.6274 32 24 26.6274 24 20C24 10 12 0 12 0Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};