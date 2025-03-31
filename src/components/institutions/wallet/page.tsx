"use client";

import { useEffect, useState } from "react";
import {
    Wallet,
    Copy,
    ExternalLink,
    Clock,
    ArrowUpRight,
    ArrowDownLeft,
    Filter,
    Search,
    Image,
    FileText,
    ChevronDown,
    Shield
} from "lucide-react";
import Container from "../components/Container";
import { useAccount } from "wagmi";
import { useReadContract } from "wagmi";
import { contractAddress, Abi } from "@/config/abi";

export default function WalletAccount() {
    const [activeTab, setActiveTab] = useState("all");
    const [timeFilter, setTimeFilter] = useState("all-time");
    const { address, isConnected } = useAccount();
    const [walletData, setWalletData] = useState({
        address: "",
        balance: "0 ETH",
        usdValue: "$0.00",
        totalNFTs: 0,
        verifiedNFTs: 0,
        pendingNFTs: 0
    });

    // Sample NFT collections
    const nftCollections = [
        { id: 1, name: "Academic Credentials", count: 245, icon: "🎓" },
        { id: 2, name: "Professional Certifications", count: 183, icon: "📜" },
        { id: 3, name: "Course Completions", count: 101, icon: "🏆" },
    ];

    // Sample transaction history
    const transactions = [
        {
            id: "tx1",
            type: "mint",
            name: "BSc Computer Science",
            recipient: "0x3a5d...8f9e",
            timestamp: "2 hours ago",
            status: "completed"
        },
        {
            id: "tx2",
            type: "mint",
            name: "MBA Certificate",
            recipient: "0x72c1...45ab",
            timestamp: "5 hours ago",
            status: "completed"
        },
        {
            id: "tx3",
            type: "transfer",
            name: "Verification Request",
            recipient: "0x91ab...32cd",
            timestamp: "1 day ago",
            status: "pending"
        },
        {
            id: "tx4",
            type: "mint",
            name: "Data Science Certificate",
            recipient: "0x45fe...76cd",
            timestamp: "2 days ago",
            status: "completed"
        },
        {
            id: "tx5",
            type: "verify",
            name: "Law Degree",
            recipient: "0x77dc...11bf",
            timestamp: "3 days ago",
            status: "completed"
        }
    ];

    // Fetch NFT balance from contract
    const { data: nftBalance, isLoading, isError } = useReadContract({
        abi: Abi,
        address: contractAddress,
        functionName: "balanceOf",
        args: [address],
        enabled: !!address, // Only run the query if address is available
    });

    // Mock function to get ETH balance and USD value
    // In a real app, you'd use an API or another contract call
    const fetchWalletData = async () => {
        if (!address) return;
        
        // In a real app, this would be a fetch call to get actual balance
        // For now using mock data that's updated with the real NFT balance
        setTimeout(() => {
            const mockEthBalance = "2.458";
            const mockUsdValue = "$4,328.65";
            
            // Use real NFT balance if available, otherwise use sample data
            const totalNFTs = nftBalance ? Number(nftBalance) : 529;
            const verifiedNFTs = Math.floor(totalNFTs * 0.92); // 92% verified (sample calculation)
            const pendingNFTs = totalNFTs - verifiedNFTs;
            
            setWalletData({
                address: address,
                balance: `${mockEthBalance} ETH`,
                usdValue: mockUsdValue,
                totalNFTs,
                verifiedNFTs,
                pendingNFTs
            });
        }, 500);
    };

    useEffect(() => {
        fetchWalletData();
    }, [address, nftBalance]);

    // Filter transactions based on activeTab
    const filteredTransactions = transactions.filter(tx => {
        if (activeTab === "all") return true;
        if (activeTab === "minted") return tx.type === "mint";
        if (activeTab === "transferred") return tx.type === "transfer";
        if (activeTab === "verified") return tx.type === "verify";
        return true;
    });

    if (!isConnected) {
        return (
            <Container>
                <div className="min-h-screen flex items-center justify-center" style={{ background: "#1E2327" }}>
                    <div className="text-center p-8 rounded-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                        <Wallet className="text-indigo-400 mx-auto mb-4" size={48} />
                        <h2 className="text-xl font-bold text-white mb-2">Wallet Not Connected</h2>
                        <p className="text-gray-400 mb-6">Please connect your wallet to view your account details</p>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                            Connect Wallet
                        </button>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className="min-h-screen" style={{ background: "#1E2327" }}>
                {/* Header */}
                <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Wallet Overview Card */}
                    <div className="p-6 rounded-lg shadow-lg mb-8" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                        <div className="flex items-start justify-between flex-wrap gap-4">
                            <div>
                                <div className="flex items-center">
                                    <div className="p-3 bg-gray-700 rounded-lg mr-3">
                                        <Wallet className="text-indigo-400" size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Institution Wallet</h2>
                                        <div className="flex items-center mt-1">
                                            <p className="text-sm text-gray-400 mr-2 truncate max-w-md">{walletData.address}</p>
                                            <button 
                                                className="text-gray-400 hover:text-gray-300"
                                                onClick={() => navigator.clipboard.writeText(walletData.address)}
                                                title="Copy address"
                                            >
                                                <Copy size={14} />
                                            </button>
                                            <a 
                                                href={`https://etherscan.io/address/${walletData.address}`} 
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-gray-300 ml-2"
                                                title="View on Etherscan"
                                            >
                                                <ExternalLink size={14} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div>
                                    <p className="text-sm text-gray-400">Wallet Balance</p>
                                    {isLoading ? (
                                        <p className="text-lg font-bold text-white">Loading...</p>
                                    ) : (
                                        <>
                                            <p className="text-lg font-bold text-white">{walletData.balance}</p>
                                            <p className="text-sm text-gray-400">{walletData.usdValue}</p>
                                        </>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Total NFTs</p>
                                    {isLoading ? (
                                        <p className="text-lg font-bold text-white">Loading...</p>
                                    ) : isError ? (
                                        <p className="text-lg font-bold text-red-400">Error loading NFTs</p>
                                    ) : (
                                        <>
                                            <p className="text-lg font-bold text-white">{walletData.totalNFTs}</p>
                                            <p className="text-sm text-gray-400">{walletData.verifiedNFTs} verified</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* NFT Dashboard Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {/* NFT Collections Card */}
                        <div className="lg:col-span-1">
                            <div className="p-6 rounded-lg shadow-lg h-full" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                                <h3 className="text-lg font-medium text-white mb-4">NFT Collections</h3>
                                {isLoading ? (
                                    <div className="flex justify-center items-center h-64">
                                        <p className="text-gray-400">Loading collections...</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="space-y-4">
                                            {nftCollections.map(collection => (
                                                <div key={collection.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-800">
                                                    <div className="flex items-center">
                                                        <div className="text-2xl mr-3">{collection.icon}</div>
                                                        <div>
                                                            <p className="text-sm font-medium text-white">{collection.name}</p>
                                                            <p className="text-xs text-gray-400">{collection.count} NFTs</p>
                                                        </div>
                                                    </div>
                                                    <button className="text-indigo-400 hover:text-indigo-300 text-sm">View</button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-6">
                                            <button className="w-full py-2 px-4 border border-gray-700 rounded-md text-sm font-medium text-white hover:bg-gray-800 focus:outline-none">
                                                Create New Collection
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* NFT Stats Card */}
                        <div className="lg:col-span-2">
                            <div className="p-6 rounded-lg shadow-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-medium text-white">NFT Statistics</h3>
                                    <div className="flex space-x-2">
                                        <button
                                            className={`px-3 py-1 text-sm rounded ${timeFilter === "month" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300"}`}
                                            onClick={() => setTimeFilter("month")}
                                        >
                                            30 Days
                                        </button>
                                        <button
                                            className={`px-3 py-1 text-sm rounded ${timeFilter === "quarter" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300"}`}
                                            onClick={() => setTimeFilter("quarter")}
                                        >
                                            90 Days
                                        </button>
                                        <button
                                            className={`px-3 py-1 text-sm rounded ${timeFilter === "all-time" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300"}`}
                                            onClick={() => setTimeFilter("all-time")}
                                        >
                                            All Time
                                        </button>
                                    </div>
                                </div>

                                {isLoading ? (
                                    <div className="flex justify-center items-center h-64">
                                        <p className="text-gray-400">Loading statistics...</p>
                                    </div>
                                ) : (
                                    <>
                                        {/* NFT Stats Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                            <div className="p-4 bg-gray-800 rounded-lg">
                                                <p className="text-sm text-gray-400">Created NFTs</p>
                                                <p className="text-2xl font-bold text-white">{walletData.totalNFTs}</p>
                                                <div className="flex items-center text-green-400 text-sm mt-1">
                                                    <ArrowUpRight size={14} className="mr-1" />
                                                    <span>+12.5% this month</span>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-gray-800 rounded-lg">
                                                <p className="text-sm text-gray-400">Verified NFTs</p>
                                                <p className="text-2xl font-bold text-white">{walletData.verifiedNFTs}</p>
                                                <div className="flex items-center text-green-400 text-sm mt-1">
                                                    <ArrowUpRight size={14} className="mr-1" />
                                                    <span>+8.3% this month</span>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-gray-800 rounded-lg">
                                                <p className="text-sm text-gray-400">Pending Verification</p>
                                                <p className="text-2xl font-bold text-white">{walletData.pendingNFTs}</p>
                                                <div className="flex items-center text-amber-400 text-sm mt-1">
                                                    <Clock size={14} className="mr-1" />
                                                    <span>5 awaiting review</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Placeholder for chart - in a real app, you'd use a chart library */}
                                        <div className="h-64 bg-gray-800 rounded flex items-center justify-center">
                                            <FileText size={48} className="text-gray-500" />
                                            <span className="ml-2 text-gray-400">NFT creation trend over time</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="p-6 rounded-lg shadow-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-medium text-white">Transaction History</h3>
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search size={16} className="text-gray-500" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search transactions..."
                                        className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full text-gray-300 text-sm"
                                    />
                                </div>
                                <button className="flex items-center px-3 py-2 bg-gray-700 rounded-md text-gray-300 text-sm">
                                    <Filter size={16} className="mr-2" />
                                    Filter
                                </button>
                            </div>
                        </div>

                        {/* Transaction Tabs */}
                        <div className="border-b border-gray-700 mb-4">
                            <nav className="flex -mb-px">
                                <button
                                    onClick={() => setActiveTab("all")}
                                    className={`mr-6 py-2 px-1 text-sm font-medium ${activeTab === "all" ? "text-indigo-400 border-b-2 border-indigo-400" : "text-gray-400 hover:text-gray-300"}`}
                                >
                                    All Transactions
                                </button>
                                <button
                                    onClick={() => setActiveTab("minted")}
                                    className={`mr-6 py-2 px-1 text-sm font-medium ${activeTab === "minted" ? "text-indigo-400 border-b-2 border-indigo-400" : "text-gray-400 hover:text-gray-300"}`}
                                >
                                    Minted
                                </button>
                                <button
                                    onClick={() => setActiveTab("transferred")}
                                    className={`mr-6 py-2 px-1 text-sm font-medium ${activeTab === "transferred" ? "text-indigo-400 border-b-2 border-indigo-400" : "text-gray-400 hover:text-gray-300"}`}
                                >
                                    Transferred
                                </button>
                                <button
                                    onClick={() => setActiveTab("verified")}
                                    className={`mr-6 py-2 px-1 text-sm font-medium ${activeTab === "verified" ? "text-indigo-400 border-b-2 border-indigo-400" : "text-gray-400 hover:text-gray-300"}`}
                                >
                                    Verified
                                </button>
                            </nav>
                        </div>

                        {/* Transaction Table */}
                        <div className="overflow-x-auto">
                            {isLoading ? (
                                <div className="flex justify-center items-center h-24">
                                    <p className="text-gray-400">Loading transactions...</p>
                                </div>
                            ) : filteredTransactions.length === 0 ? (
                                <div className="flex justify-center items-center h-24">
                                    <p className="text-gray-400">No transactions found.</p>
                                </div>
                            ) : (
                                <table className="min-w-full divide-y divide-gray-700">
                                    <thead className="bg-gray-800">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Certificate Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Recipient</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {filteredTransactions.map((tx) => (
                                            <tr key={tx.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className={`p-2 rounded-md ${tx.type === "mint" ? "bg-green-900" :
                                                                tx.type === "transfer" ? "bg-blue-900" :
                                                                    "bg-amber-900"
                                                            }`}>
                                                            {tx.type === "mint" ? (
                                                                <Image size={16} className="text-green-400" />
                                                            ) : tx.type === "transfer" ? (
                                                                <ArrowUpRight size={16} className="text-blue-400" />
                                                            ) : (
                                                                <Shield size={16} className="text-amber-400" />
                                                            )}
                                                        </div>
                                                        <span className="ml-2 text-sm text-gray-300 capitalize">{tx.type}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-white">{tx.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-300 font-mono">{tx.recipient}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-400">{tx.timestamp}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${tx.status === "completed" ? "bg-green-900 text-green-400" :
                                                            "bg-amber-900 text-amber-400"
                                                        }`}>
                                                        {tx.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <button className="text-indigo-400 hover:text-indigo-300 text-sm">View</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        <div className="mt-4 flex justify-center">
                            <button className="text-indigo-400 text-sm font-medium flex items-center">
                                Load More Transactions
                                <ChevronDown size={16} className="ml-1" />
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </Container>
    );
}