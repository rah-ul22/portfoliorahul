'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Maximize2, 
  X, 
  Box, 
  Compass,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Section, Heading, Text, Card, Badge } from '../ui';
import { projects3D, categoryLabels } from '../../data/portfolio';
import { ModelViewer } from '../three/ModelViewer';
import { MiniModelPreview } from '../three/MiniModelPreview';

export function Portfolio3D() {
  const mayaProjects = projects3D;
  const [fullscreenModalProject, setFullscreenModalProject] = useState<typeof projects3D[0] | null>(null);

  // Keyboard navigation for modal
  useEffect(() => {
    if (!fullscreenModalProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFullscreenModalProject(null);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = mayaProjects.findIndex(p => p.id === fullscreenModalProject.id);
        const prevIndex = (currentIndex - 1 + mayaProjects.length) % mayaProjects.length;
        setFullscreenModalProject(mayaProjects[prevIndex]);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = mayaProjects.findIndex(p => p.id === fullscreenModalProject.id);
        const nextIndex = (currentIndex + 1) % mayaProjects.length;
        setFullscreenModalProject(mayaProjects[nextIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenModalProject, mayaProjects]);

  return (
    <Section id="portfolio-3d" containerSize="full" className="relative">
      {/* Section Header */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 mb-10">
        <Text size="sm" weight="medium" color="accent" className="tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
          <Box className="w-4 h-4 text-accent" />
          Autodesk Maya • 3D Portfolio
        </Text>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Heading as="h2" size="h1" weight="bold" animate={false} className="mb-4">
              All Maya Projects
            </Heading>
            <Text size="lg" color="muted" className="max-w-2xl leading-relaxed">
              Explore all 8 of my Autodesk Maya projects. Click View Details to inspect the interactive 3D model with full rotation, zoom, and wireframe controls.
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              {mayaProjects.length} Interactive 3D Models
            </span>
          </div>
        </div>
      </div>

      {/* 3x3 Project Grid - Direct Display */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mayaProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="group"
            >
              <Card 
                variant="outlined" 
                padding="none" 
                hover={true} 
                className="flex flex-col h-full bg-bg-elevated/40 border-border/60 hover:border-accent/40 transition-all duration-300 overflow-hidden"
              >
                {/* Card Preview Area with Model Screenshot */}
                <div className="relative aspect-[16/10] bg-gradient-to-br from-bg-elevated to-bg overflow-hidden border-b border-border/40">
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 flex-wrap">
                    <Badge variant="accent" size="sm">
                      {categoryLabels[project.category]}
                    </Badge>
                  </div>

                  {/* Model Preview — Live 3D mini-canvas */}
                  <div className="relative w-full h-full overflow-hidden">
                    <MiniModelPreview
                      modelPath={project.modelPath}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Action overlay */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => setFullscreenModalProject(project)}
                      className="px-4 py-2 rounded-lg bg-accent text-bg text-sm font-semibold shadow-lg hover:bg-accent-hover transition-colors flex items-center gap-2 group-hover:translate-y-[-2px] group-hover:shadow-xl"
                    >
                      <Maximize2 className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap mb-3">
                      {project.software.map(s => (
                        <span key={s} className="text-[11px] font-mono text-text-subtle bg-bg/60 px-2 py-0.5 rounded border border-border/30">
                          {s}
                        </span>
                      ))}
                    </div>

                    <Heading as="h4" size="h5" weight="bold" animate={false} className="text-base text-text mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </Heading>

                    <Text size="xs" color="muted" className="line-clamp-3 leading-relaxed">
                      {project.description}
                    </Text>
                  </div>

                  <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs text-text-subtle">
                    <span className="font-mono text-[11px]">{project.year} Asset</span>
                    <button
                      onClick={() => setFullscreenModalProject(project)}
                      className="text-accent hover:underline text-xs font-medium inline-flex items-center gap-1"
                    >
                      View Details <Compass className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen 3D Inspection Modal with Black Background */}
      <AnimatePresence>
        {fullscreenModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/95 backdrop-blur-md"
            onClick={(e) => {
              if (e.target === e.currentTarget) setFullscreenModalProject(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-[1400px] h-[92vh] bg-black rounded-3xl border border-border/50 overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 md:p-5 border-b border-border/30 flex items-center justify-between gap-4 bg-black/80 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center">
                    <Box className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Heading as="h3" size="h4" weight="bold" animate={false} className="text-white">
                        {fullscreenModalProject.title}
                      </Heading>
                      <Badge variant="accent" size="sm">
                        {categoryLabels[fullscreenModalProject.category]}
                      </Badge>
                    </div>
                    <Text size="xs" color="muted">
                      Autodesk Maya 3D Inspection Mode
                    </Text>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const cur = mayaProjects.findIndex(p => p.id === fullscreenModalProject.id);
                      const prev = (cur - 1 + mayaProjects.length) % mayaProjects.length;
                      setFullscreenModalProject(mayaProjects[prev]);
                    }}
                    className="p-2 rounded-xl border border-border/60 hover:bg-white/10 text-text-muted hover:text-white transition-colors"
                    title="Previous Model (Arrow Left)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      const cur = mayaProjects.findIndex(p => p.id === fullscreenModalProject.id);
                      const next = (cur + 1) % mayaProjects.length;
                      setFullscreenModalProject(mayaProjects[next]);
                    }}
                    className="p-2 rounded-xl border border-border/60 hover:bg-white/10 text-text-muted hover:text-white transition-colors"
                    title="Next Model (Arrow Right)"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="w-px h-5 bg-border/60 mx-1" />
                  <button
                    onClick={() => setFullscreenModalProject(null)}
                    className="p-2 rounded-xl border border-border/60 hover:bg-white/10 text-text-muted hover:text-white transition-colors"
                    title="Close (Escape)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal 3D Body - Pure Black Background */}
              <div className="flex-1 relative bg-black overflow-hidden">
                <ModelViewer
                  key={fullscreenModalProject.id}
                  modelPath={fullscreenModalProject.modelPath}
                  projectName={fullscreenModalProject.title}
                  category={categoryLabels[fullscreenModalProject.category]}
                  software={fullscreenModalProject.software}
                  autoRotate={false}
                  showWireframe={false}
                  showControls={true}
                  enableControls={true}
                  environment="studio"
                />
              </div>

              {/* Modal Footer with Detailed Breakdown */}
              <div className="p-4 md:p-6 border-t border-border/30 bg-black/80 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto">
                  <Text size="sm" color="default" className="leading-relaxed mb-3 text-white/90">
                    {fullscreenModalProject.longDescription}
                  </Text>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-text-subtle font-mono">Tags:</span>
                    {fullscreenModalProject.tags.map(t => (
                      <span key={t} className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white/80">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}