'use client'
import { createContext, useState, useContext } from "react";

const searchContext = createContext<{ search: string, setSearch: (search: string) => void }>({
    search: "",
    setSearch: () => { }
})

export default function searchProvider({ children }: { children: React.ReactNode }) {
    const [search, setSearch] = useState("")
    return (
        <searchContext.Provider value={{ search, setSearch }}>
            {children}
        </searchContext.Provider>
    )
}

export const useSearch = () => {
    const context = useContext(searchContext)
    if (!context) {
        throw new Error("useSearch must be used within searchProvider")
    }
    return context
}