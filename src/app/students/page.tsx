"use client"
import { AppProvider, useAppContext } from "@/context/appContext"
import Dashboard from "@/components/students/dashboard/page"
import Transaction from "@/components/students/transactions/page"
import WalletAccount from "@/components/students/wallet/page"
import KycVerification from "@/components/students/kyc_verification/page"
import NFTMarketplace from "@/components/students/nftmarket/page"
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import ConnectTemplate from "@/components/ui/ConnectTemplate";

// Component to render the appropriate content based on activeTab
function DashboardContent() {
    const { activeTab } = useAppContext();
    const { isConnected } = useAppKitAccount();
    
    if (!isConnected) {
        return <ConnectTemplate />;
    }

    switch (activeTab) {
        case "dashboard":
            return <Dashboard />;
        case "transactions":
            return <Transaction />;
        case "wallet":
            return <WalletAccount />;
        case "kyc":
            return <KycVerification />;
        case "nftmarket":
            return <NFTMarketplace />;
        case "disconnect":
            return <Dashboard />;
        default:
            return <Dashboard />;
    }
}

// Main page component
export default function Page() {
    return (
        <AppProvider>
            <DashboardContent />
        </AppProvider>
    );
}