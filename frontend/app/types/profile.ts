
export interface UserProfile {
  _id: string;
  email: string;
  fullName: string;
  phone: string;
  title?:string;
  resume?: File | null;
  avatar?: string;
  bio?: string;
  location?: string;
  portfolio?: string;
  github?: string;
  linkedIn?: string;
  skill?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfileSettings {
  
}

export interface ProfileFormData {
    email: string;
    fullName: string;
    phone: string;
    title?:string;
    resume?: File | null;
    avatar?: string;
    bio?: string;
    location?: string;
    portfolio?: string;
    github?: string;
    linkedIn?: string;
    skill?: string;
}

export interface SettingsFormData {
 
}

