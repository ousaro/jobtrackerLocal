'use client';

import { useState } from 'react';
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
import { Job, JobStatus, JobLocation } from '../../types';
import { Label } from '../../../components/ui/label';
import { useToast } from '../../../hooks/use-toast';

const mockJobs: Job[] = [
  {
    id: '1',
    companyName: 'TechCorp',
    positionTitle: 'Senior Frontend Developer',
    applicationDate: new Date('2024-03-15'),
    location: 'REMOTE',
    salaryExpectation: 120000,
    status: 'INTERVIEW_SCHEDULED',
    jobDescriptionLink: 'https://example.com/job/1',
  },
  {
    id: '2',
    companyName: 'StartupX',
    positionTitle: 'Full Stack Engineer',
    applicationDate: new Date('2024-03-14'),
    location: 'HYBRID',
    salaryExpectation: 140000,
    status: 'APPLIED',
    jobDescriptionLink: 'https://example.com/job/2',
  },
  {
    id: '3',
    companyName: 'BigTech Inc',
    positionTitle: 'React Developer',
    applicationDate: new Date('2024-03-13'),
    location: 'ONSITE',
    salaryExpectation: 130000,
    status: 'SAVED',
    jobDescriptionLink: 'https://example.com/job/3',
  },
];

const statusColors: Record<JobStatus, string> = {
  SAVED: 'bg-gray-500',
  APPLIED: 'bg-blue-500',
  INTERVIEW_SCHEDULED: 'bg-yellow-500',
  OFFER_RECEIVED: 'bg-green-500',
  REJECTED: 'bg-red-500',
};

const statusLabels: Record<JobStatus, string> = {
  SAVED: 'Saved',
  APPLIED: 'Applied',
  INTERVIEW_SCHEDULED: 'Interview',
  OFFER_RECEIVED: 'Offer',
  REJECTED: 'Rejected',
};

const locationLabels: Record<JobLocation, string> = {
  REMOTE: 'Remote',
  ONSITE: 'On-site',
  HYBRID: 'Hybrid',
};

const initialJob: Partial<Job> = {
  companyName: '',
    positionTitle: '',
    location: 'REMOTE',
    salaryExpectation: undefined,
    jobDescriptionLink: '',
    status: 'SAVED',
}

export default function ApplicationsPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'ALL'>('ALL');
  const [jobs, setJobs] = useState(mockJobs);
  const [newJob, setNewJob] = useState<Partial<Job>>(initialJob);
  const [editedJob, setEditedJob] = useState<Partial<Job>>(initialJob);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.positionTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddJob = () => {
    const job: Job = {
      id: (jobs.length + 1).toString(),
      applicationDate: new Date(),
      ...newJob as any,
    };
    setJobs([...jobs, job]);
    setNewJob({
      companyName: '',
      positionTitle: '',
      location: 'REMOTE',
      salaryExpectation: undefined,
      jobDescriptionLink: '',
      status: 'SAVED',
    });
    setIsAddDialogOpen(false);
    toast({
      title: 'Job Added',
      description: 'New job application has been added successfully.',
    });
  };

  const handleStatusUpdate = (jobId: string, newStatus: JobStatus) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: newStatus } : job
    ));
    setIsStatusDialogOpen(false);
    setSelectedJob(null);
    toast({
      title: 'Status Updated',
      description: `Application status updated to ${statusLabels[newStatus]}.`,
    });
  };

  const hadleEditJob = (jobId: string, editedJob: Job) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...editedJob } : job
    ));
    setIsEditDialogOpen(false);
    setSelectedJob(null);
    toast({
      title: 'Application Updated',
      description: `Your job application has been updated successfully.`,
    }); 
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (jobId: string) => {
    hadleEditJob(jobId, editedJob as Job);
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
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={newJob.companyName}
                  onChange={(e) =>
                    setNewJob({ ...newJob, companyName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="positionTitle">Position Title</Label>
                <Input
                  id="positionTitle"
                  value={newJob.positionTitle}
                  onChange={(e) =>
                    setNewJob({ ...newJob, positionTitle: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select
                  value={newJob.location}
                  onValueChange={(value: JobLocation) =>
                    setNewJob({ ...newJob, location: value })
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
                  id="salary"
                  type="number"
                  value={newJob.salaryExpectation || ''}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      salaryExpectation: parseInt(e.target.value) || undefined,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                 <div className="space-y-2">
                    <Label htmlFor="jobLink">Job Description Link</Label>
                    <Input
                    id="jobLink"
                    value={newJob.jobDescriptionLink}
                    onChange={(e) =>
                        setNewJob({ ...newJob, jobDescriptionLink: e.target.value })
                    }
                    />
                 </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddJob}>Add Application</Button>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
              {filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.companyName}</TableCell>
                  <TableCell>{job.positionTitle}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {locationLabels[job.location]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {job.applicationDate.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    ${job.salaryExpectation?.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={statusColors[job.status]}
                      variant="secondary"
                    >
                      {statusLabels[job.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog open={isStatusDialogOpen && selectedJob?.id === job.id} onOpenChange={(open) => {
                      setIsStatusDialogOpen(open);
                      if (!open) setSelectedJob(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedJob(job)}
                        >
                          Update Status
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update Application Status</DialogTitle>
                          <DialogDescription>
                            Update the status for {job.positionTitle} at {job.companyName}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          {Object.entries(statusLabels).map(([value, label]) => (
                            <Button
                              key={value}
                              variant={job.status === value ? "default" : "outline"}
                              className="w-full"
                              onClick={() => handleStatusUpdate(job.id, value as JobStatus)}
                            >
                              {label}
                            </Button>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={isEditDialogOpen && selectedJob?.id === job.id}
                      onOpenChange={(open) => {
                        setEditedJob(job);
                        setIsEditDialogOpen(open);
                        if (!open) {
                          setSelectedJob(null);
                          setEditedJob(initialJob);
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedJob(job)}>
                          Edit Job
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Job Details</DialogTitle>
                          <DialogDescription>
                            Modify the details for <strong>{job.positionTitle}</strong> at <strong>{job.companyName}</strong>
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Label>Position Title</Label>
                          <Input name="positionTitle" value={editedJob.positionTitle} onChange={handleChange} />

                          <Label>Company Name</Label>
                          <Input name="companyName" value={editedJob.companyName} onChange={handleChange} />

                          <Label>Location</Label>
                          <Input name="location" value={editedJob.location} onChange={handleChange} />

                          <Label>Salary Expectation</Label>
                          <Input type="number" name="salaryExpectation" value={editedJob.salaryExpectation} onChange={handleChange} />

                          <Label>Job Description Link</Label>
                          <Input name="jobDescriptionLink" value={editedJob.jobDescriptionLink} onChange={handleChange} />
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                          <Button onClick={() => handleSubmit(selectedJob?.id || '')}>Save Changes</Button>
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