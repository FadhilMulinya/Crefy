import React from "react";
import IncludedImage from '@/assets/blogs/included.png';
import Image from "next/image";

export default function Included() {
    return (
        <div className="bg-white text-center w-screen py-5 mx-auto pb-20 mb-10 px-20">
            <div className="flex justify-center items-center">
                <h1 className='bg-blue-50 px-5 py-1 rounded-full text-blue-400 font-bold text-sm'>INCLUDED</h1>
            </div>
            <h1 className='text-blue-500 text-6xl w-2/5 mx-auto'>Essential Features for a Secure Digital Identity</h1>
            <p className='text-gray-500 text-xl mt-5'>Empowering users with secure, verifiable, and decentralized identity solutions.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 px-20 text-center text-left">
                <div className="p-5 rounded-lg flex flex-col items-center">
                    <Image src={IncludedImage} alt="Included" width={180} height={100} className="my-0" />
                    <h2 className="text-3xl font-bold text-blue-500 mb-5 mt-0">Decentralized Identity</h2>
                    <p className="text-lg text-gray-700">
                        Crefy enables users to create and control their digital identities securely on the blockchain, reducing reliance on centralized authorities.
                    </p>
                </div>

                <div className="p-5 rounded-lg flex flex-col items-center">
                    <Image src={IncludedImage} alt="Included" width={180} height={100} className="my-0" />
                    <h2 className="text-3xl font-bold text-blue-500 mb-5 mt-0">KYC Verification</h2>
                    <p className="text-lg text-gray-700">
                        Seamless Know Your Customer (KYC) verification process that ensures authenticity while maintaining user privacy and security.
                    </p>
                </div>

                <div className="p-5 rounded-lg flex flex-col items-center">
                    <Image src={IncludedImage} alt="Included" width={180} height={100} className="my-0" />
                    <h2 className="text-3xl font-bold text-blue-500 mb-5 mt-0">Certificate Minting</h2>
                    <p className="text-lg text-gray-700">
                        Issue verifiable certificates as NFTs, ensuring authenticity, security, and ownership proof on the blockchain.
                    </p>
                </div>

                <div className="p-5 rounded-lg flex flex-col items-center">
                    <Image src={IncludedImage} alt="Included" width={180} height={100} className="my-0" />
                    <h2 className="text-3xl font-bold text-blue-500 mb-5 mt-0">Crefy Naming System (CNS)</h2>
                    <p className="text-lg text-gray-700">
                        Assigns users a unique decentralized identity, allowing for simplified authentication and verification processes.
                    </p>
                </div>

                <div className="p-5 rounded-lg flex flex-col items-center">
                    <Image src={IncludedImage} alt="Included" width={180} height={100} className="my-0" />
                    <h2 className="text-3xl font-bold text-blue-500 mb-5 mt-0">Privacy & Security Controls</h2>
                    <p className="text-lg text-gray-700">
                        Advanced privacy settings that give users full control over who can access their personal and credential data.
                    </p>
                </div>

                <div className="p-5 rounded-lg flex flex-col items-center">
                    <Image src={IncludedImage} alt="Included" width={180} height={100} className="my-0" />
                    <h2 className="text-3xl font-bold text-blue-500 mb-5 mt-0">Seamless Integration</h2>
                    <p className="text-lg text-gray-700">
                        Easily integrate Crefy’s digital identity solutions into any platform, enhancing security and user experience.
                    </p>
                </div>
            </div>
        </div>
    )
}
