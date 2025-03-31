"use client"

import type React from "react"
import { Upload, X } from "lucide-react"
import type { DocumentType } from "@/types/kyc-types"

interface DocumentUploadStepProps {
    selectedDocType: DocumentType
    documentFrontImage: string | null
    documentBackImage: string | null
    errorMessage: string | null
    onDocTypeSelect: (type: DocumentType) => void
    onFileUpload: (e: React.ChangeEvent<HTMLInputElement>, type: "front" | "back") => void
    onRemoveImage: (type: "front" | "back") => void
    onBack: () => void
    onContinue: () => void
}

const DocumentUploadStep = ({
    selectedDocType,
    documentFrontImage,
    documentBackImage,
    errorMessage,
    onDocTypeSelect,
    onFileUpload,
    onRemoveImage,
    onBack,
    onContinue,
}: DocumentUploadStepProps) => {
    return (
        <div className="max-w-2xl mx-auto my-8 p-6 bg-[#0A0B1E] rounded-xl border border-gray-800 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6">Identity Document Verification</h2>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">Document Type</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button
                        onClick={() => onDocTypeSelect("passport")}
                        className={`p-4 rounded-lg border ${selectedDocType === "passport" ? "border-blue-500 bg-blue-900/20" : "border-gray-700 bg-[#12132D]"
                            } transition-colors text-center`}
                    >
                        <div className="flex justify-center mb-2">
                            <div
                                className={`w-10 h-10 rounded-full ${selectedDocType === "passport" ? "bg-blue-500/30" : "bg-gray-700/30"
                                    } flex items-center justify-center`}
                            >
                                <span className="text-lg font-medium text-white">P</span>
                            </div>
                        </div>
                        <p className={`text-sm ${selectedDocType === "passport" ? "text-blue-400" : "text-gray-300"} font-medium`}>
                            Passport
                        </p>
                    </button>

                    <button
                        onClick={() => onDocTypeSelect("drivers_license")}
                        className={`p-4 rounded-lg border ${selectedDocType === "drivers_license" ? "border-blue-500 bg-blue-900/20" : "border-gray-700 bg-[#12132D]"
                            } transition-colors text-center`}
                    >
                        <div className="flex justify-center mb-2">
                            <div
                                className={`w-10 h-10 rounded-full ${selectedDocType === "drivers_license" ? "bg-blue-500/30" : "bg-gray-700/30"
                                    } flex items-center justify-center`}
                            >
                                <span className="text-lg font-medium text-white">DL</span>
                            </div>
                        </div>
                        <p
                            className={`text-sm ${selectedDocType === "drivers_license" ? "text-blue-400" : "text-gray-300"} font-medium`}
                        >
                            Driver's License
                        </p>
                    </button>

                    <button
                        onClick={() => onDocTypeSelect("id_card")}
                        className={`p-4 rounded-lg border ${selectedDocType === "id_card" ? "border-blue-500 bg-blue-900/20" : "border-gray-700 bg-[#12132D]"
                            } transition-colors text-center`}
                    >
                        <div className="flex justify-center mb-2">
                            <div
                                className={`w-10 h-10 rounded-full ${selectedDocType === "id_card" ? "bg-blue-500/30" : "bg-gray-700/30"
                                    } flex items-center justify-center`}
                            >
                                <span className="text-lg font-medium text-white">ID</span>
                            </div>
                        </div>
                        <p className={`text-sm ${selectedDocType === "id_card" ? "text-blue-400" : "text-gray-300"} font-medium`}>
                            ID Card
                        </p>
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">Document Front</label>
                {documentFrontImage ? (
                    <div className="relative">
                        <img
                            src={documentFrontImage || "/placeholder.svg"}
                            alt="Document front"
                            className="w-full rounded-lg border border-gray-700"
                        />
                        <button
                            onClick={() => onRemoveImage("front")}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center bg-[#12132D]">
                        <div className="mb-3 flex justify-center">
                            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                                <Upload className="text-gray-400" size={24} />
                            </div>
                        </div>
                        <p className="text-gray-400 mb-4">Upload front side of your document</p>
                        <input
                            type="file"
                            id="document-front"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => onFileUpload(e, "front")}
                        />
                        <label
                            htmlFor="document-front"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium cursor-pointer hover:bg-blue-700 transition-colors inline-block"
                        >
                            Select File
                        </label>
                    </div>
                )}
            </div>

            {(selectedDocType === "drivers_license" || selectedDocType === "id_card") && (
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-3">Document Back</label>
                    {documentBackImage ? (
                        <div className="relative">
                            <img
                                src={documentBackImage || "/placeholder.svg"}
                                alt="Document back"
                                className="w-full rounded-lg border border-gray-700"
                            />
                            <button
                                onClick={() => onRemoveImage("back")}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center bg-[#12132D]">
                            <div className="mb-3 flex justify-center">
                                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                                    <Upload className="text-gray-400" size={24} />
                                </div>
                            </div>
                            <p className="text-gray-400 mb-4">Upload back side of your document</p>
                            <input
                                type="file"
                                id="document-back"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => onFileUpload(e, "back")}
                            />
                            <label
                                htmlFor="document-back"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium cursor-pointer hover:bg-blue-700 transition-colors inline-block"
                            >
                                Select File
                            </label>
                        </div>
                    )}
                </div>
            )}

            {errorMessage && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 flex items-center">
                    <X className="text-red-400 mr-2" size={16} />
                    <p className="text-sm text-red-400">{errorMessage}</p>
                </div>
            )}

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
                    disabled={!documentFrontImage || (selectedDocType !== "passport" && !documentBackImage)}
                >
                    Continue
                </button>
            </div>
        </div>
    )
}

export default DocumentUploadStep

