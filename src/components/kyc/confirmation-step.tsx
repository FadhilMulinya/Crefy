"use client"
import type { PersonalInfo } from "@/types/kyc-types"

interface ConfirmationStepProps {
    personalInfo: PersonalInfo
    selfieImage: string | null
    onBack: () => void
    onSubmit: () => void
}

const ConfirmationStep = ({ personalInfo, selfieImage, onBack, onSubmit }: ConfirmationStepProps) => {
    return (
        <div className="max-w-2xl mx-auto my-8 p-6 bg-[#0A0B1E] rounded-xl border border-gray-800 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6">Confirm Your Information</h2>
            <div className="space-y-4 mb-6">
                <p className="text-gray-300">Please review the information you've provided:</p>
                <div className="bg-[#12132D] p-4 rounded-lg">
                    <p className="text-white">Name: {`${personalInfo.firstName} ${personalInfo.lastName}`}</p>
                    <p className="text-white">Date of Birth: {personalInfo.dateOfBirth}</p>
                    <p className="text-white">Nationality: {personalInfo.nationality}</p>
                    <p className="text-white">
                        Address: {personalInfo.address}, {personalInfo.city}, {personalInfo.state}, {personalInfo.postalCode},{" "}
                        {personalInfo.country}
                    </p>
                </div>
                <div className="relative">
                    <img
                        src={selfieImage || ""}
                        alt="Selfie"
                        className="w-full max-w-sm mx-auto rounded-lg border border-gray-700"
                    />
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
                    onClick={onSubmit}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#00E1FF] to-[#0095FF] text-white rounded-lg font-medium shadow-lg transition-all transform hover:translate-y-[-2px] hover:shadow-blue-500/30"
                >
                    Submit for Verification
                </button>
            </div>
        </div>
    )
}

export default ConfirmationStep

