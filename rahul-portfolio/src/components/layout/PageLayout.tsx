'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { HomeNavigation } from './HomeNavigation';
import { Footer } from './Footer';
import { BackgroundAnimation } from './BackgroundAnimation';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

const pageTransitions = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }
};

export function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <>
      <BackgroundAnimation />
      <HomeNavigation />
      <motion.main
        id="main-content"
        className={`pt-20 pb-16 min-h-screen ${className}`}
        initial={pageTransitions.initial}
        animate={pageTransitions.animate}
        exit={pageTransitions.exit}
      >
        {children}
      </motion.main>
      <Footer />
    </>
  );
}