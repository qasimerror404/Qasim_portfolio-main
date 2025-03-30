import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
import dynamic from 'next/dynamic';

// Dynamically import the client components with SSR disabled
const ClientLayoutWrapper = dynamic(() => import('./components/client-layout-wrapper'), {
  ssr: true // We can keep SSR true since it no longer has hydration issues
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio of Qasim Error - Software Developer",
  description:
    "This is the portfolio of Qasim Error. I am a full stack developer and a self taught developer. I love to learn new things and I am always open to collaborating with others. I am a quick learner and I am always looking for new challenges.",
};

export default function RootLayout({ children }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM || '';
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayoutWrapper>
          <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
            <Navbar />
            {children}
          </main>
          <Footer />
        </ClientLayoutWrapper>
      </body>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
    </html>
  );
}