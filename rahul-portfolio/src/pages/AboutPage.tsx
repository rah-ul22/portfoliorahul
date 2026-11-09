'use client';

import { About } from '../components/sections/About';
import { Education } from '../components/sections/Education';
import { PageLayout } from '../components/layout/PageLayout';

export default function AboutPage() {
  return (
    <PageLayout>
      <About />
      <Education />
    </PageLayout>
  );
}