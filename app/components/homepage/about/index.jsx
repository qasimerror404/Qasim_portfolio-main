// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";

const workAreas = [
  { label: "Fintech Mobile Apps", desc: "Production-grade financial and business apps with secure, scalable architecture." },
  { label: "Onboarding & Verification", desc: "KYC, KYB, and KYH flows for identity verification and secure user onboarding." },
  { label: "API-Driven Development", desc: "REST API integration with clean data layers and robust error handling." },
  { label: "Cross-Platform Tooling", desc: "Flutter Desktop tools for macOS and Windows including mini-app sandboxing." },
  { label: "Architecture & Code Quality", desc: "Clean Architecture, state management with BLoC/Riverpod, and maintainable codebases." },
];

const selectedImpact = [
  "Shipped production fintech modules used by real business users at Qi Card",
  "Built secure onboarding and identity verification systems (KYC/KYB/KYH)",
  "Developed cross-platform desktop tooling that improved internal developer workflows",
  "Delivered stable, maintainable features through close collaboration with backend and product teams",
  "Contributed to multiple live Flutter applications in a high-stakes financial domain",
];

function AboutSection() {
  return (
    <div id="about" className="my-12 lg:my-16 relative">
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          ABOUT ME
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
            Who I am
          </p>
          <p className="text-gray-200 text-sm lg:text-lg leading-relaxed">
            {personalData.description}
          </p>

          <div className="mt-8">
            <p className="font-medium mb-4 text-[#16f2b3] text-base uppercase tracking-wider">
              What I Work On
            </p>
            <div className="flex flex-col gap-3">
              {workAreas.map((area, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-pink-500 font-bold mt-0.5 flex-shrink-0">▸</span>
                  <div>
                    <span className="text-white font-medium text-sm">{area.label}</span>
                    <span className="text-gray-400 text-sm"> — {area.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 flex flex-col gap-8">
          <div className="flex justify-center">
            <Image
              src={personalData.profile}
              width={280}
              height={280}
              alt="Qasim Abbas - Senior Flutter Developer"
              className="rounded-lg transition-all duration-1000 grayscale hover:grayscale-0 hover:scale-110 cursor-pointer"
            />
          </div>

          <div className="from-[#0d1224] border-[#1b2c68a0] rounded-lg border bg-gradient-to-r to-[#0a0d37] p-5">
            <p className="font-medium mb-4 text-[#16f2b3] text-sm uppercase tracking-wider">
              Selected Impact
            </p>
            <ul className="flex flex-col gap-2">
              {selectedImpact.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                  <span className="text-[#16f2b3] font-bold flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;