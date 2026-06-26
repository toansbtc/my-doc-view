import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { LoginProvider } from "./components/reactContext/LoginProvider";
import { ThemeProvider } from "./components/reactContext/ThemeProvider";
import { Providers } from "@/function/redux/provider";
import { CategoryProvider } from "./components/reactContext/categoryProvider";
import SearchProvider from "./components/reactContext/searchProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My doc App",
  description: "Henry Document - A developer note app for saving frequently used commands, code snippets, and programming notes. Quickly organize, search, and reuse useful code and terminal commands ",
  authors: [{ name: "Henry" }],
  keywords: [
    "developer notes",
    "code snippets",
    "command notes",
    "terminal commands",
    "programming notes",
    "developer tools",
    "snippet manager",
    "command manager",
    "Toan dep trai",
    "Toan cao dep trai",
    "Code with henry",
    "henry handsome",
    "Henry Document",
  ],
  verification: {
    google: "UW4J-kQQBb602E_9JfDidS8PetnyXwOWRDf53IAthKs",
    other: {
      "msvalidate.01": "8E1AB6F98268E86C0A54AE6334F56E92"
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
        <Providers>
          <LoginProvider>
            <ThemeProvider>
              <CategoryProvider>
                <SearchProvider>
                  {children}
                </SearchProvider>
              </CategoryProvider>
            </ThemeProvider>
          </LoginProvider>
        </Providers>
      </body>
    </html>
  );
}
