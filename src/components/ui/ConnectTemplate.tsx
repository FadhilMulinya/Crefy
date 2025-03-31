"use client"

import { useState } from "react"
import { Wallet, Shield, Coins, FileCheck } from "lucide-react"
import { useAppKitAccount } from "@reown/appkit/react";
import { useAppKit } from "@reown/appkit/react";

export default function ConnectTemplate() {
    const [connecting, setConnecting] = useState(false)
    const [activeTab, setActiveTab] = useState("features")
    const { open, close } = useAppKit()

    const handleConnect = async () => {
        setConnecting(true)
        try {
            await open()
        } catch (error) {
            console.error("Connection failed:", error)
        } finally {
            setConnecting(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
            <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="text-center p-6 border-b border-gray-200 dark:border-gray-700">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Welcome to Student Dashboard</h1>
                    <p className="text-base sm:text-lg mt-2 text-gray-600 dark:text-gray-300">
                        Connect your account to access all features
                    </p>
                </div>

                <div className="p-6">
                    {/* Tabs */}
                    <div className="w-full">
                        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                            <button
                                onClick={() => setActiveTab("features")}
                                className={`flex-1 py-2 px-4 text-center font-medium ${activeTab === "features"
                                        ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                    }`}
                            >
                                Features
                            </button>
                            <button
                                onClick={() => setActiveTab("benefits")}
                                className={`flex-1 py-2 px-4 text-center font-medium ${activeTab === "benefits"
                                        ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                    }`}
                            >
                                Benefits
                            </button>
                        </div>

                        {/* Tab Content */}
                        {activeTab === "features" && (
                            <div className="mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FeatureCard
                                        icon={<Wallet className="h-8 w-8 text-blue-500" />}
                                        title="Wallet Management"
                                        description="Securely manage your digital assets and transactions"
                                    />
                                    <FeatureCard
                                        icon={<Shield className="h-8 w-8 text-blue-500" />}
                                        title="KYC Verification"
                                        description="Complete your identity verification process"
                                    />
                                    <FeatureCard
                                        icon={<Coins className="h-8 w-8 text-blue-500" />}
                                        title="NFT Marketplace"
                                        description="Browse, buy and sell unique digital collectibles"
                                    />
                                    <FeatureCard
                                        icon={<FileCheck className="h-8 w-8 text-blue-500" />}
                                        title="Transaction History"
                                        description="Track all your past activities and transactions"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === "benefits" && (
                            <div className="mt-6">
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                                            <Shield className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900 dark:text-white">Enhanced Security</h3>
                                            <p className="text-gray-600 dark:text-gray-400">Your data is encrypted and securely stored</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                                            <Wallet className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900 dark:text-white">Seamless Transactions</h3>
                                            <p className="text-gray-600 dark:text-gray-400">Quick and easy transfers with minimal fees</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                                            <Coins className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900 dark:text-white">Exclusive Access</h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                Get early access to new features and special offers
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-center p-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={handleConnect}
                        disabled={connecting}
                        className={`w-full sm:w-auto px-8 py-3 rounded-md font-medium text-white ${connecting
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                            } transition-colors`}
                    >
                        {connecting ? "Connecting..." : "Connect Account"}
                    </button>
                </div>
            </div>
        </div>
    )
}

interface FeatureCardProps {
    icon: JSX.Element;
    title: string;
    description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="flex flex-col items-center text-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="mb-3">{icon}</div>
            <h3 className="font-medium text-lg mb-1 text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
    )
}
