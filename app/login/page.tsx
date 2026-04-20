import React from "react";

export default function LoginPage() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden relative">
      {/* Decorative background glass shape 1 */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl mix-blend-overlay"></div>
      {/* Decorative background glass shape 2 */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl mix-blend-overlay"></div>

      <div className="z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-white to-white/60 rounded-full shadow-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h2>
          <p className="text-white/80 mt-2 text-sm font-medium">Please sign in to your account</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-white/90" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all backdrop-blur-md"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-white/90" htmlFor="password">Password</label>
              <a href="#" className="text-xs font-semibold text-white/80 hover:text-white transition-colors">Forgot password?</a>
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all backdrop-blur-md"
            />
          </div>

          <button
            type="button"
            className="w-full py-3 px-4 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:bg-opacity-90 hover:scale-[1.02] transform transition-all active:scale-[0.98] mt-6"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-white/80 text-sm font-medium">
            Don't have an account?{' '}
            <a href="#" className="text-white font-bold hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
