import { Application } from "./application";
import { Interview } from "./interview";

export interface AnalyticsDataSummary {
  totalApplications: number;
  totalInterviews: number;
  lastApplicationIds: string[];
  lastInterviewIds: string[];
  applicationStatusCounts: Record<string, number>;
}


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
