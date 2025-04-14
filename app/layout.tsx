import './globals.css'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from '@/components/Providers'
import ChatbotWrapper from '@/components/chatbot/ChatbotWrapper';

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HealthPredict - AI Disease Prediction",
  description: "Advanced AI-powered disease prediction for diabetes, heart, and kidney health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-[#0a0c16] text-white`}>
        <Providers>
          {children}
          <ChatbotWrapper />
        </Providers>
      </body>
    </html>
  );
}
