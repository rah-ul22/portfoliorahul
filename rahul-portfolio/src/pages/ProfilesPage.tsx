'use client';

import { PageLayout } from '../components/layout/PageLayout';
import { artistProfile } from '../data/portfolio';

function GithubIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 1.64 1.64 1.64 1.64 0 0 0-1.64-1.64Z" />
    </svg>
  );
}

function InstagramIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function MailIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function GlobeIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

const profileCards = [
  {
    id: 'github',
    platform: 'GitHub',
    handle: '@rahul1604-m',
    description: 'Open-source projects, Python scripts, data analysis notebooks, and Maya tools.',
    url: 'https://github.com/rahul1604-m',
    Icon: GithubIcon,
    color: 'text-zinc-200',
    ring: 'ring-zinc-700',
    glow: '',
    label: 'View GitHub',
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    handle: 'Rahul M',
    description: 'Professional profile, recommendations, work experience and academic achievements.',
    url: 'https://linkedin.com/in/rahulm1604',
    Icon: LinkedinIcon,
    color: 'text-blue-400',
    ring: 'ring-blue-700/50',
    glow: 'shadow-blue-900/30',
    label: 'Connect on LinkedIn',
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    handle: '@rahul',
    description: 'Visual updates, 3D renders, and behind-the-scenes creation process.',
    url: 'https://instagram.com',
    Icon: InstagramIcon,
    color: 'text-pink-400',
    ring: 'ring-pink-700/40',
    glow: 'shadow-pink-900/20',
    label: 'Follow on Instagram',
  },
  {
    id: 'email',
    platform: 'Email',
    handle: 'rahulmurugam1812@gmail.com',
    description: 'Reach out directly for collaborations, freelance work, or project inquiries.',
    url: 'mailto:rahulmurugam1812@gmail.com',
    Icon: MailIcon,
    color: 'text-green-400',
    ring: 'ring-green-700/40',
    glow: 'shadow-green-900/20',
    label: 'Send Email',
  },
  {
    id: 'portfolio',
    platform: 'Portfolio Site',
    handle: 'rahul1604-m.github.io',
    description: 'Live portfolio site hosted on GitHub Pages featuring 3D projects and case studies.',
    url: 'https://rahul1604-m.github.io',
    Icon: GlobeIcon,
    color: 'text-purple-400',
    ring: 'ring-purple-700/40',
    glow: 'shadow-purple-900/20',
    label: 'Visit Portfolio',
  },
];

export default function ProfilesPage() {
  const { name } = artistProfile;

  return (
    <PageLayout>
      <section className="py-20 px-4 min-h-screen bg-[#0b0b0d]">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase mb-3">
              STAY WITH ME
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Social Profiles</h1>
            <p className="text-zinc-400 mt-4 max-w-md mx-auto leading-relaxed">
              Connect with {name} across platforms — from GitHub projects to LinkedIn networking.
            </p>
          </div>

          {/* Profile Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {profileCards.map((p) => {
              const Icon = p.Icon;
              return (
                <a
                  key={p.id}
                  href={p.url}
                  target={p.id !== 'email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`group relative rounded-2xl bg-[#141417] border border-white/[0.07] hover:border-white/[0.14] p-6 flex flex-col gap-4 transition-all duration-300 shadow-xl shadow-black/30 hover:shadow-2xl ${p.glow}`}
                >
                  {/* Icon circle */}
                  <div className={`w-14 h-14 rounded-full ring-1 ${p.ring} bg-[#1c1c22] flex items-center justify-center ${p.color} transition-transform duration-200 group-hover:scale-105`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Text */}
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.14em] text-zinc-500 uppercase">{p.platform}</p>
                    <h3 className="text-white font-semibold mt-0.5 text-sm">{p.handle}</h3>
                    <p className="text-zinc-400 text-xs mt-2 leading-relaxed">{p.description}</p>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-zinc-400 group-hover:text-white transition-colors">
                    <span>{p.label}</span>
                    <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" />
                    </svg>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

