import React from 'react';
import { Check } from 'lucide-react';
import { VerificationStep } from '@/types/kyc-types';

interface StepIndicatorProps {
    currentStep: VerificationStep;
    steps: {
        id: VerificationStep;
        label: string;
        isCompleted?: boolean;
    }[];
}

const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
    return (
        <div className="w-full max-w-2xl mx-auto mb-6">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const isActive = step.id === currentStep;
                    const isCompleted = step.isCompleted;
                    const isLast = index === steps.length - 1;

                    return (
                        <React.Fragment key={step.id}>
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive
                                            ? 'bg-blue-500 text-white'
                                            : isCompleted
                                                ? 'bg-green-500 text-white'
                                                : 'bg-[#12132D] text-gray-400'
                                        }`}
                                >
                                    {isCompleted ? (
                                        <Check size={18} />
                                    ) : (
                                        <span>{index + 1}</span>
                                    )}
                                </div>
                                <span
                                    className={`mt-2 text-xs font-medium ${isActive
                                            ? 'text-blue-400'
                                            : isCompleted
                                                ? 'text-green-400'
                                                : 'text-gray-500'
                                        }`}
                                >
                                    {step.label}
                                </span>
                            </div>

                            {!isLast && (
                                <div
                                    className={`flex-1 h-0.5 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-[#12132D]'
                                        }`}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default StepIndicator;
