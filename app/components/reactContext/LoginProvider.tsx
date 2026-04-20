"use client";

import React, { createContext, useContext, useState } from "react";
import LoginModal from "../LoginModal";

interface LoginContextType {
  openLogin: () => void;
  closeLogin: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginContext.Provider
      value={{
        openLogin: () => setIsOpen(true),
        closeLogin: () => setIsOpen(false),
        isLoggedIn,
        setIsLoggedIn
      }}
    >
      {children}
      <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </LoginContext.Provider>
  );
}

export function useLogin() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
}
