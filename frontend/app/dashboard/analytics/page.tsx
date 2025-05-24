'use client';

import { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/card';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { getSummary } from '../../../api/analyticsApi/analyticsApi';
import { AnalyticsDataSummary} from '../../types';
import { CalendarDays } from 'lucide-react';
import { VictoryLabel, VictoryPie } from 'victory';
;



const initialData: AnalyticsDataSummary = {
  totalApplications: 0,
  totalInterviews: 0,
  lastApplicationIds: [],
  lastInterviewIds: [],
  lastApplications: [],
  lastInterviews: [],
  applicationStatusCounts: {},
  monthlyApplications: {},

};

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
    value: typeof value === 'number' ? value : 0,
    color: getColorForStatus(name),
  })).filter(d => d.value > 0);

  const pieData = applicationData.map(d => ({
    x: d.name,
    y: d.value,
  }));

  const colorScale = applicationData.map(d => d.color);

  const monthlyApplications = analyticsData.monthlyApplications || {};

  const allYears = Object.keys(monthlyApplications)
  .map(key => key.split('-')[0]); // "2025-05" => "2025"
  const uniqueYears = [...new Set(allYears)];
  const targetYear = uniqueYears.sort().reverse()[0];


  const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Build keys like "2025-01", "2025-02" etc.
  const monthKeys = Array.from({ length: 12 }, (_, i) => {
    const monthNum = (i + 1).toString().padStart(2, "0");
    return `${targetYear}-${monthNum}`;
  });


  const monthlyDataArray = monthKeys.map((key, i) => ({
  month: MONTHS[i],
  monthNum: i + 1,
  applications: typeof monthlyApplications[key] === 'number' ? monthlyApplications[key] : 0
  }));

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
            <h2 className="text-lg font-semibold mb-4">
            Applications Over Time {targetYear && `(${targetYear})`}
            </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyDataArray}>
                <defs>
                  <linearGradient id="colorAppLine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="10%" stopColor="hsl(var(--chart-1))" stopOpacity={0.7} />
                    <stop offset="90%" stopColor="hsl(var(--chart-1))" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} 
                />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 border border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-2 shadow-md">
                          <p>Month: <strong>{data.month}</strong></p>
                          <p>Applications: {data.applications}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="applications" stroke="hsl(var(--chart-1))" fill="url(#colorAppLine)" strokeWidth={3} dot />
              </AreaChart>
            </ResponsiveContainer>
           
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Application Status</h2>
          <div className="h-[300px]">
            {applicationData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <VictoryPie
                  data={pieData}
                  colorScale={colorScale}
                  innerRadius={50} // makes a donut
                  labelRadius={120}
                  labels={({ datum }) => `${datum.x}: ${datum.y}`}
                  labelComponent={
                    <VictoryLabel
                      style={[
                        {
                          fontSize: 16,
                          fill: '#333',
                          fontWeight: "bold",
                          // Example: tailwind-like drop-shadow
                          textShadow: "0px 2px 4px rgba(0,0,0,0.7)"
                            
                        },
                      ]}
                      backgroundPadding={{ left: 6, right: 6, top: 2, bottom: 2 }}
                    />
                  }
                />
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

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Upcoming Interviews</h3>
            <div className="space-y-4">
              {analyticsData.lastInterviews && analyticsData.lastInterviews.length > 0 ? (
                analyticsData.lastInterviews.map((interview, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-4 pb-4 border-b border-border last:border-none last:pb-0"
                  >
                    <CalendarDays className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-medium">
                        {interview.positionTitle} at {interview.companyName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(interview.dateTime).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No upcoming interviews found.</p>
              )}
            </div>
          </Card>


          <Card className="p-6">
            <h3 className="font-semibold mb-4">Recent Applications</h3>
            <div className="space-y-4">
              {analyticsData.lastApplications && analyticsData.lastApplications.length > 0 ? (
                analyticsData.lastApplications.map((app, idx) => (
                  <div
                    key={idx}
                    className="pb-4 border-b border-border last:border-none last:pb-0"
                  >
                    <p className="font-medium">{app.position_title}</p>
                    <p className="text-sm text-muted-foreground">
                      Applied at {app.company_name} – {timeAgo(new Date(app.created_at))}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No recent applications found.</p>
              )}
            </div>
          </Card>

         
        </div>
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

function timeAgo(date: Date) {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const days = Math.floor(seconds / (3600 * 24));
  return days === 0 ? "Today" : `${days} day${days > 1 ? 's' : ''} ago`;
}
