'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '@/types';
import { indianStates, stateDistricts } from '../utils/indianStates';

export default function ProfilePage() {
  const router = useRouter();
  
  // Default user data for demo purposes
  const defaultUser: User = {
    name: 'John Doe',
    email: 'demo@example.com',
    phone: '9876543210',
    state: 'Delhi',
    district: 'New Delhi',
    isAdmin: false,
    createdAt: '2023-06-15T10:30:00.000Z'
  };
  
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<User>(defaultUser);
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // In a real app, you would check if user is logged in and fetch their profile
    // For demo purposes, we'll simulate a logged-in user
    setTimeout(() => {
      setUser(defaultUser);
      setEditForm(defaultUser);
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  useEffect(() => {
    if (editForm.state && stateDistricts[editForm.state]) {
      setAvailableDistricts(stateDistricts[editForm.state]);
    } else {
      setAvailableDistricts([]);
    }
  }, [editForm.state]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset district if state changes
    if (name === 'state') {
      setEditForm(prev => ({
        ...prev,
        district: ''
      }));
    }
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!editForm.name || !editForm.phone || !editForm.state || !editForm.district) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!/^\d{10}$/.test(editForm.phone)) {
      setError('Phone number must be 10 digits');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simulate API call to update profile
    setTimeout(() => {
      setUser(editForm);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      setIsLoading(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    }, 1000);
  };
  
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };
  
  if (!isLoggedIn && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Login Required</h2>
          <p className="text-gray-600 mb-6">Please log in to view your profile.</p>
          <Link href="/login" className="btn-primary">
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">My Profile</h1>
      
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="input-field"
                  value={editForm.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input-field"
                  value={editForm.email}
                  disabled
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="input-field"
                  value={editForm.phone}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="state" className="block text-gray-700 mb-2">State</label>
                <select
                  id="state"
                  name="state"
                  className="input-field"
                  value={editForm.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select State</option>
                  {indianStates.map((state, index) => (
                    <option key={index} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="district" className="block text-gray-700 mb-2">District</label>
                <select
                  id="district"
                  name="district"
                  className="input-field"
                  value={editForm.district}
                  onChange={handleChange}
                  required
                  disabled={!editForm.state}
                >
                  <option value="">Select District</option>
                  {availableDistricts.map((district, index) => (
                    <option key={index} value={district}>{district}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setEditForm(user as User);
                    setError('');
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mr-4">
                    {user?.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
                    <p className="text-gray-600">{user?.email}</p>
                  </div>
                </div>
                <button
                  className="btn-secondary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">PHONE NUMBER</h3>
                  <p className="text-gray-800">{user?.phone}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">MEMBER SINCE</h3>
                  <p className="text-gray-800">{user?.createdAt ? formatDate(user.createdAt) : '-'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">STATE</h3>
                  <p className="text-gray-800">{user?.state}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">DISTRICT</h3>
                  <p className="text-gray-800">{user?.district}</p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Account Actions</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/bookings" className="btn-primary">
                    View My Bookings
                  </Link>
                  <button className="btn-secondary" onClick={() => router.push('/change-password')}>
                    Change Password
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
} 