import './globals.css'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from '@/components/Providers'

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HealthPredict - AI Disease Prediction",
  description: "Advanced AI-powered disease prediction for diabetes, heart, and kidney health",
  keywords: "AI prediction, health prediction, disease prediction, diabetes prediction, heart disease, kidney disease, healthcare",
  authors: [{ name: "HealthPredict Team" }],
  openGraph: {
    title: "HealthPredict - AI Disease Prediction",
    description: "Advanced AI-powered disease prediction for diabetes, heart, and kidney health",
    url: "https://predict-care.vercel.app/",
    siteName: "HealthPredict",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HealthPredict - AI Disease Prediction",
    description: "Advanced AI-powered disease prediction for diabetes, heart, and kidney health",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen`}>
        <Providers>
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
