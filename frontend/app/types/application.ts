export type JobStatus = 
  | 'SAVED'
  | 'APPLIED' 
  | 'INTERVIEW_SCHEDULED'
  | 'OFFER_RECEIVED'
  | 'REJECTED';

export type JobLocation = 'REMOTE' | 'ONSITE' | 'HYBRID';

export interface Application {
  id: string;
  owner_id: string;
  company_name: string;
  position_title: string;
  application_date: string;
  location: JobLocation;
  salary_expectation?: number;
  job_description_link?: string;
  status: JobStatus;
  created_at: Date,
  last_modified: Date,
}

export interface ApplicationFormData {
  owner_id: string;
  company_name: string;
  position_title: string;
  location: JobLocation;
  application_date: string;

  salary_expectation?: number;
  job_description_link?: string;
  status: JobStatus;

  } 