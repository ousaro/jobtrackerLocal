'use client';

import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { Calendar } from '../../../components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Badge } from '../../../components/ui/badge';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { Interview, InterviewType } from '../../types';
import { useToast } from '../../../hooks/use-toast';

const mockInterviews: Interview[] = [
  {
    id: '1',
    jobId: '1',
    companyName: 'TechCorp',
    positionTitle: 'Senior Frontend Developer',
    dateTime: new Date('2024-03-20T14:00:00'),
    type: 'ONLINE',
    notes: 'Technical interview with the team lead',
    preparationDetails: 'Review React hooks and performance optimization',
  },
  {
    id: '2',
    jobId: '2',
    companyName: 'StartupX',
    positionTitle: 'Full Stack Engineer',
    dateTime: new Date('2024-03-22T11:00:00'),
    type: 'ONSITE',
    notes: 'System design discussion',
    preparationDetails: 'Prepare for system design and architecture questions',
  },
];

const interviewTypeLabels: Record<InterviewType, string> = {
  ONLINE: 'Online',
  ONSITE: 'On-site',
  PHONE: 'Phone',
};

const interviewTypeColors: Record<InterviewType, string> = {
  ONLINE: 'bg-blue-500',
  ONSITE: 'bg-green-500',
  PHONE: 'bg-yellow-500',
};

export default function InterviewsPage() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [typeFilter, setTypeFilter] = useState<InterviewType | 'ALL'>('ALL');
  const [interviews, setInterviews] = useState(mockInterviews);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newInterview, setNewInterview] = useState<Partial<Interview>>({
    companyName: '',
    positionTitle: '',
    type: 'ONLINE',
    notes: '',
    preparationDetails: '',
  });

  const filteredInterviews = interviews.filter((interview) => {
    const matchesType = typeFilter === 'ALL' || interview.type === typeFilter;
    const matchesDate = !date || interview.dateTime.toDateString() === date.toDateString();
    return matchesType && matchesDate;
  });

  const handleAddInterview = () => {
    if (!date) return;

    const [hours, minutes] = (typeof newInterview.dateTime === 'string' ? newInterview.dateTime : '9:00').split(':');
    const interviewDate = new Date(date);
    interviewDate.setHours(parseInt(hours), parseInt(minutes));

    const interview: Interview = {
      id: (interviews.length + 1).toString(),
      jobId: '0',
      dateTime: interviewDate,
      ...newInterview as any,
    };

    setInterviews([...interviews, interview]);
    setNewInterview({
      companyName: '',
      positionTitle: '',
      type: 'ONLINE',
      notes: '',
      preparationDetails: '',
    });
    setIsAddDialogOpen(false);
    toast({
      title: 'Interview Scheduled',
      description: 'New interview has been scheduled successfully.',
    });
  };

  const getDayClassName = (day: Date) => {
    const hasInterview = interviews.some(
      (interview) => interview.dateTime.toDateString() === day.toDateString()
    );
    return hasInterview ? 'bg-primary text-primary-foreground rounded-full' : '';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interviews</h1>
          <p className="text-muted-foreground">
            Manage your upcoming interviews and preparation
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Schedule Interview
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Interview</DialogTitle>
              <DialogDescription>
                Enter the details for your upcoming interview
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={newInterview.companyName}
                  onChange={(e) =>
                    setNewInterview({ ...newInterview, companyName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="positionTitle">Position Title</Label>
                <Input
                  id="positionTitle"
                  value={newInterview.positionTitle}
                  onChange={(e) =>
                    setNewInterview({ ...newInterview, positionTitle: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newInterview.dateTime ? newInterview.dateTime.toString() : ''}
                  onChange={(e) =>
                    setNewInterview({ ...newInterview, dateTime: new Date(date?.toDateString() + ' ' + e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Interview Type</Label>
                <Select
                  value={newInterview.type}
                  onValueChange={(value: InterviewType) =>
                    setNewInterview({ ...newInterview, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select interview type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(interviewTypeLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newInterview.notes}
                  onChange={(e) =>
                    setNewInterview({ ...newInterview, notes: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preparation">Preparation Details</Label>
                <Textarea
                  id="preparation"
                  value={newInterview.preparationDetails}
                  onChange={(e) =>
                    setNewInterview({ ...newInterview, preparationDetails: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddInterview}>Schedule Interview</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card className="p-6">
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiersClassNames={{
                selected: 'bg-primary text-primary-foreground',
              }}
              modifiersStyles={{
                selected: {
                  backgroundColor: 'hsl(var(--primary))',
                  color: 'hsl(var(--primary-foreground))',
                },
              }}
              modifiers={{
                interview: (date) => interviews.some(
                  (interview) => interview.dateTime.toDateString() === date.toDateString()
                ),
              }}
              styles={{
                // day_today: {
                //   fontWeight: 'bold',
                // },
                // day_selected: {
                //   backgroundColor: 'hsl(var(--primary))',
                //   color: 'hsl(var(--primary-foreground))',
                //   borderRadius: '9999px',
                // },
                // day_interview: {
                //   backgroundColor: 'hsl(var(--primary))',
                //   color: 'hsl(var(--primary-foreground))',
                //   borderRadius: '9999px',
                // },
              }}
            />
            <Select
              value={typeFilter}
              onValueChange={(value) => setTypeFilter(value as InterviewType | 'ALL')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Types</SelectItem>
                {Object.entries(interviewTypeLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-6">
            {filteredInterviews.map((interview) => (
              <div
                key={interview.id}
                className="flex items-start space-x-4 p-4 rounded-lg border"
              >
                <div className="flex-shrink-0">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">
                      {interview.positionTitle} at {interview.companyName}
                    </h3>
                    <Badge
                      className={interviewTypeColors[interview.type]}
                      variant="secondary"
                    >
                      {interviewTypeLabels[interview.type]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {interview.dateTime.toLocaleString()}
                  </p>
                  {interview.notes && (
                    <p className="text-sm mt-2">{interview.notes}</p>
                  )}
                  {interview.preparationDetails && (
                    <div className="mt-2 p-3 bg-secondary rounded-md">
                      <p className="text-sm font-medium">Preparation Notes:</p>
                      <p className="text-sm text-muted-foreground">
                        {interview.preparationDetails}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {filteredInterviews.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                No interviews scheduled for this date
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}