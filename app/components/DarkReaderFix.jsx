'use client';

import { useEffect } from 'react';

export default function DarkReaderFix() {
  useEffect(() => {
    // This function detects if Dark Reader or similar extensions are active
    const isDarkReaderActive = () => {
      return (
        document.documentElement.getAttribute('data-darkreader-mode') ||
        document.documentElement.querySelector('[data-darkreader-inline-stroke]') ||
        document.documentElement.querySelector('[data-darkreader-inline-fill]') ||
        document.documentElement.querySelector('[data-darkreader-inline-color]')
      );
    };

    if (isDarkReaderActive()) {
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

      // Force a small reflow
      document.body.offsetHeight;
      
      // Remove the style after a delay (after hydration completes)
      setTimeout(() => {
        const fixStyle = document.getElementById('dark-reader-fix');
        if (fixStyle) {
          fixStyle.remove();
        }
      }, 500);
    }
  }, []);

  // This component doesn't render anything
  return null;
}