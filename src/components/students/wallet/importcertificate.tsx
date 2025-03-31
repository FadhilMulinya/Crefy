"use client";

import { useState, useEffect } from "react";
import { CircularProgress, TextField, Tooltip, Tab, Tabs } from "@mui/material";
import { 
  Close, 
  Info, 
  CheckCircle, 
  ErrorOutline, 
  ContentPaste, 
  LinkOff,
  Link as LinkIcon
} from "@mui/icons-material";

type ImportCertificateModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onImport: (contractAddress: string, tokenId: string) => Promise<void>;
};

export default function ImportCertificateModal({
    isOpen,
    onClose,
    onImport,
}: ImportCertificateModalProps) {
    const [contractAddress, setContractAddress] = useState("");
    const [tokenId, setTokenId] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [importStatus, setImportStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [addressValid, setAddressValid] = useState<boolean | null>(null);
    const [tokenIdValid, setTokenIdValid] = useState<boolean | null>(null);
    const [activeTab, setActiveTab] = useState<number>(0);
    const [certificateLink, setCertificateLink] = useState("");
    const [linkValid, setLinkValid] = useState<boolean | null>(null);

    useEffect(() => {
        if (isOpen) {
            // Reset form when modal opens
            setContractAddress("");
            setTokenId("");
            setCertificateLink("");
            setError("");
            setIsLoading(false);
            setImportStatus("idle");
            setAddressValid(null);
            setTokenIdValid(null);
            setLinkValid(null);
            setActiveTab(0);
        }
    }, [isOpen]);

    const validateContractAddress = (address: string) => {
        // Basic Ethereum address validation (starts with 0x and has 42 chars)
        return address.startsWith('0x') && address.length === 42;
    };

    const validateTokenId = (id: string) => {
        // Ensure the token ID is a valid number
        return /^\d+$/.test(id);
    };

    const extractFromLink = (link: string) => {
        // Example patterns to extract from different URL formats
        try {
            const url = new URL(link);
            
            // Extract from URL paths (e.g., /collection/0x1234.../789)
            const pathSegments = url.pathname.split('/').filter(Boolean);
            
            // Look for address-like segments in the path
            let extractedAddress = null;
            let extractedTokenId = null;
            
            for (let i = 0; i < pathSegments.length; i++) {
                const segment = pathSegments[i];
                // Check if this segment looks like an Ethereum address
                if (validateContractAddress(segment)) {
                    extractedAddress = segment;
                    // Check if the next segment could be a token ID
                    if (i + 1 < pathSegments.length && validateTokenId(pathSegments[i + 1])) {
                        extractedTokenId = pathSegments[i + 1];
                    }
                    break;
                }
                
                // Check for address with token ID in format "0x123/456"
                if (segment.includes('/')) {
                    const parts = segment.split('/');
                    if (parts.length === 2 && validateContractAddress(parts[0]) && validateTokenId(parts[1])) {
                        extractedAddress = parts[0];
                        extractedTokenId = parts[1];
                        break;
                    }
                }
            }
            
            // Also check for query params like ?address=0x123&tokenId=456
            const addressParam = url.searchParams.get('address') || 
                                url.searchParams.get('contractAddress') || 
                                url.searchParams.get('contract');
            
            const tokenParam = url.searchParams.get('tokenId') || 
                              url.searchParams.get('token') || 
                              url.searchParams.get('id');
            
            if (addressParam && validateContractAddress(addressParam)) {
                extractedAddress = addressParam;
            }
            
            if (tokenParam && validateTokenId(tokenParam)) {
                extractedTokenId = tokenParam;
            }
            
            return { address: extractedAddress, tokenId: extractedTokenId };
        } catch (err) {
            // Invalid URL
            return { address: null, tokenId: null };
        }
    };

    const handleContractAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setContractAddress(value);
        if (value) {
            setAddressValid(validateContractAddress(value));
        } else {
            setAddressValid(null);
        }
    };

    const handleTokenIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTokenId(value);
        if (value) {
            setTokenIdValid(validateTokenId(value));
        } else {
            setTokenIdValid(null);
        }
    };

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCertificateLink(value);
        
        if (value) {
            try {
                // Check if it's at least a valid URL
                new URL(value);
                setLinkValid(true);
                
                // Try to extract values
                const { address, tokenId } = extractFromLink(value);
                
                if (address && tokenId) {
                    // Auto-fill the fields in the other tab
                    setContractAddress(address);
                    setAddressValid(true);
                    setTokenId(tokenId);
                    setTokenIdValid(true);
                }
            } catch (err) {
                setLinkValid(false);
            }
        } else {
            setLinkValid(null);
        }
    };

    const pasteFromClipboard = async (field: 'address' | 'tokenId' | 'link') => {
        try {
            const text = await navigator.clipboard.readText();
            if (field === 'address') {
                setContractAddress(text);
                setAddressValid(validateContractAddress(text));
            } else if (field === 'tokenId') {
                setTokenId(text);
                setTokenIdValid(validateTokenId(text));
            } else if (field === 'link') {
                setCertificateLink(text);
                try {
                    // Basic URL validation
                    new URL(text);
                    setLinkValid(true);
                    
                    // Try to extract values
                    const { address, tokenId } = extractFromLink(text);
                    
                    if (address && tokenId) {
                        // Auto-fill the fields
                        setContractAddress(address);
                        setAddressValid(true);
                        setTokenId(tokenId);
                        setTokenIdValid(true);
                    }
                } catch (err) {
                    setLinkValid(false);
                }
            }
        } catch (err) {
            setError("Could not access clipboard. Please paste manually.");
        }
    };

    const handleImport = async () => {
        if (activeTab === 0) {
            // Manual input validation
            if (!contractAddress) {
                setError("Contract address is required");
                return;
            }
            if (!tokenId) {
                setError("Token ID is required");
                return;
            }
            
            if (!validateContractAddress(contractAddress)) {
                setError("Invalid contract address format");
                return;
            }
            
            if (!validateTokenId(tokenId)) {
                setError("Token ID must be a number");
                return;
            }
        } else {
            // Link input validation
            if (!certificateLink) {
                setError("Certificate link is required");
                return;
            }
            
            try {
                new URL(certificateLink);
            } catch (err) {
                setError("Invalid URL format");
                return;
            }
            
            const { address, tokenId: extractedTokenId } = extractFromLink(certificateLink);
            
            if (!address || !extractedTokenId) {
                setError("Could not extract contract address and token ID from link");
                return;
            }
            
            // Set these values for import
            setContractAddress(address);
            setTokenId(extractedTokenId);
        }
        
        setIsLoading(true);
        setImportStatus("loading");
        setError("");
        
        try {
            await onImport(contractAddress, tokenId);
            setImportStatus("success");
            
            // Auto-close on success after delay
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (err) {
            setImportStatus("error");
            setError("Failed to import certificate. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 backdrop-blur-sm">
            <div className="bg-[#0A0B1E] shadow-xl border border-gray-700 rounded-2xl p-6 w-full max-w-md animate-fadeIn">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-100">
                        {importStatus === "loading" ? "Importing Certificate..." : 
                         importStatus === "success" ? "Certificate Imported!" : 
                         importStatus === "error" ? "Import Failed" : 
                         "Import Certificate"}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                        aria-label="Close"
                    >
                        <Close className="text-gray-400 hover:text-gray-200" />
                    </button>
                </div>

                {/* Loading State */}
                {importStatus === "loading" && (
                    <div className="flex flex-col items-center justify-center py-8">
                        <CircularProgress size={60} style={{ color: '#0095FF' }} />
                        <p className="text-gray-300 mt-6 text-center">
                            Please wait while we import your certificate...
                        </p>
                    </div>
                )}

                {/* Success State */}
                {importStatus === "success" && (
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                            <CheckCircle style={{ fontSize: 40, color: '#4CAF50' }} />
                        </div>
                        <p className="text-green-400 font-medium text-lg mb-2">Certificate Imported Successfully!</p>
                        <p className="text-gray-400 text-center">Your certificate has been added to your collection.</p>
                    </div>
                )}

                {/* Error State */}
                {importStatus === "error" && (
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                            <ErrorOutline style={{ fontSize: 40, color: '#f44336' }} />
                        </div>
                        <p className="text-red-400 font-medium text-lg mb-2">Import Failed</p>
                        <p className="text-gray-400 text-center mb-6">{error || "There was an error importing your certificate."}</p>
                        <button
                            onClick={() => setImportStatus("idle")}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Form State */}
                {importStatus === "idle" && (
                    <>
                        <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4 mb-6 flex items-start">
                            <Info className="text-blue-400 mr-3 mt-0.5" fontSize="small" />
                            <p className="text-sm text-blue-200">
                                Import your certificate by entering details manually or by pasting a link to your certificate.
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 flex items-center">
                                <ErrorOutline className="text-red-400 mr-2" fontSize="small" />
                                <p className="text-sm text-red-400">{error}</p>
                            </div>
                        )}

                        <Tabs 
                            value={activeTab} 
                            onChange={handleTabChange}
                            variant="fullWidth"
                            className="mb-6"
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: '#0095FF',
                                }
                            }}
                            sx={{
                                '& .MuiTab-root': {
                                    color: '#9ca3af',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    '&.Mui-selected': {
                                        color: '#f3f4f6',
                                    },
                                },
                            }}
                        >
                            <Tab label="Manual Entry" />
                            <Tab label="Import from URL" />
                        </Tabs>

                        {activeTab === 0 ? (
                            // Manual Entry Form
                            <>
                                <div className="mb-5">
                                    <div className="flex justify-between items-center mb-1.5">
                                        <label className="block text-sm font-medium text-gray-300">
                                            Contract Address
                                        </label>
                                        {addressValid === false && (
                                            <span className="text-xs text-red-400 flex items-center">
                                                <LinkOff fontSize="small" className="mr-1" style={{ fontSize: 14 }} />
                                                Invalid address
                                            </span>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={contractAddress}
                                            onChange={handleContractAddressChange}
                                            placeholder="0x..."
                                            className={`block w-full p-3 pr-10 border rounded-lg bg-[#12132D] text-gray-100 placeholder-gray-500 focus:ring-2 focus:outline-none transition-all ${
                                                addressValid === true 
                                                    ? 'border-green-500 focus:ring-green-500/20' 
                                                    : addressValid === false
                                                        ? 'border-red-500 focus:ring-red-500/20'
                                                        : 'border-gray-700 focus:ring-blue-500/20 focus:border-blue-500'
                                            }`}
                                        />
                                        <Tooltip title="Paste from clipboard">
                                            <button 
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 p-1"
                                                onClick={() => pasteFromClipboard('address')}
                                            >
                                                <ContentPaste fontSize="small" />
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-1.5">
                                        <label className="block text-sm font-medium text-gray-300">
                                            Token ID
                                        </label>
                                        {tokenIdValid === false && (
                                            <span className="text-xs text-red-400 flex items-center">
                                                Must be a number
                                            </span>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={tokenId}
                                            onChange={handleTokenIdChange}
                                            placeholder="Enter token ID"
                                            className={`block w-full p-3 pr-10 border rounded-lg bg-[#12132D] text-gray-100 placeholder-gray-500 focus:ring-2 focus:outline-none transition-all ${
                                                tokenIdValid === true 
                                                    ? 'border-green-500 focus:ring-green-500/20' 
                                                    : tokenIdValid === false
                                                        ? 'border-red-500 focus:ring-red-500/20'
                                                        : 'border-gray-700 focus:ring-blue-500/20 focus:border-blue-500'
                                            }`}
                                        />
                                        <Tooltip title="Paste from clipboard">
                                            <button 
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 p-1"
                                                onClick={() => pasteFromClipboard('tokenId')}
                                            >
                                                <ContentPaste fontSize="small" />
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </>
                        ) : (
                            // Link Import Form
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-1.5">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Certificate URL
                                    </label>
                                    {linkValid === false && (
                                        <span className="text-xs text-red-400 flex items-center">
                                            Invalid URL
                                        </span>
                                    )}
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={certificateLink}
                                        onChange={handleLinkChange}
                                        placeholder="https://example.com/certificate/..."
                                        className={`block w-full p-3 pr-10 border rounded-lg bg-[#12132D] text-gray-100 placeholder-gray-500 focus:ring-2 focus:outline-none transition-all ${
                                            linkValid === true 
                                                ? 'border-green-500 focus:ring-green-500/20' 
                                                : linkValid === false
                                                    ? 'border-red-500 focus:ring-red-500/20'
                                                    : 'border-gray-700 focus:ring-blue-500/20 focus:border-blue-500'
                                        }`}
                                    />
                                    <Tooltip title="Paste from clipboard">
                                        <button 
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 p-1"
                                            onClick={() => pasteFromClipboard('link')}
                                        >
                                            <ContentPaste fontSize="small" />
                                        </button>
                                    </Tooltip>
                                </div>
                                
                                {contractAddress && tokenId && linkValid && (
                                    <div className="mt-4 bg-green-900/20 border border-green-800/30 rounded-lg p-3">
                                        <p className="text-sm text-green-300 mb-1 font-medium">Detected certificate details:</p>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div>
                                                <span className="text-gray-400">Contract:</span>
                                                <p className="text-gray-200 truncate">{contractAddress}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-400">Token ID:</span>
                                                <p className="text-gray-200">{tokenId}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={onClose}
                                className="px-4 py-2.5 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/20"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleImport}
                                disabled={isLoading || 
                                  (activeTab === 0 && (addressValid === false || tokenIdValid === false)) ||
                                  (activeTab === 1 && (!linkValid || (!contractAddress || !tokenId)))}
                                className={`px-5 py-2.5 bg-gradient-to-r from-[#00E1FF] to-[#0095FF] text-white rounded-lg font-medium shadow-lg transition-all transform hover:translate-y-[-2px] ${
                                    isLoading || 
                                    (activeTab === 0 && (addressValid === false || tokenIdValid === false)) ||
                                    (activeTab === 1 && (!linkValid || (!contractAddress || !tokenId)))
                                        ? 'opacity-50 cursor-not-allowed' 
                                        : 'hover:shadow-blue-500/30'
                                }`}
                            >
                                Import
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}