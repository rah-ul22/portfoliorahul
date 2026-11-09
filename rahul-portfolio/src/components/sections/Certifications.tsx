'use client';

import { motion } from 'framer-motion';
import { Award, ShieldCheck, CheckCircle2, Calendar, Building2, FileText } from 'lucide-react';
import { Section, Heading, Text, Card, Badge } from '../ui';
import { artistProfile } from '../../data/portfolio';

export function Certifications() {
  return (
    <Section id="certifications" className="relative">
      <div className="max-w-[1200px] mx-auto mb-20">
        <Text size="sm" weight="medium" color="accent" className="tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-accent" />
          Credentials & Training
        </Text>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Heading as="h2" size="h1" weight="bold" animate={false} className="mb-4">
              Professional Certifications
            </Heading>
            <Text size="lg" color="muted" className="max-w-2xl leading-relaxed">
              Certified qualifications completed through government, enterprise, and academic platforms.
            </Text>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
        {artistProfile.certifications.map((cert, index) => {
          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="h-full flex flex-col"
            >
              <Card 
                variant="outlined" 
                padding="lg" 
                className="flex flex-col justify-between h-full bg-bg-elevated/40 border-border/60 hover:border-accent/30 transition-all duration-300 backdrop-blur-sm group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent/15 transition-colors">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <Badge variant="outline" size="sm" className="font-mono text-[11px]">
                      {cert.tag}
                    </Badge>
                  </div>

                  <Heading as="h3" size="h5" weight="bold" animate={false} className="text-base text-text mb-2 leading-snug group-hover:text-accent transition-colors">
                    {cert.title}
                  </Heading>

                  <div className="flex items-center gap-2 text-xs text-text-muted mb-4">
                    <Building2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span>{cert.issuer}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/40 flex items-center justify-between gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-accent/10 text-accent font-mono text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {cert.badge}
                  </span>
                  <span className="text-[11px] font-mono text-text-subtle flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {cert.date}
                  </span>
                </div>

                {/* View Certificate Button */}
                {cert.pdfPath && (
                  <div className="mt-4 pt-4 border-t border-border/40">
                    <a
                      href={cert.pdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-semibold hover:bg-accent/20 hover:border-accent/40 transition-all duration-300"
                    >
                      <FileText className="w-4 h-4" />
                      View Certificate
                    </a>
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}