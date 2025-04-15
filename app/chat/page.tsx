"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface Message {
  type: "user" | "bot";
  content: string;
}

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { type: "bot", content: "Hello! I'm your health assistant. How can I help you today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput("");
    
    // Add user message to chat
    setMessages(prev => [...prev, { type: "user", content: userMessage }]);
    
    // Show loading state
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });
      
      const data = await response.json();
      
      if (data.status === "success") {
        // Add bot response to chat
        setMessages(prev => [...prev, { type: "bot", content: data.response }]);
      } else {
        // Add error message
        setMessages(prev => [...prev, { 
          type: "bot", 
          content: "I'm sorry, I couldn't process your request. Please try again." 
        }]);
      }
    } catch (error) {
      console.error("Error in chat:", error);
      // Simulate bot response for now
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: "bot", 
          content: "I'm here to help with any health-related questions. You can ask me about symptoms, preventive measures, or general health advice." 
        }]);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">HealthPredict Assistant</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Ask any health-related questions and get immediate answers
          </p>
        </div>
        
        {/* Messages container */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-t-lg shadow-md overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[80%] px-5 py-3 rounded-2xl ${
                    message.type === "user" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-5 py-3 rounded-2xl max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="w-2.5 h-2.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2.5 h-2.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2.5 h-2.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input form */}
          <form onSubmit={handleSubmit} className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your health question..."
                className="flex-1 px-4 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-l-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-r-lg disabled:opacity-50 transition-colors"
                disabled={isLoading || !input.trim()}
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
        
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          <p>Note: This AI assistant provides general health information and should not replace professional medical advice.</p>
        </div>
      </div>
    </div>
  );
} 