"use client"
import { useState } from "react";
import Navbar from "../components/Navbar"
import SideBar from "../components/SideBar"


export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
            <Navbar onToggleSidebar={() => setShowSidebar(true)} />

            <div className="flex flex-1 overflow-hidden">
                {/* Desktop sidebar */}
                <aside className="hidden md:block">
                    <SideBar />
                </aside>

                {/* Mobile sidebar overlay */}
                {showSidebar && (
                    <div className="fixed inset-0 z-50 md:hidden">
                        <div
                            className="absolute inset-0 bg-black/40"
                            onClick={() => setShowSidebar(false)}
                        />

                        <aside className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-slate-950 shadow-xl">
                            <button
                                type="button"
                                onClick={() => setShowSidebar(false)}
                                className="absolute right-4 top-4 text-slate-600 dark:text-slate-300"
                            >
                                ✕
                            </button>

                            <SideBar />
                        </aside>
                    </div>
                )}

                <main className="flex-1 overflow-y-auto bg-white dark:bg-slate-900 md:rounded-tl-2xl md:border-l border-t border-slate-200 dark:border-slate-800 shadow-sm relative">
                    {children}
                </main>
            </div>
        </div>
    );
}