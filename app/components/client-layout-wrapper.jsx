'use client';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from 'next/dynamic';

// Dynamically import the ScrollToTop component to avoid hydration issues
const ScrollToTop = dynamic(() => import('./helper/scroll-to-top'), {
  ssr: false
});

// Dynamically import the DarkReaderFix component to avoid hydration issues
const DarkReaderFix = dynamic(() => import('./DarkReaderFix'), {
  ssr: false
});

export default function ClientLayoutWrapper({ children }) {
  return (
    <>
      <ToastContainer />
      {children}
      <ScrollToTop />
      <DarkReaderFix />
    </>
  );
}