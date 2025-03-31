import { Button } from "@/components/ui/moving-border";
import React from "react";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import LogoImage from '@/assets/Crefylogo.png';
import Image from "next/image";

export default function Topbar() {
    return (
        <div className="bg-white text-center w-screen flex justify-between items-center px-20 py-[30px]">
            <div className="w-1/3">
                <Image src={LogoImage} alt="Crefy Logo" width={150} height={100} />
            </div>
            <div className="flex justify-center items-center w-1/3">
                <p className='px-5 py-1 rounded-full text-gray-800 text-xl'>Road Map</p>
                <p className='px-5 py-1 rounded-full text-gray-800 text-xl'>Transaction</p> 
                <p className='px-5 py-1 rounded-full text-gray-800 text-xl'>Blog</p>
                <p className='px-5 py-1 rounded-full text-gray-800 text-xl'>Whitespace</p>
            </div>

            <div className="w-1/3 flex justify-end items-center">
                <button className="border border-gray-800 text-gray-800 font-bold py-2 px-10 rounded-xl space-x-3"> 
                    <span>Dashboard</span>
                    <ArrowOutwardIcon />
                </button>
            </div>
        </div>
    );
}