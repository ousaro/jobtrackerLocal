
export interface UserProfile {
  _id: string;
  email: string;
  fullName: string;
  phone: string;
  title?:string;
  resume?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    github?: string;
    linkedIn?: string;
  };
  skills?: string;
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
    resume?: string;
    avatar?: string;
    bio?: string;
    location?: string;
    website?: string;
    socialLinks?: {
        github?: string;
        linkedIn?: string;
    };
    skills?: string;
}

export interface SettingsFormData {
 
}

