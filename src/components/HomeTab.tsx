import { useState } from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { BIOGRAPHY } from '../data';
import Magnetic from './Magnetic';

interface HomeTabProps {
  projects: Project[];
  headline: string;
  subheadline: string;
  onProjectSelect: (project: Project) => void;
}

export default function HomeTab({ projects, headline, onProjectSelect }: HomeTabProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('annakuzn09@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-8"
    >
      {/* Bio Paragraph Section - Splitting into columns where the bio sits nicely on the right column */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 sm:mb-24 pt-8 sm:pt-14 bg-brand-bg relative z-10 leading-[1.4] text-lg sm:text-xl md:text-[22px] text-brand-muted font-light">
        <div className="hidden md:block md:col-span-6" />
        
        <div className="md:col-span-6 space-y-6">
          <p className="leading-snug text-brand-accent">
            AI-first Product Manager with 5 years of experience shipping AI, SaaS and legaltech products.
          </p>
          <p className="leading-snug text-brand-muted">
            Strong legal background with 3+ years of practice in contract and tax law. Founder and startup experience.
          </p>
        </div>
      </div>

      {/* Works Area Section - 2x2 Clean Grid as shown in the uploaded image */}
      <div id="works-section" className="mb-24 sm:mb-32 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 sm:gap-x-12 sm:gap-y-16">
          {projects.map((project) => {
            return (
              <div
                key={project.id}
                onClick={() => onProjectSelect(project)}
                data-cursor="view"
                className="group cursor-pointer flex flex-col space-y-4"
              >
                {/* Direct Image showcase Container with elegant rounded corners like the uploaded image */}
                <div className="aspect-[1.4] w-full overflow-hidden rounded-xl border border-neutral-800 bg-brand-darker relative shadow-md">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500 ease-out"
                  />
                  {/* Subtle hover overlay shading */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
                </div>

                {/* Metadata: Title & Year row, fully lowercase under the image */}
                <div className="space-y-1 font-sans px-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-brand-accent font-semibold text-lg sm:text-xl group-hover:text-white transition-colors duration-200 lowercase">
                      {project.title.toLowerCase()}
                    </h3>
                    <span className="text-brand-muted font-mono text-[11px] sm:text-xs tracking-tight">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-muted lowercase font-light">
                    {project.role ? `${project.role.toLowerCase()} — ${project.description.toLowerCase()}` : project.description.toLowerCase()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Education Block - Replica on Main Page with matched layout */}
      <div id="education-section" className="w-full py-16 sm:py-24 border-t border-neutral-800 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12">
          
          {/* Left Column: Education Label (Lowercase for premium editorial style) */}
          <div className="md:col-span-3">
            <h3 className="text-lg sm:text-xl font-display font-medium text-brand-accent lowercase tracking-wider">
              education
            </h3>
          </div>

          {/* Right Column: Structured Educational rows and the copy email widget */}
          <div className="md:col-span-9 space-y-10">
            <div className="border-t border-neutral-800">
              <div className="divide-y divide-neutral-800/80">
                {BIOGRAPHY.education.map((edu, idx) => (
                  <div key={idx} className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 text-sm sm:text-base font-sans font-light lowercase">
                    <div className="sm:col-span-6 font-medium text-brand-accent">
                      {edu.degree.toLowerCase()}
                    </div>
                    <div className="sm:col-span-4 text-brand-muted">
                      {edu.institution.toLowerCase()}
                    </div>
                    <div className="sm:col-span-2 text-right text-brand-muted font-mono text-xs sm:text-sm">
                      {edu.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Capsule and buttons */}
            <div className="flex flex-wrap items-center justify-end gap-3.5 pt-4">
              <Magnetic strength={0.2}>
                <a
                  href="mailto:annakuzn09@gmail.com"
                  className="bg-brand-accent text-[#121212] font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full hover:bg-white transition-all shadow"
                >
                  annakuzn09@gmail.com
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <button
                  onClick={handleCopyEmail}
                  data-cursor="copy"
                  className="bg-transparent border border-neutral-700 hover:border-neutral-400 text-neutral-300 text-xs font-semibold px-5 py-2.5 rounded-full flex items-center gap-2 cursor-pointer transition-colors font-sans"
                >
                  {copied ? (
                    <>
                      <span className="text-brand-accent font-medium">email copied!</span>
                    </>
                  ) : (
                    <>
                      <span>copy email</span>
                    </>
                  )
                    }
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
