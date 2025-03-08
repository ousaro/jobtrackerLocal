'use client';

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


export default function ProfilePage({params}:{params:{id:string}}) {
  if(!params.id) return null;
  const userId = params.id;
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [canEdit, setCanEdit] = useState(true);  
  const [profile, setProfile] = useState({
    id:'1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    title: 'Senior Frontend Developer',
    bio: 'Passionate developer with 5 years of experience.',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    portfolio: 'johndoe.dev',
    resume: null as File | null,
    skills: 'JavaScript, TypeScript, React, Node.js, Next.js, GraphQL, AWS',
    avatar: 'https://ui-avatars.com/api/?background=random',
  });

  const handleCanEdit = () => {
    if(profile.id === userId) {
      setCanEdit(true);
    } else {
      setCanEdit(false);
    }
  }

  useEffect(() => {
    handleCanEdit();
  }, []);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been successfully updated.',
    });
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfile({ ...profile, resume: file });
    }
  };


  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result as string });
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
                  src={profile.avatar}
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
                  value={profile.bio}
                  rows={4}
                  disabled={!isEditing}
                  placeholder='Enter your professional bio'
                  aria-label='Professional bio input'
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                />
            </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <User size={20} />
                <Label>Full Name</Label>
                <Input
                  value={profile.name}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Mail size={20} />
                <Label>Email</Label>
                <Input
                  type="email"
                  value={profile.email}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Phone size={20} />
                <Label>Phone</Label>
                <Input
                  value={profile.phone}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <MapPin size={20} />
                <Label>Location</Label>
                <Input
                  value={profile.location}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Briefcase size={20} />
                <Label>Professional Title</Label>
                <Input
                  value={profile.title}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Code size={20} />
              <Label>Skills</Label>
              {isEditing ? (
                <Textarea
                  className="resize-none"
                  value={profile.skills}
                  rows={2}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                  placeholder="Enter your skills (comma separated)"
                  aria-label="Skills input"
                />
              ) : (
                <div className="flex gap-2 flex-wrap">
                  {profile.skills.split(',').map((skill, index) => (
                    <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">{skill.trim()}</span>
                  ))}
                </div>
              )}
            </div>

          </div>
        </Card>

        <Card className="p-6 space-y-2">
          <FileText size={20} />
          <h2 className="text-xl font-semibold">Resume</h2>
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            {profile.resume ? (
              <>
                <p className="text-sm">Uploaded File: {profile.resume.name}</p>
                <a
                href={URL.createObjectURL(profile.resume)}
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
              { label: "LinkedIn", icon: <Linkedin size={20} />, key: "linkedin", value: profile.linkedin },
              { label: "GitHub", icon: <Github size={20} />, key: "github", value: profile.github },
              { label: "Portfolio", icon: <LinkIcon size={20} />, key: "portfolio", value: profile.portfolio },
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
                    onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                  />
                ) : (
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {value || `Add ${label}`}
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
