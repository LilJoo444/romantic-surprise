import React from 'react';
import { motion } from 'framer-motion';

interface RomanticButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export const RomanticButton: React.FC<RomanticButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  ariaLabel,
  disabled = false,
}) => {
  const getStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-lilac-500 via-lilac-600 to-purple-600 text-white shadow-lg shadow-lilac-500/30 hover:shadow-lilac-500/50 border border-lilac-300/40';
      case 'secondary':
        return 'bg-white/80 hover:bg-white text-lilac-800 border border-lilac-200 shadow-md shadow-lilac-300/20';
      case 'ghost':
        return 'bg-transparent hover:bg-lilac-100/50 text-lilac-700';
    }
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.04 }}
      whileTap={disabled ? {} : { scale: 0.96 }}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || (typeof children === 'string' ? children : 'Tombol interaktif')}
      className={`min-h-[48px] px-7 py-3 rounded-full font-medium text-sm md:text-base flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 select-none ${getStyles()} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </motion.button>
  );
};