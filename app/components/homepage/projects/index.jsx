'use client';

import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';
import { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadMore = () => {
    setVisibleProjects(prev => 
      prev + 3 > projectsData.length ? projectsData.length : prev + 3
    );
  };

  const showLess = () => {
    setVisibleProjects(3);
    // Scroll back to projects section
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id='projects' className="relative z-30 my-12 lg:my-24 scroll-mt-24">
      <div className={`sticky top-0 pt-6 pb-6 bg-[#0d1224] z-20 ${isScrolled ? 'shadow-lg' : ''}`}>
        <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute -top-3 left-0 translate-x-1/2 filter blur-3xl opacity-30"></div>
        <div className="flex items-center justify-start relative">
          <span className="bg-[#1a1443] absolute left-0 w-fit text-white px-5 py-3 text-xl rounded-md">
            PROJECTS
          </span>
          <span className="w-full h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {projectsData.slice(0, visibleProjects).map((project, index) => (
          <div
            key={`project-${project.id}-${index}`}
            className="transition-all duration-300 hover:translate-y-[-5px]"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        {visibleProjects < projectsData.length ? (
          <button
            onClick={loadMore}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-all duration-200 hover:gap-3"
          >
            <span>Load More</span>
            <FaChevronDown />
          </button>
        ) : visibleProjects > 3 ? (
          <button
            onClick={showLess}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-all duration-200 hover:gap-3"
          >
            <span>Show Less</span>
            <FaChevronUp />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Projects;