'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import bgImage from '../../assets/img2.jpeg';

/* ─────────────────────────────────────────────
   Static seed-based pseudo-random helper
   (keeps the same values across renders)
───────────────────────────────────────────── */
function seededRand(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

/* ─────────────────────────────────────────────
   PARTICLE CONFIG
───────────────────────────────────────────── */
const PARTICLE_COUNT = 48;

interface Particle {
  id: number;
  x: number;      // % left
  y: number;      // % top
  size: number;   // px
  opacity: number;
  duration: number;
  delay: number;
  xDrift: number; // px drift during float
  yDrift: number;
}

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: seededRand(i * 3)      * 100,
    y: seededRand(i * 7 + 1)  * 100,
    size: 1 + seededRand(i * 11 + 2) * 2.5,       // 1–3.5 px
    opacity: 0.06 + seededRand(i * 13 + 3) * 0.18, // 0.06–0.24
    duration: 12 + seededRand(i * 17 + 4) * 20,    // 12–32 s
    delay: seededRand(i * 19 + 5) * -20,            // stagger start
    xDrift: (seededRand(i * 23 + 6) - 0.5) * 60,  // ±30 px
    yDrift: (seededRand(i * 29 + 7) - 0.5) * 80,  // ±40 px
  }));
}

/* ─────────────────────────────────────────────
   SLOW DRIFT ORBS CONFIG
───────────────────────────────────────────── */
const ORB_CONFIGS = [
  { cx: '8%',  cy: '20%', w: 500, h: 400, duration: 28, delay: 0,   dx: 40,  dy: 50  },
  { cx: '80%', cy: '10%', w: 420, h: 420, duration: 34, delay: -8,  dx: -50, dy: 60  },
  { cx: '15%', cy: '70%', w: 380, h: 480, duration: 30, delay: -15, dx: 60,  dy: -40 },
  { cx: '75%', cy: '65%', w: 460, h: 350, duration: 36, delay: -5,  dx: -40, dy: -55 },
  { cx: '50%', cy: '45%', w: 300, h: 300, duration: 22, delay: -11, dx: 30,  dy: 35  },
];

/* ─────────────────────────────────────────────
   GRID LINE PULSE BARS
───────────────────────────────────────────── */
const GRID_BARS = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  isHorizontal: i % 2 === 0,
  position: 15 + i * 14,  // %
  duration: 6 + i * 2.5,
  delay: i * 1.4,
}));

/* ─────────────────────────────────────────────
   SHOOTING STAR LINES
───────────────────────────────────────────── */
const SHOOTING_STARS = [
  { x: '10%', y: '25%', angle: 20,  duration: 5,  delay: 3   },
  { x: '60%', y: '8%',  angle: 15,  duration: 7,  delay: 10  },
  { x: '30%', y: '70%', angle: 25,  duration: 6,  delay: 18  },
  { x: '80%', y: '50%', angle: 18,  duration: 5,  delay: 25  },
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export function BackgroundAnimation() {
  const particles = useMemo(() => generateParticles(), []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none"
    >
      {/* ── BACKGROUND IMAGE ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.08,
          filter: 'blur(1px)',
        }}
      />

      {/* ── SLOW DRIFT ORBS ── */}
      {ORB_CONFIGS.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-[120px]"
          style={{
            left: orb.cx,
            top:  orb.cy,
            width:  orb.w,
            height: orb.h,
            translateX: '-50%',
            translateY: '-50%',
            background: i === 1
              ? 'radial-gradient(ellipse, rgba(100,120,255,0.03) 0%, transparent 70%)'
              : i === 2
                ? 'radial-gradient(ellipse, rgba(255,255,255,0.025) 0%, transparent 70%)'
                : i === 4
                  ? 'radial-gradient(ellipse, rgba(80,180,255,0.02) 0%, transparent 70%)'
                  : 'radial-gradient(ellipse, rgba(228,228,231,0.025) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, orb.dx, 0, -orb.dx, 0],
            y: [0, orb.dy, 0, -orb.dy * 0.6, 0],
            scale: [1, 1.08, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* ── GRID SCAN LINES ── */}
      {GRID_BARS.map(bar => (
        <motion.div
          key={`bar-${bar.id}`}
          className="absolute"
          style={
            bar.isHorizontal
              ? { left: 0, right: 0, top: `${bar.position}%`, height: 1 }
              : { top: 0, bottom: 0, left: `${bar.position}%`, width: 1 }
          }
          animate={{ opacity: [0, 0.06, 0] }}
          transition={{
            duration: bar.duration,
            delay: bar.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className="w-full h-full"
            style={{
              background: bar.isHorizontal
                ? 'linear-gradient(90deg, transparent 0%, rgba(228,228,231,0.5) 30%, rgba(228,228,231,0.9) 50%, rgba(228,228,231,0.5) 70%, transparent 100%)'
                : 'linear-gradient(180deg, transparent 0%, rgba(228,228,231,0.5) 30%, rgba(228,228,231,0.9) 50%, rgba(228,228,231,0.5) 70%, transparent 100%)',
            }}
          />
        </motion.div>
      ))}

      {/* ── FLOATING PARTICLES ── */}
      {particles.map(p => (
        <motion.div
          key={`p-${p.id}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top:  `${p.y}%`,
            width:  p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            x: [0, p.xDrift, 0, -p.xDrift * 0.5, 0],
            y: [0, p.yDrift, 0, -p.yDrift * 0.7, 0],
            opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.6, p.opacity * 0.9, p.opacity * 0.4],
            scale:   [1, 1.3, 0.8, 1.1, 1],
          }}
          transition={{
            duration: p.duration,
            delay:    p.delay,
            repeat:   Infinity,
            ease:     'easeInOut',
          }}
        />
      ))}

      {/* ── SHOOTING STARS (periodic) ── */}
      {SHOOTING_STARS.map((star, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute overflow-hidden"
          style={{
            left: star.x,
            top:  star.y,
            width: 120,
            height: 2,
            rotate: star.angle,
            transformOrigin: 'left center',
            borderRadius: 999,
          }}
          animate={{
            x:       ['-120px', '100vw'],
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: star.duration,
            delay:    star.delay,
            repeat:   Infinity,
            repeatDelay: 18 + i * 6,
            ease:     [0.25, 0, 0.75, 1],
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(228,228,231,0.6) 50%, rgba(255,255,255,0.9) 100%)',
            }}
          />
        </motion.div>
      ))}

      {/* ── SUBTLE VIGNETTE ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(10,10,11,0.4) 100%)',
        }}
      />
    </div>
  );
}

