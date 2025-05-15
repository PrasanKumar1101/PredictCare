'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SignInButton, UserButton, useAuth } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './theme/theme-toggle';

interface NavItem {
  name: string;
  path: string;
}

interface DropdownItem {
  name: string;
  path: string;
}

interface NavItemWithDropdown {
  name: string;
  items: DropdownItem[];
}

const navItems: Array<NavItem | NavItemWithDropdown> = [
  { name: 'Home', path: '/' },
  { 
    name: 'Risk Assessment',
    items: [
      { name: 'Diabetes Prediction', path: '/diabetes' },
      { name: 'Heart Disease Prediction', path: '/heart' },
      { name: 'Kidney Disease Prediction', path: '/kidney' },
      { name: 'Assessment Dashboard', path: '/assessment' },
    ]
  },
  { name: 'Chat Assistant', path: '/chat' },
  { name: 'Upload Prescription', path: '/upload-prescription' },
  { 
    name: 'Resources',
    items: [
      { name: 'Blog', path: '/blog' },
      { name: 'FAQ', path: '/faq' },
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy' },
    ]
  }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(null);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setDropdownOpen(null);
    setIsOpen(false);
  }, [pathname]);

  // Create a merged navigation items array that includes Dashboard when signed in
  const displayedNavItems = isSignedIn 
    ? [...navItems, { name: 'Dashboard', path: '/dashboard' }]
    : navItems;

  const toggleDropdown = (index: number) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200 backdrop-blur supports-backdrop-blur:bg-white/60 dark:border-slate-800 dark:bg-gray-900/75 dark:supports-backdrop-blur:bg-slate-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-blue-600 dark:text-blue-400 font-bold text-xl">
              HealthPredict
            </Link>
          </div>
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden sm:flex flex-1 items-center justify-center">
            <div className="flex space-x-6">
              {displayedNavItems.map((item, index) => (
                'path' in item ? (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`${
                      pathname === item.path
                        ? 'border-blue-500 text-gray-900 dark:text-white font-medium'
                        : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200'
                    } link-hover-effect inline-flex items-center px-1 pt-1 border-b-2 text-sm h-full`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <div key={item.name} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className={`
                        inline-flex items-center px-1 pt-1 border-b-2 text-sm h-full
                        border-transparent text-gray-500 dark:text-gray-300 
                        hover:border-gray-300 dark:hover:border-gray-600 
                        hover:text-gray-700 dark:hover:text-gray-200
                      `}
                      aria-expanded={dropdownOpen === index}
                    >
                      {item.name}
                      <ChevronDown 
                        size={16} 
                        className={`ml-1 transition-transform ${dropdownOpen === index ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    
                    <AnimatePresence>
                      {dropdownOpen === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 py-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-20"
                        >
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.path}
                              href={subItem.path}
                              className={`
                                block px-4 py-2 text-sm
                                ${pathname === subItem.path
                                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }
                              `}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              ))}
            </div>
          </div>
          
          {/* Right Actions */}
          <div className="hidden sm:flex items-center space-x-4">
            <ThemeToggle />
            {isSignedIn ? (
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-9 w-9",
                    userButtonOuterIdentifier: "text-sm text-gray-700 dark:text-gray-300"
                  }
                }}
              />
            ) : (
              <SignInButton>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Sign in
                </button>
              </SignInButton>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden overflow-hidden"
          >
            <div className="pt-2 pb-3 space-y-1">
              {displayedNavItems.map((item, index) => (
                'path' in item ? (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`${
                      pathname === item.path
                        ? 'bg-blue-50 dark:bg-blue-900/50 border-blue-500 text-blue-700 dark:text-blue-200'
                        : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200'
                    } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <div key={item.name} className="space-y-1">
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="w-full flex items-center justify-between pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span>{item.name}</span>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform ${dropdownOpen === index ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-6 space-y-1"
                        >
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.path}
                              href={subItem.path}
                              className={`
                                block pl-3 pr-4 py-2 border-l-4 text-base font-medium
                                ${pathname === subItem.path
                                  ? 'bg-blue-50 dark:bg-blue-900/50 border-blue-500 text-blue-700 dark:text-blue-200'
                                  : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }
                              `}
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-4">
                {isSignedIn ? (
                  <div className="flex items-center space-x-3">
                    <UserButton 
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "h-8 w-8", 
                          userButtonOuterIdentifier: "text-sm text-gray-700 dark:text-gray-300"
                        }
                      }}
                    />
                    <div className="ml-3">
                      <ThemeToggle />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <SignInButton>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                        Sign in
                      </button>
                    </SignInButton>
                    <div className="ml-3">
                      <ThemeToggle />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 