// metrics.tsx

import React, { useState } from 'react';

export default function Metrics() {
    // List of metrics for Crefy
    const metrics = [
        {
            title: 'Total Users',
            value: '5,000+'
        },
        {
            title: 'Total Certificates Minted',
            value: '10,000+'
        },
        {
            title: 'Total KYC Verified',
            value: '500+'
        }
    ];

    return (
        <div className="bg-white text-center w-screen py-5 pb-20 mb-10">
            <div className="flex justify-center items-center">
                <h1 className='bg-red-50 px-5 mb-4 py-1 rounded-full text-red-400 font-bold text-sm'>METRICS</h1>
            </div>
            <h1 className='text-red-500 text-4xl'>Numbers speaking for themselves</h1>
            {/* Existing metrics section */}

            <div className="flex gap-10 mt-10 px-20 w-screen justify-center">
                {metrics.map((metric, index) => (
                    <Metric key={index} title={metric.title} value={metric.value} isLast={index === metrics.length - 1} />
                ))}
            </div>
        </div>
    );
}

// Metric component
const Metric = ({ title, value, isLast }: { title: string, value: string, isLast: boolean }) => {
    return (
        <div
            className={`w-2/3 mx-auto text-left min-h-12 p-5 mt-5 ${
                !isLast ? 'border-r-2 border-gray-300' : ''
            }`} // Add vertical line between metrics
        >
            <div className='flex flex-col justify-between items-center'>
                <h1 className='text-7xl text-red-500'>{value}</h1>
                <h2 className='text-xl font-bold text-gray-500'>{title}</h2>
            </div>
        </div>
    );
};
