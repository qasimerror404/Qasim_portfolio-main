"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

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

  if (!mounted) {
    return <div className="w-full h-64 bg-[#101123] animate-pulse rounded-md"></div>;
  }

  return <Lottie {...defaultOptions} />;
};

export default AnimationLottie;