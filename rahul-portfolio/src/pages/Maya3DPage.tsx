'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Maximize2, 
  Compass,
  ChevronLeft,
  ChevronRight,
  X,
  Star,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { Heading, Text, Card, Badge, Button } from '../components/ui';
import { projects3D, categoryLabels } from '../data/portfolio';
import { ModelViewer } from '../components/three/ModelViewer';
import { MiniModelPreview } from '../components/three/MiniModelPreview';

// Error Boundary for 3D model grid items
class ModelGridErrorBoundary extends React.Component<{ children: React.ReactNode; fallback: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Error Boundary for 3D model fullscreen modal
class ModelErrorBoundary extends React.Component<{ children: React.ReactNode; fallback: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function Maya3DPage() {
  const [fullscreenModalProject, setFullscreenModalProject] = useState<typeof projects3D[0] | null>(null);

  // Keyboard navigation for modal
  useEffect(() => {
    if (!fullscreenModalProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFullscreenModalProject(null);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = projects3D.findIndex(p => p.id === fullscreenModalProject.id);
        const prevIndex = (currentIndex - 1 + projects3D.length) % projects3D.length;
        setFullscreenModalProject(projects3D[prevIndex]);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = projects3D.findIndex(p => p.id === fullscreenModalProject.id);
        const nextIndex = (currentIndex + 1) % projects3D.length;
        setFullscreenModalProject(projects3D[nextIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenModalProject]);

  return (
    <PageLayout>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-12"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
              <Box className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.14em] text-zinc-400 uppercase">
                AUTODESK MAYA PORTFOLIO
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                3D Assets & Visualization
              </h1>
            </div>
          </div>
          <p className="text-zinc-400 leading-relaxed max-w-2xl">
            Production-ready 3D models created in Autodesk Maya. Featuring architectural environments, 
            industrial equipment, vehicles, and hero props — all with clean topology, optimized UVs, and PBR texturing.
          </p>
        </div>
      </motion.div> 
      {/* {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        className="mb-10"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#1a1a20] border border-white/[0.06] rounded-2xl p-5 text-center">
              <p className="text-3xl font-bold text-white tracking-tight leading-none">
                {projects3D.length}
              </p>
              <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mt-2">
                3D Models
              </p>
            </div>
            <div className="bg-[#1a1a20] border border-white/[0.06] rounded-2xl p-5 text-center">
              <p className="text-3xl font-bold text-white tracking-tight leading-none">
                {projects3D.filter(p => p.featured).length}
              </p>
              <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mt-2">
                Featured
              </p>
            </div>
            <div className="bg-[#1a1a20] border border-white/[0.06] rounded-2xl p-5 text-center">
              <p className="text-3xl font-bold text-white tracking-tight leading-none">
                {projects3D.filter(p => p.wireframeAvailable).length}
              </p>
              <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mt-2">
                Wireframe Ready
              </p>
            </div>
            <div className="bg-[#1a1a20] border border-white/[0.06] rounded-2xl p-5 text-center">
              <p className="text-3xl font-bold text-white tracking-tight leading-none">
                5
              </p>
              <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mt-2">
                Categories
              </p>
            </div>
          </div>
        </div>
      </motion.div> */}

      {/* Category Filter */}
      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        className="mb-10"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="flex flex-wrap gap-2 justify-center">
            <CategoryFilterButton category="all" label="All" active />
            {['environment', 'product', 'vehicle', 'prop'].map(cat => (
              <CategoryFilterButton 
                key={cat} 
                category={cat} 
                label={categoryLabels[cat as keyof typeof categoryLabels]} 
              />
            ))}
          </div>
        </div>
      </motion.div> 

      {/* 3D Project Grid */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects3D.map((project, index) => (
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
                className="flex flex-col h-full bg-[#141417] border-white/[0.07] hover:border-white/[0.14] transition-all duration-300 overflow-hidden"
              >
                {/* Card Preview Area with Model Screenshot */}
                <div className="relative aspect-[16/10] bg-gradient-to-br from-[#1a1a20] to-[#141417] overflow-hidden border-b border-white/[0.07]">
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 flex-wrap">
                    <Badge variant="accent" size="sm">
                      {categoryLabels[project.category]}
                    </Badge>
                    {project.featured && (
                      <Badge variant="accent" size="sm" className="bg-amber-500/20 border-amber-500/30 text-amber-400">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Model Preview — Live 3D mini-canvas */}
                  <div className="relative w-full h-full overflow-hidden">
                    <ModelGridErrorBoundary
                      fallback={
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-4 text-center">
                          <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-2">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                          </div>
                          <span className="text-xs font-medium text-red-400 mb-1">Model Unavailable</span>
                          <span className="text-[10px] text-zinc-500 font-mono max-w-xs truncate block">{project.modelPath}</span>
                        </div>
                      }
                    >
                      <MiniModelPreview
                        modelPath={project.modelPath}
                        className="w-full h-full"
                      />
                    </ModelGridErrorBoundary>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Action overlay */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      to={`/projects/${project.id}`}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold shadow-lg hover:from-purple-500 hover:to-indigo-500 transition-colors flex items-center gap-2 group-hover:translate-y-[-2px] group-hover:shadow-xl"
                    >
                      <Maximize2 className="w-4 h-4" />
                      View Details
                    </Link>
                    <button
                      onClick={() => setFullscreenModalProject(project)}
                      className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-colors flex items-center gap-2 group-hover:translate-y-[-2px]"
                    >
                      <Compass className="w-4 h-4" />
                      Inspect 3D
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap mb-3">
                      {project.software.map(s => (
                        <span key={s} className="text-[11px] font-mono text-zinc-400 bg-[#1a1a20] px-2 py-0.5 rounded border border-white/[0.07]">
                          {s}
                        </span>
                      ))}
                    </div>

                    <Heading as="h4" size="h5" weight="bold" animate={false} className="text-base text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </Heading>

                    <Text size="xs" color="muted" className="line-clamp-3 leading-relaxed">
                      {project.description}
                    </Text>
                  </div>

                  <div className="pt-3 border-t border-white/[0.07] flex items-center justify-between text-xs text-zinc-500">
                    <span className="font-mono text-[11px]">Asset</span>
                    <Link
                      to={`/projects/${project.id}`}
                      className="text-purple-400 hover:underline text-xs font-medium inline-flex items-center gap-1"
                    >
                      View Details <Compass className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
        className="mt-16 mb-8"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <Card 
            variant="outlined" 
            padding="lg" 
            className="bg-gradient-to-br from-purple-500/10 via-transparent to-indigo-500/10 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 text-center"
          >
            <Heading as="h2" size="h2" weight="bold" animate={false} className="mb-4">
              Need a Custom 3D Asset?
            </Heading>
            <Text size="lg" color="muted" className="max-w-xl mx-auto mb-8 leading-relaxed">
              I create tailored 3D models for architectural visualization, product design, game development, and industrial applications.
            </Text>
            <Link to="/contact">
              <Button size="lg" className="gap-2 shadow-lg shadow-purple-600/25 cursor-pointer">
                <span>Discuss Your Project</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </Card>
        </div>
      </motion.div> */}

      {/* Fullscreen 3D Inspection Modal */}
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
              className="relative w-full max-w-[1400px] h-[92vh] bg-black rounded-3xl border border-white/[0.1] overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 md:p-5 border-b border-white/[0.1] flex items-center justify-between gap-4 bg-black/80 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center">
                    <Box className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Heading as="h3" size="h4" weight="bold" animate={false} className="text-white">
                        {fullscreenModalProject.title}
                      </Heading>
                      <Badge variant="accent" size="sm">
                        {categoryLabels[fullscreenModalProject.category]}
                      </Badge>
                      {fullscreenModalProject.featured && (
                        <Badge variant="accent" size="sm" className="bg-amber-500/20 border-amber-500/30 text-amber-400">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <Text size="xs" color="muted">
                      Autodesk Maya 3D Inspection Mode
                    </Text>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const cur = projects3D.findIndex(p => p.id === fullscreenModalProject.id);
                      const prev = (cur - 1 + projects3D.length) % projects3D.length;
                      setFullscreenModalProject(projects3D[prev]);
                    }}
                    className="p-2 rounded-xl border border-white/[0.15] hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                    title="Previous Model (Arrow Left)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      const cur = projects3D.findIndex(p => p.id === fullscreenModalProject.id);
                      const next = (cur + 1) % projects3D.length;
                      setFullscreenModalProject(projects3D[next]);
                    }}
                    className="p-2 rounded-xl border border-white/[0.15] hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                    title="Next Model (Arrow Right)"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="w-px h-5 bg-white/[0.1] mx-1" />
                  <button
                    onClick={() => setFullscreenModalProject(null)}
                    className="p-2 rounded-xl border border-white/[0.15] hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                    title="Close (Escape)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal 3D Body - Pure Black Background */}
              <div className="flex-1 relative bg-black overflow-hidden">
                <ModelErrorBoundary
                  fallback={
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 p-6 text-center">
                      <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                        <AlertCircle className="w-7 h-7 text-red-400" />
                      </div>
                      <Heading as="h3" size="h5" weight="bold" animate={false} className="mb-2 text-red-400">
                        Failed to Load Model
                      </Heading>
                      <Text size="sm" color="muted" className="max-w-md mb-4">
                        The 3D model file could not be loaded. It may be missing or corrupted.
                      </Text>
                      <Text size="xs" color="muted" className="font-mono bg-black/50 px-3 py-1.5 rounded mb-4 max-w-xs truncate block">
                        {fullscreenModalProject.modelPath}
                      </Text>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="gap-2"
                        onClick={() => setFullscreenModalProject(null)}
                      >
                        <RefreshCw className="w-4 h-4" />
                        Close
                      </Button>
                    </div>
                  }
                >
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
                </ModelErrorBoundary>
              </div>

              {/* Modal Footer with Detailed Breakdown */}
              <div className="p-4 md:p-6 border-t border-white/[0.1] bg-black/80 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto">
                  <Text size="sm" color="default" className="leading-relaxed mb-3 text-white/90">
                    {fullscreenModalProject.longDescription}
                  </Text>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-zinc-500 font-mono">Tags:</span>
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
    </PageLayout>
  );
}

// // Category Filter Button Component
// function CategoryFilterButton({ category, label, active = false }: { category: string; label: string; active?: boolean }) {
//   const isActive = active || category === 'all';
  // return (
  //   <button
  //     className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
  //       isActive
  //         ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/25'
  //         : 'bg-[#1a1a20] border border-white/[0.07] text-zinc-400 hover:text-white hover:border-white/[0.14]'
  //     }`}
  //   >
  //     {label}
  //   </button>
  // );
