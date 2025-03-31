"use client";

import { useState } from "react";
import {
    Search, Shield, Key, UserCheck, Users, Activity,
    FileText, Settings, ChevronDown, CheckCircle,
    AlertTriangle, Lock, Clipboard, BarChart2, RefreshCw
} from "lucide-react";
import Container from "../components/Container";
import CircularProgressTracker from "../components/CircularProgressTracker";

export default function IdentityAdmin() {
    const [activeTimeFilter, setActiveTimeFilter] = useState("All");
    const [activeTab, setActiveTab] = useState("verification");

    // Sample verified identity data
    const verifiedIdentities = [
        { id: "0x8f23...7a12", name: "Alex Thompson", status: "verified", level: "Level 3", lastVerified: "2025-03-12", score: 98 },
        { id: "0x3d45...9c21", name: "Maria Rodriguez", status: "verified", level: "Level 2", lastVerified: "2025-03-10", score: 87 },
        { id: "0x7b19...2e43", name: "James Wilson", status: "pending", level: "Level 1", lastVerified: "2025-03-05", score: 65 },
        { id: "0x5f67...8d32", name: "Sarah Johnson", status: "verified", level: "Level 3", lastVerified: "2025-03-01", score: 94 },
        { id: "0x2a98...1c76", name: "David Chen", status: "revoked", level: "Level 2", lastVerified: "2025-02-28", score: 42 },
    ];

    // Sample verification requests
    const verificationRequests = [
        { id: "0x9a23...4f35", name: "Michael Brown", type: "Identity Upgrade", requestDate: "2025-03-14", priority: "High" },
        { id: "0x1b45...7d38", name: "Jennifer Lee", type: "New Registration", requestDate: "2025-03-13", priority: "Medium" },
        { id: "0x6c78...2a55", name: "Robert Garcia", type: "Credential Update", requestDate: "2025-03-12", priority: "Low" },
    ];

    // Sample trusted authorities
    const trustedAuthorities = [
        { name: "National ID Authority", entityType: "Government", trustScore: 98, verifications: 1240 },
        { name: "Global Finance Consortium", entityType: "Financial", trustScore: 92, verifications: 890 },
        { name: "Education Verification Network", entityType: "Academic", trustScore: 94, verifications: 620 },
    ];

    // Sample system health data
    const systemMetrics = [
        { metric: "Chain Sync Status", value: "Synchronized", status: "healthy" },
        { metric: "Node Response Time", value: "32ms", status: "healthy" },
        { metric: "Verification Success Rate", value: "98.7%", status: "healthy" },
        { metric: "Failed Attestations", value: "2.1%", status: "warning" },
    ];

    // Sample identity types distribution
    const identityTypeData = [
        { type: "Individual", count: 2845, percentage: "64%" },
        { type: "Corporate", count: 926, percentage: "21%" },
        { type: "Educational", count: 385, percentage: "9%" },
        { type: "Non-profit", count: 267, percentage: "6%" },
    ];

    // Function to render verification status badge
    const renderStatusBadge = (status: any) => {
        switch (status) {
            case "verified":
                return <span className="px-2 py-1 text-xs rounded-full bg-green-900 text-green-300">Verified</span>;
            case "pending":
                return <span className="px-2 py-1 text-xs rounded-full bg-amber-900 text-amber-300">Pending</span>;
            case "revoked":
                return <span className="px-2 py-1 text-xs rounded-full bg-red-900 text-red-300">Revoked</span>;
            default:
                return <span className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300">{status}</span>;
        }
    };

    // Function to render priority badge
    const renderPriorityBadge = (priority: any) => {
        switch (priority) {
            case "High":
                return <span className="px-2 py-1 text-xs rounded-full bg-red-900 text-red-300">High</span>;
            case "Medium":
                return <span className="px-2 py-1 text-xs rounded-full bg-amber-900 text-amber-300">Medium</span>;
            case "Low":
                return <span className="px-2 py-1 text-xs rounded-full bg-blue-900 text-blue-300">Low</span>;
            default:
                return <span className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300">{priority}</span>;
        }
    };

    // Function to render system status indicator
    const renderSystemStatus = (status: any) => {
        switch (status) {
            case "healthy":
                return <span className="flex items-center text-green-400"><CheckCircle size={16} className="mr-1" /> Healthy</span>;
            case "warning":
                return <span className="flex items-center text-amber-400"><AlertTriangle size={16} className="mr-1" /> Warning</span>;
            case "critical":
                return <span className="flex items-center text-red-400"><AlertTriangle size={16} className="mr-1" /> Critical</span>;
            default:
                return <span className="flex items-center text-gray-400">{status}</span>;
        }
    };

    return (
        <Container>
            <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Decentralized Identity Admin</h1>
                        <p className="text-gray-400">Manage identities, verifications, and system health</p>
                    </div>
                    <div className="flex space-x-4">
                        <button className="flex items-center px-4 py-2 bg-indigo-600 rounded-md text-white">
                            <RefreshCw size={16} className="mr-2" /> Refresh Data
                        </button>
                        <button className="flex items-center px-4 py-2 bg-gray-700 rounded-md text-white">
                            <Settings size={16} className="mr-2" /> Settings
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Stats Overview */}
                    <div className="p-6 rounded-lg shadow-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-400">Verified Identities</p>
                                <h2 className="text-2xl font-bold text-white mt-1">4,423</h2>
                                <p className="text-sm text-gray-400 mt-1">
                                    <span className="text-green-400">+5.2%</span> from last month
                                </p>
                            </div>
                            <div className="p-3 bg-gray-700 rounded-lg">
                                <UserCheck className="text-indigo-400" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-lg shadow-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-400">Pending Verifications</p>
                                <h2 className="text-2xl font-bold text-white mt-1">32</h2>
                                <p className="text-sm text-gray-400 mt-1">
                                    <span className="text-amber-400">-8.4%</span> from last week
                                </p>
                            </div>
                            <div className="p-3 bg-gray-700 rounded-lg">
                                <Shield className="text-blue-400" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-lg shadow-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-400">Trust Score (Avg)</p>
                                <h2 className="text-2xl font-bold text-white mt-1">89.6</h2>
                                <p className="text-sm text-gray-400 mt-1">
                                    <span className="text-green-400">+2.1%</span> from last month
                                </p>
                            </div>
                            <div className="p-3 bg-gray-700 rounded-lg">
                                <Key className="text-green-400" size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs for different sections */}
                <div className="mb-6">
                    <div className="border-b border-gray-700">
                        <nav className="flex space-x-8">
                            <button
                                onClick={() => setActiveTab("verification")}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "verification"
                                        ? "border-indigo-500 text-indigo-400"
                                        : "border-transparent text-gray-400 hover:text-gray-300"
                                    }`}
                            >
                                Identity Verification
                            </button>
                            <button
                                onClick={() => setActiveTab("authorities")}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "authorities"
                                        ? "border-indigo-500 text-indigo-400"
                                        : "border-transparent text-gray-400 hover:text-gray-300"
                                    }`}
                            >
                                Trusted Authorities
                            </button>
                            <button
                                onClick={() => setActiveTab("system")}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "system"
                                        ? "border-indigo-500 text-indigo-400"
                                        : "border-transparent text-gray-400 hover:text-gray-300"
                                    }`}
                            >
                                System Health
                            </button>
                            <button
                                onClick={() => setActiveTab("analytics")}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "analytics"
                                        ? "border-indigo-500 text-indigo-400"
                                        : "border-transparent text-gray-400 hover:text-gray-300"
                                    }`}
                            >
                                Analytics
                            </button>
                        </nav>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {activeTab === "verification" && (
                        <>
                            <div className="lg:col-span-2 space-y-8">
                                {/* Identity verification table */}
                                <div className="p-6 rounded-lg shadow-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-medium text-white">Verified Identities</h3>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Search size={16} className="text-gray-500" />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Search identities..."
                                                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full text-gray-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-700">
                                            <thead className="bg-gray-800">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Identity</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Level</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Trust Score</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Verified</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-700">
                                                {verifiedIdentities.map((identity) => (
                                                    <tr key={identity.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center">
                                                                    <UserCheck size={16} className="text-gray-300" />
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-300">{identity.name}</div>
                                                                    <div className="text-xs text-gray-500">{identity.id}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {renderStatusBadge(identity.status)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-300">{identity.level}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-300">{identity.score}/100</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-300">{identity.lastVerified}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <button className="text-indigo-400 hover:text-indigo-300 mr-3">View</button>
                                                            <button className="text-gray-400 hover:text-gray-300">Edit</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="text-sm text-gray-400">
                                            Showing 5 of 4,423 identities
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="px-3 py-1 bg-gray-700 rounded text-gray-300">Previous</button>
                                            <button className="px-3 py-1 bg-indigo-600 rounded text-white">Next</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Identity Verification Trend Chart */}
                                <div className="p-6 rounded-lg shadow-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-medium text-white">Verification Analytics</h3>
                                        <div className="flex space-x-2">
                                            {["1D", "7D", "1M", "All"].map((filter) => (
                                                <button
                                                    key={filter}
                                                    className={`px-3 py-1 text-sm rounded ${activeTimeFilter === filter ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300"}`}
                                                    onClick={() => setActiveTimeFilter(filter)}
                                                >
                                                    {filter}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="h-64 bg-gray-800 rounded flex items-center justify-center">
                                        <BarChart2 size={48} className="text-gray-500" />
                                        <span className="ml-2 text-gray-400">Identity verification trends over time</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* Verification Requests */}
                                <div className="p-6 rounded-lg shadow-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                                    <h3 className="text-lg font-medium text-white mb-4">Pending Verification Requests</h3>
                                    <div className="space-y-4">
                                        {verificationRequests.map((request, index) => (
                                            <div key={index} className="border-b border-gray-700 pb-4 last:border-0 last:pb-0">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center text-indigo-400">
                                                            <Shield size={16} />
                                                        </div>
                                                        <div className="ml-4">
                                                            <h4 className="text-sm font-medium text-gray-300">{request.name}</h4>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                {request.id} • {request.requestDate}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {renderPriorityBadge(request.priority)}
                                                </div>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-400">Request Type: <span className="text-gray-300">{request.type}</span></p>
                                                </div>
                                                <div className="mt-3 flex space-x-2">
                                                    <button className="px-3 py-1 bg-green-700 text-green-100 rounded-md text-xs">Approve</button>
                                                    <button className="px-3 py-1 bg-red-700 text-red-100 rounded-md text-xs">Reject</button>
                                                    <button className="px-3 py-1 bg-gray-700 text-gray-200 rounded-md text-xs">Review</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4">
                                        <button className="text-indigo-400 text-sm font-medium flex items-center justify-center w-full">
                                            View All Requests
                                            <ChevronDown size={16} className="ml-1" />
                                        </button>
                                    </div>
                                </div>

                                {/* Trust Score Distribution */}
                                <div className="p-6 rounded-lg shadow-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                                    <h3 className="text-lg font-medium text-white mb-4">Trust Score Distribution</h3>
                                    <div className="flex justify-center mb-6">
                                        <CircularProgressTracker percentage={89.6} stroke={10} radius={70} />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400">Level 3 (90-100)</span>
                                            <div className="w-2/3 bg-gray-700 rounded-full h-2.5">
                                                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                                            </div>
                                            <span className="text-sm text-gray-300">35%</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400">Level 2 (70-89)</span>
                                            <div className="w-2/3 bg-gray-700 rounded-full h-2.5">
                                                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "42%" }}></div>
                                            </div>
                                            <span className="text-sm text-gray-300">42%</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400">Level 1 (50-69)</span>
                                            <div className="w-2/3 bg-gray-700 rounded-full h-2.5">
                                                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "18%" }}></div>
                                            </div>
                                            <span className="text-sm text-gray-300">18%</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400">Probation (0-49)</span>
                                            <div className="w-2/3 bg-gray-700 rounded-full h-2.5">
                                                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "5%" }}></div>
                                            </div>
                                            <span className="text-sm text-gray-300">5%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === "authorities" && (
                        <>
                            <div className="lg:col-span-2 space-y-8">
                                {/* Trusted Authorities table */}
                                <div className="p-6 rounded-lg shadow-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-medium text-white">Trusted Authorities</h3>
                                        <button className="px-4 py-2 bg-indigo-600 rounded-md text-white text-sm">
                                            Add New Authority
                                        </button>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-700">
                                            <thead className="bg-gray-800">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Authority Name</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Entity Type</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Trust Score</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Verifications</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-700">
                                                {trustedAuthorities.map((authority, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center">
                                                                    <Shield size={16} className="text-indigo-400" />
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-300">{authority.name}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-300">{authority.entityType}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-300">{authority.trustScore}/100</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-300">{authority.verifications.toLocaleString()}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="px-2 py-1 text-xs rounded-full bg-green-900 text-green-300">Active</span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <button className="text-indigo-400 hover:text-indigo-300 mr-3">View</button>
                                                            <button className="text-gray-400 hover:text-gray-300">Edit</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Authority Verification Analytics */}
                                <div className="p-6 rounded-lg shadow-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-medium text-white">Authority Verification History</h3>
                                        <div className="flex space-x-2">
                                            {["1D", "7D", "1M", "All"].map((filter) => (
                                                <button
                                                    key={filter}
                                                    className={`px-3 py-1 text-sm rounded ${activeTimeFilter === filter ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300"}`}
                                                    onClick={() => setActiveTimeFilter(filter)}
                                                >
                                                    {filter}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="h-64 bg-gray-800 rounded flex items-center justify-center">
                                        <BarChart2 size={48} className="text-gray-500" />
                                        <span className="ml-2 text-gray-400">Authority verification activity</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* Authority Details */}
                                <div className="p-6 rounded-lg shadow-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                                    <h3 className="text-lg font-medium text-white mb-4">Authority Details</h3>
                                    <p className="text-sm text-gray-400 mb-4">Select an authority from the list to view details</p>

                                    <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                                        <div className="text-center">
                                            <Shield size={40} className="mx-auto text-indigo-400 mb-2" />
                                            <h4 className="text-md font-medium text-white">No Authority Selected</h4>
                                            <p className="text-sm text-gray-400 mt-1">Click on an authority to view its details</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Verification Types */}
                                <div className="p-6 rounded-lg shadow-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                                    <h3 className="text-lg font-medium text-white mb-4">Verification Types</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-300">Identity Verification</span>
                                            <span className="text-sm text-gray-400">46%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                                            <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: "46%" }}></div>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-300">Credential Issuance</span>
                                            <span className="text-sm text-gray-400">28%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "28%" }}></div>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-300">Document Attestation</span>
                                            <span className="text-sm text-gray-400">18%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "18%" }}></div>
                                        </div>

                                        <div className="flex justify-between items-center">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </Container>
    );

}

                