export interface Contact {
  id: string;
  jobId: string;
  name: string;
  email?: string;
  phone?: string;
  linkedIn?: string;
  role: string;
  workingAt?: string;
  createdDate: string;
  lastModifiedDate: string;
}


export interface ContactFormData {
  jobId: string;
  name: string;
  email?: string;
  phone?: string;
  linkedIn?: string;
  role: string;
  workingAt?: string;
}