"use client";

import { useState } from "react";
import { Search, Award, Users, FileText, BarChart2, ChevronDown, Hexagon } from "lucide-react";
import Container from "./components/Container";
import CircularProgressTracker from "./components/CircularProgressTracker";

export default function Dashboard() {
    const [activeTimeFilter, setActiveTimeFilter] = useState("All");

    const leaderboardData = [
        { name: "University of Technology", certificates: 342, students: 1240 },
        { name: "Global Business School", certificates: 289, students: 890 },
        { name: "Medical Institute", certificates: 215, students: 620 },
    ];

    const collectionData = [
        { id: 1, name: "Academic Diplomas", count: 145, growth: "+12%" },
        { id: 2, name: "Professional Certifications", count: 98, growth: "+5%" },
        { id: 3, name: "Skill Credentials", count: 76, growth: "+8%" },
        { id: 4, name: "Course Completions", count: 210, growth: "+15%" },
    ];

    // NFT minting activity data (52 weeks of data for GitHub-like graph)
    const nftMintingActivity = generateMintingActivityData();

    // Function to generate random minting activity data for the GitHub-like graph
    function generateMintingActivityData() {
        const data = [];
        // Generate activity for last 52 weeks (1 year)
        for (let week = 0; week < 52; week++) {
            // 7 days per week
            const weekData = [];
            for (let day = 0; day < 7; day++) {
                // Random number of minted NFTs (0-10)
                const mintCount = Math.floor(Math.random() * 11);
                weekData.push(mintCount);
            }
            data.push(weekData);
        }
        return data;
    }

    // Function to determine color intensity based on count
    const getMintingActivityColor = (count: any) => {
        if (count === 0) return "bg-gray-800";
        if (count < 3) return "bg-indigo-900";
        if (count < 5) return "bg-indigo-700";
        if (count < 8) return "bg-indigo-500";
        return "bg-indigo-400";
    };

    return (
        <Container>
            <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Stats Overview */}
                    <div className="p-6 rounded-lg shadow-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-400">Total Certificates</p>
                                <h2 className="text-2xl font-bold text-white mt-1">529</h2>
                                <p className="text-sm text-gray-400 mt-1">
                                    <span className="text-green-400">+8.2%</span> from last month
                                </p>
                            </div>
                            <div className="p-3 bg-gray-700 rounded-lg">
                                <FileText className="text-indigo-400" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-lg shadow-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-400">Total Students</p>
                                <h2 className="text-2xl font-bold text-white mt-1">2,750</h2>
                                <p className="text-sm text-gray-400 mt-1">
                                    <span className="text-green-400">+12.4%</span> from last month
                                </p>
                            </div>
                            <div className="p-3 bg-gray-700 rounded-lg">
                                <Users className="text-blue-400" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-lg shadow-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-400">Verification Requests</p>
                                <h2 className="text-2xl font-bold text-white mt-1">87</h2>
                                <p className="text-sm text-gray-400 mt-1">
                                    <span className="text-amber-400">+3.5%</span> from last week
                                </p>
                            </div>
                            <div className="p-3 bg-gray-700 rounded-lg">
                                <Award className="text-green-400" size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* NFT Minting Activity Graph Card (GitHub style) */}
                        {/* NFT Minting Activity Graph Card (GitHub style) */}
                        <div className="p-6 rounded-lg shadow-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-medium text-white">NFT Minting Activity</h3>
                                    <p className="text-sm text-gray-400">Daily minting activity for the past year</p>
                                </div>
                                <div className="p-2 bg-gray-700 rounded-lg">
                                    <Hexagon className="text-indigo-400" size={20} />
                                </div>
                            </div>

                            <div className="overflow-x-auto pb-2">
                                <div className="min-w-max">
                                    <div className="flex text-xs text-gray-400 mb-1 justify-end space-x-10">
                                        <span>Less</span>
                                        <div className="flex items-center space-x-1">
                                            <div className="w-3 h-3 bg-gray-800 rounded-sm"></div>
                                            <div className="w-3 h-3 bg-indigo-900 rounded-sm"></div>
                                            <div className="w-3 h-3 bg-indigo-700 rounded-sm"></div>
                                            <div className="w-3 h-3 bg-indigo-500 rounded-sm"></div>
                                            <div className="w-3 h-3 bg-indigo-400 rounded-sm"></div>
                                        </div>
                                        <span>More</span>
                                    </div>

                                    {/* Month labels */}
                                    <div className="flex text-xs text-gray-500 mb-1">
                                        <div className="w-8"></div> {/* Spacer for alignment */}
                                        <div className="flex w-full">
                                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                                                <div key={i} className="flex-1 text-center overflow-hidden text-xs">
                                                    {month}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex">
                                        {/* Day labels */}
                                        <div className="flex flex-col mr-2 text-xs text-gray-500">
                                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                                                <div key={i} className="h-4 flex items-center mb-1">{day.charAt(0)}</div>
                                            ))}
                                        </div>

                                        {/* Activity cells */}
                                        <div className="flex space-x-1">
                                            {nftMintingActivity.map((week, weekIndex) => (
                                                <div key={weekIndex} className="flex flex-col space-y-1">
                                                    {week.map((dayCount, dayIndex) => (
                                                        <div
                                                            key={dayIndex}
                                                            className={`w-4 h-4 rounded-sm ${getMintingActivityColor(dayCount)}`}
                                                            title={`${dayCount} NFTs minted`}
                                                        ></div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-4 text-sm text-gray-400">
                                        <div className="flex justify-between">
                                            <div>Total NFTs minted: <span className="text-white">1,834</span></div>
                                            <div>Highest daily: <span className="text-white">24</span></div>
                                            <div>Average daily: <span className="text-white">5.8</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-lg shadow-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-medium text-white">Certificate Analytics</h3>
                                <div className="flex space-x-2">
                                    {["1D", "7D", "1M", "All"].map((filter) => (
                                        <button
                                            key={filter}
                                            className={`px-3 py-1 text-sm rounded ${activeTimeFilter === filter ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300"}`}
                                            onClick={() => setActiveTimeFilter(filter)}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="h-64 bg-gray-800 rounded flex items-center justify-center">
                                <BarChart2 size={48} className="text-gray-500" />
                                <span className="ml-2 text-gray-400">Certificate issuance over time</span>
                            </div>
                        </div>

                        <div className="p-6 rounded-lg shadow-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-medium text-white">Certificate Collections</h3>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search size={16} className="text-gray-500" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search collections..."
                                        className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full text-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-700">
                                    <thead className="bg-gray-800">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Collection Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Certificates</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Growth</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {collectionData.map((collection) => (
                                            <tr key={collection.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-300">{collection.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-300">{collection.count}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-green-400">{collection.growth}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <button className="text-indigo-400 hover:text-indigo-300">View</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="p-6 rounded-lg shadow-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                            <h3 className="text-lg font-medium text-white mb-4">Verification Status</h3>
                            <div className="flex justify-center">
                                <CircularProgressTracker percentage={30} stroke={10} radius={70} />
                            </div>
                            <div className="mt-4 text-center">
                                <p className="text-gray-400 text-sm">78% of your certificates have been verified by third parties</p>
                            </div>
                            <div className="mt-6">
                                <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    View Details
                                </button>
                            </div>
                        </div>

                        <div className="p-6 rounded-lg shadow-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                            <h3 className="text-lg font-medium text-white mb-4">Institutional Leaderboard</h3>
                            <div className="space-y-4">
                                {leaderboardData.map((institution, index) => (
                                    <div key={index} className="border-b border-gray-700 pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center text-indigo-400 font-bold">
                                                {index + 1}
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <h4 className="text-sm font-medium text-gray-300">{institution.name}</h4>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {institution.certificates} certificates • {institution.students} students
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <button className="text-indigo-400 text-sm font-medium flex items-center justify-center w-full">
                                    View Full Leaderboard
                                    <ChevronDown size={16} className="ml-1" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 rounded-lg shadow-lg" style={{ background: "#1E2327", border: "1px solid #2D3339" }}>
                            <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                                            <Hexagon size={16} className="text-indigo-400" />
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-gray-300">12 new NFTs minted</p>
                                        <p className="text-xs text-gray-500">1 hour ago</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                                            <FileText size={16} className="text-green-400" />
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-gray-300">New certificate batch issued</p>
                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                                            <Users size={16} className="text-blue-400" />
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-gray-300">15 new students onboarded</p>
                                        <p className="text-xs text-gray-500">Yesterday</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                                            <Award size={16} className="text-amber-400" />
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-gray-300">Verification request approved</p>
                                        <p className="text-xs text-gray-500">2 days ago</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button className="text-indigo-400 text-sm font-medium flex items-center justify-center w-full">
                                    View All Activity
                                    <ChevronDown size={16} className="ml-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Container>
    );
}