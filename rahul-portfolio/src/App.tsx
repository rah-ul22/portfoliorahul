import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LoadingScreen } from './components/ui/LoadingScreen';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import Maya3DPage from './pages/Maya3DPage';
import CertificationsPage from './pages/CertificationsPage';
import ContactPage from './pages/ContactPage';
import SpecializationPage from './pages/SpecializationPage';
import ExperiencePage from './pages/ExperiencePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Minimum display time for loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show for at least 2 seconds
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <LoadingScreen onComplete={() => setIsLoading(false)} />
    );
  }

  return (
    <Routes>
      {/* Home Page - Bento Grid Landing with minimal navbar */}
      <Route path="/" element={<HomePage />} />

      {/* About Page */}
      <Route path="/about" element={<AboutPage />} />

      {/* Skills Page */}
      <Route path="/skills" element={<SkillsPage />} />

      {/* Specialization Page */}
      <Route path="/specialization" element={<SpecializationPage />} />

      {/* Projects Pages */}
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:id" element={<ProjectDetailPage />} />
      <Route path="/maya-3d" element={<Maya3DPage />} />

      {/* Certifications Page */}
      <Route path="/certifications" element={<CertificationsPage />} />

      {/* Experience Page */}
      <Route path="/experience" element={<ExperiencePage />} />

      {/* Contact Page */}
      <Route path="/contact" element={<ContactPage />} />

      {/* 404 - Catch all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;