"use client";

import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

export default function Footer() {
    return (
        <footer className="bg-gray-50 text-white py-12 px-6 lg:px-20 pt-12" style={{height: '50vh'}}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* Company Info */}
                <div>
                    <h2 className="text-2xl font-bold text-red-500 mb-5">Crefy</h2>
                    <h4 className="text-lg text-gray-700 fadeInUp">
                        Crefy is a decentralized identity platform built on Web3, offering the ability to mint certificates as NFTs and providing seamless KYC integration for secure digital identity management.
                    </h4>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-2xl font-bold text-red-500 mb-5">Quick Links</h2>
                    <ul className="space-y-3 text-gray-700">
                        <li><a href="#" className="hover:text-red-500 text-lg">Home</a></li>
                        <li><a href="#" className="hover:text-red-500 text-lg">Transaction</a></li>
                        <li><a href="#" className="hover:text-red-500 text-lg">Roadmap</a></li>
                        <li><a href="#" className="hover:text-red-500 text-lg">Dashboard</a></li>
                        <li><a href="#" className="hover:text-red-500 text-lg">Contact</a></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h2 className="text-2xl font-bold text-red-500 mb-5">Resources</h2>
                    <ul className="space-y-3 text-gray-700">
                        <li><a href="#" className="hover:text-red-500 text-lg">Blog</a></li>
                        <li><a href="#" className="hover:text-red-500 text-lg">FAQs</a></li>
                        <li><a href="#" className="hover:text-red-500 text-lg">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-red-500 text-lg">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h2 className="text-2xl font-bold text-red-500 mb-5">Follow Us</h2>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-red-500 transition-all">
                            <Facebook style={{ fontSize: '30px' }} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-red-500 transition-all">
                            <Twitter style={{ fontSize: '30px' }} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-red-500 transition-all">
                            <LinkedIn style={{ fontSize: '30px' }} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-red-500 transition-all">
                            <Instagram style={{ fontSize: '30px' }} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <h2 className="text-center mt-10 text-gray-400 text-sm md:text-base">
                © {new Date().getFullYear()} CREFY. All rights reserved. Powered by Blockchain Technology.
            </h2>
        </footer>
    );
}
