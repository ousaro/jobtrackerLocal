export type JobStatus = 
  | 'SAVED'
  | 'APPLIED' 
  | 'INTERVIEW_SCHEDULED'
  | 'OFFER_RECEIVED'
  | 'REJECTED';

export type JobLocation = 'REMOTE' | 'ONSITE' | 'HYBRID';

export interface Application {
  id: string;
  companyName: string;
  positionTitle: string;
  applicationDate: Date;
  location: JobLocation;
  salaryExpectation?: number;
  jobDescriptionLink?: string;
  status: JobStatus;
  notes?: string;
  attachments?: string[];
}

export interface ApplicationFormData {
  companyName: string;
  positionTitle: string;
  location: JobLocation;
  salaryExpectation?: number;
  jobDescriptionLink?: string;
  status: JobStatus;
  notes?: string;
} 