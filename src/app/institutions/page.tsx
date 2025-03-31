"use client"
import { AppProvider, useAppContext } from "@/context/appContext"
import Dashboard from "@/components/institutions/page";
import IdentityAdmin from "@/components/institutions/admins/page";
import KycVerification from "@/components/students/kyc_verification/page"
import NFTMarketplace from "@/components/students/nftmarket/page"
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import ConnectTemplate from "@/components/ui/ConnectTemplate";
import CreateCertificate from "@/components/institutions/create-certificate/page";
import WalletAccount from "@/components/institutions/wallet/page";

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
        case "create_certificate":
            return <CreateCertificate />;
        case "identity_admin":
            return <IdentityAdmin />;
        case "wallet_account":
            return <WalletAccount />;
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