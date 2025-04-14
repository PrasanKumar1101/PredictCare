"use client";

import dynamic from 'next/dynamic';

// Dynamic import for the chat assistant component
const HealthChatAssistant = dynamic(() => import('./HealthChatAssistant'), { 
  ssr: false 
});

export default function ChatbotWrapper() {
  return <HealthChatAssistant />;
} 