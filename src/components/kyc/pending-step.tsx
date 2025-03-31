import { Loader } from "lucide-react"

interface PendingStepProps {
    isMinting: boolean
}

const PendingStep = ({ isMinting }: PendingStepProps) => {
    return (
        <div className="max-w-2xl mx-auto my-8 p-6 bg-[#0A0B1E] rounded-xl border border-gray-800 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6">Processing Your Verification</h2>
            <p className="text-gray-400 mb-4">Your information is being reviewed. Please wait a moment.</p>
            {isMinting && (
                <div className="flex items-center space-x-2">
                    <Loader className="animate-spin text-blue-400" size={24} />
                    <p className="text-gray-400">Minting your KYC information...</p>
                </div>
            )}
        </div>
    )
}

export default PendingStep

