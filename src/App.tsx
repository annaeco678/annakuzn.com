/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import HomeTab from './components/HomeTab';
import ProjectModal from './components/ProjectModal';
import { PROJECTS, BIOGRAPHY } from './data';
import { Project } from './types';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Infinite traversal listener for Next Work slides
  useEffect(() => {
    const handleChangeProject = (e: Event) => {
      const customEvent = e as CustomEvent<Project>;
      if (customEvent.detail) {
        setSelectedProject(customEvent.detail);
      }
    };
    window.addEventListener('change-project', handleChangeProject);
    return () => {
      window.removeEventListener('change-project', handleChangeProject);
    };
  }, []);

  // Modal contact triggers direct custom action or simple toggle since Contact view is deleted
  const handleModalContactClick = () => {
    // If contact view is deleted, we can open visitor's standard mail app directly
    window.location.href = 'mailto:annakuzn09@gmail.com?subject=Inquiry';
  };

  return (
    <div className="min-h-screen bg-brand-bg relative flex flex-col justify-between selection:bg-brand-accent selection:text-brand-bg">
      {/* Pristine, clean minimalist gallery layout with zero clutter background */}
      
      {/* Global Interactive Follower Custom Cursor */}
      <CustomCursor />

      <div>
        {/* Core Header Column with Massive Banner */}
        <Header />

        {/* Home overview layout displaying the beautiful single-page scroll layout */}
        <main className="w-full relative py-2 sm:py-6 overflow-hidden">
          <HomeTab
            projects={PROJECTS}
            headline={BIOGRAPHY.headline}
            subheadline={BIOGRAPHY.subheadline}
            onProjectSelect={setSelectedProject}
          />
        </main>
      </div>

      {/* Visual Case Studies overlay Popup detail sheet */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onContactClick={handleModalContactClick}
      />

      {/* Dynamic Screen-Wide Footer showing ONLY giant signature - styled lowercase and cream color exactly matching the image */}
      <footer className="w-full text-center py-16 bg-brand-bg select-none overflow-hidden mt-20 border-t border-neutral-900">
        <h2 className="text-[12.5vw] font-funnel font-semibold lowercase leading-[0.95] tracking-tight text-[#ece7e1] whitespace-nowrap cursor-default">
          anna kuznetsova
        </h2>
      </footer>
    </div>
  );
}
