import React from 'react';
import KycPreview from '@/assets/kyc_preview.png';
import Image from 'next/image';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { motion } from 'framer-motion';

const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const KycFeature = () => {
    return (
        <motion.div className='w-full flex flex-col-reverse md:flex-row justify-between items-center text-left px-10 md:px-20' variants={fadeIn} initial="hidden" animate="visible">
            <div className='w-full md:w-1/2 text-center md:text-left'>
                <h1 className='bg-blue-50 px-5 py-1 w-32 rounded-full text-blue-500 font-bold text-sm mx-auto md:mx-0'>INCLUDED</h1>
                <h1 className='text-blue-600 text-5xl md:text-7xl font-bold'>Certificate Minting</h1>
                <p className='text-lg md:text-xl my-6 w-full md:w-[90%] text-gray-700'>Crefy enables users to mint certificates as NFTs, ensuring secure and verifiable credentials on the blockchain. Each certificate is uniquely tied to the user's identity, preventing forgery and enhancing trust.</p>
                <button className='border border-blue-500 text-blue-500 px-8 py-3 rounded-xl flex items-center justify-center md:justify-start font-semibold hover:bg-blue-500 hover:text-white transition duration-300 mx-auto md:mx-0'>
                    <span>Learn more</span>
                    <ArrowOutwardIcon className='ml-2' />
                </button>
            </div>
            <div className='w-full md:w-1/2'>
                <Image src={KycPreview} alt='kyc preview' width={500} height={500} className='rounded-lg shadow-lg mx-auto' />
            </div>
        </motion.div>
    );
}

const KycFeature2 = () => {
    return (
        <motion.div className='w-full flex flex-col md:flex-row justify-between items-center text-left px-10 md:px-20' variants={fadeIn} initial="hidden" animate="visible">
            <div className='w-full md:w-1/2'>
                <Image src={KycPreview} alt='kyc preview' width={500} height={500} className='rounded-lg shadow-lg mx-auto' />
            </div>
            <div className='w-full md:w-1/2 text-center md:text-left'>
                <h1 className='bg-blue-50 px-5 py-1 w-56 rounded-full text-blue-500 font-bold text-sm mx-auto md:mx-0'>INCLUDED</h1>
                <h1 className='text-blue-600 text-5xl md:text-6xl font-bold'>KYC Verification & Crefy Naming System</h1>
                <p className='text-lg md:text-xl my-6 w-full md:w-[90%] text-gray-700'>After KYC verification, users receive a unique identity via the Crefy Naming System (CNS), ensuring authenticity and security. This digital identity helps businesses and individuals establish credibility while interacting in a decentralized environment.</p>
                <button className='border border-blue-500 text-blue-500 px-8 py-3 rounded-xl flex items-center justify-center md:justify-start font-semibold hover:bg-blue-500 hover:text-white transition duration-300 mx-auto md:mx-0'>
                    <span>Learn more</span>
                    <ArrowOutwardIcon className='ml-2' />
                </button>
            </div>
        </motion.div>
    );
}

const KycFeature3 = () => {
    return (
        <motion.div className='w-full flex flex-col-reverse md:flex-row justify-between items-center text-left px-10 md:px-20' variants={fadeIn} initial="hidden" animate="visible">
            <div className='w-full md:w-1/2 text-center md:text-left'>
                <h1 className='bg-blue-50 px-5 py-1 w-56 rounded-full text-blue-500 font-bold text-sm mx-auto md:mx-0'>FEATURES</h1>
                <h1 className='text-blue-600 text-5xl md:text-6xl font-bold'>Additional Security & Privacy Features</h1>
                <p className='text-lg md:text-xl my-6 w-full md:w-[90%] text-gray-700'>Crefy supports advanced security and privacy controls, ensuring complete user control over data access and sharing. With encrypted data storage and decentralized verification, users can securely manage their credentials without third-party intervention.</p>
                <button className='border border-blue-500 text-blue-500 px-8 py-3 rounded-xl flex items-center justify-center md:justify-start font-semibold hover:bg-blue-500 hover:text-white transition duration-300 mx-auto md:mx-0'>
                    <span>Learn more</span>
                    <ArrowOutwardIcon className='ml-2' />
                </button>
            </div>
            <div className='w-full md:w-1/2'>
                <Image src={KycPreview} alt='kyc preview' width={500} height={500} className='rounded-lg shadow-lg mx-auto' />
            </div>
        </motion.div>
    );
}

export default function Features() {
    return (
        <div className="bg-white text-center w-full py-20 px-10 md:px-40 mx-auto">
            <div className="flex justify-center items-center">
                <h1 className='bg-blue-100 px-5 py-2 rounded-full text-blue-500 font-bold text-sm uppercase tracking-widest'>FEATURES</h1>
            </div>
            <h1 className='text-gray-800 text-5xl md:text-6xl w-full md:w-2/5 mx-auto font-bold leading-tight'> Easy implementation <span className="text-blue-500">in three easy steps</span></h1>
            <p className='text-gray-500 text-lg md:text-xl mt-5'>Cutting-edge, user-friendly AI tool and growth analytics designed to boost user conversion, engagement, and retention.</p>
            <div className='w-full mt-16 space-y-16'>
                <KycFeature />
                <KycFeature2 />
                <KycFeature3 />
            </div>
        </div>
    );
}
