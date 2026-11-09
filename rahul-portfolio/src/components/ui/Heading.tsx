'use client';

import { type HTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'muted' | 'accent';
  align?: 'left' | 'center' | 'right';
  animate?: boolean;
}

export function Heading({ 
  children, 
  as = 'h2', 
  size = 'h2', 
  weight = 'bold', 
  color = 'default',
  align = 'left',
  animate = true,
  className = '',
  style,
  id,
}: HeadingProps) {
  const sizeStyles = {
    display: 'text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em]',
    h1: 'text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em]',
    h2: 'text-3xl md:text-4xl lg:text-5xl tracking-[-0.01em]',
    h3: 'text-2xl md:text-3xl lg:text-4xl tracking-tight',
    h4: 'text-xl md:text-2xl lg:text-3xl tracking-tight',
    h5: 'text-lg md:text-xl lg:text-2xl tracking-tight'
  };

  const weightStyles = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  const colorStyles = {
    default: 'text-text',
    muted: 'text-text-muted',
    accent: 'text-accent'
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const classNames = `${sizeStyles[size]} ${weightStyles[weight]} ${colorStyles[color]} ${alignStyles[align]} ${className}`;
  const combinedStyle = style as React.CSSProperties | undefined;

  const motionProps = animate ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  } : {};

  // Use a simple approach: render the appropriate motion component directly
  const renderHeading = () => {
    const baseProps = {
      className: classNames,
      style: combinedStyle,
      id,
      ...motionProps,
    };

    switch (as) {
      case 'h1':
        return animate ? (
          <motion.h1 {...baseProps}>{children}</motion.h1>
        ) : (
          <h1 {...baseProps}>{children}</h1>
        );
      case 'h2':
        return animate ? (
          <motion.h2 {...baseProps}>{children}</motion.h2>
        ) : (
          <h2 {...baseProps}>{children}</h2>
        );
      case 'h3':
        return animate ? (
          <motion.h3 {...baseProps}>{children}</motion.h3>
        ) : (
          <h3 {...baseProps}>{children}</h3>
        );
      case 'h4':
        return animate ? (
          <motion.h4 {...baseProps}>{children}</motion.h4>
        ) : (
          <h4 {...baseProps}>{children}</h4>
        );
      case 'h5':
        return animate ? (
          <motion.h5 {...baseProps}>{children}</motion.h5>
        ) : (
          <h5 {...baseProps}>{children}</h5>
        );
      case 'h6':
        return animate ? (
          <motion.h6 {...baseProps}>{children}</motion.h6>
        ) : (
          <h6 {...baseProps}>{children}</h6>
        );
      default:
        return animate ? (
          <motion.h2 {...baseProps}>{children}</motion.h2>
        ) : (
          <h2 {...baseProps}>{children}</h2>
        );
    }
  };

  return renderHeading();
}

Heading.displayName = 'Heading';