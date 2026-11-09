'use client';

import { motion } from 'framer-motion';
import { Box, Layers, Palette, Code2, Scissors } from 'lucide-react';
import { Section, Heading, Text, Card } from '../ui';
import { artistProfile } from '../../data/portfolio';
import profileImg from '../../assets/img1.jpeg';

const expertiseAreas = [
  {
    title: 'Hard-Surface Modeling',
    description: 'Precision engineering of mechanical assemblies, industrial equipment, vehicles. ',
    icon: Box,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20'
  },
  {
    title: 'UV Mapping & Unwrapping',
    description: 'Expert UV layout design including UDIM workflows, optimal seam placement, texel density management. ',
    icon: Scissors,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20'
  },
  {
    title: 'PBR Texturing & Materials',
    description: 'Complete physically-based rendering workflow using Substance Painter — smart materials. ',
    icon: Palette,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20'
  },
  {
    title: 'Architectural Visualization',
    description: 'Large-scale commercial and residential environments with modular facade systems, curtain wall.',
    icon: Layers,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20'
  },
  {
    title: 'Product & Prop Design',
    description: 'Hero assets for games and visualization — sci-fi weapons, vintage electronics, tactical tools.',
    icon: Box,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20'
  },
  {
    title: 'Technical Pipeline & Scripting',
    description: 'Maya Python (PyMEL) scripting for automation, custom tooling, batch processing.',
    icon: Code2,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20'
  }
];

export function About() {
  return (
    <Section id="about" className="relative">
      {/* Profile + Content Layout */}
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left: Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:sticky lg:top-24"
          >
            <div className="w-full max-w-xs mx-auto lg:mx-0 aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={profileImg}
                alt={artistProfile.name}
                className="w-full h-full object-cover bg-[#1a1a24]"
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          >
            {/* Section Title */}
            <div className="mb-8">
              <Heading as="h2" size="h1" weight="bold" className="mb-4">
                About
              </Heading>
            </div>

            {/* Long Bio */}
            <div className="mb-12">
              <Text size="lg" color="muted" className="leading-relaxed space-y-4">
                {artistProfile.longBio.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </Text>
            </div>

            {/* Expertise Areas Grid */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {expertiseAreas.map((area, index) => {
                  const Icon = area.icon;
                  return (
                    <motion.div
                      key={area.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                    >
                      <Card 
                        variant="outlined" 
                        padding="lg" 
                        className={`h-full bg-bg-elevated/40 border-border/60 hover:border-accent/30 transition-all duration-300 backdrop-blur-sm group ${area.bg} ${area.border}`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${area.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Heading as="h3" size="h5" weight="bold" animate={false} className="text-text mb-2 group-hover:text-accent transition-colors">
                              {area.title}
                            </Heading>
                            <Text size="sm" color="muted" className="leading-relaxed">
                              {area.description}
                            </Text>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}