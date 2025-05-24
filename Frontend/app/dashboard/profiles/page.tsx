'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce'; 
import { Card } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { SearchResponse, UserProfile } from '../../types';
import { useToast } from '../../../hooks/use-toast';
import { getProfiles, getProfilesByIds } from '../../../api/userApi/userApi';
import { searchByType } from '../../../api/searchApi/searchApi';

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResponse>({} as SearchResponse);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // To manage dropdown visibility
  const { toast } = useToast();

  const fetchSearchResults = async (q: string) => {
    try {
      const res = await searchByType('users', q);
      setSearchResults(res);
      const ids = res.results.map(result => result.id);
      let result: UserProfile[] = [];
      if (ids.length !== 0) result = await getProfilesByIds(ids);
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

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setTimeout(() => setIsDropdownVisible(e.target.value.length > 0), 350); // Show dropdown only when there's a search query after a delay
  };

  // Handle key press event (Enter key)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchSearchResults(search);  // Perform search on Enter press
      setIsDropdownVisible(false); // Hide the dropdown after Enter is pressed
    }
  };

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
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}  // Attach the keydown event handler
          className="pl-10"
        />
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        
        {/* Dropdown for suggestions */}
        {isDropdownVisible && searchResults.results && searchResults.results.length > 0 && (
          <div className="absolute z-10 w-full dark:bg-inherit bg-white border dark:border-black border-gray-200 dark:shadow-black mt-2 rounded-lg shadow-md max-h-60 overflow-y-auto">
            <ul className="divide-y dark:divide-gray-700 divide-gray-100">
              {searchResults.results.map((result) => (
                <li key={result.id}>
                  <Link
                    href={`/dashboard/profiles/${result.highlight.id}`}
                    className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <div>
                        <h2
                          className="text-sm font-semibold"
                          dangerouslySetInnerHTML={{
                            __html: result.highlight.fullName,
                          }}
                        ></h2>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}


      </div>

      {/* No results found message */}
      {(search && searchResults.results.length === 0 || !profiles) && !isDropdownVisible && (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">No profiles found</p>
        </div>
      )}

      {/* Profiles Display (optional) */}
      {!isDropdownVisible && profiles.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {profiles.map((profile) => (
            <Card
              key={profile._id}
              className="p-6 flex items-center gap-4 cursor-pointer hover:shadow-lg transition"
            >
              <img
                src={profile.avatar || 'https://www.gravatar.com/avatar'}
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
      )}
    </div>
  );
}
