"use client";
// @flow strict
import Link from "next/link";
import { personalData } from "@/utils/data/personal-data";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasBlogFeature, setHasBlogFeature] = useState(false);

  // Check if the blog feature is enabled (user has a dev.to account)
  useEffect(() => {
    const checkBlogFeature = async () => {
      if (personalData.devUsername) {
        try {
          const response = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`);
          const data = await response.json();
          setHasBlogFeature(Array.isArray(data) && data.length > 0);
        } catch (error) {
          console.error("Error checking blog feature:", error);
          setHasBlogFeature(false);
        }
      }
    };
    
    checkBlogFeature();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
          <li>
            <Link 
              className="block px-4 py-2 no-underline outline-none hover:no-underline" 
              href="/#about"
              onClick={() => setMenuOpen(false)}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">ABOUT</div>
            </Link>
          </li>
          <li>
            <Link 
              className="block px-4 py-2 no-underline outline-none hover:no-underline" 
              href="/#experience"
              onClick={() => setMenuOpen(false)}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">EXPERIENCE</div>
            </Link>
          </li>
          <li>
            <Link 
              className="block px-4 py-2 no-underline outline-none hover:no-underline" 
              href="/#skills"
              onClick={() => setMenuOpen(false)}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">SKILLS</div>
            </Link>
          </li>
          <li>
            <Link 
              className="block px-4 py-2 no-underline outline-none hover:no-underline" 
              href="/#education"
              onClick={() => setMenuOpen(false)}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">EDUCATION</div>
            </Link>
          </li>
          {hasBlogFeature && (
            <li>
              <Link 
                className="block px-4 py-2 no-underline outline-none hover:no-underline" 
                href="/blog"
                onClick={() => setMenuOpen(false)}
              >
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">BLOGS</div>
              </Link>
            </li>
          )}
          <li>
            <Link 
              className="block px-4 py-2 no-underline outline-none hover:no-underline" 
              href="/#projects"
              onClick={() => setMenuOpen(false)}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">PROJECTS</div>
            </Link>
          </li>
          <li>
            <Link 
              className="block px-4 py-2 no-underline outline-none hover:no-underline" 
              href="/#contact"
              onClick={() => setMenuOpen(false)}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">CONTACT</div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;