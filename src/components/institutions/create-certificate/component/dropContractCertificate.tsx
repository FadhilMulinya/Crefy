"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { FileUpload } from "@/components/ui/file-upload";
import { Home, Cloud, NetworkCheck } from "@mui/icons-material"; // Importing MUI icons
import * as XLSX from "xlsx"; // Import the xlsx library
import Image from "next/image";
import axios from "axios";
import NFTCard from "./NFTCard";
import ConfettiExplosion from 'react-confetti-explosion';
import { FetchImageIpfsFromJson } from "./handlers";
import { signMessage } from '@wagmi/core'
import { config } from "@/config";
import { useAppKitAccount } from '@reown/appkit/react'

export default function DropContractCertificate() {
    const [activeTab, setActiveTab] = useState<"manual" | "upload">("manual");
    const [file, setFile] = useState<File>();
    const [singleWalletAddress, setSingleWalletAddress] = useState<string>("");
    const [addresses, setAddresses] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [uid, setUid] = useState("");
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<{ message: string, type: string } | null>(null);
    const [deploying, setDeploying] = useState(false);
    const [deployMessage, setDeployMessage] = useState<{ message: string, type: string, receipt: any } | null>(null);
    const [nftImageUrl, setNftImageUrl] = useState<string>("");
    const [privateKey, setPrivateKey] = useState<string>("");
    const { address } = useAppKitAccount();


    useEffect(() => {
        const fetchImage = async () => {
            if (uid) {
                const imageUrl = await FetchImageIpfsFromJson(uid);
                setNftImageUrl(imageUrl || ""); // Direct call since FetchImageIpfsFromJson is now sync
            }
        }   
        fetchImage();
    }, [uid]);

    const handleFileChange = (files: File[]) => {
        setFile(files[0]);
    };

    const uploadFile = async () => {
        try {
            if (!file) {
                alert("No file selected");
                return;
            }

            setUploading(true);
            const data = new FormData();
            data.set("file", file);
            const uploadRequest = await fetch("/api/files", {
                method: "POST",
                body: data,
            });
            const ipfsUrl = await uploadRequest.json();
            const ipfsHash = ipfsUrl.split('/ipfs/')[1];
            const ipfsFormat = `ipfs://${ipfsHash}`;
            setUid(ipfsFormat);
            setUploading(false);
            setMessage({
                message: "File uploaded successfully",
                type: "success"
            });
        } catch (e) {
            console.log(e);
            setUploading(false);
            setMessage({
                message: "Trouble uploading file",
                type: "error"
            });
        }
    };

    const parseAddressesFromFile = async (file: File) => {
        try {
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data, { type: "array" });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData: Array<Record<string, string>> = XLSX.utils.sheet_to_json(worksheet);
        } catch (error) {
            console.error("Error parsing Excel file:", error);
        }
    };
   
    
    const handleDeployCertificateNFT = async () => {
        setDeploying(true);
        try {
            if (!(window as any).ethereum) {
                setErrorMessage("MetaMask is not installed. Please install it to proceed.");
                return;
            }

            setDeployMessage({ message: "Signing transaction...", type: "info", receipt: null });
    
            // Sign the transaction
            const signResponse = await signMessage(config, {
                message: `
                Sign this transaction to mint NFT
                Address: ${singleWalletAddress}
                Token URI: ${uid}
                `,
            });
    
            console.log("Sign response: ", signResponse);
    
            if (signResponse) {
                // Send the signed response to the backend
                const response = await axios.post("/api/issueCredential", {
                    address: singleWalletAddress,
                    tokenURI: uid,
                    sendAddress: address, // Pass the private key/signature hash
                });
    
                if (response.status === 200) {
                    setDeployMessage({
                        message: "Credential issued successfully",
                        type: "success",
                        receipt: response.data.receipt, // Transaction receipt
                    });
                    console.log("Transaction receipt:", response.data.receipt);
                } else {
                    throw new Error("Failed to issue credential.");
                }
            }
        } catch (error: any) {
            console.error("Error issuing credential:", error.response?.data || error.message);
            setDeployMessage({
                message: "Error issuing credential",
                type: "error",
                receipt: null,
            });
        } finally {
            setDeploying(false);
        }
    };


    return (
        <div className="w-full h-[calc(100%-100px)]">
            <h1 className={`text-3xl font-bold mb-2 text-gray-300`}>First lets store our metadata on ipfs. 🥳</h1>
            <p className={`text-gray-400 mb-6`}>
                You will need store to the metadata on IPFS for easier retrieval {'.'}
                <a href="#" className="text-blue-400 underline">What is a ipfs?</a>
            </p>
            <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Certificate image</label>
                <div className="w-full max-w-xl h-94 border border-dashed bg-gray-600 border-neutral-200 dark:border-neutral-800 rounded-lg">
                    <FileUpload onChange={handleFileChange} />
                </div>
            </div>
            
            <h1 className="text-lg font-bold text-gray-300 uppercase">Let's create a smart contract for your Certificate NFT.</h1>
            <div className="w-full h-[100%] flex flex-1 gap-10">
                <div className="w-1/2">
                    <h3 className="text-sm text-gray-300 my-3">Drop your smart contract JSON file here</h3>
                    <div className="w-full max-w-4xl mx-auto border border-dashed bg-gray-800 border-neutral-200 dark:border-neutral-800 rounded-lg">
                        <FileUpload onChange={handleFileChange} />
                    </div>

                    <div className="flex flex-row justify-end">
                        <button
                            onClick={uploadFile}
                            className="mt-2 px-3 py-1 text-white rounded-md hover:bg-gray-600 flex items-center justify-center border border-gray-600 relative"
                        >
                            {uploading && (
                                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-300 mr-2"></span>
                            )}
                            {uploading ? "Uploading..." : "Upload to IPFS"}
                            {!uploading && (
                                <span className="pointer-indicator animate-bounce absolute -left-0 top-[10px] w-[230px] transform -translate-x-1 text-gray-300"
                                style={{
                                    left: "calc(-100% - 100px)",
                                    color: uid ? "green" : ""
                                }}
                                >
                                    {uid ? "Certificate image uploaded" : "Upload certificate image first"} 
                                </span>
                            )}
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-300">Image CID</label>
                        <input
                            type="text"
                            placeholder="ipfs://Qm..."
                            value={uid}
                            disabled
                            className="w-full my-2 p-2 rounded focus:outline-none bg-[#1E2327] border border-gray-600 text-gray-300"
                        />
                    </div>
                </div>

                <div className="w-1/2">
                    <h1 className="text-lg font-bold text-gray-300 uppercase">Let's deploy your Certificate NFT</h1>
                    <div className="flex border-b border-gray-600 mb-4">
                        <button
                            className={`px-4 py-2 text-sm font-medium ${activeTab === "manual"
                                    ? "text-white border-b-2 border-blue-600"
                                    : "text-gray-400"
                                }`}
                            onClick={() => setActiveTab("manual")}
                        >
                            Manual Input
                        </button>
                        <button
                            className={`px-4 py-2 text-sm font-medium ${activeTab === "upload"
                                    ? "text-white border-b-2 border-blue-600"
                                    : "text-gray-400"
                                }`}
                            onClick={() => setActiveTab("upload")}
                        >
                            Upload File
                        </button>
                    </div>

                    {activeTab === "manual" && (
                        <div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-gray-300">Add Student Wallet Address</label>
                                <input
                                    type="text"
                                    value={singleWalletAddress}
                                    onChange={(e) => setSingleWalletAddress(e.target.value)}
                                    className="bg-gray-800 text-gray-300 px-4 py-2 rounded w-2/3 border border-gray-600"
                                />
                                <div className="flex justify-end w-2/3">
                                    <button
                                        className="px-4 py-2 mt-2 text-sm font-medium text-white hover:bg-green-700 rounded text-right border border-gray-600"
                                    >
                                        Add Address
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "upload" && (
                        <div>
                            <h3 className="text-sm text-gray-300 my-3">Upload an Excel file with wallet addresses</h3>
                            <div className="w-[400px] max-w-4xl mx-auto border border-dotted bg-[#1E2327] border-neutral-600 dark:border-neutral-600 rounded-lg">
                                <FileUpload onChange={handleFileChange} />
                            </div>
                        </div>
                    )}


                    <h3 className="text-sm text-gray-300 my-3">Select the network you want to deploy your Certificate NFT on</h3>
                    <div className="flex flex-row gap-2 mt-4">
                        <button className="network-square border border-gray-600 flex flex-col items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg p-4">
                            <Home sx={{ fontSize: 40 }} className="text-gray-300 mb-2" />
                            Abitrium
                        </button>
                        <button className="network-square border border-gray-600 flex flex-col items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg p-4">
                            <Cloud sx={{ fontSize: 40 }} className="text-gray-300 mb-2" />
                            Lisk
                        </button>
                        <button className="network-square border border-gray-600 flex flex-col items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg p-4">
                            <NetworkCheck sx={{ fontSize: 40 }} className="text-gray-300 mb-2" />
                            <w3m-network-button />
                        </button>
                    </div>
                    <br />
                    <button
                        className="px-4 py-2 min-w-[400px] text-sm font-medium text-white border border-gray-600 rounded flex items-center justify-center"
                        onClick={handleDeployCertificateNFT}
                    >
                        {deploying && (
                            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-300 mr-2"></span>
                        )}
                        {deploying ? "Deploying..." : "Deploy Certificate NFT"}
                    </button>
                    {deployMessage && <p className={`text-green text-green-500 mt-4`}>{deployMessage.message}</p>}
                    {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                    {deployMessage && deployMessage.type === "success" &&
                        <div className="w-full h-full flex items-center justify-center absolute z-50">
                            <ConfettiExplosion 
                                force={0.8}
                                duration={3000}
                                particleCount={250}
                                width={1000}
                            />
                     </div>
                    }
                </div>
            </div>

            {deployMessage && deployMessage.receipt && (
                <NFTCard
                    title="Certificate NFT"
                    description="This NFT represents a certificate issued to the student."
                    imageUrl={nftImageUrl}
                    tokenId={deployMessage.receipt.tokenId}
                    transactionHash={deployMessage.receipt.transactionHash}
                    transactionReceipt={deployMessage.receipt}
                />
            )}
        </div>
    );
}
