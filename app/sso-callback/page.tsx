'use client';

import { ClerkLoaded, ClerkLoading, AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallbackPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <ClerkLoading>
        <div className="text-center">
          <div className="mb-4 size-12 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Completing your sign in...</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Please wait while we authenticate your account.</p>
        </div>
      </ClerkLoading>
      
      <ClerkLoaded>
        <AuthenticateWithRedirectCallback />
      </ClerkLoaded>
    </div>
  );
} 