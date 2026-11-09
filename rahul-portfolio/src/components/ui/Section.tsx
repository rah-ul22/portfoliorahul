'use client';

import { motion } from 'framer-motion';
import { Container } from './Container';

interface SectionProps {
  id?: string;
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  animate?: boolean;
  children: React.ReactNode;
}

export function Section({ 
  id, 
  className = '', 
  containerSize = 'xl', 
  animate = true, 
  children,
}: SectionProps) {
  if (animate) {
    return (
      <motion.section
        id={id}
        className={`py-16 md:py-20 lg:py-24 ${className}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      >
        <Container size={containerSize}>
          {children}
        </Container>
      </motion.section>
    );
  }

  return (
    <section
      id={id}
      className={`py-16 md:py-20 lg:py-24 ${className}`}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
}

Section.displayName = 'Section';