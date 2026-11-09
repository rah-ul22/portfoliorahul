'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderKanban, 
  ChevronDown, 
  ChevronUp, 
  BarChart3, 
  BrainCircuit, 
  Activity, 
  Wrench,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Section, Heading, Text, Card, Badge } from '../ui';
import { artistProfile } from '../../data/portfolio';

const categoryMeta: Record<string, { icon: typeof BarChart3; color: string; bg: string; border: string }> = {
  'Data & Analytics': { 
    icon: BarChart3, 
    color: 'text-blue-400', 
    bg: 'bg-blue-500/10', 
    border: 'border-blue-500/25' 
  },
  'AI / Machine Learning': { 
    icon: BrainCircuit, 
    color: 'text-purple-400', 
    bg: 'bg-purple-500/10', 
    border: 'border-purple-500/25' 
  }
};

export function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <Section id="projects" className="relative">
      <div className="max-w-[1200px] mx-auto mb-16">
        <Text size="sm" weight="medium" color="accent" className="tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
          <FolderKanban className="w-4 h-4 text-accent" />
          Technical Implementations
        </Text>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Heading as="h2" size="h1" weight="bold" animate={false} className="mb-4">
              Academic & Research Projects
            </Heading>
            <Text size="lg" color="muted" className="max-w-2xl leading-relaxed">
              Real projects verified from my resume covering business intelligence dashboards, 
              clinical ML prediction models, and deep learning seismic forecasting systems.
            </Text>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-[1200px] mx-auto">
        {artistProfile.projects.map((project, index) => {
          const isExpanded = expandedId === project.id;
          const meta = categoryMeta[project.category] || {
            icon: Activity,
            color: 'text-accent',
            bg: 'bg-accent/10',
            border: 'border-accent/25'
          };
          const MetaIcon = meta.icon;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="h-full flex flex-col"
            >
              <Card 
                variant="outlined" 
                padding="none" 
                className="flex flex-col justify-between h-full bg-bg-elevated/40 border-border/60 hover:border-accent/30 transition-all duration-300 backdrop-blur-sm overflow-hidden"
              >
                {/* Project Header */}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${meta.bg} border ${meta.border} ${meta.color}`}>
                      <MetaIcon className="w-5 h-5" />
                    </div>
                    <Badge variant="accent" size="sm" className="font-mono text-xs">
                      {project.category}
                    </Badge>
                  </div>

                  <Heading as="h3" size="h5" weight="bold" animate={false} className="text-lg text-text mb-2 leading-snug">
                    {project.title}
                  </Heading>

                  <Text size="sm" color="muted" className="line-clamp-3 leading-relaxed mb-4">
                    {project.description}
                  </Text>

                  {/* Verified Tech Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {project.tools.map(tool => (
                      <span key={tool} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-bg border border-border/50 text-text-subtle">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expandable Section */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border/40 bg-bg/50 px-6 py-5 overflow-hidden"
                    >
                      <div className="space-y-4 text-xs">
                        <div>
                          <span className="text-accent font-semibold block uppercase tracking-wider font-mono text-[10px] mb-1.5 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Technical Breakdown & Methodology
                          </span>
                          <Text size="xs" color="muted" className="leading-relaxed">
                            {project.longDescription}
                          </Text>
                        </div>
                        <div>
                          <span className="text-text-subtle font-semibold block uppercase tracking-wider font-mono text-[10px] mb-1.5 flex items-center gap-1">
                            <Wrench className="w-3.5 h-3.5 text-accent" />
                            Verified Toolchain
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tools.map(t => (
                              <span key={t} className="px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent font-mono text-[10px]">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        {project.linkedInUrl && (
                          <div className="pt-2 border-t border-border/40">
                            <a
                              href={project.linkedInUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              View LinkedIn Post
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer Toggle Button */}
                <div className="p-4 border-t border-border/40 bg-bg/30 flex items-center justify-between">
                  <span className="text-xs font-mono text-text-subtle">Resume Verified Project</span>
                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-hover transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
