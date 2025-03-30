"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const DEFAULT_BTN_CLS =
  "fixed bottom-8 right-6 z-50 flex items-center rounded-full bg-gradient-to-r from-pink-500 to-violet-600 p-4 hover:text-xl transition-all duration-300 ease-out";
const SCROLL_THRESHOLD = 50;

const ScrollToTop = () => {
  // Start with hidden by default to ensure server and client match initially
  const [btnCls, setBtnCls] = useState(`${DEFAULT_BTN_CLS} opacity-0 pointer-events-none`);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only run in browser environment and after component has mounted
    if (typeof window === 'undefined' || !isMounted) return;

    const handleScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setBtnCls(DEFAULT_BTN_CLS);
      } else {
        setBtnCls(`${DEFAULT_BTN_CLS} opacity-0 pointer-events-none`);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check to set the correct state on first render
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll, { passive: true });
    };
  }, [isMounted]);

  const onClickBtn = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button className={btnCls} onClick={onClickBtn} aria-label="Scroll to top">
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTop;