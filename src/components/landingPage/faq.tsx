// faq.tsx

import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function Faq() {
    // List of questions and answers updated for Crefy
    const questions = [
        {
            question: 'What is Crefy Pro?',
            answer: 'All individual Crefy subscriptions have been grandfathered into a Pro plan at your existing rate. If you were on a Small Team plan, then all 5 seats have been converted over to Pro seats at your existing rate. Regardless of your subscription plan, all new paid editors that you add to your subscription will be billed at the new plan rates.'
        },
        {
            question: 'How do I upgrade my Crefy plan?',
            answer: 'To upgrade your Crefy plan, simply visit the Billing section of your Crefy account and select the new plan that you would like to upgrade to. If you have any questions or need assistance, please reach out to our support team at info@crefy.com.'
        },
        {
            question: 'How do I cancel my Crefy subscription?',
            answer: 'To cancel your Crefy subscription, simply visit the Billing section of your Crefy account and select the Cancel Subscription option. If you have any questions or need assistance, please reach out to our support team at info@crefy.com.'
        }
    ];

    return (
        <div className="bg-white text-center w-screen py-5 container mx-auto pb-20 mb-10">
            <div className="flex justify-center items-center">
                <h1 className='bg-red-50 px-5 py-1 rounded-full text-red-400 font-bold text-sm'>FAQ</h1>
            </div>
            <h1 className='text-red-500 text-7xl'>We've got you covered</h1>
            {/* Existing FAQ section */}
            <div className='w-2/3 mx-auto text-left bg-[#ECF1F7] p-10 rounded-lg mt-10'>
                <h2 className='text-xl mb-4 font-bold text-red-500'>What is Framer Pro?</h2>
                <p className='text-gray-700 text-lg'>
                    All individual Framer subscriptions have been grandfathered into a Pro plan at your existing rate. If you were on a Small Team plan, then all 5 seats have been converted over to Pro seats at your existing rate. Regardless of your subscription plan, all new paid editors that you add to your subscription will be billed at the new plan rates.
                </p>
            </div>

            {/* Render questions */}
            {questions.map((q, index) => (
                <Question key={index} question={q.question} answer={q.answer} />
            ))}
        </div>
    );
}

// Question component with dropdown
const Question = ({ question, answer }: { question: string, answer: string }) => {
    // State for managing the dropdown (show/hide)
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle the dropdown visibility
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='w-2/3 mx-auto text-left min-h-12 p-5 rounded-lg mt-5'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-bold text-blue-500'>{question}</h2>
                <button
                    onClick={toggleDropdown}
                    className='text-red-500 font-bold text-2xl'
                    aria-expanded={isOpen} // Corrected ARIA attribute for accessibility
                >
                    {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </button>
            </div>
            {isOpen && <p className='text-gray-700 text-lg mt-3'>{answer}</p>}
        </div>
    );
};
