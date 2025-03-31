import React from "react";
import BannerImage from '@/assets/banner1.png';
import Image from "next/image";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';// import components
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export default function Banner() {
    return (
        <div className="relative w-screen h-full py-7">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="https://res.cloudinary.com/dswyz4vpp/video/upload/v1738199532/os1acnv94embnwjchegz.mp4" type="video/mp4" />
            </video>

            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80"></div>
            
            {/* Content */}
            <div className="relative flex justify-center items-center h-full px-20 w-screen">
                <div className="text-left w-2/3 text-white">
                    <div className="flex bg-gray-600 w-2/3 h-10 rounded-full justify-between items-center px-2">
                        <p className="text-blue-400 font-bold bg-white h-8 px-8 rounded-full flex items-center">New</p>
                        <p className="text-gray-100 text-xl">Seamless KYC and NFT-Based Certification</p>
                        <ArrowForwardIcon className="text-gray-100" />
                    </div>
                    <h1 className="text-8xl mb-9 font-bold text-gray-100 max-w-5xl" style={{ lineHeight: '1.2' }}>
                        Secure Your Digital Identity with Crefy’s NFT-Poweblue System
                    </h1>
                    <p className="text-2xl mt-3 max-w-3xl">
                        Crefy is a decentralized identity system designed for minting certificates into NFTs and providing seamless KYC integration. Our platform is built on the Ethereum blockchain, ensuring the highest level of security and transparency for all users.
                    </p>

                    {/* Learn More and Request Demo Buttons */}
                    <div className="flex space-x-5 mt-10">
                        <button className="border border-blue-500 bg-white text-blue-500 font-bold py-3 px-10 rounded-xl h-14 space-x-5">
                            <span>Learn More</span>
                        </button>
                        <button className="bg-blue-500 text-white font-bold py-3 px-10 rounded-xl h-14 space-x-5">
                            <span>Request Demo</span>
                            <ArrowOutwardIcon />
                        </button>
                    </div>
                </div>

                <div className="w-1/2 relative z-10">
                    <Image src={BannerImage.src} alt="Crefy Banner" width={700} height={700} />
                </div>
            </div>
        </div>
    )
}