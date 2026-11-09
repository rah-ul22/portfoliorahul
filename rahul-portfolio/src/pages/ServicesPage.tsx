'use client';

import { PageLayout } from '../components/layout/PageLayout';
import { Code2, Box, Palette, Layout, Database, BarChart2, Film, Layers } from 'lucide-react';

const services = [
  {
    icon: Box,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    title: '3D Modeling',
    description: 'Hard-surface modeling, architectural visualization, and product design using Autodesk Maya with clean topology and production-ready assets.',
    tags: ['Autodesk Maya', 'Hard-Surface', 'Arch Viz'],
  },
  {
    icon: Palette,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
    title: 'PBR Texturing',
    description: 'Physically-based rendering workflows with Adobe Substance 3D Painter. UV mapping, unwrapping, and high-fidelity material creation.',
    tags: ['Substance 3D', 'PBR', 'UV Mapping'],
  },
  {
    icon: Database,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10 border-indigo-500/20',
    title: 'Data Analysis',
    description: 'Comprehensive data cleaning, exploratory data analysis, statistical modeling, and predictive analytics using Python and industry tools.',
    tags: ['Python', 'Pandas', 'EDA'],
  },
  {
    icon: BarChart2,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
    title: 'Dashboard Development',
    description: 'Interactive dashboards and business intelligence reports in Power BI and Excel with pivot tables, VLOOKUP, and advanced visualizations.',
    tags: ['Power BI', 'Excel', 'Tableau'],
  },
  {
    icon: Code2,
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
    title: 'ML & Forecasting',
    description: 'Machine learning models for classification, regression, and time-series forecasting using Scikit-learn, TensorFlow, and Keras.',
    tags: ['Scikit-learn', 'TensorFlow', 'ML'],
  },
  {
    icon: Film,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
    title: '3D Rendering',
    description: 'Photorealistic rendering setups, lighting rigs, and render-ready scene preparation for architectural and product visualization.',
    tags: ['Arnold', 'Rendering', 'Lighting'],
  },
  {
    icon: Layout,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10 border-pink-500/20',
    title: 'Data Visualization',
    description: 'Clear, compelling charts and graphs using Matplotlib, Seaborn, and Streamlit web applications for data storytelling.',
    tags: ['Matplotlib', 'Seaborn', 'Streamlit'],
  },
  {
    icon: Layers,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
    title: 'Full Pipeline',
    description: 'End-to-end 3D production pipeline from concept and blocking to final UV-mapped, textured, and render-ready asset delivery.',
    tags: ['Pipeline', 'Assets', 'Production'],
  },
];

export default function ServicesPage() {
  return (
    <PageLayout>
      <section className="py-20 px-4 min-h-screen bg-[#0b0b0d]">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase mb-3">
              WHAT I OFFER
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Services Offering
            </h1>
            <p className="text-zinc-400 mt-4 max-w-xl mx-auto leading-relaxed">
              A blend of 3D artistry and data science capabilities — from production-ready models to insightful analytics.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.title}
                  className="group relative rounded-2xl bg-[#141417] border border-white/[0.07] hover:border-white/[0.14] p-5 flex flex-col gap-4 transition-all duration-300 shadow-xl shadow-black/30"
                >
                  <div className={`w-11 h-11 rounded-xl border ${svc.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${svc.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base leading-tight">{svc.title}</h3>
                    <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed">{svc.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {svc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold tracking-wide text-zinc-500 bg-white/[0.05] border border-white/[0.07] rounded-full px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

