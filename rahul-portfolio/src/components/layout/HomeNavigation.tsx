'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Box, Mail, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const homeNavItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About', href: '/about', icon: User },
  { label: 'Maya 3D', href: '/maya-3d', icon: Box },
  { label: 'Contact', href: '/contact', icon: Mail },
];

function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

export function HomeNavigation() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-bg/95 backdrop-blur-md border-b border-border/50 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="mx-auto max-w-[1240px] px-6 md:px-10" aria-label="Main navigation">
        <div className="flex items-center justify-between min-h-[60px]">
          {/* Logo - Left */}
          <Link
            to="/"
            className="flex items-center gap-3 text-text font-medium tracking-tight hover:text-accent transition-colors cursor-pointer group flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-accent text-bg flex items-center justify-center font-bold text-sm tracking-wider shadow-sm group-hover:bg-accent-hover transition-colors">
              RM
            </div>
            <span className="hidden sm:inline-flex items-center gap-2 text-sm font-bold tracking-tight text-text leading-tight">
              Rahul M 3D Artist - MAYA Developer
            </span>
          </Link>

          {/* Desktop Navigation Links - Centered */}
          <div className="hidden lg:flex items-center justify-center gap-1 bg-bg-elevated/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/50 mx-auto">
            {homeNavItems.map((item) => {
              const isActive = isActivePath(location.pathname, item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`relative px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer rounded-full flex items-center gap-2 ${
                    isActive ? 'text-accent font-semibold' : 'text-text-muted hover:text-text'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-accent/10 border border-accent/20 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Spacer for centering - Right */}
          <div className="w-9 h-9 flex-shrink-0" />
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-border/50 mt-4 pt-4 bg-bg/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl"
            >
              <div className="space-y-1">
                {homeNavItems.map((item) => {
                  const isActive = isActivePath(location.pathname, item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-2.5 text-sm font-medium rounded-xl transition-colors cursor-pointer flex items-center gap-3 ${
                          isActive
                            ? 'bg-accent/15 text-accent font-semibold'
                            : 'text-text-muted hover:text-text hover:bg-bg-elevated'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}