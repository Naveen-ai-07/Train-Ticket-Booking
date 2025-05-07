'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import TrainCard from '../components/TrainCard';
import { Train } from '@/types';

// Sample data for demonstration - this would come from API in a real app
import { sampleTrains } from '../utils/sampleData';

// Import states
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
  "Uttar Pradesh", "Uttarakhand", "West Bengal", 
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
  "Lakshadweep", "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir"
];

function SearchContent() {
  const searchParams = useSearchParams();
  
  const [fromState, setFromState] = useState(searchParams.get('from') || '');
  const [toState, setToState] = useState(searchParams.get('to') || '');
  const [date, setDate] = useState('');
  const [searchResults, setSearchResults] = useState<Train[]>(sampleTrains);
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  // Filter for train classes
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const availableClasses = ['Sleeper', '3AC', '2AC', '1AC', 'General'];

  useEffect(() => {
    // If URL has search params, perform search automatically
    if (searchParams.get('from') && searchParams.get('to')) {
      handleSearch();
    }
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    
    // This would be an API call in a real application
    setTimeout(() => {
      let results = [...sampleTrains];
      
      if (fromState) {
        results = results.filter(train => 
          train.from.state.toLowerCase().includes(fromState.toLowerCase())
        );
      }
      
      if (toState) {
        results = results.filter(train => 
          train.to.state.toLowerCase().includes(toState.toLowerCase())
        );
      }
      
      setSearchResults(results);
      setIsFiltered(true);
      setIsLoading(false);
    }, 1000);
  };

  const filterByClass = (trainClass: string) => {
    const isSelected = selectedClasses.includes(trainClass);
    
    if (isSelected) {
      setSelectedClasses(selectedClasses.filter((c: string) => c !== trainClass));
    } else {
      setSelectedClasses([...selectedClasses, trainClass]);
    }
  };

  // Get filtered results based on selected classes
  const filteredResults = selectedClasses.length === 0
    ? searchResults
    : searchResults.filter((train: Train) => 
        train.classes.some((cls) => selectedClasses.includes(cls.name))
      );

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Search Trains</h1>
      
      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">From State</label>
            <select 
              className="input-field"
              value={fromState}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setFromState(e.target.value)}
            >
              <option value="">Select State</option>
              {indianStates.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">To State</label>
            <select 
              className="input-field"
              value={toState}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setToState(e.target.value)}
            >
              <option value="">Select State</option>
              {indianStates.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Date of Journey</label>
            <input 
              type="date" 
              className="input-field"
              value={date}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button 
              className="btn-primary w-full"
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search Trains'}
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Filters</h3>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2 text-gray-700">Train Class</h4>
              {availableClasses.map((cls, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input 
                    type="checkbox" 
                    id={`class-${cls}`}
                    checked={selectedClasses.includes(cls)}
                    onChange={() => filterByClass(cls)}
                    className="mr-2"
                  />
                  <label htmlFor={`class-${cls}`} className="text-gray-600">{cls}</label>
                </div>
              ))}
            </div>
            
            <button 
              className="text-blue-600 text-sm font-medium hover:text-blue-800"
              onClick={() => setSelectedClasses([])}
            >
              Clear All Filters
            </button>
          </div>
        </div>
        
        {/* Train Cards */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Searching for trains...</p>
            </div>
          ) : isFiltered && filteredResults.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-xl font-bold mb-2 text-gray-800">No Trains Found</h3>
              <p className="text-gray-600 mb-4">We couldn't find any trains matching your search criteria.</p>
              <p className="text-gray-600">Try adjusting your search or exploring different routes.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredResults.map((train: Train, index: number) => (
                <TrainCard key={index} train={train} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div className="text-center py-12">Loading search page...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
} 