'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, User, UserCheck, Eye, EyeOff } from 'lucide-react';
import { TopNav } from '@/components/nav/top-nav';
import { ProfileIcon } from '@/components/profile/icon';

interface Person {
  id: string;
  name: string;
  email: string;
  type: 'student' | 'counselor';
  details: {
    phone?: string;
    department?: string;
    grade?: string;
    specialization?: string;
    joinDate: string;
    status: 'active' | 'inactive';
  };
}

// Mock data - replace with actual API calls
const mockData: Person[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@school.edu',
    type: 'student',
    details: {
      phone: '+1-234-567-8901',
      grade: '10th Grade',
      joinDate: '2023-09-01',
      status: 'active'
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@school.edu',
    type: 'counselor',
    details: {
      phone: '+1-234-567-8902',
      department: 'Psychology',
      specialization: 'Anxiety & Depression',
      joinDate: '2022-08-15',
      status: 'active'
    }
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@school.edu',
    type: 'student',
    details: {
      phone: '+1-234-567-8903',
      grade: '12th Grade',
      joinDate: '2021-09-01',
      status: 'active'
    }
  }
];

export default function ReportPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'student' | 'counselor'>('all');
  const [revealedDetails, setRevealedDetails] = useState<Set<string>>(new Set());

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim().toLowerCase());
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter results based on search and type
  const searchResults = useMemo(() => {
    if (!debouncedSearch) return [];

    let filtered = mockData.filter(person =>
      person.name.toLowerCase().includes(debouncedSearch) ||
      person.email.toLowerCase().includes(debouncedSearch)
    );

    if (searchType !== 'all') {
      filtered = filtered.filter(person => person.type === searchType);
    }

    return filtered;
  }, [debouncedSearch, searchType]);

  // Reset revealed details when search changes
  useEffect(() => {
    setRevealedDetails(new Set());
  }, [searchResults]);

  const toggleDetails = (personId: string) => {
    const newRevealed = new Set(revealedDetails);
    if (newRevealed.has(personId)) {
      newRevealed.delete(personId);
    } else {
      newRevealed.add(personId);
    }
    setRevealedDetails(newRevealed);
  };

  return (
    <div className="min-h-dvh bg-black overflow-hidden">
      <main className="overflow-y-auto hide-scrollbar text-slate-100 relative" style={{height: '100vh'}}>
        {/* White Spotlight Background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
        />
        
        {/* Top Navigation */}
        <div className="relative z-50">
          <TopNav />
           <div className="hidden lg:block absolute right-5 top-5 ">
        <ProfileIcon />
      </div>
        </div>

        {/* Page container */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-3 sm:px-4 pb-16 sm:pb-20">
          <div className="mb-6 sm:mb-8 pt-20 sm:pt-16">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2">Reports</h1>
            <p className="text-sm sm:text-base text-slate-300">Search and view student and counselor information</p>
          </div>

          {/* Search Section */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="flex-1">
                <label htmlFor="search" className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                  Search by Name or Email
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <input
                    id="search"
                    type="text"
                    placeholder="Enter name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400/30 text-slate-100 placeholder:text-slate-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="md:w-48">
                <label htmlFor="type" className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                  Search Type
                </label>
                <select
                  id="type"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value as 'all' | 'student' | 'counselor')}
                  className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400/30 text-slate-100 text-sm sm:text-base"
                >
                  <option value="all" className="bg-black text-slate-100">All</option>
                  <option value="student" className="bg-black text-slate-100">Students</option>
                  <option value="counselor" className="bg-black text-slate-100">Counselors</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {searchResults.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-lg">
              <div className="p-3 sm:p-4 border-b border-white/10">
                <h2 className="text-base sm:text-lg font-semibold text-slate-100">
                  Search Results ({searchResults.length})
                </h2>
              </div>

              <div className="divide-y divide-white/10">
                {searchResults.map((person) => (
                  <div key={person.id} className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-3 sm:gap-0">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {person.type === 'student' ? (
                            <User className="h-6 w-6 sm:h-8 sm:w-8 text-[#22D3EE]" />
                          ) : (
                            <UserCheck className="h-6 w-6 sm:h-8 sm:w-8 text-[#60A5FA]" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-medium text-slate-100">{person.name}</h3>
                          <p className="text-xs sm:text-sm text-slate-300">{person.email}</p>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            person.type === 'student' 
                              ? 'bg-white/10 text-[#22D3EE] border border-white/10' 
                              : 'bg-white/10 text-[#60A5FA] border border-white/10'
                          }`}>
                            {person.type.charAt(0).toUpperCase() + person.type.slice(1)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleDetails(person.id)}
                        className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors w-full sm:w-auto"
                      >
                        {revealedDetails.has(person.id) ? (
                          <>
                            <EyeOff className="h-4 w-4" />
                            <span>Hide Details</span>
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4" />
                            <span>Reveal Details</span>
                          </>
                        )}
                      </button>
                    </div>

                    {revealedDetails.has(person.id) && (
                      <div className="ml-0 sm:ml-11 bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4">
                        <h4 className="text-xs sm:text-sm font-medium text-slate-100 mb-2 sm:mb-3">Detailed Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                          {person.details.phone && (
                            <div>
                              <span className="font-medium text-slate-300">Phone:</span>
                              <span className="ml-2 text-slate-500">{person.details.phone}</span>
                            </div>
                          )}
                          {person.details.grade && (
                            <div>
                              <span className="font-medium text-slate-300">Grade:</span>
                              <span className="ml-2 text-slate-500">{person.details.grade}</span>
                            </div>
                          )}
                          {person.details.department && (
                            <div>
                              <span className="font-medium text-slate-300">Department:</span>
                              <span className="ml-2 text-slate-500">{person.details.department}</span>
                            </div>
                          )}
                          {person.details.specialization && (
                            <div>
                              <span className="font-medium text-slate-300">Specialization:</span>
                              <span className="ml-2 text-slate-500">{person.details.specialization}</span>
                            </div>
                          )}
                          <div>
                            <span className="font-medium text-slate-300">Join Date:</span>
                            <span className="ml-2 text-slate-500">{person.details.joinDate}</span>
                          </div>
                          <div>
                            <span className="font-medium text-slate-300">Status:</span>
                            <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                              person.details.status === 'active' 
                                ? 'bg-white/10 text-[#60A5FA] border border-white/10' 
                                : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            }`}>
                              {person.details.status.charAt(0).toUpperCase() + person.details.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResults.length === 0 && debouncedSearch && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 sm:p-8 text-center">
              <div className="text-slate-500 mb-4">
                <Search className="h-10 w-10 sm:h-12 sm:w-12 mx-auto" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-slate-100 mb-2">No results found</h3>
              <p className="text-sm sm:text-base text-slate-300">Try adjusting your search terms or search type.</p>
            </div>
          )}

          {!debouncedSearch && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 sm:p-8 text-center">
              <div className="text-slate-500 mb-4">
                <Search className="h-10 w-10 sm:h-12 sm:w-12 mx-auto" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-slate-100 mb-2">Start typing to search</h3>
              <p className="text-sm sm:text-base text-slate-300">Enter a name or email to find students and counselors.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
