'use client';

import { Projects } from '../components/sections/Projects';
// import { Portfolio3D } from '../components/sections/Portfolio3D';
import { PageLayout } from '../components/layout/PageLayout';

export default function ProjectsPage() {
  return (
    <PageLayout>
      <Projects />
      {/* <Portfolio3D /> */}
    </PageLayout>
  );
}