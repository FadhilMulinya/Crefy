// blog.tsx

import Image from 'next/image';
import React from 'react';

// right arrow icon
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
export default function Blog() {
    return (
        <div className="bg-white text-center w-screen py-5">
            <div className="flex justify-center items-center">
                <h1 className='bg-blue-50 px-5 py-1 rounded-full text-blue-400 font-bold text-sm'>BLOG</h1>
            </div>
            <h1 className='text-gray-600 text-7xl'>From <span className='text-blue-600'>our Blog</span></h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 px-20 text-left">
                <div className="p-5 rounded-lg">
                    <img 
                        src="https://externlabs.com/blogs/wp-content/uploads/2022/07/NFT-blog-image-1.jpg" 
                        className="rounded-lg w-full" 
                        alt={'NFT image'} 
                        style={{aspectRatio: '16/10'}} 
                    />
                    <button className="font-bold text-blue-600 mb-5 bg-green-200 rounded-full px-3 my-5">The rise of NFTs</button>
                    <h2 className="text-3xl font-bold text-blue-600 mb-5">
                        How to mint your first NFT: A step-by-step guide
                    </h2>
                </div>

                <div className="p-5 rounded-lg">
                    <img 
                        src="https://externlabs.com/blogs/wp-content/uploads/2022/07/NFT-blog-image-1.jpg" 
                        className="rounded-lg w-full" 
                        alt={'Web3 image'} 
                        style={{aspectRatio: '16/10'}} 
                    />
                    <button className="font-bold text-blue-600 mb-5 bg-green-200 rounded-full px-3 my-5">Web3</button>
                    <h2 className="text-3xl text-blue-600 mb-5">
                        The future of Web3: Revolutionizing the digital world
                    </h2>
                </div>

                <div className="p-5 rounded-lg">
                    <img 
                        src="https://externlabs.com/blogs/wp-content/uploads/2022/07/NFT-blog-image-1.jpg" 
                        className="rounded-lg w-full" 
                        alt={'DeFi image'} 
                        style={{aspectRatio: '16/10'}} 
                    />
                    <button className="font-bold text-blue-600 mb-5 bg-green-200 rounded-full px-3 my-5">DeFi</button>
                    <h2 className="text-3xl text-blue-600 mb-5">
                        Why you should care about DeFi: Unlocking financial freedom
                    </h2>
                </div>
            </div>

            <button className="border border-red-600 text-red-600 py-2 px-10 rounded-xl mt-10">
                <span>More Articles</span>
                <ArrowForwardIcon />
            </button>
        </div>
    );
}
