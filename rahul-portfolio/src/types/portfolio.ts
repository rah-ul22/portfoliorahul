export interface Project3D {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  modelPath: string;
  screenshotPath: string;
  thumbnailPath?: string;
  software: string[];
  tags: string[];
  year: string;
  category: 'product' | 'environment' | 'character' | 'prop' | 'vehicle';
  featured: boolean;
  wireframeAvailable: boolean;
}

export interface GraphicDesignProject {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imagePath: string;
  thumbnailPath?: string;
  software: string[];
  tags: string[];
  year: string;
  category: 'branding' | 'poster' | 'typography' | 'illustration' | 'editorial' | 'ui-ux';
  featured: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: '3d' | 'design' | 'technical' | 'creative';
  proficiency: number;
  icon?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  type: 'full-time' | 'freelance' | 'internship' | 'education';
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  description?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
  icon: string;
}

export interface ResumeProject {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tools: string[];
  category: string;
  linkedInUrl?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  badge: string;
  date: string;
  tag: string;
  pdfPath: string;
}

export interface ArtistProfile {
  name: string;
  title: string;
  shortBio: string;
  longBio: string;
  location: string;
  email: string;
  socialLinks: SocialLink[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: ResumeProject[];
  certifications: Certification[];
}
