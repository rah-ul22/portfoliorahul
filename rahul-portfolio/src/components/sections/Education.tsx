'use client';

import { motion } from 'framer-motion';
import { GraduationCap, School, Calendar, MapPin, Award } from 'lucide-react';
import { Section, Heading, Text, Card } from '../ui';
import { artistProfile } from '../../data/portfolio';

export function Education() {
  return (
    <Section id="education" className="relative">
      <div className="max-w-[1200px] mx-auto mb-16">
        <Text size="sm" weight="medium" color="accent" className="tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-accent" />
          Academic Background
        </Text>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Heading as="h2" size="h1" weight="bold" animate={false} className="mb-4">
              Education & Qualifications
            </Heading>
            <Text size="lg" color="muted" className="max-w-2xl leading-relaxed">
              Complete educational qualifications verified directly from my academic records.
            </Text>
          </div>
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="max-w-4xl mx-auto relative">
        <div className="space-y-8">
          {artistProfile.education.map((edu, index) => {
            const isPostgrad = index === 0;
            const isUndergrad = index === 1;
            const isHigherEdu = isPostgrad || isUndergrad;

            return (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-16 md:pl-20"
              >
                {/* Node icon marker */}
                <div className={`absolute left-3.5 md:left-5.5 top-5 w-6 h-6 rounded-full flex items-center justify-center border-2 z-10 transition-colors ${
                  isPostgrad 
                    ? 'bg-accent border-accent text-bg shadow-md shadow-accent/20' 
                    : isUndergrad 
                    ? 'bg-bg-elevated border-accent text-accent' 
                    : 'bg-bg-elevated border-border text-text-subtle'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-current" />
                </div>

                <Card 
                  variant="outlined" 
                  padding="lg" 
                  className="bg-bg-elevated/40 border-border/60 hover:border-accent/30 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isHigherEdu 
                          ? 'bg-accent/10 border border-accent/20 text-accent' 
                          : 'bg-bg/80 border border-border/50 text-text-subtle'
                      }`}>
                        {isHigherEdu ? (
                          <GraduationCap className="w-6 h-6" />
                        ) : (
                          <School className="w-5 h-5" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <Heading as="h3" size="h5" weight="bold" animate={false} className="text-text">
                            {edu.degree}
                          </Heading>
                        </div>

                        <Text size="base" color="default" weight="medium" className="mb-2">
                          {edu.institution}
                        </Text>

                        <div className="flex items-center gap-4 text-xs text-text-subtle flex-wrap">
                          <span className="flex items-center gap-1 font-mono">
                            <Calendar className="w-3.5 h-3.5 text-accent" />
                            {edu.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {edu.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Grade Badge */}
                    {edu.description && (
                      <div className="sm:self-start">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-semibold">
                          <Award className="w-3.5 h-3.5" />
                          <span>{edu.description}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
