'use client';

import { useEffect, useState } from 'react';

export default function DarkReaderFix() {
  // Using state to track client-side rendering
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Mark component as mounted
    setIsMounted(true);
    
    // This function detects if Dark Reader or similar extensions are active
    const isDarkReaderActive = () => {
      return (
        document.documentElement.getAttribute('data-darkreader-mode') ||
        document.documentElement.querySelector('[data-darkreader-inline-stroke]') ||
        document.documentElement.querySelector('[data-darkreader-inline-fill]') ||
        document.documentElement.querySelector('[data-darkreader-inline-color]')
      );
    };

    // Only run the Dark Reader fix when component is mounted (client-side)
    if (isMounted && isDarkReaderActive()) {
      // Create a style element to override Dark Reader styles
      const style = document.createElement('style');
      style.setAttribute('id', 'dark-reader-fix');
      style.textContent = `
        [data-darkreader-inline-stroke],
        [data-darkreader-inline-fill],
        [data-darkreader-inline-color] {
          all: revert !important;
        }
        
        /* Force browser to reflow and fix hydration */
        body {
          display: block !important;
        }
      `;
      document.head.appendChild(style);

      // Remove the style after a delay (after hydration completes)
      const timeoutId = setTimeout(() => {
        const fixStyle = document.getElementById('dark-reader-fix');
        if (fixStyle) {
          fixStyle.remove();
        }
      }, 500);

      // Clean up the timeout if component unmounts
      return () => {
        clearTimeout(timeoutId);
        const fixStyle = document.getElementById('dark-reader-fix');
        if (fixStyle) {
          fixStyle.remove();
        }
      };
    }
  }, [isMounted]); // Depend on isMounted state

  // This component doesn't render anything
  return null;
}