"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import LoginModal from "../LoginModal";
import api from "@/function/axiosConfig";

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

  useEffect(() => {
    api.get("/user/me", { withCredentials: true }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }).catch((err) => {
      setIsLoggedIn(false)
    })
  }, []);

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
