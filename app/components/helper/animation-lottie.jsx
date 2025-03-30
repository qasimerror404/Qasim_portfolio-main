"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Lottie with no SSR to prevent hydration issues
const Lottie = dynamic(() => import("lottie-react"), { 
  ssr: false 
});

const AnimationLottie = ({ animationPath, width }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationPath,
    style: {
      width: '95%',
    }
  };

  // Always render the placeholder during SSR and initial client render
  // This ensures consistency between server and client
  if (!mounted) {
    return <div className="w-full h-64 bg-[#101123] animate-pulse rounded-md"></div>;
  }

  // Only render the Lottie component after client-side hydration is complete
  return <Lottie {...defaultOptions} />;
};

export default AnimationLottie;