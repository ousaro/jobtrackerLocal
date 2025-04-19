import { JobStatus } from './job';
import { InterviewType } from './interview';

export interface CardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export interface BadgeProps {
  status: JobStatus | InterviewType;
  variant?: 'default' | 'secondary' | 'outline';
} 