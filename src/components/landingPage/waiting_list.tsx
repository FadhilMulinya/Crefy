import { CollectionsBookmarkRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function WaitingList() {
    const calculateTimeLeft = (): TimeLeft => {
        const targetDate = new Date("2024-02-21T00:00:00"); // Local time
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Ensure no unexpected default values
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer); // Cleanup interval on unmount
    }, []);

    return (
        <div className="mt-20 bg-blue-100 p-10 rounded-lg text-center w-3/5 mx-auto shadow-lg">
            <h2 className="text-4xl font-bold text-blue-600">Join the Waiting List</h2>
            <p className="text-lg text-gray-700 mt-2">Be among the first to experience the future of digital identity.</p>
            <div className="flex justify-center items-center space-x-5 text-2xl font-semibold text-blue-700 mt-5">
                <div>{timeLeft.days}d</div>
                <div>{timeLeft.hours}h</div>
                <div>{timeLeft.minutes}m</div>
                <div>{timeLeft.seconds}s</div>
            </div>
            <div className="mt-6 flex justify-center">
                <input type="email" placeholder="Enter your email" className="p-3 w-2/3 border border-blue-400 rounded-l-lg focus:outline-none" />
                <button className="bg-blue-500 text-white px-6 py-3 rounded-r-lg font-semibold hover:bg-blue-600 transition duration-300">Subscribe</button>
            </div>
        </div>
    );
}
