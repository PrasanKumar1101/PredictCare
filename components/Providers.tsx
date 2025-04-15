'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from './theme/theme-provider';
import Navbar from './Navbar';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ThemeProvider defaultTheme="system">
        <Navbar />
        {children}
      </ThemeProvider>
    </ClerkProvider>
  );
} 