'use client';

import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Box, CheckCircle2, Code2, AlertCircle } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { Heading, Text, Card, Badge, Button } from '../components/ui';
import { projects3D, artistProfile, categoryLabels } from '../data/portfolio';
import { type Project3D } from '../types/portfolio';
import type { ResumeProject } from '../types/portfolio';
import { ModelViewer } from '../components/three/ModelViewer';

type ProjectType = 
  | (Project3D & { is3D: true; projectType: '3d' })
  | (ResumeProject & { is3D: false; projectType: 'research' });

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectType | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      return;
    }

    // Check 3D projects first
    const project3D = projects3D.find((p: Project3D) => p.id === id);
    if (project3D) {
      setProject({ ...project3D, is3D: true, projectType: '3d' });
      return;
    }

    // Check research projects
    const researchProject = artistProfile.projects.find((p: ResumeProject) => p.id === id);
    if (researchProject) {
      setProject({ ...researchProject, is3D: false, projectType: 'research' });
      return;
    }

    setNotFound(true);
  }, [id]);

  if (notFound || !project) {
    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <Heading as="h1" size="h1" weight="bold" animate={false} className="mb-4">
              Project Not Found
            </Heading>
            <Text size="lg" color="muted" className="mb-8">
              The project you're looking for doesn't exist or has been moved.
            </Text>
            <Link to="/projects">
              <Button size="lg" className="gap-2">
                <ArrowLeft className="w-5 h-5" />
                Back to Projects
              </Button>
            </Link>
          </motion.div>
        </div>
      </PageLayout>
    );
  }

  const is3D = project.is3D;

  return (
    <PageLayout>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to={is3D ? "/maya-3d" : "/projects"}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141417] border border-white/[0.07] hover:border-white/[0.14] text-zinc-300 hover:text-white transition-all duration-200 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            {is3D ? "Back to Maya 3D" : "Back to Projects"}
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${is3D ? 'bg-purple-500/15 border border-purple-500/30 text-purple-400' : 'bg-blue-500/15 border border-blue-500/30 text-blue-400'}`}>
              {is3D ? <Box className="w-5 h-5" /> : <Code2 className="w-5 h-5" />}
            </div>
            <div>
              <Text size="sm" weight="medium" color="accent" className="tracking-[0.2em] uppercase">
                {is3D ? 'Autodesk Maya 3D Asset' : 'Research & Technical Project'}
              </Text>
            </div>
          </div>

          <Heading as="h1" size="display" weight="bold" animate={false} className="mb-4 leading-[1.05] tracking-tight">
            {project.title}
          </Heading>

          <div className="flex flex-wrap items-center gap-3">
            {is3D && (
              <Badge variant="accent" size="md" className="font-mono">
                {categoryLabels[project.category as keyof typeof categoryLabels] || project.category}
              </Badge>
            )}
            {!is3D && (
              <Badge variant="accent" size="md" className="font-mono">
                {project.category}
              </Badge>
            )}
            {is3D && 'featured' in project && project.featured && (
              <Badge variant="accent" size="md" className="bg-amber-500/20 border-amber-500/30 text-amber-400 font-mono">
                Featured
              </Badge>
            )}
            {is3D && 'modelPath' in project && (
              <a
                href={project.modelPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs font-semibold hover:bg-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View Model
              </a>
            )}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {is3D && 'modelPath' in project && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card variant="outlined" padding="none" className="overflow-hidden bg-[#141417] border-white/[0.07]">
                  <div className="aspect-video bg-black rounded-t-[24px]">
                    <ModelViewer
                      modelPath={project.modelPath}
                      projectName={project.title}
                      category={categoryLabels[project.category as keyof typeof categoryLabels] || project.category}
                      software={project.software}
                      autoRotate={false}
                      showWireframe={false}
                      showControls={true}
                      enableControls={true}
                      environment="studio"
                      className="w-full h-full"
                    />
                  </div>
                </Card>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: is3D ? 0.2 : 0.1 }}
              className="space-y-6"
            >
              {/* Description */}
              <Card variant="outlined" padding="lg" className="bg-[#141417] border-white/[0.07]">
                <Heading as="h2" size="h3" weight="bold" animate={false} className="mb-4">
                  {is3D ? 'Project Overview' : 'Technical Breakdown & Methodology'}
                </Heading>
                <Text size="base" color="default" className="leading-relaxed whitespace-pre-line">
                  {project.longDescription}
                </Text>
              </Card>

              {/* Tags / Technologies */}
              <Card variant="outlined" padding="lg" className="bg-[#141417] border-white/[0.07]">
                <div className="flex items-center justify-between mb-4">
                  <Heading as="h2" size="h4" weight="bold" animate={false}>
                    {is3D ? 'Asset Tags' : 'Verified Toolchain'}
                  </Heading>
                  {is3D && 'wireframeAvailable' in project && project.wireframeAvailable && (
                    <Badge variant="outline" size="sm" className="border-green-500/30 text-green-400">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Wireframe Available
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(is3D && 'tags' in project ? project.tags : project.tools).map((tag: string) => (
                    <span
                      key={tag}
                      className={`px-3 py-1.5 rounded-lg text-sm font-mono ${
                        is3D 
                          ? 'bg-white/[0.05] border border-white/[0.07] text-zinc-300' 
                          : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>

              {/* Software Used */}
              {is3D && 'software' in project && project.software.length > 0 && (
                <Card variant="outlined" padding="lg" className="bg-[#141417] border-white/[0.07]">
                  <Heading as="h2" size="h4" weight="bold" animate={false} className="mb-4">
                    Software Used
                  </Heading>
                  <div className="flex flex-wrap gap-2">
                    {project.software.map((sw: string) => (
                      <span
                        key={sw}
                        className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-mono"
                      >
                        {sw}
                      </span>
                    ))}
                  </div>
                </Card>
              )}

              {/* External Links */}
              {!is3D && 'linkedInUrl' in project && project.linkedInUrl && (
                <Card variant="outlined" padding="lg" className="bg-[#141417] border-white/[0.07]">
                  <a
                    href={project.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View LinkedIn Post
                  </a>
                </Card>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Card variant="outlined" padding="lg" className="bg-[#141417] border-white/[0.07] sticky top-24">
                <Heading as="h2" size="h4" weight="bold" animate={false} className="mb-4">
                  {is3D ? 'Asset Details' : 'Project Details'}
                </Heading>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-zinc-500 font-mono text-xs uppercase tracking-wider mb-1">Category</dt>
                    <dd className="text-white font-medium">
                      {is3D 
                        ? (categoryLabels[project.category as keyof typeof categoryLabels] || project.category)
                        : project.category}
                    </dd>
                  </div>
                  
                  {!is3D && (
                    <>
                      <div>
                        <dt className="text-zinc-500 font-mono text-xs uppercase tracking-wider mb-1">Tools</dt>
                        <dd className="text-white font-medium">{project.tools.join(', ')}</dd>
                      </div>
                    </>
                  )}
                  {is3D && 'software' in project && project.software.length > 0 && (
                    <div>
                      <dt className="text-zinc-500 font-mono text-xs uppercase tracking-wider mb-1">Software</dt>
                      <dd className="text-white font-medium">{project.software.join(', ')}</dd>
                    </div>
                  )}
                </dl>

                {is3D && 'modelPath' in project && (
                  <div className="mt-6 pt-6 border-t border-white/[0.07]">
                    <Button 
                      variant="secondary" 
                      size="md" 
                      className="w-full gap-2 cursor-pointer"
                      onClick={() => window.open(project.modelPath, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open Model File
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Related Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <Card variant="outlined" padding="lg" className="bg-[#141417] border-white/[0.07]">
                <Heading as="h2" size="h4" weight="bold" animate={false} className="mb-4">
                  {is3D ? 'More 3D Assets' : 'More Research Projects'}
                </Heading>
                <div className="space-y-3">
                  {(is3D ? projects3D : artistProfile.projects)
                    .filter((p: Project3D | ResumeProject) => p.id !== project.id)
                    .slice(0, 3)
                    .map((p: Project3D | ResumeProject) => (
                      <Link
                        key={p.id}
                        to={`/projects/${p.id}`}
                        className="block p-3 rounded-xl bg-[#1a1a20] border border-white/[0.07] hover:border-white/[0.14] hover:bg-[#141417] transition-all duration-200"
                      >
                        <p className="font-medium text-white truncate">{p.title}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          {is3D 
                            ? (categoryLabels[p.category as keyof typeof categoryLabels] || p.category)
                            : p.category}
                        </p>
                      </Link>
                    ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}