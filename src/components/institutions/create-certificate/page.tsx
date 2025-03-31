"use client";
// pages/create-certificate.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
// import { useRouter } from 'next/router';
import { useAccount, useWriteContract, useWatchContractEvent } from 'wagmi';
import { Upload, CheckCircle, Clock, Plus } from 'lucide-react';
import Container from '../components/Container';
import CertificateSigners from '../components/CertificateSigners';
import { Abi, contractAddress } from '@/config/abi';
import { writeContract } from '@wagmi/core';
import {ToastContainer, toast} from './ToastContainer';
import useContract from '@/hooks/useContract';

export default function CreateCertificate() {
    // State management
    const { address, isConnected } = useAccount();
    const { data: hash, isPending, writeContract } = useWriteContract()
    const [uploadingImage, setUploadingImage] = useState(false);
    const [certificateImage, setCertificateImage] = useState<File | null>(null);
    const [imageCID, setImageCID] = useState('');
    const [metadataCID, setMetadataCID] = useState('');
    const [studentName, setStudentName] = useState('');
    const [distinction, setDistinction] = useState('');
    const [studentWallet, setStudentWallet] = useState('');
    const [selectedNetwork, setSelectedNetwork] = useState('abtrium');
    const [signers, setSigners] = useState([
        { address: '0x45...8F21', role: 'Dean of School', status: 'completed' },
        { address: '0x72...1A45', role: 'Department Chair', status: 'pending' }
    ]);
    const [activeTab, setActiveTab] = useState('manual');
    const [isCreatingMetadata, setIsCreatingMetadata] = useState(false);
    const [isDeploying, setIsDeploying] = useState<boolean>(false);
 
    // Derived state
    const allSignersCompleted = signers.every(signer => signer.status === 'completed');
    const pendingSigners = signers.filter(signer => signer.status === 'pending').length;
    const canCreateMetadata = certificateImage && imageCID && studentName && distinction;
    const canDeploy = metadataCID && studentWallet && allSignersCompleted;
    const canAddSigner = signers.length < 3;
    const { writeContractAsync } = useWriteContract();


    // Handle certificate image upload
    const handleCertificateUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setCertificateImage(file);
            // Reset IPFS hashes when new image is uploaded
            setImageCID('');
            setMetadataCID('');
            toast.info(`Image "${file.name}" selected. Please upload to IPFS.`);
        }
    };

    // Upload image to IPFS
    const uploadImageToIPFS = async () => {
        if (!certificateImage) return;
        setUploadingImage(true);
        try {
            const data = new FormData();
            data.set("file", certificateImage);
            const uploadRequest = await fetch("/api/files", {
                method: "POST",
                body: data,
            });
    
            if (!uploadRequest.ok) {
                throw new Error("Failed to upload image");
            }
    
            const ipfsUrl = await uploadRequest.json();
            const ipfsHash = ipfsUrl.split("/ipfs/")[1];
            const ipfsFormat = `ipfs://${ipfsHash}`;
            setImageCID(ipfsFormat);

            console.log("Image uploaded to IPFS:", ipfsUrl);
        } catch (error) {
            console.error("Error uploading image to IPFS:", error);
        } finally {
            setUploadingImage(false);
        }
    };

    // Create and upload metadata JSON to IPFS
    const createAndUploadMetadata = async () => {
        if (!canCreateMetadata) return;
    
        setIsCreatingMetadata(true);
        toast.info("Creating and uploading metadata to IPFS...");
    
        // Create metadata JSON
        const metadata = {
            name: studentName,
            distinction: distinction,
            image: imageCID,
            description: `Certificate of ${distinction} awarded to ${studentName}`,
            attributes: [
                {
                    trait_type: "Distinction",
                    value: distinction,
                },
                {
                    trait_type: "Issue Date",
                    value: new Date().toISOString().split("T")[0],
                },
            ],
        };
    
        try {
            const metadataRequest = await fetch("/api/files", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(metadata),
            });
    
            if (!metadataRequest.ok) {
                throw new Error("Failed to upload metadata");
            }
    
            const ipfsUrl = await metadataRequest.json();
            const ipfsHash = ipfsUrl.split("/ipfs/")[1];
            const ipfsFormat = `ipfs://${ipfsHash}`;
            setMetadataCID(ipfsFormat);
            console.log("Metadata uploaded to IPFS:", ipfsUrl);
            toast.success("Metadata successfully created and uploaded to IPFS");
        } catch (error) {
            console.error("Error creating metadata:", error);
            toast.error("Failed to create metadata. Please try again.");
        } finally {
            setIsCreatingMetadata(false);
        }
    };

    // Add new signer
    const addSigner = () => {
        if (signers.length < 3) {
            setSigners([...signers, { address: '', role: '', status: 'pending' }]);
            toast.info("New signer added. Please add details.");
        } else {
            toast.warning("Maximum number of signers (3) reached.");
        }
    };

    // Update signer status
    const updateSignerStatus = (index: any, status: any) => {
        const updatedSigners = [...signers];
        updatedSigners[index].status = status;
        setSigners(updatedSigners);
        const signer = updatedSigners[index];
        if (status === 'completed') {
            toast.success(`Signer ${truncateAddress(signer.address)} (${signer.role}) has completed.`);
        } else {
            toast.info(`Signer ${truncateAddress(signer.address)} (${signer.role}) is now pending.`);
        }
    };

    // Deploy certificate NFT
    const deployCertificate = async () => {
        if (!canDeploy) return;
        setIsDeploying(true);
    
        toast.info("Deploying certificate NFT...");
        try {
            const tx = await writeContractAsync({
                address: contractAddress, // The address of your smart contract
                abi: Abi, // The ABI of your smart contract
                functionName: "safeMint", // The function name in your smart contract
                args: [
                    studentWallet, // The "to" address (student's wallet)
                    metadataCID, // The "uri" (IPFS CID of the metadata)
                ],
            });
    
            console.log("Transaction hash:", tx);
            toast.success(`Certificate NFT deployed successfully! Transaction: ${truncateAddress(tx)}`);
        } catch (error) {
            console.error("Error deploying certificate NFT:", error);
            toast.error("Failed to deploy certificate NFT. Please try again.");
        } finally {
            setIsDeploying(false);
        }
    };

    const handleSignersChange = (updatedSigners: any) => {
        setSigners(updatedSigners);
        
        // Check if all signers are completed after an update
        const allCompleted = updatedSigners.every(signer => signer.status === 'completed');
        if (allCompleted) {
            toast.success("All signers have completed! You can now deploy the certificate.");
        }
    };

    // Handle student wallet addition
    const handleAddStudentWallet = () => {
        if (studentWallet) {
            toast.success(`Student wallet ${truncateAddress(studentWallet)} added successfully.`);
        } else {
            toast.warning("Please enter a valid wallet address.");
        }
    };

    // Network options
    const networks = [
        { id: 'hedera', name: 'Hedera' },
        { id: 'eduChain', name: 'EDU Chain' },
        { id: 'ethereum', name: 'Ethereum' },
    ];

    return (
        <Container>
            <div className="min-h-screen">
                <Head>
                    <title>Create Certificate NFT</title>
                    <meta name="description" content="Create and deploy a certificate NFT" />
                </Head>

                {/* Main Content */}
                <main className="container mx-auto p-6">
                    {/* Info banner */}
                    <div className="bg-[#1E2327] p-3 rounded-lg mb-6">
                        <p className="text-gray-300">
                            You will need to store the certificate image and metadata on IPFS for easier retrieval.
                            <a href="#" className="text-blue-400 ml-2">What is IPFS?</a>
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Left Column */}
                        <div className="w-full md:w-1/2 bg-[#1E2327] rounded-lg p-6">
                            {/* Certificate Image Section */}
                            <div className="mb-6">
                                <h2 className="text-white text-lg font-bold mb-2">CERTIFICATE IMAGE</h2>
                                <label className="block w-full h-40 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-700/80 transition-colors">
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleCertificateUpload}
                                    />
                                    <div className="flex flex-col items-center justify-center h-full">
                                        {certificateImage ? (
                                            <div className="text-center">
                                                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                                <p className="text-white">{certificateImage.name}</p>
                                            </div>
                                        ) : (
                                            <>
                                                <Upload className="w-8 h-8 text-blue-400 mb-2" />
                                                <p className="text-white text-center">Upload Certificate Image</p>
                                                <p className="text-gray-400 text-sm">Drag and drop image file or click to browse</p>
                                            </>
                                        )}
                                    </div>
                                </label>
                            </div>

                            {/* Image CID Section */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-white">Image CID</label>
                                    {imageCID && <CheckCircle className="w-5 h-5 text-green-500" />}
                                </div>
                                <div className="mb-2">
                                    <input
                                        type="text"
                                        className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md text-gray-400"
                                        placeholder="ipfs://Qm..."
                                        value={imageCID}
                                        onChange={(e) => setImageCID(e.target.value)}
                                        readOnly={!certificateImage}
                                    />
                                </div>

                                <div className="flex items-center">
                                    <button
                                        onClick={uploadImageToIPFS}
                                        disabled={!certificateImage}
                                        className={`px-6 py-2 border border-blue-500 rounded-md flex items-center text-blue-400 ${certificateImage ? 'hover:bg-blue-500/10' : 'opacity-50 cursor-not-allowed'
                                            }`}
                                    >
                                        {uploadingImage ? (
                                            <div className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Uploading...</span>
                                            </div>
                                        ) : 'Upload Image to IPFS'}
                                    </button>
                                    {!certificateImage && (
                                        <span className="text-gray-400 ml-3 text-sm">Upload certificate image first</span>
                                    )}
                                </div>
                            </div>

                            {/* Certificate Details Section */}
                            <div className="mb-6">
                                <h2 className="text-white text-lg font-bold mb-4">CERTIFICATE DETAILS</h2>
                                
                                {/* Student Name */}
                                <div className="mb-4">
                                    <label className="block text-white mb-1">Student Name</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
                                        placeholder="Full name as it will appear on certificate"
                                    />
                                </div>
                                
                                {/* Distinction */}
                                <div className="mb-4">
                                    <label className="block text-white mb-1">Distinction / Achievement</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                                        value={distinction}
                                        onChange={(e) => setDistinction(e.target.value)}
                                        placeholder="e.g. Bachelor of Computer Science, First Class Honors"
                                    />
                                </div>
                            </div>

                            {/* Create Metadata Button */}
                            <div className="mb-6">
                                <button
                                    onClick={createAndUploadMetadata}
                                    disabled={!canCreateMetadata || isCreatingMetadata}
                                    className={`w-full py-3 rounded-lg text-white font-bold ${
                                        canCreateMetadata && !isCreatingMetadata 
                                            ? 'bg-blue-500 hover:bg-blue-600' 
                                            : 'bg-blue-500/50 cursor-not-allowed'
                                    }`}
                                >
                                    {isCreatingMetadata ? 'Creating Metadata...' : 'Create & Upload Metadata'}
                                </button>
                                {!canCreateMetadata && (
                                    <p className="text-center text-gray-400 text-sm mt-1">
                                        Fill in all fields and upload image to IPFS first
                                    </p>
                                )}
                            </div>

                            {/* Metadata CID Section */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-white">Metadata CID</label>
                                    {metadataCID && <CheckCircle className="w-5 h-5 text-green-500" />}
                                </div>
                                <input
                                    type="text"
                                    className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md text-gray-400"
                                    placeholder="ipfs://Qm..."
                                    value={metadataCID}
                                    onChange={(e) => setMetadataCID(e.target.value)}
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="w-full md:w-1/2 bg-[#1E2327] rounded-lg p-6">
                            <h2 className="text-white text-lg font-bold mb-2">DEPLOY YOUR CERTIFICATE NFT</h2>

                            {/* Tab Navigation */}
                            <div className="flex mb-4 bg-gray-700 rounded-lg overflow-hidden">
                                <button
                                    className={`flex-1 py-2 ${activeTab === 'manual' ? 'bg-blue-500 text-white' : 'text-gray-400'}`}
                                    onClick={() => setActiveTab('manual')}
                                >
                                    Manual Input
                                </button>
                                <button
                                    className={`flex-1 py-2 ${activeTab === 'upload' ? 'bg-blue-500 text-white' : 'text-gray-400'}`}
                                    onClick={() => setActiveTab('upload')}
                                >
                                    Upload File
                                </button>
                            </div>

                            {/* Student Wallet */}
                            <div className="mb-4">
                                <label className="block text-white mb-1">Add Student Wallet Address</label>
                                <input
                                    type="text"
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                                    value={studentWallet}
                                    onChange={(e) => setStudentWallet(e.target.value)}
                                    placeholder="0x..."
                                />
                            </div>

                            <div className="flex justify-end mb-6">
                                <button className="px-4 py-2 bg-blue-500 rounded-full text-white">
                                    Add Address
                                </button>
                            </div>

                            {/* Signers Section */}
                            <div className="mb-4">
                                <label className="block text-white mb-2">Certificate Signers (3 max)</label>

                                <CertificateSigners
                                    signers={signers}
                                    onChange={handleSignersChange}
                                    maxSigners={3}
                                />
                            </div>

                            {/* Network Selection */}
                            <div className="mb-4">
                                <label className="block text-white mb-2">Select network to deploy your Certificate NFT</label>
                                <div className="flex space-x-4">
                                    {networks.map(network => (
                                        <button
                                            key={network.id}
                                            className={`flex-1 py-2 px-4 rounded-lg ${selectedNetwork === network.id
                                                    ? 'border-2 border-blue-500 text-white'
                                                    : 'bg-gray-700 border border-gray-600 text-gray-300'
                                                }`}
                                            onClick={() => setSelectedNetwork(network.id)}
                                        >
                                            {network.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Status Summary */}
                            <div className="p-3 bg-gray-700 border border-gray-600 rounded-md mb-4">
                                {allSignersCompleted ? (
                                    <p className="text-green-500">All signers have completed</p>
                                ) : (
                                    <p className="text-yellow-500">
                                        Waiting for {pendingSigners} of {signers.length} signers to complete
                                    </p>
                                )}
                            </div>

                            {/* Deploy Button */}
                            <button
                                onClick={deployCertificate}
                                disabled={!canDeploy}
                                className={`w-full py-4 rounded-lg text-white font-bold ${canDeploy ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-500/50 cursor-not-allowed'
                                    }`}
                            >
                                {isDeploying ? <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Deploying...</> : 'Deploy Certificate NFT'}
                            </button>
                            {!canDeploy && (
                                <p className="text-center text-gray-400 text-sm mt-1">
                                    Complete all steps above before deploying
                                </p>
                            )}
                        </div>
                    </div>
                </main>
                {/* Toast Container */}
                <ToastContainer position="bottom-right" />
            </div>
        </Container>
    );
}

// Utility function to truncate address
function truncateAddress(address: string) {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}