"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type DashboardContextType = {
    activeTab: string
    setActiveTab: (tab: string) => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
    const [activeTab, setActiveTab] = useState("dashboard")

    return <DashboardContext.Provider value={{ activeTab, setActiveTab }}>{children}</DashboardContext.Provider>
}

export function useAppContext() {
    const context = useContext(DashboardContext)

    if (context === undefined) {
        throw new Error("useDashboard must be used within a DashboardProvider")
    }

    return context
}

