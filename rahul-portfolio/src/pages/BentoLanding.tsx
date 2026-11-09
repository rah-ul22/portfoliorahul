'use client';

import { useNavigate } from 'react-router-dom';
import {
  Code2,
  Box,
  FlaskConical,
  GraduationCap
} from 'lucide-react';
import { artistProfile } from '../data/portfolio';
import mayaIcon from '../assets/maya.png';
import photoshopIcon from '../assets/photoshop.png';
import substancePainterIcon from '../assets/substance painter.png';
import unityIcon from '../assets/unity.png';
import profileImg from '../assets/img1.jpeg';

/* ─────────────────────────────────────────────────────────────
   REUSABLE ICONS & GRAPHICS
 ───────────────────────────────────────────────────────────── */

function ArrowCircle({ className = '' }: { className?: string }) {
  return (
    <div
      className={`w-9 h-9 rounded-full border border-white/[0.12] bg-[#1a1a1e]/80 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-white/30 group-hover:scale-105 transition-all duration-300 shrink-0 ${className}`}
    >
      <svg
        className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" />
      </svg>
    </div>
  );
}

function SparkleStar({ className = 'w-7 h-7 text-zinc-500' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
    </svg>
  );
}

function SignatureGraphic() {
  return (
    <svg
      className="w-32 h-14 text-zinc-400/90 select-none"
      viewBox="0 0 160 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 42C25 38 42 22 45 15C47 10 39 8 35 18C30 30 32 48 48 45C60 42 75 25 82 20C88 15 85 28 80 35C75 42 90 32 105 24C115 18 125 15 135 22C140 26 138 34 130 38C120 42 135 36 148 30" />
      <path d="M45 49C70 47 105 45 142 44" strokeDasharray="3 3" opacity="0.35" />
    </svg>
  );
}

// @ts-expect-error - Used in JSX below
function InstagramIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   CARD BASE WRAPPER
 ───────────────────────────────────────────────────────────── */

function BentoCard({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={`group relative rounded-[24px] bg-[#141417] border border-white/[0.07] hover:border-white/[0.14] transition-all duration-300 shadow-xl shadow-black/40 overflow-hidden flex flex-col justify-between ${onClick ? 'cursor-pointer' : ''
        } ${className}`}
    >
      {/* Subtle top sheen */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
 ───────────────────────────────────────────────────────────── */

export default function BentoLanding() {
  const navigate = useNavigate();

  const goAbout = () => navigate('/about');
  const goCredentials = () => navigate('/certifications');
  const goProjects = () => navigate('/maya-3d');
  const goSkills = () => navigate('/skills');
  const goServices = () => navigate('/specialization');
  const goProfiles = () => navigate('/projects');
  const goAchievements = () => navigate('/experience');
  const goContact = () => navigate('/contact');

  return (
    <main className="min-h-screen bg-[#0b0b0d] text-white selection:bg-blue-500/30 selection:text-white flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Centered compact container (840px - 850px width matching reference) */}
      <div className="w-full max-w-[850px] mx-auto flex flex-col gap-4">

        {/* ═══════════════════════════════════════════════════════
            TOP ROW: Profile Card (2 cols) + Ticker & Right Cards (2 cols)
        ═══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* CARD 1: PROFILE INTRODUCTION (Spans 2 columns) */}
          <BentoCard
            onClick={goAbout}
            className="md:col-span-2 p-6 sm:p-7 justify-center min-h-[240px]"
          >
            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
              {/* Profile image */}
              <div className="w-[125px] h-[125px] sm:w-[140px] sm:h-[140px] rounded-2xl overflow-hidden shadow-lg shrink-0">
                <img
                  src={profileImg}
                  alt={artistProfile.name}
                  className="w-full h-full object-cover bg-[#1a1a24]"
                />
              </div>

              {/* Text column */}
              <div className="flex-1 min-w-0 text-center sm:text-left flex flex-col justify-between">
                <div>
                  {/* <p className="text-[10px] font-semibold tracking-[0.14em] text-zinc-400 uppercase">
                    A 3D ARTIST & DEVELOPER
                  </p> */}
                  <h1 className="text-2xl sm:text-[28px] font-bold text-white mt-1 tracking-tight leading-tight">
                    {artistProfile.name}.
                  </h1>
                  <p className="text-xs sm:text-[13px] text-zinc-400 mt-2 leading-relaxed">
                    Experienced in concept development, modeling, clean topology, UV unwrapping, PBR texturing, and final rendering using Autodesk Maya and Adobe Substance 3D Painter.
                  </p>
                </div>

                <div className="flex justify-end mt-4">
                  <ArrowCircle />
                </div>
              </div>
            </div>
          </BentoCard>

          {/* RIGHT SIDE: TICKER + CREDENTIALS & PROJECTS */}
          <div className="md:col-span-2 flex flex-col gap-4">

            {/* ANIMATED HORIZONTAL TICKER (Spans across both cards) */}
            <div className="rounded-full bg-[#141417] border border-white/[0.07] py-2 px-4 overflow-hidden flex items-center select-none shadow-md">
              <div
                className="flex whitespace-nowrap gap-4"
                style={{
                  animation: 'bentoTicker 16s linear infinite',
                }}
              >
                {[...Array(6)].map((_, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-4 text-[10px] font-semibold tracking-[0.18em] text-zinc-400 uppercase"
                  >
                    <span>LATEST WORK AND FEATURED</span>
                    <span className="text-zinc-600">✦</span>
                  </span>
                ))}
              </div>
            </div>

            {/* CARDS 2 & 3 SIDE-BY-SIDE */}
            <div className="grid grid-cols-2 gap-4 flex-1">

              {/* CARD 2: ABOUT ME / CREDENTIALS (1 col) */}
              <BentoCard
                onClick={goCredentials}
                className="p-5 sm:p-6 min-h-[165px]"
              >
                {/* Signature Graphic in upper section */}
                <div className="flex items-center justify-center pt-2 pb-1">
                  <SignatureGraphic />
                </div>

                {/* Footer Label + Title + Arrow */}
                <div className="flex items-end justify-between mt-auto pt-3">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.14em] text-zinc-400 uppercase">
                      MORE ABOUT ME
                    </p>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-0.5 leading-tight">
                      Credentials
                    </h3>
                  </div>
                  <ArrowCircle />
                </div>
              </BentoCard>

              {/* CARD 3: PROJECTS / SHOWCASE (1 col) */}
              <BentoCard
                onClick={goProjects}
                className="p-5 sm:p-6 min-h-[165px]"
              >
                {/* Project preview in upper-middle */}
                <div className="flex items-center justify-center pt-1 pb-1">
                  <div className="w-24 h-14 rounded-xl overflow-hidden bg-[#1a1a20] border border-white/[0.08] flex items-center justify-center shadow-inner relative group-hover:scale-105 transition-transform duration-300">
                    <img
                      src="/images/maya-building.svg"
                      alt="Project Preview"
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                </div>

                {/* Footer Label + Title + Arrow */}
                <div className="flex items-end justify-between mt-auto pt-3">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.14em] text-zinc-400 uppercase">
                      SHOWCASE
                    </p>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-0.5 leading-tight">
                      MAYA Projects
                    </h3>
                  </div>
                  <ArrowCircle />
                </div>
              </BentoCard>

            </div>

          </div>

        </div>

        {/* ═══════════════════════════════════════════════════════
            MIDDLE ROW: Skills (1 col) + Services (2 cols) + Profiles (1 col)
        ═══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* CARD 4: SKILLS (1 col) */}
          <BentoCard
            onClick={goSkills}
            className="md:col-span-1 p-5 sm:p-6 min-h-[175px]"
          >
            {/* Graphic in upper section */}
            <div className="flex items-center justify-center gap-3 pt-3 pb-2">
              <div className="w-10 h-10 rounded-2xl bg-[#1c1c22] border border-white/[0.08] flex items-center justify-center text-blue-400 shadow-md">
                <Box className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#1c1c22] border border-white/[0.08] flex items-center justify-center text-purple-400 shadow-md">
                <Code2 className="w-5 h-5" />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-end justify-between mt-auto pt-4">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.14em] text-zinc-400 uppercase">
                  SPECIALIZATION
                </p>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5 leading-tight">
                  Skills
                </h3>
              </div>
              <ArrowCircle />
            </div>
          </BentoCard>

          {/* CARD 5: SERVICES OFFERING (2 cols) */}
          <BentoCard
            onClick={goServices}
            className="md:col-span-2 p-5 sm:p-6 min-h-[175px]"
          >
            {/* Four minimalist icons arranged horizontally in upper-middle */}
            <div className="flex items-center justify-around px-2 pt-3 pb-2">
              <div className="flex flex-col items-center gap-1.5 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                <div className="w-11 h-11 rounded-2xl bg-[#1c1c22] border border-white/[0.06] flex items-center justify-center shadow-inner overflow-hidden">
                  <img src={mayaIcon} alt="Autodesk Maya" className="w-14 h-14 object-contain" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                <div className="w-11 h-11 rounded-2xl bg-[#1c1c22] border border-white/[0.06] flex items-center justify-center shadow-inner overflow-hidden">
                  <img src={photoshopIcon} alt="Adobe Photoshop" className="w-14 h-14 object-contain" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                <div className="w-11 h-11 rounded-2xl bg-[#1c1c22] border border-white/[0.06] flex items-center justify-center shadow-inner overflow-hidden">
                  <img src={substancePainterIcon} alt="Adobe Substance 3D Painter" className="w-10 h-10 object-contain" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                <div className="w-11 h-11 rounded-2xl bg-[#1c1c22] border border-white/[0.06] flex items-center justify-center shadow-inner overflow-hidden">
                  <img src={unityIcon} alt="Unity" className="w-14 h-14 object-contain" />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-end justify-between mt-auto pt-4">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.14em] text-zinc-400 uppercase">
                  SPECIALIZATION
                </p>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5 leading-tight">
                  Services Offering
                </h3>
              </div>
              <ArrowCircle />
            </div>
          </BentoCard>

          {/* CARD 6: ACADEMIC & RESEARCH PROJECTS (1 col) */}
          <BentoCard
            onClick={goProfiles}
            className="md:col-span-1 p-5 sm:p-6 min-h-[175px]"
          >
            {/* Research/Academic icons */}
            <div className="flex items-center justify-center gap-2.5 pt-3 pb-2">
              <div className="w-10 h-10 rounded-2xl bg-[#1c1c22] border border-white/[0.08] flex items-center justify-center text-blue-400 shadow-md">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#1c1c22] border border-white/[0.08] flex items-center justify-center text-purple-400 shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-end justify-between mt-auto pt-4">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.14em] text-zinc-400 uppercase">
                  TECHNICAL IMPLEMENTATIONS
                </p>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5 leading-tight">
                  Academic Projects
                </h3>
              </div>
              <ArrowCircle />
            </div>
          </BentoCard>

        </div>

        {/* ═══════════════════════════════════════════════════════
            BOTTOM ROW: Statistics (2 cols) + Contact (2 cols)
        ═══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* CARD 7: STATISTICS (2 cols) */}
          <BentoCard
            onClick={goAchievements}
            className="md:col-span-2 p-5 sm:p-6 justify-center min-h-[175px]"
          >
            {/* Three horizontal stat boxes */}
            <div className="flex items-center gap-3 w-full">
              {/* Box 1: Experience */}
              <div className="flex-1 bg-[#1a1a20] border border-white/[0.06] rounded-2xl p-4 text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">
                  FRESHER
                </p>
                <p className="text-[9px] sm:text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mt-2">
                  FRESHER
                </p>
              </div>

              {/* Box 2: Projects */}
              <div className="flex-1 bg-[#1a1a20] border border-white/[0.06] rounded-2xl p-4 text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">
                  10+
                </p>
                <p className="text-[9px] sm:text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mt-2">
                  PROJECTS
                  <br />
                  COMPLETED
                </p>
              </div>

              {/* Box 3: Certifications */}
              <div className="flex-1 bg-[#1a1a20] border border-white/[0.06] rounded-2xl p-4 text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">
                  05
                </p>
                <p className="text-[9px] sm:text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mt-2">
                  CERTIFICATE
                  <br />
                  
                </p>
              </div>
            </div>
          </BentoCard>

          {/* CARD 8: LET'S WORK TOGETHER (2 cols) */}
          <BentoCard
            onClick={goContact}
            className="md:col-span-2 p-6 sm:p-7 justify-between min-h-[175px]"
          >
            {/* Sparkle star top-left */}
            <div className="flex items-center justify-between">
              <SparkleStar className="w-6 h-6 text-zinc-500" />
            </div>

            {/* Main two-line heading with gradient highlight */}
            <div className="flex items-end justify-between mt-auto pt-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                  Let's
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                    work together.
                  </span>
                </h2>
              </div>
              <ArrowCircle className="w-11 h-11" />
            </div>
          </BentoCard>

        </div>

        {/* Subtle bottom footer copyright */}
        <p className="text-center text-[11px] text-zinc-600 mt-2 select-none">
          © {new Date().getFullYear()} {artistProfile.name}. All rights reserved.
        </p>

      </div>

      {/* Marquee ticker CSS animation */}
      <style>{`
        @keyframes bentoTicker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}