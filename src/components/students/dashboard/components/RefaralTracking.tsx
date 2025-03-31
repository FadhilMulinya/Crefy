'use client';
import { useState, useEffect } from "react";
import { useRef } from "react";

export default function ReferralTracking() {
    const [progress, setProgress] = useState(0);
    const targetProgress = 66.67;
    const progressCircleRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [stats, setStats] = useState([
        { label: "Invited", value: 3, trend: "up", percentage: "+15%" },
        { label: "DCN Bonus", value: 30, trend: "up", percentage: "+8%" }
    ]);

    useEffect(() => {
        setIsVisible(true);
        
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                const nextProgress = prevProgress + 1;
                if (nextProgress >= targetProgress) {
                    clearInterval(timer);
                    return targetProgress;
                }
                return nextProgress;
            });
        }, 20);

        return () => clearInterval(timer);
    }, []);

    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="bg-gradient-to-br from-[#12132D] to-[#1E1F43] p-6 rounded-xl shadow-lg w-2/4 transition-all">
            <div className="flex justify-between items-center mb-5">
                <div>
                    <h3 className="text-lg font-bold text-white">Referral Tracking</h3>
                    <p className="text-gray-400 text-sm mt-1">Track your referral progress</p>
                </div>
                <button className="bg-blue-500 bg-opacity-20 p-2 rounded-lg transition-colors hover:bg-opacity-30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                    </svg>
                </button>
            </div>

            <div className="flex gap-6 justify-between">
                {/* Left Column - Stats */}
                <div className="flex flex-col gap-4 w-1/2">
                    {stats.map((stat, index) => (
                        <div 
                            key={index} 
                            className={`rounded-xl p-4 bg-opacity-10 bg-white border border-opacity-10 border-white transition-all ${
                                isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                            }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="text-sm font-medium text-gray-400">{stat.label}</h3>
                                <div className={`flex items-center text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                    {stat.trend === 'up' ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="18 15 12 9 6 15"/>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="6 9 12 15 18 9"/>
                                        </svg>
                                    )}
                                    <span className="ml-1">{stat.percentage}</span>
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-white">{stat.value.toString().padStart(2, '0')}</h2>
                        </div>
                    ))}
                    
                </div>

                {/* Right Column - Progress Circle */}
                <div className="w-1/2 flex items-center justify-center relative">
                    <div className="relative w-32 h-32">
                        {/* Background Circle */}
                        <svg className="w-full h-full" viewBox="0 0 150 150">
                            <circle 
                                cx="75" 
                                cy="75" 
                                r={radius}
                                stroke="#1E293B" 
                                strokeWidth="10"
                                fill="none"
                            />
                            
                            {/* Progress Circle with Animation */}
                            <circle 
                                ref={progressCircleRef}
                                cx="75" 
                                cy="75" 
                                r={radius}
                                stroke="url(#gradient)" 
                                strokeWidth="10"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                                transform="rotate(-90 75 75)"
                            />
                            
                            {/* Gradient Definition */}
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3B82F6" />
                                    <stop offset="100%" stopColor="#1D4ED8" />
                                </linearGradient>
                            </defs>
                        </svg>
                        
                        {/* Centered Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-white font-bold text-xl">03</span>
                            <span className="text-gray-400 text-xs">Total invites</span>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    );
}