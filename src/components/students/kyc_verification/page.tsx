"use client"

import type React from "react"
import { useState, useRef } from "react"
import Container from "../Container"
import type { VerificationStatus, VerificationStep, PersonalInfo, DocumentType } from "@/types/kyc-types"

// Import step components
import IntroStep from "@/components/kyc/intro-step";
import PersonalInfoStep from "@/components/kyc/personal-info-step"
import DocumentUploadStep from "@/components/kyc/document-upload-step"
import SelfieStep from "@/components/kyc/selfie-step"
import ConfirmationStep from "@/components/kyc/confirmation-step"
import PendingStep from "@/components/kyc/pending-step"
import CompletedStep from "@/components/kyc/completed-step"
import StepIndicator from "@/components/kyc/step-indicator"

const KycVerification = () => {
    // Main state variables
    const [currentStep, setCurrentStep] = useState<VerificationStep>("intro")
    const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("not_started")
    const [selectedDocType, setSelectedDocType] = useState<DocumentType>("passport")
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        nationality: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
    })

    // Document and selfie upload states
    const [documentFrontImage, setDocumentFrontImage] = useState<string | null>(null)
    const [documentBackImage, setDocumentBackImage] = useState<string | null>(null)
    const [selfieImage, setSelfieImage] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [isMinting, setIsMinting] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [nftAddress, setNftAddress] = useState<string | null>(null)

    // Camera refs for selfie capture
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [cameraActive, setCameraActive] = useState(false)

    // Handle personal info form changes
    const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setPersonalInfo((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Handle document type selection
    const handleDocTypeSelect = (type: DocumentType) => {
        setSelectedDocType(type)
    }

    // Handle file uploads
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "front" | "back") => {
        setErrorMessage(null)
        const file = e.target.files?.[0]

        if (!file) return

        if (file.size > 5 * 1024 * 1024) {
            setErrorMessage("File size exceeds 5MB limit")
            return
        }

        const reader = new FileReader()
        reader.onload = (event) => {
            if (type === "front") {
                setDocumentFrontImage(event.target?.result as string)
            } else {
                setDocumentBackImage(event.target?.result as string)
            }
        }
        reader.readAsDataURL(file)
    }

    // Remove uploaded image
    const handleRemoveImage = (type: "front" | "back") => {
        if (type === "front") {
            setDocumentFrontImage(null)
        } else {
            setDocumentBackImage(null)
        }
    }

    // Start camera for selfie
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
            })

            if (videoRef.current) {
                videoRef.current.srcObject = stream
                setCameraActive(true)
            }
        } catch (err) {
            setErrorMessage("Could not access camera. Please ensure you've granted permission.")
        }
    }

    // Stop camera
    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream
            const tracks = stream.getTracks()

            tracks.forEach((track) => track.stop())
            videoRef.current.srcObject = null
            setCameraActive(false)
        }
    }

    // Take selfie
    const takeSelfie = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current
            const canvas = canvasRef.current
            const context = canvas.getContext("2d")

            if (context) {
                canvas.width = video.videoWidth
                canvas.height = video.videoHeight
                context.drawImage(video, 0, 0, canvas.width, canvas.height)

                const selfieDataUrl = canvas.toDataURL("image/png")
                setSelfieImage(selfieDataUrl)
                stopCamera()
            }
        }
    }

    // Remove selfie
    const handleRemoveSelfie = () => {
        setSelfieImage(null)
    }

    // Submit KYC information to be minted as NFT
    const submitKycForMinting = async () => {
        if (!documentFrontImage || !selfieImage) {
            setErrorMessage("Missing required documents or selfie")
            return
        }

        setIsMinting(true)
        setErrorMessage(null)

        try {
            // This would be replaced with your actual API call to mint the NFT
            // Simulating API call with timeout
            await new Promise((resolve) => setTimeout(resolve, 3000))

            // Simulate successful minting with a fake NFT address
            const mockNftAddress = "0x" + Math.random().toString(16).substring(2, 42)
            setNftAddress(mockNftAddress)
            setVerificationStatus("pending_review")
            setCurrentStep("pending")
        } catch (error) {
            setErrorMessage("Failed to mint KYC as NFT. Please try again.")
        } finally {
            setIsMinting(false)
        }
    }

    // Reset the verification process
    const resetVerification = () => {
        setCurrentStep("intro")
        setVerificationStatus("not_started")
        setSelectedDocType("passport")
        setPersonalInfo({
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            nationality: "",
            address: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
        })
        setDocumentFrontImage(null)
        setDocumentBackImage(null)
        setSelfieImage(null)
        setErrorMessage(null)
        setNftAddress(null)
    }

    // Add this function before the renderCurrentStep function
    // Get step completion status
    const getStepStatus = (step: VerificationStep) => {
        const stepOrder: VerificationStep[] = ["intro", "personal_info", "document_upload", "selfie", "confirmation", "pending", "completed"];
        const currentIndex = stepOrder.indexOf(currentStep);
        const stepIndex = stepOrder.indexOf(step);

        return stepIndex < currentIndex;
    };

    // Render the current step
    const renderCurrentStep = () => {
        switch (currentStep) {
            case "intro":
                return <IntroStep onContinue={() => setCurrentStep("personal_info")} />
            case "personal_info":
                return (
                    <PersonalInfoStep
                        personalInfo={personalInfo}
                        onPersonalInfoChange={handlePersonalInfoChange}
                        onBack={() => setCurrentStep("intro")}
                        onContinue={() => setCurrentStep("document_upload")}
                    />
                )
            case "document_upload":
                return (
                    <DocumentUploadStep
                        selectedDocType={selectedDocType}
                        documentFrontImage={documentFrontImage}
                        documentBackImage={documentBackImage}
                        errorMessage={errorMessage}
                        onDocTypeSelect={handleDocTypeSelect}
                        onFileUpload={handleFileUpload}
                        onRemoveImage={handleRemoveImage}
                        onBack={() => setCurrentStep("personal_info")}
                        onContinue={() => setCurrentStep("selfie")}
                    />
                )
            case "selfie":
                return (
                    <SelfieStep
                        selfieImage={selfieImage}
                        cameraActive={cameraActive}
                        videoRef={videoRef}
                        canvasRef={canvasRef}
                        onStartCamera={startCamera}
                        onStopCamera={stopCamera}
                        onTakeSelfie={takeSelfie}
                        onRemoveSelfie={handleRemoveSelfie}
                        onBack={() => setCurrentStep("document_upload")}
                        onContinue={() => setCurrentStep("confirmation")}
                    />
                )
            case "confirmation":
                return (
                    <ConfirmationStep
                        personalInfo={personalInfo}
                        selfieImage={selfieImage}
                        onBack={() => setCurrentStep("selfie")}
                        onSubmit={submitKycForMinting}
                    />
                )
            case "pending":
                return <PendingStep isMinting={isMinting} />
            case "completed":
                return <CompletedStep nftAddress={nftAddress} onReset={resetVerification} />
            default:
                return <IntroStep onContinue={() => setCurrentStep("personal_info")} />
        }
    }

    // Add this constant before the return statement
    const steps = [
        { id: "intro" as VerificationStep, label: "Intro", isCompleted: getStepStatus("intro") },
        { id: "personal_info" as VerificationStep, label: "Personal Info", isCompleted: getStepStatus("personal_info") },
        { id: "document_upload" as VerificationStep, label: "Documents", isCompleted: getStepStatus("document_upload") },
        { id: "selfie" as VerificationStep, label: "Selfie", isCompleted: getStepStatus("selfie") },
        { id: "confirmation" as VerificationStep, label: "Confirm", isCompleted: getStepStatus("confirmation") }
    ];

    // Update the return statement to include the StepIndicator
    return (
        <Container>
            {currentStep !== "pending" && currentStep !== "completed" && (
                <StepIndicator currentStep={currentStep} steps={steps} />
            )}
            {renderCurrentStep()}
        </Container>
    )
}

export default KycVerification
