import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.copaquiz.com.br'),
  title: "CopaQuiz 2026 - O maior Quiz da Copa",
  description: "Teste seus conhecimentos sobre a Copa do Mundo e desafie seus amigos!",
  openGraph: {
    title: "CopaQuiz 2026",
    description: "Desafie seu conhecimento sobre a Copa do Mundo!",
    images: [
      {
        url: "/og-img.jpg",
        width: 1200,
        height: 630,
        alt: "CopaQuiz 2026",
      }
    ],
  },
  icons: {
    icon: [
      { url: '/images/favicon.png', type: 'image/png' },
    ],
    apple: '/images/favicon.png',
  }
};

import Chatbot from './components/Chatbot';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${inter.variable}`}>
       <head>
         <Script
           async
           src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=pub-9579596619646258"
           crossOrigin="anonymous"
           strategy="lazyOnload"
         />
         <Script
           src="https://www.googletagmanager.com/gtag/js?id=G-HMF9LNHGX7"
           strategy="afterInteractive"
         />
         <Script id="google-analytics">
           {`
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
             gtag('config', 'G-HMF9LNHGX7');
           `}
         </Script>
       </head>
      <body>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
