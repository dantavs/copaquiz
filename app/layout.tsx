import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
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
  metadataBase: new URL('https://copaquiz-omega.vercel.app'),
  title: "CopaQuiz 2026 - O maior Quiz da Copa",
  description: "Teste seus conhecimentos sobre a Copa do Mundo e desafie seus amigos!",
  openGraph: {
    title: "CopaQuiz 2026",
    description: "Desafie seu conhecimento sobre a Copa do Mundo!",
    images: ["/og-img.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
