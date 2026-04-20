import Navbar from "../components/Navbar"
import SideBar from "../components/SideBar"


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <SideBar />
                <main className="flex-1 overflow-y-auto bg-white dark:bg-slate-900 rounded-tl-2xl border-l border-t border-slate-200 dark:border-slate-800 shadow-sm relative">
                    {children}
                </main>
            </div>
        </div>
    )
}
