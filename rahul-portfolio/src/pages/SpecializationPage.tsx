'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { Heading, Text, Card } from '../components/ui';
import mayaIcon from '../assets/maya.png';
import photoshopIcon from '../assets/photoshop.png';
import substancePainterIcon from '../assets/substance painter.png';
import unityIcon from '../assets/unity.png';

interface SkillItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  level: 'intermediate' | 'basic';
  description: string;
  features: string[];
  color: string;
  bgColor: string;
}

const skills: SkillItem[] = [
  {
    name: 'Autodesk Maya',
    icon: ({ className }) => <img src={mayaIcon} alt="Autodesk Maya" className={`w-14 h-14 object-contain ${className || ''}`} />,
    level: 'intermediate',
    description: 'Core 3D modeling, animation, and rigging workflows. Production-ready asset creation with clean topology and optimized UVs.',
    features: [
      '3D modeling and hard-surface modeling',
      'Creating detailed 3D props and assets',
      'Polygon modeling and clean topology',
      'UV mapping and unwrapping',
      'Basic lighting, shading, and rendering',
      '3D environment and object visualization'
    ],
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10'
  },
  {
    name: 'Adobe Substance 3D Painter',
    icon: ({ className }) => <img src={substancePainterIcon} alt="Substance Painter" className={`w-10 h-10 object-contain ${className || ''}`} />,
    level: 'intermediate',
    description: 'Professional PBR texturing pipeline with smart materials, generators, and custom material creation.',
    features: [
      '3D model texturing and material creation',
      'PBR (Physically Based Rendering) workflow',
      'Applying realistic surface textures',
      'Creating material effects and surface details',
      'Using smart materials, masks, and layers',
      'Texture detailing and asset finishing'
    ],
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10'
  },
  {
    name: 'Adobe Photoshop',
    icon: ({ className }) => <img src={photoshopIcon} alt="Adobe Photoshop" className={`w-14 h-14 object-contain ${className || ''}`} />,
    level: 'basic',
    description: 'Texture editing, matte painting basics, and post-processing for 3D renders.',
    features: [
      'Basic image editing and manipulation',
      'Color correction and adjustments',
      'Working with layers and masks',
      'Creating simple graphic compositions',
      'Image enhancement and visual preparation'
    ],
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/10'
  },
  {
    name: 'Unity',
    icon: ({ className }) => <img src={unityIcon} alt="Unity" className={`w-14 h-14 object-contain ${className || ''}`} />,
    level: 'basic',
    description: 'Real-time integration, scene setup, and basic interaction scripting for 3D visualization.',
    features: [
      'Basic understanding of the Unity interface',
      'Importing and managing 3D assets',
      'Setting up 3D scenes and environments',
      'Applying materials and textures',
      'Basic lighting and scene configuration',
      'Exploring real-time 3D visualization'
    ],
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10'
  }
];

export default function SpecializationPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-16"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <span className="text-[10px] font-semibold tracking-[0.14em] text-blue-400 uppercase">
              SOFTWARE SKILLS & EXPERTISE
            </span>
          </div>
          <Heading as="h1" size="h1" weight="bold" className="mb-6 leading-tight">
            Software Skills & Expertise
          </Heading>
          <Text size="xl" color="muted" className="max-w-2xl mx-auto leading-relaxed">
            Proficient in industry-standard tools for 3D asset creation, texturing, and real-time visualization. 
            Delivering production-ready results across modeling, surfacing, and engine integration.
          </Text>
        </div>
      </motion.div>

      {/* Skills Grid - 2x2 */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Card 
                variant="outlined" 
                padding="none" 
                hover={true}
                className={`h-full bg-[#141417] border-white/[0.07] hover:border-white/[0.14] transition-all duration-300 overflow-hidden flex flex-col ${skill.bgColor} border-${skill.color.replace('text-', '')}/20`}
              >
                {/* Header with Icon */}
                <div className="p-6 border-b border-white/[0.07]">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#1a1a20] border border-white/[0.08] flex items-center justify-center shadow-inner flex-shrink-0">
                      <skill.icon className="text-white" />
                    </div>
                  </div>
                  <Heading as="h3" size="h3" weight="bold" animate={false} className="text-white">
                    {skill.name}
                  </Heading>
                </div>

                {/* Features List */}
                <div className="p-6 flex-1">
                  <div className="space-y-4">
                    {skill.features.map((feature, i) => (
                      <div 
                        key={i}
                        className="flex items-start gap-3 text-sm text-zinc-300 group"
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${skill.color} border-current`}>
                          <CheckCircle className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
        className="mt-20 mb-16"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <Card 
            variant="outlined" 
            padding="lg" 
            className="bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 text-center"
          >
            <Heading as="h2" size="h2" weight="bold" animate={false} className="mb-4">
              Ready to Start a Project?
            </Heading>
            <Text size="lg" color="muted" className="max-w-xl mx-auto mb-8 leading-relaxed">
              Let's discuss your 3D visualization needs — from concept to final delivery.
            </Text>
            <a href="/contact">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500 transition-colors shadow-lg shadow-blue-600/25 cursor-pointer">
                Get in Touch
                <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" />
                </svg>
              </span>
            </a>
          </Card>
        </div>
      </motion.div>
    </PageLayout>
  );
}