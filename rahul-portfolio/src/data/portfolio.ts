import type { ArtistProfile, Project3D, GraphicDesignProject, SocialLink } from '../types/portfolio';

export const artistProfile: ArtistProfile = {
  name: 'Rahul M',
  title: '3D Artist & Autodesk Maya Developer',
  shortBio: 'MCA postgraduate specializing in Autodesk Maya hard-surface modeling, UV mapping, and PBR texturing. Creating production-ready 3D assets for architectural visualization, product design, and game-ready props with technical precision and artistic vision.',
  longBio: 'MCA postgraduate specializing in 3D art, hard-surface modeling, and technical visualization using Autodesk Maya. Skilled in architectural environments, industrial product modeling, and detailed prop creation. Experienced in the complete 3D pipeline, including clean topology, UV unwrapping, PBR texturing, and rendering using Adobe Substance 3D Painter. Combining technical precision with creative problem-solving to deliver production-ready, visually compelling 3D assets.',
  location: 'Tamil Nadu, India',
  email: 'rahulmurugam1812@gmail.com',
  socialLinks: [
    { platform: 'GitHub', url: 'https://github.com/rahul1604-m', label: 'github.com/rahul1604-m', icon: 'github' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/rahulm1604', label: 'linkedin.com/in/rahulm1604', icon: 'linkedin' },
    { platform: 'Email', url: 'mailto:rahulmurugam1812@gmail.com', label: 'rahulmurugam1812@gmail.com', icon: 'mail' },
    { platform: 'Portfolio', url: 'https://rahul1604-m.github.io', label: 'rahul1604-m.github.io', icon: 'globe' }
  ],
  skills: [
    { id: 'maya', name: 'Autodesk Maya', category: '3d', proficiency: 90 },
    { id: 'modeling', name: '3D Modeling', category: '3d', proficiency: 88 },
    { id: 'uvmapping', name: 'UV Mapping & Unwrapping', category: '3d', proficiency: 80 },
    { id: 'texturing', name: 'Texturing', category: '3d', proficiency: 82 },
    { id: 'substance', name: 'Adobe Substance 3D Painter', category: '3d', proficiency: 75 },
    { id: 'photoshop', name: 'Adobe Photoshop', category: '3d', proficiency: 80 },
    { id: 'unity', name: 'Unity', category: '3d', proficiency: 75 },
    { id: 'python', name: 'Python', category: 'technical', proficiency: 85 },
    { id: 'sql', name: 'SQL / MySQL / Oracle SQL', category: 'technical', proficiency: 80 },
    { id: 'excel', name: 'Microsoft Excel (Advanced)', category: 'technical', proficiency: 85 },
    { id: 'powerbi', name: 'Power BI', category: 'technical', proficiency: 80 },
    { id: 'pandas', name: 'Pandas', category: 'technical', proficiency: 82 },
    { id: 'numpy', name: 'NumPy', category: 'technical', proficiency: 80 },
    { id: 'scikit', name: 'Scikit-learn', category: 'technical', proficiency: 78 },
    { id: 'tensorflow', name: 'TensorFlow / Keras', category: 'technical', proficiency: 70 },
    { id: 'matplotlib', name: 'Matplotlib / Seaborn', category: 'technical', proficiency: 78 },
    { id: 'streamlit', name: 'Streamlit', category: 'technical', proficiency: 72 },
    { id: 'jupyter', name: 'Jupyter Notebook', category: 'technical', proficiency: 80 },
    { id: 'git', name: 'Git & GitHub', category: 'technical', proficiency: 78 },
    { id: 'dataanalysis', name: 'Data Cleaning & EDA', category: 'design', proficiency: 85 },
    { id: 'forecasting', name: 'Forecasting & Predictive Analytics', category: 'design', proficiency: 80 },
    { id: 'dashboards', name: 'Dashboard Development', category: 'design', proficiency: 82 },
    { id: 'datavis', name: 'Data Visualization', category: 'design', proficiency: 85 },
    { id: 'statistics', name: 'Statistical Analysis', category: 'design', proficiency: 78 },
    { id: 'pivottables', name: 'Pivot Tables / VLOOKUP / XLOOKUP', category: 'design', proficiency: 82 },
  ],
  experience: [],
  education: [
    { id: 'mca-edu', degree: 'Master of Computer Applications (MCA)', institution: 'SASTRA Deemed University', period: 'July 2024 — May 2026', location: 'Thanjavur, Tamil Nadu', description: 'CGPA: 7.0' },
    { id: 'bca-edu', degree: 'Bachelor of Computer Applications (BCA)', institution: 'Hindustan College of Arts and Science', period: 'June 2021 — April 2024', location: 'Coimbatore, Tamil Nadu', description: 'CGPA: 7.4' },
    { id: '12th-edu', degree: '12th Standard (CBSE)', institution: 'Kendriya Vidyalaya', period: 'April 2021', location: 'Madurai, Tamil Nadu', description: 'Percentage: 69%' },
    { id: '10th-edu', degree: '10th Standard (CBSE)', institution: 'Kendriya Vidyalaya', period: 'April 2019', location: 'Madurai, Tamil Nadu', description: 'Percentage: 58%' }
  ],
  certifications: [
    {
      id: 'iot',
      title: 'Introduction to Internet of Things',
      issuer: 'NPTEL • IIT Kharagpur',
      badge: 'Elite + Silver (Score: 81%)',
      date: 'Jan — Apr 2026',
      tag: 'IoT & Embedded',
      pdfPath: '/certifications/Introduction to Internet of Things.pdf'
    },
    {
      id: 'cloud',
      title: 'Cloud Computing',
      issuer: 'NPTEL • IIT Kharagpur',
      badge: 'Elite (Score: 73%)',
      date: 'Jan — Apr 2026',
      tag: 'Cloud Architecture',
      pdfPath: '/certifications/Cloud Computing.pdf'
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity Analyst Job Simulation',
      issuer: 'Tata • Forage',
      badge: 'IAM & Enterprise Security',
      date: 'December 2024',
      tag: 'Information Security',
      pdfPath: '/certifications/Cybersecurity Analyst Job Simulation.pdf'
    },
    {
      id: 'finch',
      title: 'Programming the Finch Robot in Java Workshop',
      issuer: 'Oracle Academy',
      badge: 'Java & Robotics Systems',
      date: 'April 2024',
      tag: 'Java Systems',
      pdfPath: '/certifications/Programming the Finch Robot in Java Workshop.pdf'
    },
    {
      id: 'excel',
      title: 'Preparing Data for Analysis with Microsoft Excel',
      issuer: 'Coursera',
      badge: 'Data Preparation & Modeling',
      date: 'September 2025',
      tag: 'Data Analytics',
      pdfPath: '/certifications/Preparing Data for Analysis with Microsoft Excel.pdf'
    }
  ],
  projects: [
    { id: 'sales-dashboard', title: 'Sales Data Analysis Dashboard', description: 'Interactive dashboard to monitor sales, profit, and units sold with dynamic filters for region, product, and salesperson.', tools: ['Microsoft Excel', 'Power BI'], category: 'Data & Analytics', longDescription: 'Built an interactive dashboard to monitor sales, profit, and units sold, enabling stakeholder reporting and supporting data-driven client decision-making. Created visualizations (bar, line, pie charts) to analyze sales trends, regional performance, and product insights. Implemented dynamic filters for region, product, and salesperson to enable real-time, data-driven decision making.', linkedInUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7468449810283642880/' },
    { id: 'bone-cancer', title: 'Predicting Length of Survival for Bone Cancer Patients', description: 'Machine learning models using KNN and Random Forest to predict bone cancer risk from patient health and medical test data.', tools: ['Python', 'Scikit-learn', 'KNN', 'Random Forest'], category: 'AI / Machine Learning', longDescription: 'Expanded machine learning models using KNN and Random Forest to predict bone cancer risk from patient health and medical test data, achieving approximately 89% classification accuracy. Performed data preprocessing, feature selection, and model testing; evaluated accuracy metrics to validate deployment readiness. Designed the system to support early clinical decision-making through predictive insights (academic ML research project).' },
    { id: 'earthquake-hybrid', title: 'Earthquake Prediction Using Hybrid Approach', description: 'Hybrid forecasting model using Random Forest and LSTM with USGS earthquake data for seismic feature extraction and time-series forecasting.', tools: ['Python', 'Random Forest', 'LSTM', 'USGS Data'], category: 'AI / Machine Learning', longDescription: 'Built a hybrid forecasting model using Random Forest and LSTM with USGS earthquake data. Applied sliding-window techniques for seismic feature extraction and time-series forecasting. Improved model performance through preprocessing, normalization, and cross-validation.' },
    { id: 'earthquake-framework', title: 'End-to-End Hybrid AI Framework for Earthquake Forecasting', description: 'End-to-end forecasting system estimating probability of major earthquakes (M ≥ 6.0) with interactive hazard visualization and real-time seismic risk analysis.', tools: ['Python', 'LSTM', 'Random Forest', 'Streamlit', 'Interactive Web App'], category: 'AI / Machine Learning', longDescription: 'Improved an end-to-end forecasting system to estimate the probability of major earthquakes (M ≥ 6.0) and maximum expected magnitude, achieving approximately 98% risk classification accuracy. Implemented magnitude-based resampling and sliding-window feature engineering for time-series modeling. Delivered an end-to-end solution deployment enabling real-time seismic risk analysis, interactive hazard visualization, and ongoing system monitoring. Designed system architecture for a hybrid forecasting model, selecting Random Forest and LSTM components and specifying data pipeline requirements using USGS earthquake data.', linkedInUrl: 'https://www.linkedin.com/in/rahulm1604/details/projects/' }
  ]
};

export const projects3D: Project3D[] = [
  {
    id: 'building',
    title: 'Commercial Complex Building',
    description: 'Flagship large-scale architectural building with modular facade system, unitized curtain wall, and structural grid',
    longDescription: 'My flagship Autodesk Maya 3D project: a massive commercial architectural complex designed with precision engineering realism. Features a fully articulated curtain wall system, multi-tier floor plates, entrance canopy, podium structural assemblies, and optimized polygon flow for architectural visualization workflows.',
    modelPath: '/models/building.glb',
    screenshotPath: '/images/maya-building.svg',
    software: ['Autodesk Maya'],
    tags: ['Architecture', 'Environment', 'Commercial', 'Best Work', 'Flagship Model', 'Curtain Wall'],
    year: '2024',
    category: 'environment',
    featured: true,
    wireframeAvailable: true
  },
  {
    id: 'firepump',
    title: 'Fire Pump System',
    description: 'Industrial fire suppression equipment with detailed mechanical assemblies and piping',
    longDescription: 'A detailed industrial fire pump system modeled for technical visualization. Includes pump housing, impeller assembly, valve mechanisms, piping connections, and mounting brackets. Built with manufacturing-accurate proportions and clean topology for CAD-style presentation renders.',
    modelPath: '/models/firepump.glb',
    screenshotPath: '/images/maya-firepump.svg',
    software: ['Autodesk Maya'],
    tags: ['Industrial', 'Mechanical', 'Technical Viz', 'Product Design'],
    year: '2024',
    category: 'product',
    featured: true,
    wireframeAvailable: true
  },
  {
    id: 'ghostblaster',
    title: 'Ghostblaster',
    description: 'High-detail sci-fi weapon prop with intricate mechanical components',
    longDescription: 'A conceptual sci-fi weapon designed as a hero prop for game-ready assets. The model features complex hard-surface geometry with detailed mechanical assemblies, modular components, and optimized topology for real-time rendering. Created entirely in Autodesk Maya with PBR texturing workflow.',
    modelPath: '/models/ghostblaster.glb',
    screenshotPath: '/images/maya-ghostblaster.svg',
    software: ['Autodesk Maya', 'Substance Painter'],
    tags: ['Hard Surface', 'Props', 'Game Ready', 'Sci-Fi', 'PBR'],
    year: '2024',
    category: 'prop',
    featured: true,
    wireframeAvailable: true
  },
  {
    id: 'bike',
    title: 'Sport Motorcycle',
    description: 'Full-detail sport bike with animated components and realistic proportions',
    longDescription: 'A complete sport motorcycle model featuring detailed engine block, frame geometry, suspension system, braking components, and drivetrain. Modeled with subdivision-ready topology for high-quality close-up renders.',
    modelPath: '/models/bike.glb',
    screenshotPath: '/images/maya-bike.svg',
    software: ['Autodesk Maya'],
    tags: ['Vehicle', 'Hard Surface', 'Product Viz'],
    year: '2024',
    category: 'vehicle',
    featured: true,
    wireframeAvailable: true
  },
  {
    id: 'boat',
    title: 'Speed Boat',
    description: 'High-performance marine vessel with hydrodynamic hull design',
    longDescription: 'A sleek speed boat modeled with attention to hydrodynamic form language. Features detailed deck layout, seating, console instrumentation, propulsion system, and hull geometry. Suitable for marine visualization and advertising contexts.',
    modelPath: '/models/boat.glb',
    screenshotPath: '/images/maya-boat.svg',
    software: ['Autodesk Maya'],
    tags: ['Vehicle', 'Marine', 'Product Design', 'Transportation'],
    year: '2024',
    category: 'vehicle',
    featured: false,
    wireframeAvailable: true
  },
  {
    id: 'radio',
    title: 'Vintage Radio',
    description: 'Retro consumer electronics with period-accurate detailing',
    longDescription: 'A meticulously crafted vintage radio prop featuring authentic textures, woven speaker grille, analog dial mechanism, and period-appropriate control layout. Created as a hero asset for period-piece visualization.',
    modelPath: '/models/radio.glb',
    screenshotPath: '/images/maya-radio.svg',
    software: ['Autodesk Maya', 'Substance Painter'],
    tags: ['Props', 'Vintage', 'Product Design', 'Materials'],
    year: '2024',
    category: 'prop',
    featured: false,
    wireframeAvailable: true
  },
  {
    id: 'book',
    title: 'Hardcover Book',
    description: 'Editorial prop with detailed binding and page geometry',
    longDescription: 'A premium hardcover book model with realistic binding details, page block geometry, and cover treatment. Created for editorial visualization and product shot contexts.',
    modelPath: '/models/book.glb',
    screenshotPath: '/images/maya-book.svg',
    software: ['Autodesk Maya'],
    tags: ['Props', 'Editorial', 'Product', 'Stationery'],
    year: '2024',
    category: 'prop',
    featured: false,
    wireframeAvailable: true
  }
];

export const graphicDesignProjects: GraphicDesignProject[] = [];

export const socialLinks: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/rahul1604-m', label: 'github.com/rahul1604-m', icon: 'github' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/rahulm1604', label: 'linkedin.com/in/rahulm1604', icon: 'linkedin' },
  { platform: 'Email', url: 'mailto:rahulmurugam1812@gmail.com', label: 'rahulmurugam1812@gmail.com', icon: 'mail' },
  { platform: 'Portfolio', url: 'https://rahul1604-m.github.io', label: 'rahul1604-m.github.io', icon: 'globe' }
];

export const heroSpecializations = [
  { id: 'data', title: 'Data & AI/ML', subtitle: 'Analytics, Machine Learning & Visualization', icon: 'chart' },
  { id: 'maya', title: 'Autodesk Maya', subtitle: '3D Modeling & Product Visualization', icon: 'cube' },
  { id: 'dev', title: 'Python & SQL', subtitle: 'Data Engineering & Automation', icon: 'code' },
  { id: 'viz', title: 'Power BI & Excel', subtitle: 'Dashboard Development & BI Tools', icon: 'layout' }
];

export const categoryLabels: Record<typeof projects3D[0]['category'], string> = { product: 'Product', environment: 'Environment', character: 'Character', prop: 'Prop', vehicle: 'Vehicle' };
