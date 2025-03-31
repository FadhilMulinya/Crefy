"use client"

interface CompletedStepProps {
    nftAddress: string | null
    onReset: () => void
}

const CompletedStep = ({ nftAddress, onReset }: CompletedStepProps) => {
    return (
        <div className="max-w-2xl mx-auto my-8 p-6 bg-[#0A0B1E] rounded-xl border border-gray-800 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6">Verification Completed</h2>
            <p className="text-gray-400 mb-4">Your KYC has been successfully verified.</p>
            <p className="text-gray-400 mb-4">
                NFT Address: <span className="text-blue-400">{nftAddress}</span>
            </p>
            <button
                onClick={onReset}
                className="px-6 py-2.5 bg-gradient-to-r from-[#00E1FF] to-[#0095FF] text-white rounded-lg font-medium shadow-lg transition-all transform hover:translate-y-[-2px] hover:shadow-blue-500/30"
            >
                Go to Dashboard
            </button>
        </div>
    )
}

export default CompletedStep

