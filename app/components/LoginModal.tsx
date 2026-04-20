"use client";

import React, { useEffect, useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [view, setView] = useState<"login" | "reset">("login");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset view to login when closed
      setTimeout(() => setView("login"), 300);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Dimmed backdrop covering the whole page */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-sm rounded-[2rem] shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-hidden ring-1 ring-white/20">

        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')` }}
        />

        {/* Gradient Fade Overlay (Fades from dark bottom to transparent top) */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20 backdrop-blur-[3px]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors bg-black/20 hover:bg-black/40 p-2 rounded-full z-20 backdrop-blur-md"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content (Z-10) */}
        <div className="relative z-10 px-8 pb-10 pt-32 flex flex-col justify-end min-h-[500px]">

          {view === "login" ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white tracking-tight">Welcome</h2>
                <p className="text-white/70 mt-2 text-sm font-medium">Log in to enter your workspace.</p>
              </div>

              <form className="space-y-4">
                <div className="space-y-1">
                  <input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition-all backdrop-blur-md font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition-all backdrop-blur-md font-medium"
                  />
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setView("reset")}
                      className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                    >
                      Change password
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full py-3.5 px-4 bg-white text-slate-900 font-bold rounded-2xl shadow-lg hover:bg-slate-100 hover:scale-[1.02] transform transition-all active:scale-[0.98] mt-4 flex justify-center items-center gap-2"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-8 text-center border-t border-white/10 pt-6">
                <p className="text-white/60 text-sm font-medium">
                  For using admin functions, you need to be logged in.
                </p>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="mb-8">
                <p className="text-white/80 text-center mt-2  font-medium text-xl">Enter your username and password to change your password.</p>
              </div>

              <form className="space-y-4">
                <div className="space-y-1">
                  <input
                    id="reset-email"
                    type="email"
                    placeholder="Username"
                    className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition-all backdrop-blur-md font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    id="reset-email"
                    type="password"
                    placeholder="Password"
                    className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition-all backdrop-blur-md font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    id="reset-email"
                    type="password"
                    placeholder="New password"
                    className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition-all backdrop-blur-md font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-white text-slate-900 font-bold rounded-2xl shadow-lg hover:bg-slate-100 hover:scale-[1.02] transform transition-all active:scale-[0.98] mt-4 flex justify-center items-center gap-2"
                >
                  Change password
                </button>
              </form>

              <div className="mt-8 text-center border-t border-white/10 pt-6">
                <button
                  onClick={() => setView("login")}
                  className="text-white font-bold hover:underline text-sm flex items-center justify-center gap-2 w-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to login
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

