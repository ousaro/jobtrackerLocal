export type InterviewType = 'ONLINE' | 'ONSITE' | 'PHONE';

export interface Interview {
  id: string;
  jobId: string;
  companyName: string;
  positionTitle: string;
  dateTime: string;
  type: InterviewType;
  notes?: string;
  preparationDetails?: string;
}

export interface InterviewFormData {
  jobId: string;
  companyName: string;
  positionTitle: string;
  dateTime: string;
  type: InterviewType;
  notes?: string;
  preparationDetails?: string;
} 