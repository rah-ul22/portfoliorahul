'use client';

import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export function Card({ 
  children, 
  variant = 'default', 
  hover = false, 
  padding = 'md',
  className = '',
  onClick
}: CardProps) {
  const variantStyles = {
    default: 'bg-bg-elevated',
    elevated: 'bg-bg-elevated shadow-xl',
    outlined: 'bg-transparent border border-border'
  };

  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <motion.div
      className={`${variantStyles[variant]} ${paddingStyles[padding]} rounded-xl ${className}`}
      whileHover={hover ? { y: -4, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.4)' } : undefined}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

Card.displayName = 'Card';