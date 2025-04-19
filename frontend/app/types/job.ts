export type JobStatus = 
  | 'SAVED'
  | 'APPLIED' 
  | 'INTERVIEW_SCHEDULED'
  | 'OFFER_RECEIVED'
  | 'REJECTED';

export type JobLocation = 'REMOTE' | 'ONSITE' | 'HYBRID';

export interface Job {
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

export interface JobFormData {
  companyName: string;
  positionTitle: string;
  location: JobLocation;
  salaryExpectation?: number;
  jobDescriptionLink?: string;
  status: JobStatus;
  notes?: string;
} 