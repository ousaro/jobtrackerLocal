'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Card } from '../../../../components/ui/card';
import { Label } from '../../../../components/ui/label';
import { Textarea } from '../../../../components/ui/textarea';
import {
  User,
  Mail,
  Briefcase,
  MapPin,
  Phone,
  Link as LinkIcon,
  Upload,
  Linkedin,
  Code,
  FileText,
  Github,
} from 'lucide-react';
import { useToast } from '../../../../hooks/use-toast';
import { ProfileFormData, UserProfile } from '../../../types';
import { useAuth } from '../../../../context/AuthContext';
import { getProfile, updateProfile } from '../../../../api/userApi/userApi';

const emptyProfile: UserProfile = {
  _id: '',
  createdAt: new Date(),
  updatedAt: new Date(), 
  avatar: '',
  bio: '',
  fullName: '',
  email: '',
  phone: '',
  location: '',
  title: '',
  skills: '',
  resume: '',
  socialLinks: {
    github: '',
    linkedIn: ''
  },
  website: '',
}

const emptyProfileFormData: ProfileFormData = {
    email: '',
    fullName: '',
    phone: '',
    title:'',
    resume: '',
    avatar: '',
    bio: '',
    location: '',
    socialLinks: {
      github: '',
      linkedIn: ''
    },
    website: '',
    skills: '',
}

export default function ProfilePage(props:{params: Promise<{ id: string }>}) {
  const {id } = React.use(props.params);
  if (!id) return null;
  const userId = id;
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [canEdit, setCanEdit] = useState(true); 
  const {user} = useAuth(); 
  const [profile, setProfile] = useState<UserProfile>(emptyProfile);
  const [profileFromData, setProfileFromData] = useState<ProfileFormData>(emptyProfileFormData);

  useEffect(() => {
    
    const fetchProfile = async () => {
      try {
        const response = await getProfile(userId);
        if (!response) {
          throw new Error('Profile not found');
        }
        const {email,fullName,phone,title,resume,avatar,bio,location,website,socialLinks,skills} = response;
        setProfile(response);
        setProfileFromData({
          email,
          fullName,
          phone,
          title,
          resume,
          avatar,
          bio,
          location,
          website,
          socialLinks,
          skills,
        })
        
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message || 'Error fetching profile.',
          variant: 'destructive',
        });
      }
    };
    
    fetchProfile();
    handleCanEdit();
  }, []);

  const handleCanEdit = (): void => {
    if(user?.id === userId) {
      setCanEdit(true);
    } else {
      setCanEdit(false);
    }
  }

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    
    try{
      const res = await updateProfile(profile._id, profileFromData);
      setProfile(res);
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });
    }catch(error: any) {
      toast({
        title: 'Error',
        description:'Error updating profile.',
        variant: 'destructive',
      });
    }
    
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFromData({ ...profileFromData, resume: file.name });
    }
  };


  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileFromData({ ...profileFromData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-1 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your profile information</p>
        </div>
        {!isEditing ? (
          canEdit ? (
            <Button onClick={handleEdit}>Edit</Button>
          ) : (
            <></>
          )
        ) : (
          <div className="flex space-x-2">
            <Button type="submit" form="profileForm">Save</Button>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          </div>
        )}
      </div>

      <form id="profileForm" onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:space-x-6">
              <div className="relative space-y-2 mx-auto">
                <img
                  src={profileFromData.avatar || "https://www.gravatar.com/avatar"}
                  alt="Avatar"
                  className="w-36 h-36 rounded-full object-cover border border-gray-300"
                />
                {isEditing && (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="avatarUpload"
                      onChange={handleAvatarUpload}
                    />
                    <label
                      htmlFor="avatarUpload"
                      className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer"
                    >
                      <Upload size={16} />
                    </label>
                  </>
                )}
              </div>
              <div className="space-y-2 flex-grow">
                <Label>Professional Bio</Label>
                <Textarea
                  className='resize-none'
                  value={profileFromData.bio}
                  rows={4}
                  disabled={!isEditing}
                  placeholder='Enter your professional bio'
                  aria-label='Professional bio input'
                  onChange={(e) => setProfileFromData({ ...profileFromData, bio: e.target.value })}
                />
            </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <User size={20} />
                <Label>Full Name</Label>
                <Input
                  value={profile.fullName}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Mail size={20} />
                <Label>Email</Label>
                <Input
                  value={profile.email}
                  disabled                
                />
              </div>
              <div className="space-y-2">
                <Phone size={20} />
                <Label>Phone</Label>
                <Input
                  value={profileFromData.phone}
                  disabled={!isEditing}
                  onChange={(e) => setProfileFromData({ ...profileFromData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <MapPin size={20} />
                <Label>Location</Label>
                <Input
                  value={profileFromData.location}
                  disabled={!isEditing}
                  onChange={(e) => setProfileFromData({ ...profileFromData, location: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Briefcase size={20} />
                <Label>Professional Title</Label>
                <Input
                  value={profileFromData.title}
                  disabled={!isEditing}
                  onChange={(e) => setProfileFromData({ ...profileFromData, title: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Code size={20} />
              <Label>Skills</Label>
              {isEditing ? (
                <Textarea
                  className="resize-none"
                  value={profileFromData.skills}
                  rows={2}
                  disabled={!isEditing}
                  onChange={(e) => setProfileFromData({ ...profileFromData, skills: e.target.value })}
                  placeholder="Enter your skills (comma separated)"
                  aria-label="Skills input"
                />
              ) : (
                <div>
                  {profileFromData.skills ? (
                    <div className="flex gap-2 flex-wrap">
                      {profileFromData.skills.split(',').map((skill, index) => (
                        <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div>No skills provided.</div>
                  )}
                </div>
              )}
            </div>

          </div>
        </Card>

        <Card className="p-6 space-y-2">
          <FileText size={20} />
          <h2 className="text-xl font-semibold">Resume</h2>
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            {profileFromData.resume ? (
              <>
                <p className="text-sm">Uploaded File: {profileFromData.resume}</p> {/*profileFromData.resume.name*/}
                <a
                href={profileFromData.resume}//URL.createObjectURL(profileFromData.resume)
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
                >
                  Click here to view resume
                </a>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No resume uploaded</p>
            )}
            {isEditing && (
              <>
                
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="resume"
                  onChange={handleResumeUpload}
                />
                <div className="flex flex-col gap-2 items-center justify-center space-x-2 mt-4">
                  <Upload size={20} />
                  <Label htmlFor="resume" className="cursor-pointer text-blue-500">
                  Upload Resume
                  </Label>
                </div>
              </>
            )}
          </div>
        </Card>

        <Card className="p-6 space-y-2">
          <h2 className="text-xl font-semibold mb-4">Social Links</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { label: "LinkedIn", icon: <Linkedin size={20} />, key: "linkedin", value: profileFromData.socialLinks?.linkedIn },
              { label: "GitHub", icon: <Github size={20} />, key: "github", value: profileFromData.socialLinks?.github },
              { label: "Portfolio", icon: <LinkIcon size={20} />, key: "portfolio", value: profileFromData.website },
            ].map(({ label, icon, key, value }) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center gap-2">
                  {icon}
                  <Label>{label}</Label>
                </div>
                {isEditing ? (
                  <Input
                    value={value}
                    disabled={!isEditing}
                    onChange={(e) => setProfileFromData({ ...profileFromData, [key]: e.target.value })}
                  />
                ) : (
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {value || 'No link provided'}
                  </a>
                )}
              </div>
            ))}
          </div>
        </Card>

      </form>
    </div>
  );
}
