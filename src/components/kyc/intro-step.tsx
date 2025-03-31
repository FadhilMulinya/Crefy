"use client"
import { ChevronRight, Shield } from "lucide-react"

interface IntroStepProps {
    onContinue: () => void
}

const IntroStep = ({ onContinue }: IntroStepProps) => {
    return (
        <div className="max-w-2xl mx-auto my-8 p-6 bg-[#0A0B1E] rounded-xl border border-gray-800 shadow-lg">
            <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                    <Shield className="text-blue-400" size={32} />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Verify Your Identity</h1>
                <p className="text-gray-400">Complete our secure KYC process to gain full platform access</p>
            </div>

            <div className="space-y-6 mb-8">
                <div className="flex items-start p-4 bg-[#12132D] rounded-lg border border-gray-800">
                    <div className="mr-4 mt-1">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-white font-medium">1</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium text-white mb-1">Personal Information</h3>
                        <p className="text-gray-400 text-sm">Provide your basic personal details</p>
                    </div>
                </div>

                <div className="flex items-start p-4 bg-[#12132D] rounded-lg border border-gray-800">
                    <div className="mr-4 mt-1">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-white font-medium">2</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium text-white mb-1">Identity Document</h3>
                        <p className="text-gray-400 text-sm">Upload a government-issued ID document</p>
                    </div>
                </div>

                <div className="flex items-start p-4 bg-[#12132D] rounded-lg border border-gray-800">
                    <div className="mr-4 mt-1">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-white font-medium">3</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium text-white mb-1">Selfie Verification</h3>
                        <p className="text-gray-400 text-sm">Take a photo of yourself for identity confirmation</p>
                    </div>
                </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4 mb-6 flex items-start">
                <div className="mr-3 mt-0.5 text-blue-400">
                    <Shield size={16} />
                </div>
                <p className="text-sm text-blue-200">
                    Your information will be securely stored as an NFT on the blockchain, ensuring privacy and immutability.
                </p>
            </div>

            <button
                onClick={onContinue}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#00E1FF] to-[#0095FF] text-white rounded-lg font-medium shadow-lg transition-all transform hover:translate-y-[-2px] hover:shadow-blue-500/30 flex items-center justify-center"
            >
                Begin Verification
                <ChevronRight size={18} className="ml-2" />
            </button>
        </div>
    )
}

export default IntroStep

