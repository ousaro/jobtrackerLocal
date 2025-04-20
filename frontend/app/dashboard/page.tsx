'use client';

import { Card } from '../../components/ui/card';
import {
  Briefcase,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DashboardStats } from '../types';
import { useEffect, useState } from 'react';
import { getTokenClaims } from '../../utils/tokenService';
import { getProfileByEmail } from '../../api/userApi/userApi';

const mockStats: DashboardStats = {
  totalApplications: 24,
  inProgress: 12,
  offers: 2,
  rejected: 10,
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats] = useState<DashboardStats>(mockStats);


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back {user?.fullName} ! Here&apos;s an overview of your job search progress.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Total Applications</h3>
          </div>
          <p className="text-2xl font-bold">{stats.totalApplications}</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">In Progress</h3>
          </div>
          <p className="text-2xl font-bold">{stats.inProgress}</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Offers</h3>
          </div>
          <p className="text-2xl font-bold">{stats.offers}</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <XCircle className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Rejected</h3>
          </div>
          <p className="text-2xl font-bold">{stats.rejected}</p>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Upcoming Interviews</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <CalendarDays className="h-4 w-4 text-muted-foreground mt-1" />
              <div>
                <p className="font-medium">Frontend Developer at TechCorp</p>
                <p className="text-sm text-muted-foreground">
                  Tomorrow at 2:00 PM
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CalendarDays className="h-4 w-4 text-muted-foreground mt-1" />
              <div>
                <p className="font-medium">Senior React Developer at WebFlow</p>
                <p className="text-sm text-muted-foreground">
                  Thursday at 11:00 AM
                </p>
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Recent Applications</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Full Stack Developer</p>
              <p className="text-sm text-muted-foreground">
                Applied at StartupX - 2 days ago
              </p>
            </div>
            <div>
              <p className="font-medium">React Developer</p>
              <p className="text-sm text-muted-foreground">
                Applied at TechGiant - 3 days ago
              </p>
            </div>
            <div>
              <p className="font-medium">Frontend Engineer</p>
              <p className="text-sm text-muted-foreground">
                Applied at InnovateCo - 5 days ago
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}