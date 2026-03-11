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
  title: "Qasim Abbas — Senior Flutter Developer | Fintech Mobile Engineer",
  description:
    "Portfolio of Qasim Abbas, a Senior Flutter Developer based in Iraq with 3+ years of production experience in fintech mobile applications, clean architecture, KYC/KYB flows, and cross-platform development. Currently at Qi Card. Open to remote senior Flutter roles and mobile engineering opportunities.",
  keywords: [
    "Senior Flutter Developer",
    "Flutter Developer Iraq",
    "Fintech Mobile Engineer",
    "Cross-Platform Mobile Developer",
    "Dart Developer",
    "Flutter Clean Architecture",
    "Mobile App Developer",
    "Flutter Fintech Apps",
    "Qasim Abbas",
    "Qi Card Flutter Developer",
  ],
  openGraph: {
    title: "Qasim Abbas — Senior Flutter Developer | Fintech Mobile Engineer",
    description:
      "Senior Flutter Developer with 3+ years building production fintech apps. Specialized in clean architecture, KYC/KYB flows, and cross-platform mobile development.",
    type: "website",
    url: "https://www.qasimerror.com",
  },
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