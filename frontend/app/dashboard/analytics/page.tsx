'use client';

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

const applicationData = [
  { month: 'Jan', applications: 8 },
  { month: 'Feb', applications: 12 },
  { month: 'Mar', applications: 15 },
  { month: 'Apr', applications: 10 },
  { month: 'May', applications: 18 },
  { month: 'Jun', applications: 14 },
];

const statusData = [
  { name: 'Applied', value: 24, color: 'hsl(var(--chart-1))' },
  { name: 'Interview', value: 12, color: 'hsl(var(--chart-2))' },
  { name: 'Offer', value: 2, color: 'hsl(var(--chart-3))' },
  { name: 'Rejected', value: 10, color: 'hsl(var(--chart-4))' },
];

const sourceData = [
  { name: 'LinkedIn', value: 20, color: 'hsl(var(--chart-1))' },
  { name: 'Indeed', value: 15, color: 'hsl(var(--chart-2))' },
  { name: 'Company Website', value: 10, color: 'hsl(var(--chart-3))' },
  { name: 'Referral', value: 5, color: 'hsl(var(--chart-4))' },
];

const responseTimeData = [
  { name: '1-3 days', value: 15, color: 'hsl(var(--chart-1))' },
  { name: '4-7 days', value: 25, color: 'hsl(var(--chart-2))' },
  { name: '1-2 weeks', value: 10, color: 'hsl(var(--chart-3))' },
  { name: '2+ weeks', value: 5, color: 'hsl(var(--chart-4))' },
];

export default function AnalyticsPage() {
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
              <BarChart data={applicationData}>
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
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Application Sources</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Response Time Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={responseTimeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {responseTimeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Key Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-secondary">
              <p className="text-sm text-muted-foreground">Response Rate</p>
              <p className="text-2xl font-bold">45%</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary">
              <p className="text-sm text-muted-foreground">Interview Rate</p>
              <p className="text-2xl font-bold">25%</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary">
              <p className="text-sm text-muted-foreground">Average Response Time</p>
              <p className="text-2xl font-bold">5 days</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary">
              <p className="text-sm text-muted-foreground">Offer Rate</p>
              <p className="text-2xl font-bold">8%</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Trending Skills</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>React</span>
                <span>75%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>TypeScript</span>
                <span>65%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Node.js</span>
                <span>60%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '60%' }} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}