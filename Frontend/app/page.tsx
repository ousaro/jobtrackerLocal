'use client';

import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ThemeToggle } from '../components/theme-toggle';
import { Briefcase, PieChart } from 'lucide-react';
import Link from 'next/link';
import { withGuest } from '../components/withAuth';


function Home() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container flex h-16 items-center px-4">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6" />
            <span className="text-lg font-bold">Job Tracker</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Track Your Job Search Journey
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
              Organize applications, schedule interviews, and analyze your job search progress all in one place.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Card className="p-6">
              <h3 className="font-semibold">Track Applications</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Keep track of all your job applications in one place
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold">Manage Interviews</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Schedule and prepare for upcoming interviews
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold">Analyze Progress</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get insights into your job search journey
              </p>
            </Card>
          </div>
          <div className="flex space-x-4">
            <Button size="lg" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Log In</Link>
            </Button>
          </div>
          
        </div>
      </main>
    </div>
  );
}

export default withGuest(Home);