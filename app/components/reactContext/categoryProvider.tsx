'use client'
import { createContext, useContext, useState } from "react";

type category = {
    categoryId: string;
    categoryName: string;

}

interface contextCategory {
    categoryData: category;
    setCategoryData: (value: category) => void;
}

const ContextCategory = createContext<contextCategory | null>(null);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
    const [categoryData, setCategoryData] = useState<any>();

    return (
        <ContextCategory.Provider
            value={{ categoryData, setCategoryData }}
        >
            {children}
        </ContextCategory.Provider>
    );
}

export function useCategory() {
    const context = useContext(ContextCategory);
    if (!context) {
        throw new Error("useCategory must be used within CategoryProvider");
    }
    return context;
}