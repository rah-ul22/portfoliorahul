'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, Box, Palette, Image, Grid, Scissors } from 'lucide-react';
import { Link } from 'react-scroll';
import { Button, Heading, Text, Container } from '../ui';
import { artistProfile } from '../../data/portfolio';

const heroSkills = [
  {
    name: 'Autodesk Maya',
    description: 'Industry-standard 3D modeling, animation, and rendering software. ',
    icon: Box
  },
  {
    name: 'Adobe Substance 3D Painter',
    description: 'Professional PBR texturing suite for creating realistic materials. ',
    icon: Palette
  },
  {
    name: 'Adobe Photoshop',
    description: 'Essential for texture editing, matte painting, and post-processing renders. ',
    icon: Image
  },
  {
    name: 'UV Mapping',
    description: 'Precise UV layout creation for efficient texture space utilization. ',
    icon: Grid
  },
  {
    name: 'UV Unwrapping',
    description: 'Advanced unwrapping techniques for complex hard-surface and organic models.',
    icon: Scissors
  },
  {
    name: '3D Texturing',
    description: 'Complete PBR texturing workflow from base materials to final renders.',
    icon: Box
  }
];

export function Hero() {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-accent)/0.04_0%,_transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_var(--color-bg)_0%,_transparent_40%,_var(--color-bg)_100%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] bg-[size:60px_60px] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] pointer-events-none" />

      {/* Floating subtle ambient lights */}
      <motion.div
        className="absolute top-1/4 left-[15%] w-72 h-72 rounded-full bg-accent/5 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-[15%] w-80 h-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <Container size="xl" className="relative z-10 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Personal Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-8 text-left"
          >
            {/* Professional Title Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <Text size="xs" weight="medium" color="accent" className="tracking-[0.2em] uppercase">
                3D Artist & Autodesk Maya Developer
              </Text>
            </div>

            {/* Name */}
            <Heading
              as="h1"
              size="display"
              weight="bold"
              color="default"
              animate={false}
              className="mb-4 leading-[1.05] tracking-tight font-sans"
            >
              {artistProfile.name}
            </Heading>

            {/* Professional Title */}
            <Text size="xl" weight="medium" color="accent" className="mb-6 tracking-wide">
              3D Artist & Autodesk Maya Developer
            </Text>

            {/* About / Short Bio */}
            <Text size="lg" color="muted" className="leading-relaxed max-w-xl">
              {artistProfile.shortBio}
            </Text>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="portfolio-3d" smooth={true} duration={500} offset={-80}>
                <Button size="lg" className="group shadow-lg shadow-accent/10 cursor-pointer">
                  View Maya Projects
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <a href="/resume/Rahul_M_Resume.pdf" download="Rahul_M_Resume.pdf">
                <Button size="lg" variant="secondary" className="cursor-pointer">
                  <Download className="w-5 h-5" />
                  Download Resume
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Right Side - Technical Skills Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
            className="grid grid-cols-3 gap-4 md:gap-5"
          >
            {heroSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group p-4 md:p-5 rounded-2xl bg-bg-elevated/40 border border-border/60 hover:border-accent/40 hover:bg-bg-elevated/60 transition-all duration-300 h-full flex flex-col"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-3 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                  <skill.icon className="w-5 h-5 text-accent" />
                </div>
                <Text size="sm" weight="semibold" color="default" className="mb-2 tracking-tight">
                  {skill.name}
                </Text>
                <Text size="xs" color="muted" className="leading-relaxed flex-1">
                  {skill.description}
                </Text>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}