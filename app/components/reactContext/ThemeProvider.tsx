"use client"
import { createContext, useContext, useEffect, useState } from "react";

interface themeType {
    theme: string,
    setTheme: (theme: string) => void
}

const themeContext = createContext<themeType | undefined>(undefined)

export function ThemeProvider({ children }: {
    children: React.ReactNode
}) {
    const [theme, setTheme] = useState("dark")

    // Automatically apply the Tailwind "dark" class without needing to inject strings into body
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return (
        <themeContext.Provider value={{ theme, setTheme }}>
            {children}
        </themeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(themeContext)
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}