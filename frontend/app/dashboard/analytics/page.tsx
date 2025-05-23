'use client';

import { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { getSummary } from '../../../api/analyticsApi/analyticsApi';
import { AnalyticsDataSummary } from '../../types';


const initialData = {
  totalApplications: 0,
  totalInterviews: 0,
  lastApplicationIds: [],
  lastInterviewIds: [],
  applicationStatusCounts: {}
}


export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsDataSummary>(initialData);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await getSummary();
        
        setAnalyticsData(response);
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      }
    };

    fetchAnalytics();
  }, []);

  if (!analyticsData) {
    return <p>Loading...</p>;
  }


  const applicationStatusCounts = analyticsData.applicationStatusCounts || {};

  const applicationData = Object.entries(applicationStatusCounts).map(([name, value]) => ({
    name,
    value: typeof value === 'number' ? value : 0,  // Force to number

    color: getColorForStatus(name)
  })).filter(d => d.value > 0);

  console.log('applicationData:', applicationData);

 const applicationDataMock = [
  { month: 'Jan', applications: 8 },
  { month: 'Feb', applications: 12 },
  { month: 'Mar', applications: 15 },
  { month: 'Apr', applications: 10 },
  { month: 'May', applications: 18 },
  { month: 'Jun', applications: 14 },
];

const statusDataMock = [
  { name: 'Applied', value: 24, color: '#8884d8' },
  { name: 'Interview', value: 12, color: '#82ca9d' },
  { name: 'Offer', value: 2, color: '#ffc658' },
  { name: 'Rejected', value: 10, color: '#ff8042' },
];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Insights and statistics about your job search progress
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Applications Over Time</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={applicationDataMock}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="hsl(var(--chart-1))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Application Status</h2>
          <div className="h-[300px]">
            

           {applicationData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={applicationData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {applicationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p>No data available for pie chart.</p>
          )}

          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Global Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-secondary">
              <p className="text-sm text-muted-foreground">Total Applications</p>
              <p className="text-2xl font-bold">{analyticsData.totalApplications}</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary">
              <p className="text-sm text-muted-foreground">Total Interviews</p>
              <p className="text-2xl font-bold">{analyticsData.totalInterviews}</p>
            </div>

          </div>
        </Card>
      </div>
    </div>
  );
}

function getColorForStatus(status: string) {
  const colors: Record<string, string> = {
    SAVED: 'hsl(var(--chart-1))',
    APPLIED: 'hsl(var(--chart-2))',
    INTERVIEW_SCHEDULED: 'hsl(var(--chart-3))',
    OFFER_RECEIVED: 'hsl(var(--chart-4))',
    REJECTED: 'hsl(var(--chart-5))',
    HIRED: 'hsl(var(--chart-6))',
  };
  return colors[status] || 'hsl(var(--chart-default))';
}
