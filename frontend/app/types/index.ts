export type JobStatus = 
  | 'SAVED'
  | 'APPLIED' 
  | 'INTERVIEW_SCHEDULED'
  | 'OFFER_RECEIVED'
  | 'REJECTED';

export type JobLocation = 'REMOTE' | 'ONSITE' | 'HYBRID';

export type InterviewType = 'ONLINE' | 'ONSITE' | 'PHONE';

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

export interface Interview {
  id: string;
  jobId: string;
  companyName: string;
  positionTitle: string;
  dateTime: Date;
  type: InterviewType;
  notes?: string;
  preparationDetails?: string;
}

export interface Contact {
  id: string;
  jobId: string;
  name: string;
  email?: string;
  phone?: string;
  linkedIn?: string;
  role: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}