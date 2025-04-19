'use client';

import { useState } from 'react';
import { format } from "date-fns";
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
import { Plus,ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Interview, InterviewType, InterviewFormData } from '../../types';
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

const initialNewInterview: Partial<InterviewFormData> = {
  companyName: '',
  positionTitle: '',
  type: 'ONLINE',
  notes: '',
  preparationDetails: '',
}

export default function InterviewsPage() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [typeFilter, setTypeFilter] = useState<InterviewType | 'ALL'>('ALL');
  const [interviews, setInterviews] = useState<Interview[]>(mockInterviews);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [newInterview, setNewInterview] = useState<Partial<InterviewFormData>>(initialNewInterview);

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
    setNewInterview(initialNewInterview);
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
                  value={newInterview.dateTime ? format(newInterview.dateTime, "HH:mm") : ''}
                  onChange={(e) =>{
                    const [hours, minutes] = e.target.value.split(":");
                    const updatedDate = date ? new Date(date) : new Date();
                    updatedDate.setHours(Number(hours), Number(minutes));
                    setNewInterview({ ...newInterview, dateTime: updatedDate });
                  }}
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
                  className='resize-none'
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
                  className='resize-none'
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

      <div className="grid gap-6 md:grid-cols-[350px_1fr]">
        <Card className="p-6">
          <div className="space-y-4">
            <CustomCalendar date={date} setDate={setDate} interviews={interviews} />

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

export function CustomCalendar({
  date,
  setDate,
  interviews,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  interviews: { dateTime: Date }[];
}) {
  const [view, setView] = useState<"calendar" | "months" | "years">("calendar"); // Controls view mode
  const [month, setMonth] = useState(new Date()); // Tracks current month

  // Handle day selection and avoid double deselection
  const handleDaySelect = (selectedDay: Date | undefined) => {
    if(!selectedDay) return;
    if (!date || selectedDay?.toDateString() !== date.toDateString()) {
      setDate(selectedDay); 
    }

  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md p-4 border rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1))}
          className={`${view === "calendar" ? "block" : "hidden"}`} // Hide in month/year view
        >
          <ChevronLeft className="w-5 h-5 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white" />
        </button>

        {/* Toggle View: Calendar -> Months -> Years */}
        <button
          className="flex items-center gap-2 text-lg font-semibold"
          onClick={() => setView(view === "calendar" ? "months" : view === "months" ? "years" : "calendar")}
        >
          <CalendarIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          {view === "calendar"
            ? month.toLocaleString("default", { month: "long", year: "numeric" })
            : view === "months"
            ? month.getFullYear()
            : "Select a Year"}
        </button>

        <button
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1))}
          className={`${view === "calendar" ? "block" : "hidden"}`} // Hide in month/year view
        >
          <ChevronRight className="w-5 h-5 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white" />
        </button>
      </div>

      {/* 📆 Calendar View */}
      {view === "calendar" && (
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDaySelect}
          month={month}
          onMonthChange={setMonth}
          modifiers={{
            interview: (day) =>
              interviews.some((interview) =>
                interview.dateTime instanceof Date
                  ? interview.dateTime.toDateString() === day.toDateString()
                  : false
              ),
          }}
          modifiersClassNames={{
            selected: "bg-primary text-primary-foreground rounded-full",
            interview: "bg-secondary text-secondary-foreground rounded-full",
            today: "font-bold text-blue-600",
          }}

          styles={{
            caption: {display: 'none'},
          }}
        />
      )}

      {/* 📅 Month Selection Grid */}
      {view === "months" && (
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <button
              key={i}
              className={`p-3 rounded-md text-sm ${
                month.getMonth() === i ? "bg-primary text-white dark:text-black" : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => {
                setMonth(new Date(month.getFullYear(), i));
                setView("calendar"); // Return to calendar view
              }}
            >
              {new Date(0, i).toLocaleString("default", { month: "short" })}
            </button>
          ))}
        </div>
      )}

      {/* 📆 Year Selection Grid */}
      {view === "years" && (
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 12 }).map((_, i) => {
            const year = new Date().getFullYear() - 5 + i;
            return (
              <button
                key={year}
                className={`p-3 rounded-md text-sm ${
                  month.getFullYear() === year ? "bg-primary text-white dark:text-black" : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                onClick={() => {
                  setMonth(new Date(year, month.getMonth()));
                  setView("months"); // Go back to month selection
                }}
              >
                {year}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
