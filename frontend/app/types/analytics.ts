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
  applicationSource: {
    name: string;
    value: number;
    color: string;
  }[];
  responseTime: {
    name: string;
    value: number;
    color: string;
  }[];
}

export interface DashboardStats {
  totalApplications: number;
  inProgress: number;
  offers: number;
  rejected: number;
} 