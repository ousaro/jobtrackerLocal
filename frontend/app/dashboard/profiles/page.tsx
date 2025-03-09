'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState([
    {
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
    },
    {
        id: "2",
        name: 'Jane Smith',
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
    },
    {
      id: "3",
      name: 'Jake Wlliams',
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
    },
    // Add more dummy profiles
  ]);

  const [search, setSearch] = useState('');

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profiles</h1>
          <p className="text-muted-foreground">Browse and view user profiles</p>
        </div>
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="Search profiles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProfiles.map((profile) => (
          <Card key={profile.id} className="p-6 flex items-center gap-4 cursor-pointer hover:shadow-lg transition">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{profile.name}</h2>
              <p className="text-sm text-gray-500">{profile.title}</p>
              <p className="text-sm text-gray-400">{profile.location}</p>
            </div>
            <Link href={`/dashboard/profiles/${profile.id}`}>
              <Button variant="outline">View</Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
