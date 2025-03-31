"use client";
import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { ContentCopy, Share, QrCode2, ArrowBack } from "@mui/icons-material";
import { useAppKitAccount } from "@reown/appkit/react";
import ReactCardFlip from "react-card-flip";
import QRCode from 'react-qr-code';
import Image from "next/image";

export default function UserCard() {
    const { address, isConnected } = useAppKitAccount();
    const [isFlipped, setIsFlipped] = useState(false);
    const [copied, setCopied] = useState(false);

    // Function to trim the address
    const trimAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    // Toggle the flip state
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    // Copy address to clipboard
    const copyAddress = () => {
        if (address) {
            navigator.clipboard.writeText(address);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="flex justify-center w-1/2 min-h-full">
            <div className="w-full min-h-full">
                <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                    {/* Front of card */}
                    <div 
                        className="bg-gradient-to-br from-[#1a1f3d] to-[#0d0f2a] text-white rounded-2xl shadow-2xl overflow-hidden min-h-full border border-[#1a1f3d]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(13, 15, 42, 0.9), rgba(13, 15, 42, 0.8)), url("https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/cardimgfree.5771cbbb.png")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Header with profile and actions */}
                        <div className="p-6 pb-0">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center">
                                    <div className="h-16 w-16 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 ring-2 ring-indigo-400 shadow-lg">
                                        <img 
                                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png" 
                                            alt="profile" 
                                            className="h-full w-full object-cover" 
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-xl font-bold text-white">User Profile</h2>
                                        <div className="flex items-center mt-1 bg-[#161a42] rounded-lg py-1 px-2 max-w-fit">
                                            <span className="text-gray-300 text-sm">
                                                {isConnected && address ? trimAddress(address) : "Connecting Wallet..."}
                                            </span>
                                            <Tooltip title={copied ? "Copied!" : "Copy Address"} arrow>
                                                <IconButton size="small" onClick={copyAddress} className="ml-1 text-gray-300">
                                                    <ContentCopy fontSize="small" className="text-gray-400 hover:text-white" />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Action buttons */}
                                <div className="flex space-x-2">
                                    <Tooltip title="Share Profile" arrow>
                                        <IconButton 
                                            className="bg-[#1d1b41] hover:bg-[#252359] transition-all"
                                            size="small"
                                        >
                                            <Share fontSize="small" className="text-teal-400" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Show QR Code" arrow>
                                        <IconButton 
                                            onClick={handleFlip}
                                            className="bg-[#1d1b41] hover:bg-[#252359] transition-all"
                                            size="small"
                                        >
                                            <QrCode2 fontSize="small" className="text-blue-400" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                        
                        {/* Statistics section */}
                        <div className="p-6">
                            <div className="mt-6 bg-[#161a42]/60 backdrop-blur-sm rounded-xl p-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <h3 className="text-gray-400 text-sm font-medium">NFTs</h3>
                                        <div className="mt-1 flex items-baseline justify-center">
                                            <span className="text-2xl font-bold text-white">03</span>
                                        </div>
                                    </div>
                                    <div className="text-center border-x border-gray-700/50">
                                        <h3 className="text-gray-400 text-sm font-medium">Collections</h3>
                                        <div className="mt-1 flex items-baseline justify-center">
                                            <span className="text-2xl font-bold text-white">03</span>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-gray-400 text-sm font-medium">Holding</h3>
                                        <div className="mt-1 flex items-baseline justify-center">
                                            <span className="text-2xl font-bold text-white">03</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Status indicator */}
                            <div className="mt-6 flex items-center">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="ml-2 text-sm text-gray-300">
                                    {isConnected ? "Wallet Connected" : "Not Connected"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Back of card (QR Code) */}
                    <div className="bg-gradient-to-br from-[#1a1f3d] to-[#0d0f2a] text-white rounded-2xl shadow-2xl p-6 flex flex-col items-center justify-center min-h-[350px]">
                        <div className="absolute top-4 left-4">
                            <Tooltip title="Back to Profile" arrow>
                                <IconButton 
                                    onClick={handleFlip}
                                    className="bg-[#1d1b41] hover:bg-[#252359] transition-all"
                                    size="small"
                                >
                                    <ArrowBack fontSize="small" className="text-blue-400" />
                                </IconButton>
                            </Tooltip>
                        </div>
                        
                        <h3 className="text-xl font-bold text-center mb-6">Scan to View Profile</h3>
                        <div className="bg-white p-4 rounded-xl">
                            <QRCode 
                                value={address || "https://www.example.com"} 
                                size={180}
                                className="mx-auto"
                            />
                        </div>
                        <p className="mt-4 text-sm text-gray-300 text-center max-w-xs">
                            Share this QR code to allow others to easily connect with your profile.
                        </p>
                    </div>
                </ReactCardFlip>
            </div>
        </div>
    );
}