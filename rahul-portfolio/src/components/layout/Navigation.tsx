'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, LayoutGrid, Home, User, Code, Award, Mail, Briefcase } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About', href: '/about', icon: User },
  { label: 'Skills', href: '/skills', icon: Code },
  { label: 'Projects', href: '/projects', icon: LayoutGrid },
  { label: 'Certifications', href: '/certifications', icon: Award },
  { label: 'Experience', href: '/experience', icon: Briefcase },
  { label: 'Contact', href: '/contact', icon: Mail },
];

// Check if current path matches or is a child of the nav item
function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

export function Navigation() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHomepage, setIsHomepage] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setIsNavbarVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsNavbarVisible(true);
      }
      
      // Show background when scrolled past threshold
      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Track if we're on homepage
  useEffect(() => {
    setIsHomepage(location.pathname === '/');
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Navbar should have background on homepage OR when scrolled
  const hasBackground = isHomepage || isScrolled;

  return (
    <AnimatePresence>
      {isNavbarVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            hasBackground 
              ? 'bg-bg/95 backdrop-blur-md border-b border-border/50 py-3' 
              : 'bg-transparent py-5'
          }`}
        >
      <nav className="mx-auto max-w-[1240px] px-6 md:px-10" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 text-text font-medium tracking-tight hover:text-accent transition-colors cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-accent text-bg flex items-center justify-center font-bold text-sm tracking-wider shadow-sm group-hover:bg-accent-hover transition-colors">
              RM
            </div>
            <span className="hidden sm:inline-flex items-center gap-2 text-sm font-bold tracking-tight text-text leading-tight">
              Rahul M 3D Artist - MAYA Developer
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-bg-elevated/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/50">
            {navItems.map((item) => {
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

          {/* Desktop Right CTA - Resume only (Projects is in nav) */}
          <div className="hidden sm:flex items-center gap-3">
            <a href="/resume/Rahul_M_Resume.pdf" download="Rahul_M_Resume.pdf">
              <Button size="sm" variant="secondary" className="gap-1.5 text-xs">
                <Download className="w-3.5 h-3.5" />
                Resume
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-xl text-text-muted hover:text-text hover:bg-bg-elevated transition-colors border border-border/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
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
                {navItems.map((item) => {
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
                <div className="pt-4 border-t border-border/50 flex flex-col gap-2.5 mt-3">
                  <a href="/resume/Rahul_M_Resume.pdf" download="Rahul_M_Resume.pdf">
                    <Button variant="secondary" className="w-full gap-2 text-xs">
                      <Download className="w-4 h-4" />
                      Download Resume (PDF)
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
      )}
    </AnimatePresence>
  );
}