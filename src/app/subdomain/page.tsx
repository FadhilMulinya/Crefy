"use client"
import { AppProvider, useAppContext } from "@/context/appContext"
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import ConnectTemplate from "@/components/ui/ConnectTemplate";
import Acquire from "@/components/subdomainConf/acquire";

// Component to render the appropriate content based on activeTab
function AcquireComponent() {
    const { activeTab } = useAppContext();
    const { isConnected } = useAppKitAccount();
    
    if (!isConnected) {
        return <ConnectTemplate />;
    }

    return <Acquire />
}

// Main page component
export default function Page() {
    return (
        <AppProvider>
            <AcquireComponent />
        </AppProvider>
    );
}