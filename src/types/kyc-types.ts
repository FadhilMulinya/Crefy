// Verification status types
export type VerificationStatus = 'not_started' | 'in_progress' | 'pending_review' | 'verified' | 'rejected';

// Steps in the verification process
export type VerificationStep = 'intro' | 'personal_info' | 'document_upload' | 'selfie' | 'confirmation' | 'pending' | 'completed';

// Personal information form data type
export interface PersonalInfo {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

// Document types that can be uploaded
export type DocumentType = 'passport' | 'drivers_license' | 'id_card';
