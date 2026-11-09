import { Navigation, Footer, BackgroundAnimation } from '../components/layout';
import {
  Hero,
  Education,
  Certifications,
  Projects,
  Portfolio3D,
  Resume,
  Skills,
} from '../components/sections';
import { Contact } from '../components/sections/Contact';

export default function PortfolioPage() {
  return (
    <>
      <BackgroundAnimation />
      <Navigation />
      <main id="main-content">
        <Hero />
        <Skills />
        <Education />
        <Certifications />
        <Projects />
        <Portfolio3D />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

