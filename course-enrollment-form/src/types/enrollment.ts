export interface PersonalEntrollmentRequest {
    courseId: string;
    type: "personal";
    applicant: {
        name: string;
        email: string;
        phone: string;
        motivation?: string;
    };
    agreedToTerms: boolean;
}

export interface GroupEnrollmentRequest {
    courseId: string;
    type: "group";
    applicant: {
        name: string;
        email: string;
        phone: string;
        motivation?: string;
    };
    group:{
        organizationName: string;
        headCount: number;
        participants: Array<{ name: string; email: string}>;
        contactPerson: string;
    };
    agreedToTerms: boolean;
}

export interface EnrollmentResponse {
    enrollmentId: string;
    status: "confirmed" | "pending";
    enrolledAt: string;
}

export interface ErrorResponse {
    code: string;
    message: string;
    details?: Record<string, string>;
}