import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// this to merge tailwind classes (to resolve conflict) with clsx classes 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
