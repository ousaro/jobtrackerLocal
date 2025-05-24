'use client';

import { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
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
import { Badge } from '../../../components/ui/badge';
import { Plus, Search } from 'lucide-react';
import { Application, JobStatus, JobLocation, ApplicationFormData, SearchResponse } from '../../types';
import { Label } from '../../../components/ui/label';
import { useToast } from '../../../hooks/use-toast';
import { useAuth } from '../../../context/AuthContext';
import { addApplication, getApplicationsByIds, updateApplication } from '../../../api/applicationApi/applicationApi';
import { searchByType } from '../../../api/searchApi/searchApi';
import debounce from 'lodash.debounce';


const statusColors: Record<JobStatus, string> = {
  SAVED: 'bg-gray-500',
  APPLIED: 'bg-blue-500',
  INTERVIEW_SCHEDULED: 'bg-yellow-500',
  OFFER_RECEIVED: 'bg-green-500',
  REJECTED: 'bg-red-500',
  HIRED: 'bg-purple-500',
};

const statusLabels: Record<JobStatus, string> = {
  SAVED: 'Saved',
  APPLIED: 'Applied',
  INTERVIEW_SCHEDULED: 'Interview',
  OFFER_RECEIVED: 'Offer',
  REJECTED: 'Rejected',
  HIRED: 'Hired',
};

const locationLabels: Record<JobLocation, string> = {
  REMOTE: 'Remote',
  ONSITE: 'On-site',
  HYBRID: 'Hybrid',
};

const initialApplication: ApplicationFormData = {
  owner_id: '',
  company_name: '',
  position_title: '',
  location: 'REMOTE',
  application_date: '',
  salary_expectation: undefined,
  job_description_link: '',
  status: 'SAVED',
}

export default function ApplicationsPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'ALL'>('ALL');
  const [applications, setApplications] = useState<Application[]>([]);
  const [applicationFormData, setApplicationFormData] = useState<ApplicationFormData>(initialApplication);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResponse>({} as SearchResponse);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);


   // Adds a new Application via API then refresh list
    const handleAddApplication = async () => {
      try {
        if(!user) return;
        await addApplication({ ...applicationFormData , owner_id: user.id, application_date: new Date().toISOString() });
        toast({
          title: "Application Added",
          description: `Application added successfully!`,
        });
        setIsAddDialogOpen(false);
        setApplicationFormData(initialApplication);
        setSearch(""); // clear search and refresh list
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Error adding Application.",
          variant: "destructive",
        });
      }
    };
  
    // Edits the selected Application (by id) then refresh list
    const handleSubmit = async (id: string) => {
      try {
        if (!user) return;
        await updateApplication(id, { ...applicationFormData, owner_id: user.id,application_date: new Date().toISOString() });
        toast({
          title: "Application Updated",
          description: `Application's info updated!`,
        });
        setIsEditDialogOpen(false);
        setSelectedApplication(null);
        setApplicationFormData(initialApplication);
        fetchSearchResults(""); // refresh whole list
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Error updating Application.",
          variant: "destructive",
        });
      }
    };
  
    const fetchSearchResults = async (q: string) => {
      try {
        const res = await searchByType("applications", q);
        setSearchResults(res);
        const ids = res.results.map((result) => result.id);
  
        let result: Application[] = [];
        if (ids.length !== 0) result = await getApplicationsByIds(ids);
  
        setApplications(result);
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
  
    const getQuery = (status: JobStatus | "ALL") => {
      const trimmedSearch = search.trim();
      if (status === "ALL") return trimmedSearch;
      return trimmedSearch ? `${trimmedSearch}&status="${status}"` : `status="${status}"`;
    };

    useEffect(() => {
      const query = getQuery(statusFilter)
      debouncedSearch(query);
      return () => debouncedSearch.cancel();
    }, [search,statusFilter]);
  
    // Handle input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      
      setTimeout(() => setIsDropdownVisible(e.target.value.length > 0), 350); // Show dropdown only when there's a search query after a delay
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setApplicationFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    // Handle key press event (Enter key)
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        fetchSearchResults(search); // Perform search on Enter press
        setIsDropdownVisible(false); // Hide the dropdown after Enter is pressed
      }
    };
 

  const handleStatusUpdate = async (id: string, newStatus: JobStatus) => {
    const updatedApplication = applications.find(application => application.id === id);
    if (!updatedApplication) return;
    if (!user) return;
    await updateApplication(id, { ...updatedApplication, status: newStatus });
    setApplicationFormData({...updatedApplication, status: newStatus});
    setIsStatusDialogOpen(false);
    setSelectedApplication(null);
    toast({
      title: 'Status Updated',
      description: `Application status updated to ${statusLabels[newStatus]}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Applications</h1>
          <p className="text-muted-foreground">
            Track and manage your job applications
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Application
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Job Application</DialogTitle>
              <DialogDescription>
                Enter the details of your new job application
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  name="company_name"
                  value={applicationFormData.company_name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position_title">Position Title</Label>
                <Input
                  name="position_title"
                  value={applicationFormData.position_title}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select
                  name="location"
                  value={applicationFormData.location}
                  onValueChange={(value: JobLocation) =>
                    setApplicationFormData({ ...applicationFormData, location: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(locationLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary Expectation</Label>
                <Input
                  name="salary"
                  type="number"
                  value={applicationFormData.salary_expectation || ''}
                  onChange={(e) =>
                    setApplicationFormData({
                      ...applicationFormData,
                      salary_expectation: parseInt(e.target.value) || undefined,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                 <div className="space-y-2">
                    <Label htmlFor="job_description_link">Job Description Link</Label>
                    <Input
                    name="job_description_link"
                    value={applicationFormData.job_description_link}
                    onChange={handleChange}
                    />
                 </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddApplication}>Add Application</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies or positions..."
              className="pl-8"
              value={search}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            {/* Dropdown for suggestions */}
          {isDropdownVisible &&
            searchResults.results &&
            searchResults.results.length > 0 && (
              <div className="absolute z-10 w-full dark:bg-inherit bg-white border dark:border-black border-gray-200 dark:shadow-black mt-2 rounded-lg shadow-md max-h-60 overflow-y-auto">
                <ul className="divide-y dark:divide-gray-700 divide-gray-100">
                  {searchResults.results.map((result) => (
                    <li key={result.id}>
                     <div className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                          <div className="flex items-center gap-3">
                            <h2
                              className="text-sm font-semibold"
                              dangerouslySetInnerHTML={{
                                __html: result.highlight.fullName,
                              }}
                            ></h2>
                          </div>
                        </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as JobStatus | 'ALL')}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              {Object.entries(statusLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!isDropdownVisible && applications.length > 0 && applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.company_name}</TableCell>
                  <TableCell>{application.position_title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {locationLabels[application.location]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {application.application_date.split("T")[0]}
                  </TableCell>
                  <TableCell>
                    ${application.salary_expectation?.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={statusColors[application.status]}
                      variant="secondary"
                    >
                      {statusLabels[application.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog open={isStatusDialogOpen && selectedApplication?.id === application.id} onOpenChange={(open) => {
                      setIsStatusDialogOpen(open);
                      if (!open) setSelectedApplication(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedApplication(application)}
                        >
                          Update Status
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update Application Status</DialogTitle>
                          <DialogDescription>
                            Update the status for {application.position_title} at {application.company_name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          {Object.entries(statusLabels).map(([value, label]) => (
                            <Button
                              key={value}
                              variant={application.status === value ? "default" : "outline"}
                              className="w-full"
                              onClick={() => handleStatusUpdate(application.id, value as JobStatus)}
                            >
                              {label}
                            </Button>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={isEditDialogOpen && selectedApplication?.id === application.id}
                      onOpenChange={(open) => {
                        setApplicationFormData(application);
                        setIsEditDialogOpen(open);
                        if (!open) {
                          setSelectedApplication(null);
                          setApplicationFormData(initialApplication);
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedApplication(application)}>
                          Edit Job
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Job Details</DialogTitle>
                          <DialogDescription>
                            Modify the details for <strong>{application.position_title}</strong> at <strong>{application.company_name}</strong>
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Label>Position Title</Label>
                          <Input name="position_title" value={applicationFormData.position_title} onChange={handleChange} />

                          <Label>Company Name</Label>
                          <Input name="company_name" value={applicationFormData.company_name} onChange={handleChange} />

                          <Label htmlFor="location">Location</Label>
                          <Select
                            name="location"
                            value={applicationFormData.location}
                            onValueChange={(value: JobLocation) =>
                              setApplicationFormData({ ...applicationFormData, location: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select location type" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(locationLabels).map(([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          
                          <Label>Salary Expectation</Label>
                          <Input type="number" name="salary_expectation" value={applicationFormData.salary_expectation} onChange={handleChange} />

                          <Label>Job Description Link</Label>
                          <Input name="job_description_link" value={applicationFormData.job_description_link} onChange={handleChange} />
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                          <Button onClick={() => handleSubmit(selectedApplication?.id || '')}>Save Changes</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}