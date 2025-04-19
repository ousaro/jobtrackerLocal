import { Job } from './job';
import { Interview } from './interview';
import { Contact } from './contact';
import { DashboardStats, AnalyticsData } from './analytics';

export interface AppContextType {
  jobs: Job[];
  interviews: Interview[];
  contacts: Contact[];
  stats: DashboardStats;
  analytics: AnalyticsData;
  isLoading: boolean;
  error: string | null;
  addJob: (job: Job) => void;
  updateJob: (job: Job) => void;
  deleteJob: (id: string) => void;
  addInterview: (interview: Interview) => void;
  updateInterview: (interview: Interview) => void;
  deleteInterview: (id: string) => void;
  addContact: (contact: Contact) => void;
  updateContact: (contact: Contact) => void;
  deleteContact: (id: string) => void;
} 