'use client';

import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Lock scroll while loading
    document.body.style.overflow = 'hidden';

    // Smooth progress counter from 0 to 100 over ~1.8 seconds
    const duration = 1800;
    const startTime = performance.now();

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      // Custom easing curve: start smooth, steady flow, fast snap to 100%
      const easeProgress = Math.floor(rawProgress * 100);
      setProgress(easeProgress);

      if (rawProgress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        // Trigger cinematic flash / bloom
        setIsFinishing(true);

        // Smooth fade out after bloom
        setTimeout(() => {
          setIsDone(true);
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        }, 650);
      }
    };

    const frameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (isDone) return null;

  const letters = ['R', 'A', 'H', 'U', 'L'];

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000] transition-all duration-700 select-none ${
        isFinishing ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Subtle deep ambient glow behind the name */}
      <div
        className={`absolute w-[360px] h-[360px] rounded-full blur-[110px] pointer-events-none transition-all duration-700 ${
          isFinishing
            ? 'bg-blue-500/30 scale-150 opacity-90'
            : 'bg-blue-600/10 scale-100 opacity-60'
        }`}
      />

      {/* Center Cinematic Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Name: R A H U L */}
        <div className="flex items-center justify-center tracking-[0.28em] sm:tracking-[0.34em] md:tracking-[0.4em] pl-[0.28em] sm:pl-[0.34em] md:pl-[0.4em] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-sans">
          {letters.map((char, index) => (
            <span
              key={index}
              className={`inline-block relative text-white transition-all duration-500 ${
                isFinishing
                  ? 'text-white drop-shadow-[0_0_35px_rgba(56,189,248,0.9)]'
                  : ''
              }`}
              style={{
                animation: `letterReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards ${
                  index * 0.12 + 0.15
                }s`,
                opacity: 0,
                transform: 'translateY(24px) scale(0.92)',
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Shimmer light sweep overlay across the whole word */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{
            animation: 'shimmerSweep 1.8s ease-in-out infinite 0.6s',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.4) 40%, rgba(255,255,255,0.9) 50%, rgba(56,189,248,0.4) 60%, transparent 100%)',
            backgroundSize: '200% 100%',
          }}
        />

        {/* Sleek Progress Line Container */}
        <div className="w-[180px] sm:w-[240px] md:w-[280px] h-[2px] bg-white/[0.08] rounded-full overflow-hidden mt-6 sm:mt-8 relative">
          {/* Animated line fill */}
          <div
            className="h-full rounded-full transition-all duration-75 relative"
            style={{
              width: `${progress}%`,
              background:
                'linear-gradient(90deg, rgba(56,189,248,0.6) 0%, rgba(56,189,248,1) 70%, #ffffff 100%)',
              boxShadow: '0 0 12px rgba(56,189,248,0.7)',
            }}
          />
        </div>

        {/* Minimal Percentage Counter & Indicator */}
        <div className="w-[180px] sm:w-[240px] md:w-[280px] flex items-center justify-between mt-3 text-[10px] sm:text-[11px] font-mono tracking-widest text-zinc-500">
          <span className="uppercase tracking-[0.25em] text-[9px] sm:text-[10px] text-zinc-600">
            SYSTEM
          </span>
          <span className="text-zinc-400 font-semibold tabular-nums">
            {progress.toString().padStart(2, '0')}%
          </span>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes letterReveal {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.92);
            filter: blur(6px);
          }
          60% {
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes shimmerSweep {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}

