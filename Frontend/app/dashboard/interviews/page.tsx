"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Calendar } from "../../../components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Badge } from "../../../components/ui/badge";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import {
  Interview,
  InterviewType,
  InterviewFormData,
  SearchResponse,
} from "../../types";
import { useToast } from "../../../hooks/use-toast";
import { useAuth } from "../../../context/AuthContext";
import {
  addInterview,
  getInterviewsByIds,
  updateInterview,
} from "../../../api/interviewApi/interviewApi";
import { searchByType } from "../../../api/searchApi/searchApi";
import debounce from "lodash.debounce";
const interviewTypeLabels: Record<InterviewType, string> = {
  ONLINE: "Online",
  ONSITE: "On-site",
  PHONE: "Phone",
};

const interviewTypeColors: Record<InterviewType, string> = {
  ONLINE: "bg-blue-500",
  ONSITE: "bg-green-500",
  PHONE: "bg-yellow-500",
};

const initialNewInterview: InterviewFormData = {
  jobId: "",
  companyName: "",
  positionTitle: "",
  type: "ONLINE",
  dateTime: "",
  notes: "",
  preparationDetails: "",
};

export default function InterviewsPage() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<InterviewType | "ALL">("ALL");
  const [interviews, setInterviews] = useState<Interview[]>();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [interviewFormData, setInterviewFormData] = useState<InterviewFormData>(initialNewInterview);

 const getDateString = (date: Date | undefined, time:string) => {
        // Ensure date and time exist
        if (!date || !time) return;

        // Split the selected time
        const [hours, minutes] = time.split(":").map(Number);

        // Create a new Date object for the selected date
        const localDateTime = new Date(date); // this creates a Date in local timezone

        // Set the hours and minutes to that date without timezone conversion issues
        localDateTime.setHours(hours);
        localDateTime.setMinutes(minutes);
        localDateTime.setSeconds(0); // Set seconds to 0
        localDateTime.setMilliseconds(0); // Set milliseconds to 0

        // Get the components for formatting
        const year = localDateTime.getFullYear();
        const month = String(localDateTime.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(localDateTime.getDate()).padStart(2, '0');

        const formattedHours = String(localDateTime.getHours()).padStart(2, '0');
        const formattedMinutes = String(localDateTime.getMinutes()).padStart(2, '0');

        // Get timezone offset and format
        const timezoneOffset = localDateTime.getTimezoneOffset();
        const timezoneString = `GMT${timezoneOffset >= 0 ? '-' : '+'}${String(Math.abs(timezoneOffset) / 60).padStart(2, '0')}00`; // GMT+0100, etc.

        // Construct the final formatted date string
        return `${year}-${month}-${day} ${formattedHours}:${formattedMinutes}:00 ${timezoneString}`;
 }

  const handleAddInterview = async () => {
    try {
      const formattedDate = getDateString(date, time);
      if (!formattedDate) return;
      await addInterview({...interviewFormData, dateTime: formattedDate });
      toast({
        title: "Contact Added",
        description: `Interview added successfully at ${formattedDate}!`,
      });
      setIsAddDialogOpen(false);
      // Ensure the latest interview form data is set
      setInterviewFormData(prev => ({...prev, dateTime: formattedDate}));

    
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error adding contact.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (id: string) => {
    try {
      await updateInterview(id, interviewFormData);
      toast({
        title: "Interview Updated",
        description: `Interview updated successfully at ${interviewFormData.dateTime}!`,
      });
      setInterviewFormData(initialNewInterview);

      fetchSearchResults(""); // refresh whole list
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error updating interview.",
        variant: "destructive",
      });
    }
  };

  const fetchSearchResults = async (q: string) => {
    try {
      const res = await searchByType("interviews", q);
      const ids = res.results.map((result) => result.id);

      let result: Interview[] = [];
      if (ids.length !== 0) {
            result = await getInterviewsByIds(ids);      
      }

      setInterviews(result);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error fetching search results.",
        variant: "destructive",
      });
    }
  };

  const debouncedSearch = debounce((query: string) => {
    fetchSearchResults(query);
  }, 300);

  const getQuery = (date: Date, type: InterviewType | "ALL") => {
    const formatted = date.toLocaleDateString('en-CA');
    const interviewType = type === "ALL" ? "" : type;

    return `date="${formatted}"&type="${interviewType}"`;
  }
  useEffect(() => {
    if (!date || !typeFilter) return;

    const query = getQuery(date, typeFilter);
    debouncedSearch(query);

    return () => debouncedSearch.cancel();
  }, [date,typeFilter]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInterviewFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInterviewFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
                  name="companyName"
                  value={interviewFormData.companyName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="positionTitle">Position Title</Label>
                <Input
                  name="positionTitle"
                  value={interviewFormData.positionTitle}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  name="time"
                  type="time"
                  value={
                    time || new Date(interviewFormData.dateTime).toLocaleTimeString("en-CA", {
                          hour: "2-digit",
                          minute: "2-digit",
                      })
                  }
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Interview Type</Label>
                <Select
                  name="type"
                  value={interviewFormData.type}
                  onValueChange={(value) =>
                    setInterviewFormData((prev) => ({
                      ...prev,
                      type: value as InterviewType,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select interview type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(interviewTypeLabels).map(
                      ([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  name="notes"
                  className="resize-none"
                  value={interviewFormData.notes}
                  onChange={handleTextareaChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preparationDetails">Preparation Details</Label>
                <Textarea
                  name="preparationDetails"
                  className="resize-none"
                  value={interviewFormData.preparationDetails}
                  onChange={handleTextareaChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
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
            {interviews && <CustomCalendar
              date={date}
              setDate={setDate}
              interviews={interviews ?? []}
            />}

            <Select
              value={typeFilter}
              onValueChange={(value) =>
                setTypeFilter(value as InterviewType | "ALL")
              }
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
            {interviews?.map((interview) => (
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
            {interviews?.length === 0 && (
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
  interviews: Interview[];
}) {
  const [view, setView] = useState<"calendar" | "months" | "years">("calendar"); // Controls view mode
  const [month, setMonth] = useState(new Date()); // Tracks current month

  // Handle day selection and avoid double deselection
  const handleDaySelect = (selectedDay: Date | undefined) => {
    if (!selectedDay) return;
    if (!date || selectedDay?.toDateString() !== date.toDateString()) {
      setDate(selectedDay);
    }
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md p-4 border rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() =>
            setMonth(new Date(month.getFullYear(), month.getMonth() - 1))
          }
          className={`${view === "calendar" ? "block" : "hidden"}`} // Hide in month/year view
        >
          <ChevronLeft className="w-5 h-5 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white" />
        </button>

        {/* Toggle View: Calendar -> Months -> Years */}
        <button
          className="flex items-center gap-2 text-lg font-semibold"
          onClick={() =>
            setView(
              view === "calendar"
                ? "months"
                : view === "months"
                ? "years"
                : "calendar"
            )
          }
        >
          <CalendarIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          {view === "calendar"
            ? month.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })
            : view === "months"
            ? month.getFullYear()
            : "Select a Year"}
        </button>

        <button
          onClick={() =>
            setMonth(new Date(month.getFullYear(), month.getMonth() + 1))
          }
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
                new Date(interview.dateTime)instanceof Date
                  ? interview.dateTime === day.toDateString()
                  : false
              ), 
          }}
          modifiersClassNames={{
            selected: "bg-primary text-primary-foreground rounded-full",
            interview: "bg-secondary text-secondary-foreground rounded-full",
            today: "font-bold text-blue-600",
          }}
          styles={{
            caption: { display: "none" },
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
                month.getMonth() === i
                  ? "bg-primary text-white dark:text-black"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
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
                  month.getFullYear() === year
                    ? "bg-primary text-white dark:text-black"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
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
