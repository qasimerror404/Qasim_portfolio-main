'use client';

import { useEffect, useState } from "react";
import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import { personalData } from "@/utils/data/personal-data";
import Blog from "./components/homepage/blog";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const fetchBlogs = async () => {
      try {
        // Use fetch with cache control instead of axios for consistency
        const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`, {
          cache: 'force-cache'
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch blogs');
        }
        
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Render a simple loading state during server-side rendering
  // and initial client-side render to prevent hydration mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-[#0d1224]"></div>;
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      {!loading && blogs.length > 0 && <Blog blogs={blogs} />}
      <ContactSection />
    </div>
  );
}