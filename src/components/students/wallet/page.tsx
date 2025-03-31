"use client";

import { useState, useEffect } from "react";
import Container from "../Container";
import { Add, Search, FilterList, CalendarToday, Close, CloudUpload } from "@mui/icons-material";
import FileList from "./filelist";
import { CircularProgress, Chip, Tooltip, IconButton } from "@mui/material";
import ImportCertificateModal from "./importcertificate";
import { useAppKitAccount } from "@reown/appkit/react";

export default function WalletAccount() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { isConnected } = useAppKitAccount();

    // Simulate loading state
    useEffect(() => {
        if (isConnected) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isConnected]);

    const handleImport = async (contractAddress: string, tokenId: string): Promise<void> => {
        // Add your logic here to handle the import with contractAddress and tokenId
        console.log(contractAddress, tokenId);
        setIsModalOpen(false);
    };

    const applyFilters = () => {
        const newFilters = [];
        if (startDate) newFilters.push(`From: ${startDate}`);
        if (endDate) newFilters.push(`To: ${endDate}`);
        setActiveFilters(newFilters);
        setIsFilterExpanded(false);
    };

    const removeFilter = (filter: string) => {
        const newFilters = activeFilters.filter(f => f !== filter);
        setActiveFilters(newFilters);
        
        if (filter.startsWith('From:')) setStartDate('');
        if (filter.startsWith('To:')) setEndDate('');
    };

    const clearAllFilters = () => {
        setActiveFilters([]);
        setStartDate('');
        setEndDate('');
        setSearchQuery('');
    };

    return (
        <Container>
            <div className="flex justify-center min-w-[calc(100%-320px)]">
                {/* Modal */}
                <ImportCertificateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onImport={handleImport} />

                <div className="min-w-[90%] max-w-[1200px] mx-auto">
                    {/* Header Section */}
                    <div className="flex justify-between items-center py-8 w-full">
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-100">Certificates</h1>
                            <p className="text-gray-400 mt-2">Manage and view your verified digital credentials</p>
                        </div>
                        <button 
                            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#00E1FF] to-[#0095FF] text-white rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all transform hover:translate-y-[-2px]"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Add />
                            <span className="font-medium">Import Certificate</span>
                        </button>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="w-full mt-4 py-6 px-6 bg-[#12132D] shadow-lg rounded-xl border border-gray-800">
                        <div className="flex gap-4 items-center">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="text-gray-400" />
                                </div>
                                <input
                                    className="w-full pl-10 p-3 border border-gray-700 rounded-lg text-gray-100 bg-[#0A0B1E] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Search certificates by address, name or date"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button 
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setSearchQuery('')}
                                    >
                                        <Close className="text-gray-400 hover:text-gray-200" fontSize="small" />
                                    </button>
                                )}
                            </div>
                            <Tooltip title="Toggle filters">
                                <button 
                                    onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                                    className={`p-3 rounded-lg border transition-all ${isFilterExpanded 
                                        ? 'bg-blue-600 border-blue-500' 
                                        : 'bg-[#0A0B1E] border-gray-700 hover:bg-[#161736]'}`}
                                >
                                    <FilterList className="text-gray-100" />
                                </button>
                            </Tooltip>
                            <button 
                                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#00E1FF] to-[#0095FF] text-white rounded-lg font-medium shadow-md hover:shadow-blue-500/20 transition-all transform hover:scale-105"
                            >
                                <Search fontSize="small" />
                                Search
                            </button>
                        </div>
                        
                        {/* Filters */}
                        {isFilterExpanded && (
                            <div className="mt-4 pt-4 border-t border-gray-700 animate-fadeIn">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <label className="mb-2 text-sm text-gray-300 flex items-center gap-2">
                                            <CalendarToday fontSize="small" className="text-gray-400" />
                                            From Date
                                        </label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="p-3 border border-gray-700 rounded-lg text-gray-300 bg-[#0A0B1E] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="mb-2 text-sm text-gray-300 flex items-center gap-2">
                                            <CalendarToday fontSize="small" className="text-gray-400" />
                                            To Date
                                        </label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="p-3 border border-gray-700 rounded-lg text-gray-300 bg-[#0A0B1E] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button 
                                        onClick={() => setIsFilterExpanded(false)}
                                        className="px-4 py-2 mr-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-[#161736] transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={applyFilters}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Apply Filters
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        {/* Active Filters */}
                        {activeFilters.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-700">
                                <span className="text-sm text-gray-400">Active filters:</span>
                                {activeFilters.map((filter, index) => (
                                    <Chip
                                        key={index}
                                        label={filter}
                                        onDelete={() => removeFilter(filter)}
                                        size="medium"
                                        style={{ 
                                            backgroundColor: '#1a1b3a', 
                                            color: '#e0e0e0',
                                            borderRadius: '8px',
                                            marginRight: '4px'
                                        }}
                                    />
                                ))}
                                <button 
                                    onClick={clearAllFilters}
                                    className="text-sm text-blue-400 hover:text-blue-300 ml-2"
                                >
                                    Clear all
                                </button>
                            </div>
                        )}
                    </div>

                    {/* List of Certificates */}
                    <div className="mt-6">
                        {isConnected ? (
                            isLoading ? (
                                <div className="flex flex-col items-center justify-center h-64 bg-[#0A0B1E] border border-gray-800 rounded-xl">
                                    <CircularProgress size={40} style={{ color: '#0095FF' }} />
                                    <p className="mt-4 text-gray-300">Loading your certificates...</p>
                                </div>
                            ) : (
                                <FileList />
                            )
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 bg-[#0A0B1E] border border-gray-800 rounded-xl p-8">
                                <div className="bg-[#161736] p-4 rounded-full mb-4">
                                    <CloudUpload style={{ fontSize: 48, color: '#0095FF' }} />
                                </div>
                                <p className="text-center text-xl font-medium text-gray-100 mb-2">Connect Your Wallet</p>
                                <p className="text-center text-gray-400 mb-6 max-w-md">Connect your wallet to view, manage and transfer your digital certificates</p>
                                <button className="px-6 py-3 bg-gradient-to-r from-[#00E1FF] to-[#0095FF] text-white rounded-lg font-medium shadow-lg hover:shadow-blue-500/30 transition-all">
                                    Connect Wallet
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
}