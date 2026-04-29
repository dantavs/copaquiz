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
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚽</text></svg>',
  }
};

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
      </head>
      <body>{children}</body>
    </html>
  );
}
