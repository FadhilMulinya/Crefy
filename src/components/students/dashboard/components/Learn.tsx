"use client";
import { useState } from 'react';

// Sample data for DCN documentation
const docSections = [
    {
        title: "Introduction",
        description: "Learn the basics of the Decentralized Certificate Network (DCN).",
        icon: "📚"
    },
    {
        title: "How It Works",
        description: "Understand the secure and transparent mechanisms behind DCN.",
        icon: "⚙️"
    },
    {
        title: "Use Cases",
        description: "Discover applications of DCN across various industries.",
        icon: "🏢"
    },
    {
        title: "Getting Started",
        description: "Get started with DCN and issuing certificates.",
        icon: "🚀"
    },
    {
        title: "Security & Privacy",
        description: "Explore how DCN ensures security and privacy.",
        icon: "🔒"
    },
    {
        title: "FAQ",
        description: "Find answers to common questions about DCN.",
        icon: "❓"
    },
];

export default function Learn() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div
            className="bg-gradient-to-br from-[#12132D] to-[#1E1F43] p-6 rounded-xl overflow-y-auto shadow-lg"
            style={{
                minHeight: "80vh",
                maxHeight: "100%",
            }}
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Learn About DCN</h3>
                <div className="bg-blue-500 bg-opacity-20 p-1 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                </div>
            </div>

            <div className="space-y-4">
                {docSections.map((section, index) => (
                    <div
                        key={index}
                        className={`bg-opacity-10 rounded-lg p-4 transition-all cursor-pointer ${activeIndex === index ? 'bg-white border-l-4 border-blue-500' : 'bg-white hover:bg-opacity-20'
                            }`}
                        onClick={() => setActiveIndex(index === activeIndex ? null : index)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 bg-blue-500 bg-opacity-20 rounded-lg text-white">
                                    {section.icon}
                                </div>
                                <h4 className="text-white font-medium">{section.title}</h4>
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`text-gray-400 transition-transform ${activeIndex === index ? 'transform rotate-180' : ''}`}
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </div>

                        {activeIndex === index && (
                            <div className="mt-3 pl-11 text-gray-400 text-sm">
                                {section.description}
                                <div className="mt-3">
                                    <a className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1">
                                        Read more
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <button
                    className="w-full py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2"
                    style={{ background: "linear-gradient(90deg, #1D4ED8 0%, #1E40AF 100%)" }}
                >
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </button>
            </div>
        </div>
    );
}