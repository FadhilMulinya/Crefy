"use client"

import { useState, useRef, useEffect } from "react"
import type { RefObject } from "react"
import { Camera, X, AlertCircle } from "lucide-react"

const SelfieStep = () => {
    const [step, setStep] = useState(1)
    const [selfieImage, setSelfieImage] = useState<string | null>(null)
    const [cameraActive, setCameraActive] = useState(false)
    const [cameraError, setCameraError] = useState<string | null>(null)

    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const streamRef = useRef<MediaStream | null>(null)

    // Clean up function to stop camera when component unmounts
    useEffect(() => {
        return () => {
            stopCamera()
        }
    }, [])

    const startCamera = async () => {
        try {
            setCameraError(null)

            // Request camera access with specific constraints for front camera if possible
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: "user", // Prefer front camera
                },
                audio: false,
            })

            // Store stream reference for cleanup
            streamRef.current = stream

            // Connect stream to video element
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }

            setCameraActive(true)
        } catch (error) {
            console.error("Error accessing camera:", error)
            setCameraError(
                error instanceof DOMException && error.name === "NotAllowedError"
                    ? "Camera access denied. Please allow camera access in your browser settings."
                    : "Could not access camera. Please make sure your device has a working camera.",
            )
        }
    }

    const stopCamera = () => {
        // Stop all tracks in the stream
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop())
            streamRef.current = null
        }

        // Clear video source
        if (videoRef.current) {
            videoRef.current.srcObject = null
        }

        setCameraActive(false)
    }

    const takeSelfie = () => {
        if (!videoRef.current || !canvasRef.current) return

        const video = videoRef.current
        const canvas = canvasRef.current

        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Draw current video frame to canvas
        const context = canvas.getContext("2d")
        if (context) {
            // Flip horizontally to mirror the image (like a selfie)
            context.translate(canvas.width, 0)
            context.scale(-1, 1)
            context.drawImage(video, 0, 0, canvas.width, canvas.height)

            // Convert canvas to image data URL
            const imageDataUrl = canvas.toDataURL("image/jpeg", 0.8)
            setSelfieImage(imageDataUrl)

            // Stop camera after taking photo
            stopCamera()
        }
    }

    const removeSelfie = () => {
        setSelfieImage(null)
    }

    const handleBack = () => {
        setStep(step - 1)
    }

    const handleContinue = () => {
        setStep(step + 1)
        // Here you would typically send the selfie to your backend
        console.log("Selfie submitted:", selfieImage)
    }


    return (
        <div className="max-w-2xl mx-auto my-8 p-6 bg-[#0A0B1E] rounded-xl border border-gray-800 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6">Selfie Verification</h2>

            <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4 mb-6 flex items-start">
                <div className="mr-3 mt-0.5 text-blue-400">
                    <Camera size={16} />
                </div>
                <p className="text-sm text-blue-200">
                    Please take a clear photo of your face. Ensure good lighting and that your face is clearly visible.
                </p>
            </div>

            {selfieImage ? (
                <div className="mb-6">
                    <div className="relative">
                        <img
                            src={selfieImage || "/placeholder.svg"}
                            alt="Selfie"
                            className="w-full max-w-sm mx-auto rounded-lg border border-gray-700"
                        />
                        <button
                            onClick={removeSelfie}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                            aria-label="Remove selfie"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mb-6">
                    {cameraActive ? (
                        <div className="relative">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="w-full max-w-sm mx-auto rounded-lg border border-gray-700 transform scale-x-[-1]"
                            />
                            <canvas ref={canvasRef} className="hidden" />
                            <div className="flex justify-center mt-4 space-x-4">
                                <button
                                    onClick={takeSelfie}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                                >
                                    Take Photo
                                </button>
                                <button
                                    onClick={stopCamera}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center bg-[#12132D]">
                            <div className="mb-4 flex justify-center">
                                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                                    <Camera className="text-gray-400" size={32} />
                                </div>
                            </div>
                            <p className="text-gray-400 mb-4">To take your selfie, please enable your camera.</p>

                            {cameraError && (
                                <div className="mb-4 p-3 bg-red-900/30 border border-red-800/50 rounded-lg flex items-start">
                                    <AlertCircle className="text-red-400 mr-2 mt-0.5 shrink-0" size={16} />
                                    <p className="text-sm text-red-200">{cameraError}</p>
                                </div>
                            )}

                            <button
                                onClick={startCamera}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                Start Camera
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div className="flex justify-between mt-8">
                <button
                    onClick={handleBack}
                    className="px-6 py-2.5 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/20"
                >
                    Back
                </button>
                <button
                    onClick={handleContinue}
                    className={`px-6 py-2.5 bg-gradient-to-r from-[#00E1FF] to-[#0095FF] text-white rounded-lg font-medium shadow-lg transition-all transform hover:translate-y-[-2px] hover:shadow-blue-500/30 ${!selfieImage ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    disabled={!selfieImage}
                >
                    Continue
                </button>
            </div>
        </div>
    )
}

export default SelfieStep

