import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onContactClick: (projectTitle: string) => void;
}

export default function ProjectModal({ project, onClose, onContactClick }: ProjectModalProps) {
  if (!project) return null;

  // Find the next project for infinite traversal
  const nextProj = PROJECTS.find((p) => p.id === project.nextWorkId) || PROJECTS[0];

  const handleNextProject = () => {
    // We scroll back to top of the inner container smoothly
    const container = document.getElementById('case-study-scroll-wrapper');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'instant' });
    }
    // We toggle by updating selected project
    const customEvent = new CustomEvent('change-project', { detail: nextProj });
    window.dispatchEvent(customEvent);
  };

  return (
    <AnimatePresence>
      <div
        id="case-study-scroll-wrapper"
        className="fixed inset-0 z-50 bg-brand-bg text-white overflow-y-auto selection:bg-brand-accent selection:text-brand-bg"
      >
        {/* Top Sticky/Floating Close Header */}
        <div className="sticky top-0 w-full z-50 bg-brand-bg/85 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 sm:h-20 flex items-center justify-between">
            {/* Left label */}
            <span className="font-mono text-xs text-brand-muted font-bold tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
              {project.id === 'legalskill' ? project.title : `CASE FOCUS // ${project.title}`}
            </span>

            {/* Navigation pills floating - mimics top-tabs in images */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={onClose}
                className="px-4 py-1.5 border border-gray-800 hover:border-white rounded-full text-xs font-mono text-gray-300 hover:text-white transition-all cursor-pointer"
              >
                ← Back to Works
              </button>
            </div>

            {/* Mobile / General Close trigger */}
            <button
              onClick={onClose}
              data-cursor="close"
              className="p-3 bg-brand-darker border border-gray-800 hover:border-white text-gray-300 hover:text-white rounded-full transition-all cursor-pointer"
              aria-label="Close Case Study"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Hero Banner Area - Replica of brick2.png */}
        <div className="w-full relative bg-brand-bg border-b border-gray-800">
          <div className="w-full h-[50vh] sm:h-[70vh] relative overflow-hidden flex items-center justify-center">
            {/* Subtle Gradient Back Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-brand-bg z-10" />

            {/* High fidelity background cover */}
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-60 sm:opacity-75 md:opacity-85"
            />

            {/* Large Overlaid Title - matching brick2.png precisely */}
            <div className="absolute z-20 text-center px-4 w-full">
              <h2 className="text-6xl sm:text-8xl md:text-9vw font-signature font-bold text-brand-accent lowercase tracking-tighter drop-shadow-lg scale-y-105 select-none">
                {project.title.toLowerCase()}
              </h2>
            </div>
          </div>
        </div>

        {/* Dynamic Detailed Narrative Content split section - copy of brick2.png */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12">
            
            {/* Left Column: Simple Caption "Intro" */}
            <div className="md:col-span-3">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-brand-accent border-b-2 border-brand-accent pb-2 inline-block lowercase">
                intro
              </h3>
            </div>

            {/* Right Column: In-depth metrics, bullet points, and actionable links */}
            <div className="md:col-span-9 space-y-8 font-sans">
              <div className="space-y-4">
                {project.introHeading && (
                  <h4 className="text-2xl sm:text-3xl font-display font-medium text-brand-accent leading-snug whitespace-pre-line lowercase">
                    {project.introHeading}
                  </h4>
                )}
                {project.introText && (
                  <p className="text-lg text-brand-muted leading-relaxed font-light whitespace-pre-line">
                    {project.introText}
                  </p>
                )}
              </div>

              {/* Dynamic Bullets Part 1 (TgHunt or similar) */}
              {project.bulletsTg && project.bulletsTg.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-gray-800/65">
                  <h5 className="font-mono text-sm tracking-wider uppercase text-brand-accent font-bold">
                    {project.bulletsTitleTg}
                  </h5>
                  {project.bulletsIntroTg && (
                    <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-light whitespace-pre-line max-w-3xl">
                      {project.bulletsIntroTg}
                    </p>
                  )}
                  <div className="space-y-3 pl-1">
                    {project.bulletsTg.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <span className="font-mono text-xs text-brand-accent shrink-0 mt-1">
                          [0{idx + 1}]
                        </span>
                        <p className="text-sm sm:text-base text-brand-muted leading-relaxed max-w-3xl">
                          {bullet}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dynamic Bullets Part 2 (ClickHunt or similar) */}
              {project.bulletsClick && project.bulletsClick.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-gray-800/65">
                  <h5 className="font-mono text-sm tracking-wider uppercase text-brand-accent font-bold">
                    {project.bulletsTitleClick}
                  </h5>
                  {project.bulletsIntroClick && (
                    <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-light whitespace-pre-line max-w-3xl">
                      {project.bulletsIntroClick}
                    </p>
                  )}
                  <div className="space-y-3 pl-1">
                    {project.bulletsClick.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <span className="font-mono text-xs text-brand-accent shrink-0 mt-1">
                          [0{idx + 1}]
                        </span>
                        <p className="text-sm sm:text-base text-brand-muted leading-relaxed max-w-3xl">
                          {bullet}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Links and Metadata Row - Matching brick2.png action badges */}
              <div className="pt-8 border-t border-gray-800 flex flex-wrap items-center justify-between gap-4">
                {project.id === 'legalskill' ? (
                  <span className="font-mono text-xs text-brand-muted">
                    To dive more into the details:
                    <a
                      href="https://liberating-wasabi-823.notion.site/Legal-Skill-17949890dab380f3b9cddbe85998f5ca?pvs=74"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-accent hover:opacity-70 underline ml-1.5 inline-flex items-center gap-1"
                    >
                      Notion Full Skill <ExternalLink size={12} />
                    </a>
                  </span>
                ) : (
                  <span />
                )}

                <div className="flex items-center gap-3">
                  <span className="px-4 py-2 border border-gray-700 bg-brand-darker rounded-lg text-xs font-mono font-medium text-brand-muted">
                    Year / {project.year}
                  </span>
                  {project.id !== 'sibur' && project.id !== 'karex' && (
                    <a
                      href={project.websiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 bg-brand-accent text-black text-xs font-mono font-bold hover:bg-white hover:text-black transition-colors rounded shadow"
                    >
                      {project.id === 'legalskill' ? 'Read Notion Document' : 'Visit Website'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2x2 Showcase Dashboard Grid - Replica of brick1.png */}
        {project.caseDashboardImages && project.caseDashboardImages.length > 0 && (
          <div className="w-full bg-brand-darker py-16 sm:py-24 border-y border-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
              <div className="text-center sm:text-left space-y-1">
                <span className="font-mono text-xs text-brand-muted uppercase tracking-widest font-bold">
                  SaaS PRODUCT EXHIBITS
                </span>
                <h4 className="text-xl sm:text-2xl font-display font-medium text-brand-accent">
                  User Flow and Interactive Dashboards
                </h4>
              </div>

              {/* Standard Grid with exact image screenshots */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {project.caseDashboardImages.map((imgSrc, index) => {
                  return (
                    <div
                      key={index}
                      className="border border-gray-800 rounded-2xl overflow-hidden aspect-[4/3] bg-brand-bg relative group shadow-lg"
                    >
                      <img
                        src={imgSrc}
                        alt={`${project.title} Exhibit ${index + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Next Work Section - Replicating brick1.png orange chair and laptop */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20 border-b border-gray-800">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-1">
              <span className="font-mono text-xs text-brand-muted uppercase tracking-widest font-medium">
                Up Next
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-brand-accent">
                Next work
              </h3>
            </div>

            {/* Armchair & Laptop Container - triggers next project on click */}
            <div
              onClick={handleNextProject}
              data-cursor="next"
              className="w-full max-w-2xl aspect-[16/9] border border-gray-800 rounded-3xl overflow-hidden cursor-pointer relative group bg-brand-darker shadow-xl"
            >
              <img
                src={project.nextWorkImage}
                alt={`Next work preview: ${nextProj.title}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              {/* Overlay with subtle prompt */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="px-5 py-2.5 bg-brand-accent text-black font-mono font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg">
                  Load Case Study: {nextProj.title} →
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Screen-wide Footer Heading: Giant Text - Replica of education.png & brick1.png, simplified to leave only "anna kuznetsova" and nothing else */}
        <footer className="w-full text-center py-16 bg-brand-bg select-none overflow-hidden border-t border-neutral-900">
          <h2 className="text-[12.5vw] font-funnel font-semibold lowercase leading-[0.95] tracking-tight text-brand-accent whitespace-nowrap cursor-default">
            anna kuznetsova
          </h2>
        </footer>
      </div>
    </AnimatePresence>
  );
}
