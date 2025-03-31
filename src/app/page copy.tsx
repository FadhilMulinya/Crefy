// // "use client";
// // import React, { useEffect, useState } from "react";
// // import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
// // import ArrowForwardIcon from '@mui/icons-material/ArrowForward';// import components
// // import Topbar from "./components/topbar";
// // import Features from "./components/feature";
// // import Included from "./components/included";
// // import Metrics from "./components/metrics";
// // import Faq from "./components/faq";
// // import Blog from "./components/blog";
// // import Footer from "./components/footer";

// // import WaitingList from "./components/waiting_list";
// // import Banner from "./components/Banner";

// // export default function Home() {
// //     return (
// //         <div className="bg-white relative">
// //             <Topbar />
// //             <Banner />            

// //             <WaitingList /> 

// //             <Features />

// //             <Included />

// //             <div className="px-20 py-10 h-1/2">
// //                 <div className="bg-blue-900 text-white py-10 flex justify-between px-20 rounded-xl">
// //                     <div className="w-1/3">
// //                         <h1 className="text-7xl font-bold">Make a lasting impression with NFTs</h1>
// //                         {/* more content */}
// //                         <p className="text-2xl mt-5">Create your account today and start minting NFTs! Discover the power of decentralized identity and secure digital certificates.</p>
// //                     </div>

// //                     <div className="flex items-center">
// //                         <button className="bg-white text-blue-500 font-bold py-3 px-10 rounded-xl h-12 space-x-5">
// //                             <span>Get Started</span>
// //                             <ArrowOutwardIcon />
// //                         </button>
// //                     </div>
// //                 </div>
// //             </div>

// //             <Metrics />

// //             <Faq />

// //             <Blog />

// //             <div className="px-20 py-10 h-2/3">
// //                 <div className="bg-blue-900 text-white py-10 flex justify-between px-20 rounded-xl">
// //                     <div className="w-1/3">
// //                         <h1 className="text-7xl font-bold">Make a lasting impression with NFTs</h1>
// //                         {/* more content */}
// //                         <p className="text-2xl mt-5">Create your account today and start minting NFTs! Discover the power of decentralized identity and secure digital certificates.</p>
// //                     </div>

// //                     <div className="flex items-center">
// //                         <button className="bg-white text-blue-500 font-bold py-3 px-10 rounded-xl h-12 space-x-5">
// //                             <span>Get Started</span>
// //                             <ArrowOutwardIcon />
// //                         </button>
// //                     </div>
// //                 </div>
// //             </div>

// //             <Footer />
// //         </div>
// //     )
// // }


// "use client";

// import React from "react";
// import DcnNavBar from '../components/components/dcnnavbar';
// // import Carousel from "./components/Carousel";
// // import CarouselWidget from "./components/CarouselWidget";
// // import HowToGetStarted from "./components/howtogetStarted";
// // import FAQ from "./components/FAQ";
// import Footer from "../components/components/footer";
// import Image from "next/image";
// // import Web3Features from "./components/Web3Features";
// import botImage from "@/assets/bot.png";
// import botImage2 from "@/assets/bot-2.png";
// import nftPreview from '@/assets/nft_preview.png';
// import kycPreview from '@/assets/kyc_preview.png';
// import studentDashboard from '@/assets/student-dashboard.png';

// export default function Home() {
//     return (
//         <main className="p-8 min-h-screen relative"
//             style={{
//                 background: 'linear-gradient(180deg, #020321, #140221)',
//                 zIndex: 0,
//             }}
//         >
//             {/* DCN NAVBAR */}
//             <DcnNavBar />

//             {/* Crefy Intro Banner */}
//             <div className="flex flex-col items-center justify-center px-10 py-20 text-white rounded-xl shadow-none mt-10 relative">
//                 <div className="flex flex-col items-center text-center">
//                     <h1 className="text-8xl font-extrabold leading-tight">
//                         Discover <span className="text-green-400">Crefy</span>
//                     </h1>
//                     <p className="text-xl mt-6 text-gray-300 max-w-3xl">
//                         Empowering digital identities with blockchain. Secure, verify, and manage your identity 
//                         seamlessly in a decentralized world, connecting individuals and businesses globally.
//                     </p>
//                     <button className="mt-8 bg-gradient-to-r from-green-500 to-blue-500 px-8 py-4 rounded-xl font-semibold text-white text-xl hover:scale-110 transform transition duration-300 shadow-lg">
//                         Get Started
//                     </button>
//                 </div>

//                 {/* Bot Image */}
//                 <div className="absolute bottom-0 right-0 w-full h-1/2">
//                     <Image src={botImage} alt="Bot Image" width={400} height={400} />
//                 </div>

//                 {/* Statistics Section */}
//                 <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
//                     <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
//                         <h3 className="text-4xl font-bold text-green-400">150,000+</h3>
//                         <p className="text-lg text-gray-300 mt-4">Verified Identities</p>
//                     </div>
//                     <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
//                         <h3 className="text-4xl font-bold text-blue-400">500+ </h3>
//                         <p className="text-lg text-gray-300 mt-4">Businesses Integrated</p>
//                     </div>
//                     <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
//                         <h3 className="text-4xl font-bold text-purple-400">1M+</h3>
//                         <p className="text-lg text-gray-300 mt-4">Secure Transactions Processed</p>
//                     </div>
//                 </div>

//                 <div className="absolute top-10 left-10 w-28 h-28 bg-blue-500 rounded-full filter blur-2xl opacity-60 animate-float1"></div>
//                 <div className="absolute bottom-10 right-10 w-28 h-28 bg-blue-500 rounded-full filter blur-2xl opacity-60 animate-float2 animation-delay-2000"></div>
//                 <div className="absolute top-1/4 right-1/4 w-28 h-28 bg-purple-500 rounded-full filter blur-2xl opacity-60 animate-float3 animation-delay-4000"></div>
//                 <div className="absolute top-2/4 right-3/4 w-28 h-28 bg-purple-500 rounded-full filter blur-2xl opacity-60 animate-float"></div>

//             </div>

//             {/* <Web3Features /> */}

//             {/* NFT Certificate Minting Section */}
//             <div className="py-16 px-10 text-white rounded-xl shadow-lg my-16 flex flex-col lg:flex-row items-center">
//                 <div className="lg:w-1/2 mt-8 lg:mt-0">
//                     <Image src={nftPreview} alt="NFT Certificate Minting" className="rounded-xl w-full" />
//                 </div>
//                 <div className="text-center lg:text-left lg:w-1/2">
//                     <h2 className="text-8xl font-bold leading-tight mb-6">
//                         Certify Your Identity with <span className="text-green-400">NFTs</span>
//                     </h2>
//                     <p className="text-xl mb-6 text-gray-300 max-w-3xl mx-auto lg:mx-0">
//                         Organizations can now mint digital certificates into NFTs, providing a secure and verifiable 
//                         way to showcase accomplishments, certifications, and identity proofs. These NFTs are sent directly 
//                         to users' wallets, enabling easy access and management of their certificates in the decentralized world.
//                     </p>
//                     <button className="mt-8 bg-gradient-to-r from-green-500 to-blue-500 px-8 py-4 rounded-xl font-semibold text-white text-xl hover:scale-110 transform transition duration-300 shadow-lg">
//                         Learn More
//                     </button>
//                 </div>
//             </div>

//             <div className="relatpy-16 px-10 text-white rounded-xl shadow-lg my-16 flex flex-col lg:flex-row items-center">
//                 {/* Text Section */}
//                 <div className="text-center lg:text-left lg:w-1/2">
//                     <h2 className="text-7xl font-bold leading-tight mb-6">
//                         Seamless <span className="text-green-400">KYC Integration</span> for Developers
//                     </h2>
//                     <p className="text-xl mb-6 text-gray-300 max-w-3xl mx-auto lg:mx-0">
//                         Crefy offers a simple and secure way for developers to integrate KYC (Know Your Customer) functionality into their applications. 
//                         Our flexible API allows you to verify user identities quickly and effortlessly, ensuring compliance with regulations while providing a seamless user experience.
//                     </p>
//                     <button className="mt-8 bg-gradient-to-r from-green-500 to-blue-500 px-8 py-4 rounded-xl font-semibold text-white text-xl hover:scale-110 transform transition duration-300 shadow-lg">
//                         Get Started
//                     </button>
//                     <div className="absolute top-2/4 right-2/4 w-1/3 bg-purple-500 rounded-full filter blur-2xl opacity-20 animate-float1 animation-delay-4000" style={{aspectRatio: '1/1'}}></div>
//                 </div>

//                 {/* Image on the Right */}
//                 <div className="lg:w-1/2 mt-8 lg:mt-0">
//                     <Image src={kycPreview} alt="KYC Integration" className="rounded-xl w-full" />
//                 </div>
                
//             </div>

//            {/* Dashboards Section */}
//             <div className="relative py-16 px-10 text-white rounded-xl my-16 flex flex-col lg:flex-col items-center w-full">
//                 {/* Title Section */}
//                 <div className="text-center lg:w-full mb-12">
//                     <h2 className="text-5xl font-bold leading-tight">
//                         <span className="text-green-400">Crefy</span> Dashboards
//                     </h2>

//                     <div className="flex justify-center mt-4">
//                         <div className="w-32 hover:w-64 h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
//                     </div>
//                 </div>

//                 {/* Content Section */}
//                 <div className="flex justify-center items-center lg:w-full mb-8">
//                     <p className="text-xl text-gray-300 max-w-3xl text-center lg:text-left">
//                         Visualize and manage all your data effortlessly with Crefy Dashboards. 
//                         Our intuitive and customizable dashboards provide you with real-time insights, 
//                         ensuring you stay on top of key metrics and performance indicators.
//                     </p>
//                 </div>

//                 {/* 3D Hover Effect Image */}
//                 <div className="w-full max-w-7xl mt-4 perspective-1000">
//                     <div 
//                         className="transform transition-transform duration-500 hover:rotate-y-6 hover:scale-105 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg">
//                         <Image 
//                             src={studentDashboard} 
//                             alt="Student Dashboard" 
//                             className="rounded-xl w-full" 
//                         />
//                     </div>
//                 </div>

//                 {/* Bot Image */}
//                 <div className="absolute bottom-0 right-0 w-full h-full justify-end flex items-end">
//                     <Image src={botImage2} alt="Bot Image" width={400} height={400} />
//                 </div>

//             </div>


//             {/* FAQ */}
//             {/* <FAQ /> */}

//             {/* Sign Up Section */}
//             <div className='flex items-center justify-center my-[10rem]'>
//                 <div className="max-w-[80%] relative flex flex-col lg:flex-row items-center z-10 p-6 lg:p-1 rounded-3xl shadow-lg flex-1 overflow-hidden"
//                     style={{
//                         minHeight: '350px',
//                         // background: 'linear-gradient(135deg, rgba(23, 34, 77, 0.8), rgba(43, 88, 118, 0.8))',
//                         backdropFilter: 'blur(10px)',
//                         border: '1px solid rgba(255, 255, 255, 0.1)',
//                         boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
//                     }}
//                 >
//                     <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left lg:mr-8 p-10">
//                         <h2 className="text-3xl font-bold text-white mb-4 relative">
//                             Sign up for email updates
//                             <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-blue-400 to-purple-500"></span>
//                         </h2>
//                         <p className="text-blue-200 mb-6">Keep up to date with the DCN</p>

//                         <div className="relative w-full max-w-md">
//                             <input
//                                 type="email"
//                                 placeholder="Enter your email"
//                                 className="w-full px-4 py-3 rounded-lg bg-gray-800 bg-opacity-50 text-white placeholder-gray-400 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300"
//                                 style={{ backdropFilter: 'blur(5px)' }}
//                             />
//                             <button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 transform hover:scale-105 hover:shadow-lg">
//                                 Sign Up
//                             </button>
//                         </div>
//                     </div>

//                     <div className="w-full lg:w-1/2 flex justify-center lg:mt-0 relative overflow-hidden rounded-xl">
//                         <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 opacity-75"></div>
//                         <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,34,77,0.8)] to-transparent"></div>
//                     </div>

//                     {/* 3D Floating Elements */}
//                     <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
//                     <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
//                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
//                 </div>
//             </div>

//             {/* Footer */}
//             <Footer />

//             {/* Keyframe Animations */}
//             <style jsx>{`
//                 @keyframes blob {
//                     0% {
//                         transform: translate(0px, 0px) scale(1);
//                     }
//                     33% {
//                         transform: translate(30px, -50px) scale(1.1);
//                     }
//                     66% {
//                         transform: translate(-20px, 20px) scale(0.9);
//                     }
//                     100% {
//                         transform: translate(0px, 0px) scale(1);
//                     }
//                 }
//                 .animate-blob {
//                     animation: blob 7s infinite;
//                 }
//                 .animation-delay-2000 {
//                     animation-delay: 2s;
//                 }
//                 .animation-delay-4000 {
//                     animation-delay: 4s;
//                 }
//             `}</style>
//         </main>
//     );
// }