'use client';

import { motion } from 'framer-motion';
import { Download, FileText, CheckCircle2, GraduationCap, Award, FolderKanban, Terminal } from 'lucide-react';
import { Section, Heading, Text, Card, Button } from '../ui';
import { artistProfile } from '../../data/portfolio';

export function Resume() {
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume/Rahul_M_Resume.pdf';
    link.download = 'Rahul_M_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Section id="resume" className="relative">
      <div className="max-w-[1200px] mx-auto mb-16 text-center">
        <Text size="sm" weight="medium" color="accent" className="tracking-[0.2em] uppercase mb-4 flex items-center justify-center gap-2">
          <FileText className="w-4 h-4 text-accent" />
          Verified Curriculum Vitae
        </Text>
        <Heading as="h2" size="h1" weight="bold" animate={false} className="mb-4">
          Professional Resume
        </Heading>
        <Text size="lg" color="muted" className="max-w-2xl mx-auto leading-relaxed">
          Direct access to my  resume covering my Master of Computer Applications, 
          certifications, technical skills, and research project experience.
        </Text>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card 
          variant="outlined" 
          padding="lg" 
          className="bg-bg-elevated/40 border-border/80 backdrop-blur-sm shadow-2xl p-6 md:p-10"
        >
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Visual Document Preview Card */}
            <div className="md:col-span-5 flex flex-col items-center">
              <motion.div
                whileHover={{ y: -6, rotate: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-full max-w-[280px] aspect-[1/1.38] rounded-2xl bg-gradient-to-b from-bg-elevated via-bg to-bg border border-border/80 p-5 shadow-2xl relative flex flex-col justify-between overflow-hidden"
              >
                {/* Paper Header Preview */}
                <div className="border-b border-border/50 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center text-accent mb-2">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-text block font-sans">{artistProfile.name}</span>
                  <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider block">MCA Postgraduate</span>
                </div>

                {/* Simulated Content Lines */}
                <div className="space-y-2 py-3 flex-1">
                  <div className="h-1.5 bg-accent/20 rounded w-full" />
                  <div className="h-1.5 bg-border/60 rounded w-4/5" />
                  <div className="h-1.5 bg-border/40 rounded w-5/6" />
                  <div className="h-1.5 bg-border/30 rounded w-2/3" />
                  <div className="pt-2 space-y-1.5">
                    <div className="h-1 bg-accent/30 rounded w-1/3" />
                    <div className="h-1 bg-border/40 rounded w-full" />
                    <div className="h-1 bg-border/30 rounded w-3/4" />
                  </div>
                </div>

                {/* Document Status Foot */}
                <div className="pt-3 border-t border-border/50 flex items-center justify-between text-[10px] font-mono text-text-subtle">
                  <span>PDF Document</span>
                  <span className="text-accent flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Original File
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Resume Summary & Action */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono mb-4 w-fit">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Resume • Rahul_M_Resume.pdf
              </div>

              <Heading as="h3" size="h3" weight="bold" animate={false} className="text-text mb-3">
                Download Resume
              </Heading>

              <Text size="sm" color="muted" className="leading-relaxed mb-6">
                Directly download the authentic PDF file from my portfolio. Contains complete breakdown 
                of MCA & BCA degrees, IIT Kharagpur certifications, and 4 major technical projects.
              </Text>

              {/* Highlights Matrix */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="p-3 rounded-xl bg-bg/60 border border-border/40">
                  <span className="text-xs text-text-subtle font-mono block mb-0.5 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-accent" />
                    Qualifications
                  </span>
                  <span className="text-sm font-semibold text-text">4 Academic Degrees</span>
                </div>

                <div className="p-3 rounded-xl bg-bg/60 border border-border/40">
                  <span className="text-xs text-text-subtle font-mono block mb-0.5 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-accent" />
                    Certifications
                  </span>
                  <span className="text-sm font-semibold text-text">5 Verified Credentials</span>
                </div>

                <div className="p-3 rounded-xl bg-bg/60 border border-border/40">
                  <span className="text-xs text-text-subtle font-mono block mb-0.5 flex items-center gap-1">
                    <FolderKanban className="w-3.5 h-3.5 text-accent" />
                    Projects
                  </span>
                  <span className="text-sm font-semibold text-text">4 Research Projects</span>
                </div>

                <div className="p-3 rounded-xl bg-bg/60 border border-border/40">
                  <span className="text-xs text-text-subtle font-mono block mb-0.5 flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5 text-accent" />
                    3D & Tech Skills
                  </span>
                  <span className="text-sm font-semibold text-text">Maya, Python, BI & SQL</span>
                </div>
              </div>

              {/* Download Button */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="lg" 
                  onClick={downloadResume}
                  className="gap-2 shadow-lg shadow-accent/15 cursor-pointer flex-1"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Resume (PDF)</span>
                </Button>
                <a 
                  href="/resume/Rahul_M_Resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <Button size="lg" variant="secondary" className="cursor-pointer w-full">
                    View in Browser
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
