'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce'; 
import { Card } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { UserProfile } from '../../types';
import { useToast } from '../../../hooks/use-toast';
import { getProfiles, getProfilesByIds } from '../../../api/userApi/userApi';
import { searchByType } from '../../../api/searchApi/searchApi';

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  const fetchSearchResults = async (q: string) => {
    try {
      const res = await searchByType('users', q);
      const ids = res.results.map(result => result.id);
      const result = await getProfilesByIds(ids)
      setProfiles(result);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Error fetching search results.',
        variant: 'destructive',
      });
    }
  };

  const debouncedSearch = debounce((query: string) => {
    fetchSearchResults(query);
  }, 300);

  useEffect(() => {
    debouncedSearch(search);
    return () => debouncedSearch.cancel();
  }, [search]);

  // Optional: fetch top profiles on initial load
  useEffect(() => {
    fetchSearchResults('');
  }, []);

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
        {profiles.map((profile) => (
          <Card key={profile._id} className="p-6 flex items-center gap-4 cursor-pointer hover:shadow-lg transition">
            <img
              src={profile.avatar || "https://www.gravatar.com/avatar"}
              alt={profile.fullName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{profile.fullName}</h2>
              <p className="text-sm text-gray-500">{profile.title}</p>
              <p className="text-sm text-gray-400">{profile.location}</p>
            </div>
            <Link href={`/dashboard/profiles/${profile._id}`}>
              <Button variant="outline">View</Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
