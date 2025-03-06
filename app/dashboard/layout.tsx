'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '../../components/theme-toggle';
import {
  Briefcase,
  LayoutDashboard,
  CalendarDays,
  FileText,
  Users,
  BarChart,
  Settings,
  Menu,
  User,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../../components/ui/sheet';
import { cn } from '../../lib/utils';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { title: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Applications', href: '/dashboard/applications', icon: FileText },
  { title: 'Interviews', href: '/dashboard/interviews', icon: CalendarDays },
  { title: 'Contacts', href: '/dashboard/contacts', icon: Users },
  { title: 'Analytics', href: '/dashboard/analytics', icon: BarChart },
  { title: 'Profile', href: '/dashboard/profile', icon: User },
  { title: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <nav className="border-b">
        <div className="flex h-16 items-center px-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex items-center space-x-2 mb-8">
                <Briefcase className="h-6 w-6" />
                <span className="text-lg font-bold">Job Tracker</span>
              </div>
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center space-x-2 px-3 py-2 rounded-lg text-sm',
                      pathname === item.href
                        ? 'bg-secondary'
                        : 'hover:bg-secondary/50'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center space-x-2 md:hidden">
            <Briefcase className="h-6 w-6" />
            <span className="text-lg font-bold">Job Tracker</span>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-2">
            <Briefcase className="h-6 w-6" />
            <span className="text-lg font-bold">Job Tracker</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex">
        {/* Sidebar Navigation (Desktop) */}
        <aside className="hidden md:flex w-64 flex-col border-r min-h-[calc(100vh-4rem)]">
          <nav className="flex-1 space-y-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center space-x-2 px-3 py-2 rounded-lg text-sm',
                  pathname === item.href
                    ? 'bg-secondary'
                    : 'hover:bg-secondary/50'
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}