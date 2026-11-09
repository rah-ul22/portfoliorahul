'use client';

import { Link } from 'react-scroll';
import { Mail, Globe } from 'lucide-react';
import { Text, Heading } from '../ui';
import { artistProfile } from '../../data/portfolio';

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 1.64 1.64 1.64 1.64 0 0 0-1.64-1.64Z" />
    </svg>
  );
}

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const currentYear = 2026;

export function Footer() {

  return (
    <footer className="border-t border-border/50 bg-bg-elevated/30">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-12 lg:py-16">
        <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              to="home"
              smooth={true}
              duration={500}
              className="flex items-center gap-2.5 text-text font-bold tracking-tight mb-4 hover:text-accent transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-accent text-bg flex items-center justify-center font-bold text-xs tracking-wider">
                RM
              </div>
              <span className="text-lg font-bold">Rahul M</span>
            </Link>
            <Text size="sm" color="muted" className="max-w-sm mb-6 leading-relaxed">
              IT & Technology Professional and 3D Artist. Specializing in Autodesk Maya hard-surface modeling, 
              PBR texturing, machine learning research, and Power BI dashboards.
            </Text>
            
            <div className="flex items-center gap-3">
              <a 
                href={`mailto:${artistProfile.email}`}
                className="w-9 h-9 rounded-xl bg-bg border border-border/60 hover:border-accent/40 flex items-center justify-center text-text-muted hover:text-accent transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com/in/rahulm1604"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-bg border border-border/60 hover:border-accent/40 flex items-center justify-center text-text-muted hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://github.com/rahul1604-m"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-bg border border-border/60 hover:border-accent/40 flex items-center justify-center text-text-muted hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://rahul1604-m.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-bg border border-border/60 hover:border-accent/40 flex items-center justify-center text-text-muted hover:text-accent transition-colors"
                aria-label="Portfolio"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <Heading as="h4" size="h5" weight="semibold" animate={false} className="mb-4 text-xs font-mono uppercase tracking-wider text-text-subtle">
              Portfolio Index
            </Heading>
            <nav className="space-y-2.5 text-xs font-medium">
              {[
                { label: 'Home', href: 'home' },
                { label: 'Education', href: 'education' },
                { label: 'Certifications', href: 'certifications' },
                { label: 'Projects', href: 'projects' },
                { label: 'Maya 3D Works', href: 'portfolio-3d' },
                { label: 'Download Resume', href: 'resume' }
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="block text-text-muted hover:text-accent transition-colors cursor-pointer"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Details */}
          <div>
            <Heading as="h4" size="h5" weight="semibold" animate={false} className="mb-4 text-xs font-mono uppercase tracking-wider text-text-subtle">
              Direct Contact
            </Heading>
            <div className="space-y-2.5 text-xs text-text-muted font-mono">
              <div>
                <span className="text-text-subtle block text-[10px]">EMAIL</span>
                <a href={`mailto:${artistProfile.email}`} className="text-text hover:text-accent transition-colors">
                  {artistProfile.email}
                </a>
              </div>
              <div>
                <span className="text-text-subtle block text-[10px]">LOCATION</span>
                <span className="text-text">{artistProfile.location}</span>
              </div>
              <div>
                <span className="text-text-subtle block text-[10px]">STATUS</span>
                <span className="text-accent flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Available for Opportunities
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-subtle">
          <span>&copy; {currentYear} Rahul M. All rights reserved.</span>
          <span className="flex items-center gap-1.5 font-mono">
            <span>Built with React 19, Three.js & Tailwind CSS</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
