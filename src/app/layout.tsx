import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dedicate — Offrez un site web personnalisé",
  description: "Créez une expérience numérique inoubliable pour vos proches. Avec ses photos, son prénom, et une page de connexion privée rien que pour elle.",
  keywords: ["cadeau digital", "site web personnalisé", "cadeau original", "saint-valentin", "cadeau couple"],
  openGraph: {
    title: "GiftSite — Offrez un site web personnalisé",
    description: "Le cadeau digital le plus original : un site web fait rien que pour elle.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
