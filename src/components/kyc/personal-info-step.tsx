import React from 'react';
import { PersonalInfo } from '@/types/kyc-types';

interface PersonalInfoStepProps {
    personalInfo: PersonalInfo;
    onPersonalInfoChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onBack: () => void;
    onContinue: () => void;
}

const PersonalInfoStep = ({ 
    personalInfo, 
    onPersonalInfoChange, 
    onBack, 
    onContinue 
}: PersonalInfoStepProps) => {
    return (
        <div className="max-w-2xl mx-auto my-8 p-6 bg-[#0A0B1E] rounded-xl border border-gray-800 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={personalInfo.firstName}
                        onChange={onPersonalInfoChange}
                        className="w-full p-3 border rounded-lg bg-[#12132D] text-white placeholder-gray-500 border-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                        placeholder="Enter first name"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={personalInfo.lastName}
                        onChange={onPersonalInfoChange}
                        className="w-full p-3 border rounded-lg bg-[#12132D] text-white placeholder-gray-500 border-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                        placeholder="Enter last name"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Date of Birth</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={personalInfo.dateOfBirth}
                        onChange={onPersonalInfoChange}
                        className="w-full p-3 border rounded-lg bg-[#12132D] text-white placeholder-gray-500 border-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Nationality</label>
                    <select
                        name="nationality"
                        value={personalInfo.nationality}
                        onChange={onPersonalInfoChange}
                        className="w-full p-3 border rounded-lg bg-[#12132D] text-white placeholder-gray-500 border-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                        required
                    >
                        <option value="">Select nationality</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>
            
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                <input
                    type="text"
                    name="address"
                    value={personalInfo.address}
                    onChange={onPersonalInfoChange}
                    className="w-full p-3 border rounded-lg bg-[#12132D] text-white placeholder-gray-500 border-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your street address"
                    required
                />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
                    <input
                        type="text"
                        name="city"
                        value={personalInfo.city}
                        onChange={onPersonalInfoChange}
                        className="w-full p-3 border rounded-lg bg-[#12132D] text-white placeholder-gray-500 border-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                        placeholder="Enter city"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">State/Province</label>
                    <input
                        type="text"
                        name="state"
                        value={personalInfo.state}
                        onChange={onPersonalInfoChange}
                        className="w-full p-3 border rounded-lg bg-[#12132D] text-white placeholder-gray-500 border-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                        placeholder="Enter state/province"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Postal Code</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={personalInfo.postalCode}
                        onChange={onPersonalInfoChange}
                        className="w-full p-3 border rounded-lg bg-[#12132D] text-white placeholder-gray-500 border-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                        placeholder="Enter postal code"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Country</label>
                    <select
                        name="country"
                        value={personalInfo.country}
                        onChange={onPersonalInfoChange}
                        className="w-full p-3 border rounded-lg bg-[#12132D] text-white placeholder-gray-500 border-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                        required
                    >
                        <option value="">Select country</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>
            
            <div className="flex justify-between mt-8">
                <button 
                    onClick={onBack}
                    className="px-6 py-2.5 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/20"
                >
                    Back
                </button>
                <button 
                    onClick={onContinue}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#00E1FF] to-[#0095FF] text-white rounded-lg font-medium shadow-lg transition-all transform hover:translate-y-[-2px] hover:shadow-blue-500/30"
                    disabled={!personalInfo.firstName || !personalInfo.lastName || !personalInfo.dateOfBirth || !personalInfo.nationality}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default PersonalInfoStep;
