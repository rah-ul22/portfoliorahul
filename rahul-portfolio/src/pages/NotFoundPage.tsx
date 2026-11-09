'use client';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { Heading, Text, Button } from '../components/ui';

export default function NotFoundPage() {
  return (
    <PageLayout className="flex items-center justify-center">
      <div className="max-w-md mx-auto text-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-8">
            <Search className="w-10 h-10 text-blue-400" />
          </div>

          <Heading as="h1" size="display" weight="bold" animate={false} className="mb-4">
            404
          </Heading>

          <Heading as="h2" size="h2" weight="bold" animate={false} className="mb-4">
            Page Not Found
          </Heading>

          <Text size="lg" color="muted" className="mb-10 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </Text>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="gap-2 shadow-lg shadow-blue-600/25">
                <Home className="w-5 h-5" />
                Back to Home
              </Button>
            </Link>
            <Link to="/projects">
              <Button size="lg" variant="secondary" className="gap-2">
                <ArrowLeft className="w-5 h-5" />
                Browse Projects
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}