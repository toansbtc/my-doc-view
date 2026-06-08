"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useLogin } from './reactContext/LoginProvider';
import { useTheme } from './reactContext/ThemeProvider';
import api from '@/function/axiosConfig';
import { useAppDispatch } from '@/function/redux/hook';
import { getDataCategory } from '@/function/redux/categorySlice';

export default function Navbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const [isDark, setIsDark] = useState(false);
  const { openLogin } = useLogin();
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { setTheme } = useTheme()


  useEffect(() => {


    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      setTheme("dark")
      setIsDark(false);
    } else {
      setTheme("light")
      setIsDark(true);
    }
  };

  function logout() {
    api.get("/user/logout", { withCredentials: true }).then((res) => {
      if (res.status === 200) {
        setIsLoggedIn(false)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="flex h-16 items-center px-3 sm:px-4 lg:px-6 max-w-7xl mx-auto w-full justify-between gap-2 sm:gap-4">
        {/* Left side: Logo */}
        <div className="flex items-center gap-2 flex-shrink-0 min-w-0">
          <Link
            href="/"
            className="font-extrabold text-xl sm:text-2xl tracking-tighter text-indigo-600 dark:text-indigo-400 flex items-center gap-2 min-w-0"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
              <span className="text-white text-lg leading-none font-bold">M</span>
            </div>

            <span className="hidden xs:inline sm:inline truncate">MyDoc</span>
          </Link>

          <button
            type="button"
            onClick={onToggleSidebar}
            className="md:hidden text-slate-700 dark:text-slate-200 flex-shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Center: Search Bar */}
        <div className="order-last flex w-full min-w-0 px-0 sm:order-none sm:flex-1 sm:max-w-xl sm:px-2 lg:px-4 justify-center">
          <div className="relative group w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              type="text"
              placeholder="Search documents, files, and more..."
              className="block w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-full bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none placeholder-slate-400 dark:placeholder-slate-500 text-slate-700 dark:text-slate-200 shadow-inner"
            />
          </div>
        </div>

        {/* Right side: Login and Theme Switch Icon */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 flex-shrink-0">
          {isLoggedIn ? (
            <>
              <span className="hidden lg:inline text-sm text-slate-700 dark:text-slate-200 whitespace-nowrap">
                Welcome admin
              </span>

              <button
                onClick={logout}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800/40 hover:scale-105 active:scale-95 transition-all outline-none focus:ring-2 focus:ring-indigo-500 group relative shadow-sm flex-shrink-0"
                aria-label="User Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <path d="m16 17 5-5-5-5" />
                  <path d="M21 12H9" />
                </svg>

                <span className="absolute -bottom-8 bg-slate-800 dark:bg-slate-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none z-50">
                  Sign In
                </span>
              </button>
            </>
          ) : (
            <>
              <span className="hidden lg:inline text-sm text-slate-700 dark:text-slate-200 whitespace-nowrap">
                Guest
              </span>

              <button
                onClick={openLogin}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800/40 hover:scale-105 active:scale-95 transition-all outline-none focus:ring-2 focus:ring-indigo-500 group relative shadow-sm flex-shrink-0"
                aria-label="User Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>

                <span className="absolute -bottom-8 bg-slate-800 dark:bg-slate-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none z-50">
                  Sign In
                </span>
              </button>
            </>
          )}

          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all outline-none focus:ring-2 focus:ring-indigo-500 group relative shadow-sm flex-shrink-0"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}

            <span className="absolute -bottom-8 bg-slate-800 dark:bg-slate-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none z-50">
              Toggle Theme
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}