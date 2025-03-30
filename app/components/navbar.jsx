"use client";

import Link from "next/link";
import { personalData } from "@/utils/data/personal-data";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasBlogFeature, setHasBlogFeature] = useState(false);
  const [mounted, setMounted] = useState(false);

  // First useEffect to handle mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Second useEffect to check blog feature
  useEffect(() => {
    // Only run this effect on the client-side after mounting
    if (!mounted) return;
    
    const checkBlogFeature = async () => {
      if (personalData.devUsername) {
        try {
          const response = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`, {
            cache: 'force-cache' // Add caching to prevent different responses
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch blog data');
          }
          
          const data = await response.json();
          setHasBlogFeature(Array.isArray(data) && data.length > 0);
        } catch (error) {
          console.error("Error checking blog feature:", error);
          setHasBlogFeature(false);
        }
      }
    };
    
    checkBlogFeature();
  }, [mounted]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // To prevent hydration mismatch, render a consistent initial state
  const navLinks = [
    { href: "/#about", label: "ABOUT" },
    { href: "/#experience", label: "EXPERIENCE" },
    { href: "/#skills", label: "SKILLS" },
    { href: "/#education", label: "EDUCATION" },
    { href: "/#projects", label: "PROJECTS" },
    { href: "/#contact", label: "CONTACT" }
  ];

  // Only add the blog link if we've confirmed it exists and we're client-side
  if (mounted && hasBlogFeature) {
    navLinks.splice(4, 0, { href: "/blog", label: "BLOGS" });
  }

  return (
    <nav className="bg-transparent relative z-50">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className="text-[#16f2b3] text-3xl font-bold">
            {personalData.name}
          </Link>
        </div>

        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-white p-2 rounded"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <ul className={`${menuOpen ? 'flex flex-col bg-[#0d1224] p-4 absolute top-16 right-0 left-0 z-50' : 'hidden'} md:flex md:flex-row md:space-x-1 md:static md:bg-transparent`}>
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link 
                className="block px-4 py-2 no-underline outline-none hover:no-underline" 
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">{link.label}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;