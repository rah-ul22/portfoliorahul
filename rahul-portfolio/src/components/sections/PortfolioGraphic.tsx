'use client';

import { motion } from 'framer-motion';
import { Image } from 'lucide-react';
import { Section, Heading, Text } from '../ui';

export function PortfolioGraphic() {
  return (
    <Section id="portfolio-graphic" containerSize="full">
      <div className="mb-12">
        <Text size="sm" weight="medium" color="accent" className="tracking-widest uppercase mb-4">
          Visual Communication
        </Text>
        <Heading as="h2" size="h1" weight="bold" animate={false} className="mb-4">
          Visual Communication
        </Heading>
        <Text size="lg" color="muted" className="max-w-2xl">
          Visual communication projects including editorial layouts, poster design, and brand identity work.
          Add your rendered artwork to showcase your design capabilities.
        </Text>
      </div>

      {/* Placeholder Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="p-8 rounded-2xl bg-bg-elevated/50 border border-border/50 text-center"
      >
        <Image className="w-12 h-12 mx-auto mb-4 text-text-subtle" />
        <Heading as="h3" size="h4" weight="semibold" animate={false} className="mb-2">
          Visual Communication Portfolio
        </Heading>
        <Text size="base" color="muted" className="max-w-xl mx-auto mb-6">
          This section is ready for your visual communication work. Add rendered images of your posters, 
          editorial layouts, and brand identity projects to the 
          <code className="font-mono text-accent bg-bg px-1 rounded">public/images/</code> folder 
          and update the data file.
        </Text>
        <Text size="sm" color="subtle">
          Expected files: visual-editorial.jpg, visual-posters.jpg, visual-branding.jpg
        </Text>
      </motion.div>
    </Section>
  );
}