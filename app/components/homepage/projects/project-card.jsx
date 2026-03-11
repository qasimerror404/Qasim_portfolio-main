// @flow strict
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

function ProjectCard({ project }) {
  const { 
    name, 
    description, 
    tools, 
    role, 
    code, 
    demo, 
    image,
    category,
  } = project;

  return (
    <div className="from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37] w-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-violet-600/20">
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
      </div>
      <div className="px-4 lg:px-8 py-3 lg:py-5 relative">
        <div className="flex flex-row space-x-1 lg:space-x-2 absolute top-1/2 -translate-y-1/2">
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-red-400"></div>
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-orange-400"></div>
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-green-200"></div>
        </div>
        <div className="flex items-center justify-center gap-3 ml-10">
          <p className="text-center text-[#16f2b3] text-base lg:text-xl font-bold">
            {name}
          </p>
          {category && (
            <span className="hidden sm:inline-block text-xs px-2 py-0.5 rounded-full bg-violet-900/60 border border-violet-500/40 text-violet-300 font-medium">
              {category}
            </span>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        {/* Project details */}
        <div className="flex flex-col space-y-4">
          <div className="text-gray-300 text-sm md:text-base">
            <p className="mb-4">{description}</p>
            <p className="text-[#16f2b3]"><span className="font-bold">Role:</span> {role}</p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {tools.map((tool, index) => (
              <span 
                key={index} 
                className="bg-[#1a1443] text-xs px-2 py-1 rounded-full text-gray-200"
              >
                {tool}
              </span>
            ))}
          </div>
          
          <div className="flex space-x-4 mt-4">
            {code && (
              <Link 
                href={code} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-sm text-white hover:text-pink-500 transition-colors"
              >
                <FaGithub className="text-lg" />
                <span>Code</span>
              </Link>
            )}
            {demo && (
              <Link 
                href={demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-sm text-white hover:text-pink-500 transition-colors"
              >
                <FaExternalLinkAlt className="text-lg" />
                <span>Live Demo</span>
              </Link>
            )}
          </div>
        </div>
        
        {/* Project image */}
        <div className="relative overflow-hidden rounded-lg h-48 md:h-full group bg-[#101123]">
          {image ? (
            <Image
              src={image}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a1443] to-[#0f0b24]">
              <span className="text-3xl font-bold text-[#16f2b3]">{name.charAt(0)}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            {(code || demo) && (
              <div className="flex space-x-4">
                {code && (
                  <Link 
                    href={code}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#16f2b3] text-gray-900 p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <FaGithub size={20} />
                  </Link>
                )}
                {demo && (
                  <Link 
                    href={demo}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#16f2b3] text-gray-900 p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <FaExternalLinkAlt size={20} />
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;