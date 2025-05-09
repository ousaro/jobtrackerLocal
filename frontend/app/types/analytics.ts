import { Interview } from "./interview";

export interface AnalyticsData {
  applicationsOverTime: {
    month: string;
    applications: number;
  }[];
  applicationStatus: {
    name: string;
    value: number;
    color: string;
  }[];
}

export interface DashboardStats {
  inProgress: number;
  offers: number;
} 

export interface DashboardContent {
  upcomingInterviews: Interview[];
  recentApplications: Application[];
}

interface Application {

}