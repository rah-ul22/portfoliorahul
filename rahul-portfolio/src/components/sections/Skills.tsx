'use client';

import { motion } from 'framer-motion';
import {
  Box,
  Code,
  BarChart3
} from 'lucide-react';
import { Section, Heading, Text } from '../ui';
import { artistProfile } from '../../data/portfolio';

const sections = [
  {
    id: '3d-modeling',
    title: '3D Modeling & Visualization',
    subtitle: 'Autodesk Maya • Hard-Surface Modeling • PBR Texturing',
    icon: Box,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/25',
    skillIds: ['maya', 'modeling', 'uvmapping', 'texturing', 'substance', 'unity', 'photoshop'],
  },
  {
    id: 'technical',
    title: 'Technical & Programming',
    subtitle: 'Python • SQL • ML/DL • Data Engineering • BI Tools',
    icon: Code,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/25',
    skillIds: ['python', 'sql', 'excel', 'powerbi', 'pandas', 'numpy', 'scikit', 'tensorflow', 'matplotlib', 'streamlit', 'jupyter', 'git'],
  },
  {
    id: 'analytics',
    title: 'Data Analytics & Professional',
    subtitle: 'Business Intelligence • Forecasting • Statistical Analysis',
    icon: BarChart3,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/25',
    skillIds: ['dataanalysis', 'forecasting', 'dashboards', 'datavis', 'statistics', 'pivottables'],
  },
];

export function Skills() {
  const skillsMap = new Map(artistProfile.skills.map(s => [s.id, s]));

  return (
    <Section id="skills" className="relative">
      <div className="max-w-[1200px] mx-auto mb-12">
        <Text size="sm" weight="medium" color="accent" className="tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
          <Box className="w-4 h-4 text-accent" />
          Core Competencies
        </Text>
        <Heading as="h2" size="h1" weight="bold" animate={false} className="mb-4">
          Skills & Expertise
        </Heading>
        <Text size="lg" color="muted" className="max-w-2xl leading-relaxed">
          Technical proficiencies verified through academic projects, certifications, and production work.
        </Text>
      </div>

      {/* 3 Cards in a Row */}
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="rounded-2xl border border-border/60 bg-bg-elevated/40 backdrop-blur-sm p-6 hover:border-accent/40 hover:bg-bg-elevated/60 transition-all duration-300 h-full flex flex-col"
            >
              {/* Section Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${section.bg} border ${section.border} ${section.color}`}>
                    <section.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <Heading as="h3" size="h4" weight="bold" animate={false} className="text-text">
                      {section.title}
                    </Heading>
                  </div>
                </div>
                <Text size="sm" color="muted" className="font-mono leading-relaxed">
                  {section.subtitle}
                </Text>
              </div>

              {/* Skills List */}
              <div className="flex-1 space-y-2.5">
                {section.skillIds.map((skillId, skillIndex) => {
                  const skill = skillsMap.get(skillId);
                  if (!skill) return null;

                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.3, delay: sectionIndex * 0.15 + skillIndex * 0.03, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="text-sm text-text/80 hover:text-accent transition-colors font-medium"
                    >
                      {skill.name}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}