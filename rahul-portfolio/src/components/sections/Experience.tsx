'use client';

import { motion } from 'framer-motion';
import { Building2, Code, GraduationCap } from 'lucide-react';
import { Section, Heading, Text, Card } from '../ui';

const experienceItems = [
  {
    id: 'education-mca',
    type: 'education',
    title: 'Master of Computer Applications (MCA)',
    organization: 'SASTRA Deemed University',
    location: 'Thanjavur, Tamil Nadu',
    period: 'July 2024 — May 2026',
    description: 'CGPA: 7.0. Focused on advanced computer applications, software development, and data analytics. Completed coursework in machine learning, cloud computing, and database systems.',
    highlights: ['Machine Learning & AI', 'Cloud Computing', 'Database Systems', 'Software Engineering'],
    icon: GraduationCap,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20'
  },
  {
    id: 'education-bca',
    type: 'education',
    title: 'Bachelor of Computer Applications (BCA)',
    organization: 'Hindustan College of Arts and Science',
    location: 'Coimbatore, Tamil Nadu',
    period: 'June 2021 — April 2024',
    description: 'CGPA: 7.4. Strong foundation in programming, data structures, algorithms, and web development. Active participant in coding competitions and technical workshops.',
    highlights: ['Programming Fundamentals', 'Data Structures', 'Web Development', 'Database Management'],
    icon: GraduationCap,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20'
  },
  {
    id: 'cert-iot',
    type: 'certification',
    title: 'Introduction to Internet of Things',
    organization: 'NPTEL • IIT Kharagpur',
    period: 'Jan — Apr 2026',
    description: 'Elite + Silver (Score: 81%). Comprehensive IoT course covering sensor networks, embedded systems, and IoT protocols.',
    highlights: ['IoT Architecture', 'Sensor Networks', 'Embedded Systems'],
    icon: Code,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20'
  },
  {
    id: 'cert-cloud',
    type: 'certification',
    title: 'Cloud Computing',
    organization: 'NPTEL • IIT Kharagpur',
    period: 'Jan — Apr 2026',
    description: 'Elite (Score: 73%). Cloud architecture, virtualization, distributed systems, and cloud security fundamentals.',
    highlights: ['Cloud Architecture', 'Virtualization', 'Distributed Systems'],
    icon: Code,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20'
  },
  {
    id: 'cert-cyber',
    type: 'certification',
    title: 'Cybersecurity Analyst Job Simulation',
    organization: 'Tata • Forage',
    period: 'December 2024',
    description: 'IAM & Enterprise Security. Practical simulation covering identity management, threat detection, and enterprise security operations.',
    highlights: ['Identity Management', 'Threat Detection', 'Security Operations'],
    icon: Code,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20'
  },
  {
    id: 'cert-finch',
    type: 'certification',
    title: 'Programming the Finch Robot in Java Workshop',
    organization: 'Oracle Academy',
    period: 'April 2024',
    description: 'Java & Robotics Systems. Hands-on workshop programming Finch robots using Java for educational robotics.',
    highlights: ['Java Programming', 'Robotics', 'Embedded Systems'],
    icon: Code,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20'
  },
  {
    id: 'cert-excel',
    type: 'certification',
    title: 'Preparing Data for Analysis with Microsoft Excel',
    organization: 'Coursera',
    period: 'September 2025',
    description: 'Data Preparation & Modeling. Advanced Excel techniques for data cleaning, transformation, and analytical modeling.',
    highlights: ['Data Cleaning', 'Advanced Excel', 'Data Modeling'],
    icon: Code,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20'
  },
  {
    id: 'project-sales',
    type: 'project',
    title: 'Sales Data Analysis Dashboard',
    organization: 'Academic Project',
    period: '2025',
    description: 'Interactive dashboard to monitor sales, profit, and units sold with dynamic filters for region, product, and salesperson. Built using Microsoft Excel and Power BI.',
    highlights: ['Power BI', 'Excel', 'Data Visualization', 'Dashboard Development'],
    icon: Building2,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7468449810283642880/'
  },
  {
    id: 'project-bone',
    type: 'project',
    title: 'Predicting Length of Survival for Bone Cancer Patients',
    organization: 'Academic ML Research',
    period: '2025',
    description: 'Machine learning models using KNN and Random Forest to predict bone cancer risk from patient health and medical test data, achieving ~89% classification accuracy.',
    highlights: ['Python', 'Scikit-learn', 'KNN', 'Random Forest', 'Medical ML'],
    icon: Building2,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20'
  },
  {
    id: 'project-eq-hybrid',
    type: 'project',
    title: 'Earthquake Prediction Using Hybrid Approach',
    organization: 'Academic Research',
    period: '2025',
    description: 'Hybrid forecasting model using Random Forest and LSTM with USGS earthquake data for seismic feature extraction and time-series forecasting.',
    highlights: ['Python', 'LSTM', 'Random Forest', 'Time Series', 'USGS Data'],
    icon: Building2,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20'
  },
  {
    id: 'project-eq-framework',
    type: 'project',
    title: 'End-to-End Hybrid AI Framework for Earthquake Forecasting',
    organization: 'Academic Research',
    period: '2025',
    description: 'End-to-end forecasting system estimating probability of major earthquakes (M ≥ 6.0) with interactive hazard visualization and real-time seismic risk analysis, achieving ~98% risk classification accuracy. Built with Streamlit for deployment.',
    highlights: ['Python', 'LSTM', 'Random Forest', 'Streamlit', 'Real-time Analytics'],
    icon: Building2,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    link: 'https://www.linkedin.com/in/rahulm1604/details/projects/'
  }
];

function Experience() {
  return (
    <Section id="experience" className="relative">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-4xl mx-auto mb-16 text-center"
      >
        <Heading as="h2" size="h1" weight="bold" className="mb-4">
          Experience
        </Heading>
        <Text size="lg" color="muted" className="max-w-2xl mx-auto leading-relaxed">
          Academic background, certifications, and research projects demonstrating expertise in 3D art, data analytics, machine learning, and software development.
        </Text>
      </motion.div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/[0.08]" />
          
          {experienceItems.map((item, index) => {
            const Icon = item.icon;
            const isEducation = item.type === 'education';
            const isCertification = item.type === 'certification';
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative pl-16 pb-12 last:pb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-[#0b0b0d] z-10">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                </div>
                
                {/* Card */}
                <Card 
                  variant="outlined" 
                  padding="lg" 
                  className={`bg-[#141417] border-white/[0.07] hover:border-white/[0.14] transition-all duration-300 ${item.bgColor} ${item.borderColor}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.bgColor} ${item.borderColor} ${item.color}`}>
                          {isEducation ? 'Education' : isCertification ? 'Certification' : 'Project'}
                        </span>
                        <span className="text-xs text-zinc-500 font-mono">{item.period}</span>
                      </div>
                      <Heading as="h3" size="h5" weight="bold" animate={false} className="text-white mb-1">
                        {item.title}
                      </Heading>
                      <Text size="sm" color="muted" className="mb-2">
                        {item.organization} • {item.location}
                      </Text>
                      <Text size="sm" color="default" className="leading-relaxed mb-3">
                        {item.description}
                      </Text>
                      <div className="flex flex-wrap gap-2">
                        {item.highlights.map((highlight, i) => (
                          <span key={i} className={`text-xs px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-zinc-400`}>
                            {highlight}
                          </span>
                        ))}
                      </div>
                      {item.link && (
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          View Project
                          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                            <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}

export default Experience;