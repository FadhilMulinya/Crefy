"use client";
// pages/index.js
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useAppKitAccount } from "@reown/appkit/react";

export default function Home() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50">
            <Head>
                <title>Crefy - Decentralized Identity & Credentials</title>
                <meta name="description" content="Secure decentralized identity system for students and institutions" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Header/Navigation */}
            <header className="sticky top-0 z-50 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="h-10 w-10 bg-blue-600 text-white flex items-center justify-center rounded-lg font-bold text-xl">CC</span>
                            </div>
                            <div className="ml-3 text-blue-600 font-bold text-xl">Crefy</div>
                        </div>

                        {/* Desktop navigation */}
                        <nav className="hidden md:flex space-x-8">
                            <Link href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition">Features</Link>
                            <Link href="#students" className="text-gray-700 hover:text-blue-600 font-medium transition">For Students</Link>
                            <Link href="#institutions" className="text-gray-700 hover:text-blue-600 font-medium transition">For Institutions</Link>
                            <Link href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition">About</Link>
                            <Link href="/subdomain" className="text-gray-700 hover:text-blue-600 font-medium transition">Subdomain</Link>
                        </nav>

                        {/* CTA Buttons */}
                        <div className="hidden md:flex items-center space-x-4">
                            <appkit-button label='Log in/ Connect wallet' />
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                type="button"
                                className="text-gray-600 hover:text-blue-600"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200 px-2 pt-2 pb-3 space-y-1">
                        <Link href="#features" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Features</Link>
                        <Link href="#students" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">For Students</Link>
                        <Link href="#institutions" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">For Institutions</Link>
                        <Link href="#about" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">About</Link>
                        <div className="pt-4 flex flex-col space-y-3">
                            {/* <Link href="/login" className="px-3 py-2 text-blue-600 font-medium">Log in</Link> */}
                            <w3m-button label='Log in/ Connect wallet' />
                        </div>
                    </div>
                )}
            </header>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
                {/* Abstract background elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-400 mix-blend-overlay blur-xl"></div>
                    <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-indigo-500 mix-blend-overlay blur-xl"></div>
                    <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-purple-300 mix-blend-overlay blur-lg"></div>
                </div>

                {/* Floating nodes to represent decentralized network */}
                <div className="absolute inset-0 opacity-20">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="absolute w-3 h-3 rounded-full bg-white"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animation: `pulse ${2 + Math.random() * 3}s infinite`
                            }}>
                        </div>
                    ))}
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-700 bg-opacity-30 text-blue-200 text-sm font-medium mb-4">
                                <span className="w-2 h-2 rounded-full bg-blue-300 mr-2"></span>
                                Blockchain-powered Identity Solution
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                Secure <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Digital Identity</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">Verifiable Credentials</span>
                            </h1>
                            <p className="mt-6 text-xl text-blue-100 opacity-90">
                                Empower students and institutions with tamper-proof digital identities and blockchain-verified certificates in a decentralized ecosystem.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link href="/students" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium text-center shadow-lg shadow-blue-500/20 transition-all duration-200">
                                    <span className="flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                        Student Registration
                                    </span>
                                </Link>
                                <Link href="/institutions" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-lg font-medium text-center shadow-lg shadow-orange-500/20 transition-all duration-200">
                                    <span className="flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2h-.5a.5.5 0 01-.5-.5v-2a.5.5 0 01.5-.5H6V8h8v1.5h.5a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H15z" clipRule="evenodd" />
                                        </svg>
                                        Institution Registration
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            {/* 3D certificate visualization */}
                            <div className="relative h-80 md:h-96 perspective-1000">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-indigo-900 rounded-2xl shadow-2xl transform rotate-3 translate-y-2 translate-x-1"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-indigo-800 rounded-2xl shadow-xl transform rotate-1 translate-y-1"></div>
                                <div className="absolute inset-0 bg-white rounded-2xl shadow-lg overflow-hidden backdrop-blur-sm border border-blue-100">
                                    {/* Certificate header */}
                                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-lg font-bold text-white">Digital Credential</h3>
                                            </div>
                                            <div className="text-sm text-blue-100">ID: 0x8F3d...a94B</div>
                                        </div>
                                    </div>

                                    {/* Certificate content */}
                                    <div className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="text-sm text-gray-500">CREDENTIAL TYPE</div>
                                                <h2 className="text-xl font-bold text-gray-900">Bachelor of Computer Science</h2>
                                                <div className="mt-4 text-sm text-gray-500">ISSUED TO</div>
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                                                        <span className="text-blue-600 font-medium">JD</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">Jane Doe</p>
                                                        <p className="text-xs text-gray-500">0x7Fb3...c8D2</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-100 p-3 rounded-lg">
                                                <svg viewBox="0 0 64 64" width="64" height="64">
                                                    <rect width="64" height="64" fill="#FFFFFF" />
                                                    <path d="M10,10 L54,10 L54,54 L10,54 Z" fill="#000000" />
                                                    {/* Simple fake QR code pattern */}
                                                    <rect x="18" y="18" width="8" height="8" fill="#FFFFFF" />
                                                    <rect x="38" y="18" width="8" height="8" fill="#FFFFFF" />
                                                    <rect x="18" y="38" width="8" height="8" fill="#FFFFFF" />
                                                    <rect x="30" y="22" width="4" height="20" fill="#FFFFFF" />
                                                    <rect x="22" y="30" width="20" height="4" fill="#FFFFFF" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <div className="text-sm text-gray-500">ISSUING INSTITUTION</div>
                                            <div className="flex items-center mt-1">
                                                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-2">
                                                    <span className="text-orange-600 text-xs font-medium">U</span>
                                                </div>
                                                <p className="font-medium text-gray-900">University of Technology</p>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-gray-100">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center text-emerald-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                        <span className="font-medium">Blockchain Verified</span>
                                                    </div>
                                                    <div className="text-xs text-gray-500">Issued: March 10, 2025</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Connection lines for decentralized visualization */}
                            <svg className="absolute -bottom-4 -left-4 w-16 h-16 text-blue-400 opacity-40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10,50 L90,10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                                <path d="M10,50 L90,90" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                                <circle cx="10" cy="50" r="5" fill="currentColor" />
                            </svg>
                            <svg className="absolute -top-4 -right-4 w-16 h-16 text-orange-400 opacity-40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <path d="M90,50 L10,10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                                <path d="M90,50 L10,90" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                                <circle cx="90" cy="50" r="5" fill="currentColor" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Wave divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#FFFFFF">
                        <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
                    </svg>
                </div>

                {/* Add keyframes for node pulsing effect */}
                <style jsx>{`
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); opacity: 0.7; }
                        50% { transform: scale(1.5); opacity: 1; }
                    }
                `}</style>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gradient-to-b from-white to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-5">
                            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                            Platform Capabilities
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Powerful Blockchain Features</h2>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                            Our decentralized platform leverages blockchain technology to revolutionize how digital identities and credentials are managed and verified
                        </p>
                    </div>

                    <div className="mt-16 grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-blue-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full -mr-20 -mt-20 transition-transform duration-500 group-hover:scale-150"></div>

                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                    </svg>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900">Self-Sovereign Identity</h3>

                                <div className="mt-2 h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"></div>

                                <p className="mt-4 text-gray-600 leading-relaxed">
                                    Take complete control of your digital identity with blockchain-secured credentials that you own and manage, eliminating dependence on centralized authorities.
                                </p>

                                <ul className="mt-5 space-y-2">
                                    <li className="flex items-start">
                                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm text-gray-600">Full data ownership & privacy</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm text-gray-600">Cryptographic security</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm text-gray-600">Selective disclosure control</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-orange-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-50 rounded-full -mr-20 -mt-20 transition-transform duration-500 group-hover:scale-150"></div>

                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-orange-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900">Tokenized Credentials</h3>

                                <div className="mt-2 h-1 w-20 bg-gradient-to-r from-orange-500 to-amber-300 rounded-full"></div>

                                <p className="mt-4 text-gray-600 leading-relaxed">
                                    Receive tamper-proof academic achievements and professional certifications as blockchain tokens that can be shared and verified anywhere.
                                </p>

                                <ul className="mt-5 space-y-2">
                                    <li className="flex items-start">
                                        <svg className="h-5 w-5 text-orange-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm text-gray-600">Immutable certificate records</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="h-5 w-5 text-orange-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm text-gray-600">Digital wallet integration</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="h-5 w-5 text-orange-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm text-gray-600">Portable across platforms</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-indigo-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-full -mr-20 -mt-20 transition-transform duration-500 group-hover:scale-150"></div>

                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900">Trustless Verification</h3>

                                <div className="mt-2 h-1 w-20 bg-gradient-to-r from-indigo-500 to-indigo-300 rounded-full"></div>

                                <p className="mt-4 text-gray-600 leading-relaxed">
                                    Enable instant verification of your credentials by employers and institutions without intermediaries, reducing fraud and administrative overhead.
                                </p>

                                <ul className="mt-5 space-y-2">
                                    <li className="flex items-start">
                                        <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm text-gray-600">One-click verification</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm text-gray-600">Eliminate credential fraud</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm text-gray-600">Permanent availability</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Added hexagon pattern for visual interest */}
                    <div className="absolute left-0 bottom-0 opacity-10">
                        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M52.5 0L105 30V90L52.5 120L0 90V30L52.5 0Z" fill="#4F46E5" fillOpacity="0.2" />
                            <path d="M157.5 0L210 30V90L157.5 120L105 90V30L157.5 0Z" fill="#4F46E5" fillOpacity="0.2" />
                            <path d="M105 80L157.5 110V170L105 200L52.5 170V110L105 80Z" fill="#4F46E5" fillOpacity="0.2" />
                        </svg>
                    </div>

                    {/* Additional information banner */}
                    <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 shadow-xl relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <svg width="100%" height="100%" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#smallGrid)" />
                            </svg>
                        </div>

                        <div className="relative z-10 md:flex items-center justify-between">
                            <div className="md:max-w-lg">
                                <h3 className="text-2xl font-bold text-white">Ready to secure your digital future?</h3>
                                <p className="mt-2 text-blue-100">
                                    Join thousands of students and institutions already benefiting from blockchain-verified credentials
                                </p>
                            </div>

                            <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-4">
                                <a href="#learn-more" className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-md hover:bg-blue-50 transition-colors duration-200 text-center">
                                    Learn More
                                </a>
                                <a href="/register" className="px-6 py-3 bg-blue-500 bg-opacity-20 text-white font-medium rounded-lg border border-white border-opacity-20 hover:bg-opacity-30 transition-colors duration-200 text-center">
                                    Get Started
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Students Section */}
            <section id="students" className="py-24 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="transform transition-all duration-700 hover:translate-y-[-8px]">
                            <h2 className="text-4xl font-bold text-gray-900 relative">
                                For Students
                                <span className="absolute -bottom-2 left-0 w-20 h-1 bg-blue-600 rounded-full"></span>
                            </h2>
                            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                                Take control of your digital identity and academic achievements with our comprehensive student dashboard.
                            </p>
                            <ul className="mt-8 space-y-5">
                                <li className="flex items-start group">
                                    <div className="p-1 bg-blue-100 rounded-full mr-3 group-hover:bg-blue-200 transition-all duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 group-hover:text-blue-800 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300">Create your secure KYC verified digital identity</span>
                                </li>
                                <li className="flex items-start group">
                                    <div className="p-1 bg-blue-100 rounded-full mr-3 group-hover:bg-blue-200 transition-all duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 group-hover:text-blue-800 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300">Collect and view your NFT certificates in one place</span>
                                </li>
                                <li className="flex items-start group">
                                    <div className="p-1 bg-blue-100 rounded-full mr-3 group-hover:bg-blue-200 transition-all duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 group-hover:text-blue-800 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300">Share verified credentials with employers and institutions</span>
                                </li>
                                <li className="flex items-start group">
                                    <div className="p-1 bg-blue-100 rounded-full mr-3 group-hover:bg-blue-200 transition-all duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 group-hover:text-blue-800 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300">Own your data with blockchain security</span>
                                </li>
                            </ul>
                            <div className="mt-10">
                                <Link
                                    href="/students"
                                    className="group inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
                                >
                                    Explore Student Dashboard
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div className="relative rounded-xl overflow-hidden shadow-xl transform transition-all duration-500 hover:shadow-2xl">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200 rounded-full opacity-50 animate-pulse"></div>
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-200 rounded-full opacity-50 animate-pulse" style={{ animationDelay: "1s" }}></div>
                            <div className="relative bg-white p-6 z-10">
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-bold text-xl text-gray-900">Student Dashboard</h3>
                                        <div className="bg-green-100 text-green-800 text-xs px-3 py-1.5 rounded-full font-medium flex items-center">
                                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                                            Verified
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">BS</div>
                                                <div>
                                                    <h4 className="font-medium text-lg">Bachelor of Science</h4>
                                                    <p className="text-gray-500">University of Technology</p>
                                                    <div className="mt-1 flex items-center">
                                                        <span className="text-xs text-gray-400">Issued: June 2024</span>
                                                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mx-2"></span>
                                                        <span className="text-xs text-blue-600 font-medium">Blockchain Verified</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">DC</div>
                                                <div>
                                                    <h4 className="font-medium text-lg">Data Science Certificate</h4>
                                                    <p className="text-gray-500">Tech Academy</p>
                                                    <div className="mt-1 flex items-center">
                                                        <span className="text-xs text-gray-400">Issued: Sept 2024</span>
                                                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mx-2"></span>
                                                        <span className="text-xs text-blue-600 font-medium">Blockchain Verified</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-blue-100 p-3 rounded-lg border border-blue-200 flex justify-center items-center transform transition-all duration-300 hover:bg-blue-200 cursor-pointer group">
                                            <span className="text-blue-700 font-medium group-hover:text-blue-800">View All Credentials</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 text-blue-600 group-hover:text-blue-800" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Institutions Section */}
            <section id="institutions" className="py-24 bg-gradient-to-bl from-white to-orange-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1 relative rounded-xl overflow-hidden shadow-xl transform transition-all duration-500 hover:shadow-2xl">
                            <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-200 rounded-full opacity-50 animate-pulse"></div>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-200 rounded-full opacity-50 animate-pulse" style={{ animationDelay: "1s" }}></div>
                            <div className="relative bg-white p-6 z-10">
                                <div className="bg-orange-50 p-6 rounded-lg">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-bold text-xl text-gray-900">Institution Dashboard</h3>
                                        <div className="bg-blue-100 text-blue-800 text-xs px-3 py-1.5 rounded-full font-medium flex items-center">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-1.5 animate-pulse"></span>
                                            Verified Issuer
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                                            <h4 className="font-medium text-lg mb-3">Certificate Creation</h4>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="p-3 bg-gray-50 rounded-lg text-sm text-center transition-all duration-300 hover:bg-orange-100 hover:text-orange-800 hover:shadow-sm cursor-pointer flex flex-col items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 8l-7 7-3-3m8 0l-7 7-3-3" />
                                                    </svg>
                                                    Degree Template
                                                </div>
                                                <div className="p-3 bg-gray-50 rounded-lg text-sm text-center transition-all duration-300 hover:bg-orange-100 hover:text-orange-800 hover:shadow-sm cursor-pointer flex flex-col items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Course Certificate
                                                </div>
                                                <div className="p-3 bg-gray-50 rounded-lg text-sm text-center transition-all duration-300 hover:bg-orange-100 hover:text-orange-800 hover:shadow-sm cursor-pointer flex flex-col items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                                    </svg>
                                                    Achievement
                                                </div>
                                                <div className="p-3 bg-gray-50 rounded-lg text-sm text-center transition-all duration-300 hover:bg-orange-100 hover:text-orange-800 hover:shadow-sm cursor-pointer flex flex-col items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    Custom NFT
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                                            <h4 className="font-medium text-lg mb-3">Recent Activity</h4>
                                            <div className="text-sm space-y-3">
                                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </div>
                                                        <span className="font-medium">BSc Computer Science</span>
                                                    </div>
                                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium flex items-center">
                                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                                                        Minted
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-3">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                            </svg>
                                                        </div>
                                                        <span className="font-medium">MSc Data Science</span>
                                                    </div>
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">Draft</span>
                                                </div>
                                                <div className="bg-orange-100 p-3 rounded-lg border border-orange-200 flex justify-center items-center transform transition-all duration-300 hover:bg-orange-200 cursor-pointer group">
                                                    <span className="text-orange-700 font-medium group-hover:text-orange-800">View All Activity</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 text-orange-600 group-hover:text-orange-800" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 transform transition-all duration-700 hover:translate-y-[-8px]">
                            <div className="relative">
                                <h2 className="text-4xl font-bold text-gray-900 animate-fadeIn opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                                    For Institutions
                                    <span className="absolute -bottom-2 left-0 w-20 h-1 bg-orange-500 rounded-full"></span>
                                </h2>
                            </div>
                            <p className="mt-6 text-lg text-gray-700 leading-relaxed animate-fadeIn opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                                Issue tamper-proof digital certificates as NFTs and streamline credential verification with our blockchain technology.
                            </p>
                            <ul className="mt-8 space-y-5">
                                {[
                                    "Create and mint certificate NFTs for your students with custom branding",
                                    "Batch issue certificates to multiple recipients in one transaction",
                                    "Maintain a verified issuer profile on the blockchain with institutional reputation",
                                    "Eliminate credential fraud with tamper-proof blockchain verification"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start transform transition duration-500 opacity-0 translate-x-4 animate-slideIn group" style={{ animationDelay: `${0.6 + index * 0.2}s`, animationFillMode: 'forwards' }}>
                                        <div className="p-1 bg-orange-100 rounded-full mr-3 group-hover:bg-orange-200 transition-all duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500 group-hover:text-orange-700 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-10 animate-fadeIn opacity-0" style={{ animationDelay: '1.4s', animationFillMode: 'forwards' }}>
                                <Link
                                    href="/institutions"
                                    className="group inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300 hover:shadow-lg"
                                >
                                    Explore Institution Dashboard
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works - Professional Animated Version */}
            <section className="py-24 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                            How It Works
                        </h2>
                        <div className="mt-6">
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                Our platform makes managing digital identities and credentials simple, secure, and seamless
                            </p>
                        </div>
                    </div>

                    <div className="mt-20 grid md:grid-cols-4 gap-x-8 gap-y-16">
                        {/* Step 1 */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg shadow-lg flex flex-col items-center transform transition duration-500 hover:scale-105">
                                <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                    <span className="text-white font-bold text-2xl">1</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Create Identity</h3>
                                <p className="text-gray-600 text-center">
                                    Students establish a KYC-verified digital identity securely stored on the blockchain
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg shadow-lg flex flex-col items-center transform transition duration-500 hover:scale-105">
                                <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                    <span className="text-white font-bold text-2xl">2</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Issue Certificates</h3>
                                <p className="text-gray-600 text-center">
                                    Institutions create and mint tamper-proof certificate NFTs for their students
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg shadow-lg flex flex-col items-center transform transition duration-500 hover:scale-105">
                                <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                    <span className="text-white font-bold text-2xl">3</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Manage Portfolio</h3>
                                <p className="text-gray-600 text-center">
                                    Students collect and organize their credentials in one secure, accessible dashboard
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg shadow-lg flex flex-col items-center transform transition duration-500 hover:scale-105">
                                <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                    <span className="text-white font-bold text-2xl">4</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Verify Instantly</h3>
                                <p className="text-gray-600 text-center">
                                    Third parties can verify credentials instantly with cryptographic proof and zero friction
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Connecting Line - Optional Desktop Only Feature */}
                    <div className="hidden md:block relative mt-10">
                        <div className="absolute top-0 left-0 w-full" style={{ top: "-215px" }}>
                            <div className="h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent w-3/4 mx-auto mt-16 opacity-50"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
                    <div className="absolute -top-10 -left-10 w-64 h-64 bg-white rounded-full"></div>
                    <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-white rounded-full"></div>
                    <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-white rounded-full"></div>
                    <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white rounded-full"></div>
                </div>

                {/* Content container */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="flex flex-col items-center transform transition-all duration-700 hover:translate-y-[-8px]">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                            Ready to Secure Your Digital Future?
                        </h2>
                        <div className="w-24 h-1 bg-orange-400 rounded-full my-6"></div>
                        <p className="mt-4 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-blue-100">
                            Join our blockchain-powered platform and revolutionize how you manage your digital identity and credentials.
                        </p>

                        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6 w-full max-w-2xl">
                            <Link
                                href="/students/register"
                                className="group relative bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-lg font-medium text-lg shadow-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center overflow-hidden"
                            >
                                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-50 rounded-full group-hover:w-80 group-hover:h-80 opacity-10"></span>
                                <div className="flex items-center relative z-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Register as Student
                                </div>
                            </Link>

                            <Link
                                href="/institutions/register"
                                className="group relative bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium text-lg shadow-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center overflow-hidden"
                            >
                                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-80 group-hover:h-80 opacity-10"></span>
                                <div className="flex items-center relative z-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-orange-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    Register as Institution
                                </div>
                            </Link>
                        </div>

                        <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl">
                            <div className="flex items-center">
                                <div className="bg-blue-800 bg-opacity-50 p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <span className="ml-3 text-blue-100">Secure Blockchain Technology</span>
                            </div>

                            <div className="flex items-center">
                                <div className="bg-blue-800 bg-opacity-50 p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <span className="ml-3 text-blue-100">KYC Verified Identity</span>
                            </div>

                            <div className="flex items-center">
                                <div className="bg-blue-800 bg-opacity-50 p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <span className="ml-3 text-blue-100">Instant Verification</span>
                            </div>
                        </div>

                        <div className="mt-10 text-blue-200 text-sm max-w-lg">
                            Already registered? <Link href="/login" className="text-white underline hover:text-orange-300 transition-colors duration-300">Sign in to your account</Link>
                        </div>
                    </div>
                </div>

                {/* Bottom wave effect */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform" style={{ zIndex: 1 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12" fill="#fff">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
                    </svg>
                </div>
            </section>

            {/* Waitlist Section */}
            {/* Enhanced Waitlist Section with better visual integration */}
            <section className="py-24 bg-gradient-to-br from-white via-blue-50 to-indigo-100 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply opacity-20 -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply opacity-20 translate-y-1/3 -translate-x-1/3 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply opacity-20 transform -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-indigo-600 bg-indigo-100 mb-4">
                            Limited Access
                        </span>
                        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                            Join Our Waitlist
                        </h2>
                        <p className="mt-4 text-xl text-gray-600 leading-relaxed">
                            Be among the first to experience our blockchain-powered digital identity and credential platform. Early access members receive premium features at no cost.
                        </p>
                    </div>

                    <div className="relative max-w-2xl mx-auto">
                        {/* Card with glow effect */}
                        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl group">
                            {/* Gradient border effect */}
                            <div className="absolute inset-0 rounded-2xl p-0.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative bg-white rounded-2xl p-8 md:p-10">
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                                        <div>
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                First name
                                            </label>
                                            <div className="mt-1 relative">
                                                <input
                                                    type="text"
                                                    name="first-name"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent border border-gray-300 rounded-lg"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                Last name
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="last-name"
                                                    id="last-name"
                                                    autoComplete="family-name"
                                                    className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent border border-gray-300 rounded-lg"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email address
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent border border-gray-300 rounded-lg"
                                                    placeholder="you@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="user-type" className="block text-sm font-medium text-gray-700">
                                                I am a
                                            </label>
                                            <div className="mt-1">
                                                <select
                                                    id="user-type"
                                                    name="user-type"
                                                    className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent border border-gray-300 rounded-lg"
                                                >
                                                    <option value="">Please select</option>
                                                    <option value="student">Student</option>
                                                    <option value="institution">Institution</option>
                                                    <option value="verifier">Credential Verifier</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            className="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
                                        >
                                            <span className="text-base font-medium">Join Waitlist</span>
                                        </button>
                                    </div>
                                </form>

                                <div className="mt-8 text-center">
                                    <div className="flex items-center justify-center space-x-2 mb-2">
                                        <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-sm text-gray-600">We'll notify you as soon as we're ready to launch</p>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-sm text-gray-600">Limited spots available for early access members</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social proof with animated hover */}
                    <div className="mt-20 text-center py-20">
                        <div className="inline-flex items-center justify-center">
                            <div className="h-px w-12 bg-gray-300"></div>
                            <p className="mx-4 text-base font-medium text-gray-600">Trusted by forward-thinking organizations in Kenya</p>
                            <div className="h-px w-12 bg-gray-300"></div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16 mt-8">
                            {[
                                 { name: "University of Nairobi", alt: "University of Nairobi logo", url: "https://educhain.io/wp-content/uploads/2021/05/logo_new-1.png" },
                                { name: "Safaricom", alt: "Safaricom logo", url: "https://www.shofco.org/wp-content/uploads/2020/06/safaricom-foundation.png" },
                                { name: "Zetech University", alt: "Kenya Commercial Bank logo", url: "https://journals.zetech.ac.ke/public/journals/2/pageHeaderLogoImage_en_US.png" },
                                { name: "Strathmore University", alt: "Strathmore University logo", url: "https://giftshop.strathmore.edu/assets/img/logo/SU-Logo.png" },
                                // { name: "Equity Bank", alt: "Equity Bank logo", url: "https://cdn3d.iconscout.com/3d/premium/thumb/arbitrum-arb-coin-3d-icon-download-in-png-blend-fbx-gltf-file-formats--btc-cryptocurrency-pack-science-technology-icons-7138698.png?f=webp" },
                            ].map((org, index) => (
                                <div key={index} className="group h-12 flex items-center transition-all duration-300 hover:scale-110">
                                    <div className="rounded-lg p-2 flex items-center">
                                        <img src={org.url}
                                        alt={org.alt} className="h-12 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center">
                                <div className="h-10 w-10 bg-blue-600 text-white flex items-center justify-center rounded-lg font-bold text-xl">
                                    CC
                                </div>
                                <div className="ml-3 text-white font-bold text-xl">Crefy</div>
                            </div>
                            <p className="mt-4 text-sm">
                                Secure, decentralized identity and credential management for students and institutions.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">Product</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="#features" className="hover:text-white">Features</Link></li>
                                <li><Link href="#students" className="hover:text-white">For Students</Link></li>
                                <li><Link href="#institutions" className="hover:text-white">For Institutions</Link></li>
                                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                                <li><Link href="/api-docs" className="hover:text-white">API Documentation</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">Legal</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                                <li><Link href="/cookies" className="hover:text-white">Cookie Policy</Link></li>
                                <li><Link href="/compliance" className="hover:text-white">Compliance</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm">© 2025 Crefy. All rights reserved.</p>
                        <div className="mt-4 md:mt-0 flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-white">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <span className="sr-only">GitHub</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
