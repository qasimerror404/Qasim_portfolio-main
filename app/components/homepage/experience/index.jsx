// @flow strict

import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import { BsCheckCircleFill } from "react-icons/bs";
import experience from '../../../assets/lottie/code.json';
import dynamic from 'next/dynamic';
import GlowCard from "../../helper/glow-card";

// Dynamically import AnimationLottie with SSR disabled
const AnimationLottie = dynamic(() => import("../../helper/animation-lottie"), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#101123] rounded-lg animate-pulse"></div>
});

function Experience() {
  return (
    <div id="experience" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Experience
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-full h-full">
              <AnimationLottie animationPath={experience} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {experiences.map(exp => (
                <GlowCard key={exp.id} identifier={`experience-${exp.id}`}>
                  <div className="p-4 lg:p-5 relative">
                    <Image
                      src="/blur-23.svg"
                      alt="background blur"
                      width={1080}
                      height={200}
                      className="absolute bottom-0 opacity-80"
                    />
                    <div className="flex justify-center mb-1">
                      <p className="text-xs sm:text-sm text-[#16f2b3]">
                        {exp.duration}
                      </p>
                    </div>
                    <div className="flex items-start gap-x-5 px-2 py-3">
                      <div className="text-violet-500 transition-all duration-300 hover:scale-125 flex-shrink-0 mt-1">
                        <BsPersonWorkspace size={34} />
                      </div>
                      <div className="flex-1">
                        <p className="text-base sm:text-xl mb-1 font-semibold uppercase tracking-wide">
                          {exp.title}
                        </p>
                        <p className="text-sm sm:text-base text-[#16f2b3] font-medium mb-2">
                          {exp.company}
                        </p>
                        {exp.description && (
                          <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                            {exp.description}
                          </p>
                        )}
                        {exp.highlights && exp.highlights.length > 0 && (
                          <ul className="flex flex-col gap-1.5">
                            {exp.highlights.map((point, i) => (
                              <li key={i} className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                                <BsCheckCircleFill className="text-[#16f2b3] flex-shrink-0 mt-0.5" size={12} />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;