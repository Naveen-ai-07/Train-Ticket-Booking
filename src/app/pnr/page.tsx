'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { sampleTrains } from '../utils/sampleData';
import { Passenger } from '@/types';

// Dummy PNR data for demonstration
interface PnrData {
  pnrNumber: string;
  train: typeof sampleTrains[0];
  journeyDate: string;
  passengers: Passenger[];
  class: string;
  status: string;
  departureTime: string;
  arrivalTime: string;
  bookingDate: string;
  totalFare: number;
}

const dummyPnrData: PnrData = {
  pnrNumber: '1234567890',
  train: sampleTrains[0],
  journeyDate: '2023-07-15',
  passengers: [
    { name: 'John Doe', age: 35, gender: 'Male', seatNumber: 'B1-23' },
    { name: 'Jane Doe', age: 32, gender: 'Female', seatNumber: 'B1-24' }
  ],
  class: '2AC',
  status: 'Confirmed',
  departureTime: '2023-07-15T18:30:00.000Z',
  arrivalTime: '2023-07-16T10:30:00.000Z',
  bookingDate: '2023-06-20T14:30:00.000Z',
  totalFare: 4400
};

export default function PnrPage() {
  const [pnrNumber, setPnrNumber] = useState('');
  const [pnrData, setPnrData] = useState<PnrData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pnrNumber.trim() === '') {
      setError('Please enter a valid PNR number');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // For demo, only show data if PNR matches demo number
      if (pnrNumber === '1234567890') {
        setPnrData(dummyPnrData);
      } else {
        setError('PNR not found. Please check the number and try again.');
        setPnrData(null);
      }
      setIsLoading(false);
    }, 1500);
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };
  
  // Format time for display
  const formatTime = (timeString: string): string => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">PNR Status</h1>
      
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Enter PNR Number</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="pnr" className="block text-gray-700 mb-2">PNR Number</label>
            <input 
              type="text" 
              id="pnr"
              className="input-field"
              placeholder="Enter 10-digit PNR Number"
              value={pnrNumber}
              onChange={(e) => setPnrNumber(e.target.value)}
              maxLength={10}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <button 
            type="submit" 
            className="btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Checking PNR Status...' : 'Check PNR Status'}
          </button>
        </form>
        
        <div className="mt-4 text-sm text-gray-600">
          <p>For demo purposes, use PNR: 1234567890</p>
        </div>
      </div>
      
      {isLoading && (
        <div className="max-w-3xl mx-auto text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Fetching PNR Status...</p>
        </div>
      )}
      
      {pnrData && !isLoading && (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="border-b pb-4 mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800">PNR: {pnrData.pnrNumber}</h2>
                <p className="text-gray-600">Booking Date: {formatDate(pnrData.bookingDate)}</p>
              </div>
              <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-medium">
                {pnrData.status}
              </div>
            </div>
          </div>
          
          <div className="border-b pb-4 mb-4">
            <h3 className="text-lg font-bold mb-3 text-gray-800">{pnrData.train.name} ({pnrData.train.number})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Date of Journey: {formatDate(pnrData.journeyDate)}</p>
                <p className="text-gray-600">Class: {pnrData.class}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Fare: ₹{pnrData.totalFare}</p>
                <p className="text-gray-600">Passengers: {pnrData.passengers.length}</p>
              </div>
            </div>
          </div>
          
          <div className="border-b pb-4 mb-4">
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div>
                <p className="text-lg font-bold">{formatTime(pnrData.departureTime)}</p>
                <p className="text-sm text-gray-600">{pnrData.train.from.station}</p>
                <p className="text-xs text-gray-500">{formatDate(pnrData.journeyDate)}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-sm text-gray-600">{pnrData.train.duration}</p>
                <div className="relative w-full h-0.5 bg-gray-300 my-2">
                  <div className="absolute w-2 h-2 rounded-full bg-gray-500 -left-1 -top-0.5"></div>
                  <div className="absolute w-2 h-2 rounded-full bg-gray-500 -right-1 -top-0.5"></div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{formatTime(pnrData.arrivalTime)}</p>
                <p className="text-sm text-gray-600">{pnrData.train.to.station}</p>
                <p className="text-xs text-gray-500">{formatDate(pnrData.journeyDate)}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-3 text-gray-800">Passenger Details</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                    <th className="py-3 px-4 text-left">S.No</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Age</th>
                    <th className="py-3 px-4 text-left">Gender</th>
                    <th className="py-3 px-4 text-left">Seat</th>
                    <th className="py-3 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {pnrData.passengers.map((passenger, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{passenger.name}</td>
                      <td className="py-3 px-4">{passenger.age}</td>
                      <td className="py-3 px-4">{passenger.gender}</td>
                      <td className="py-3 px-4">{passenger.seatNumber}</td>
                      <td className="py-3 px-4 text-green-600">Confirmed</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Link 
              href="/"
              className="btn-secondary"
            >
              Back to Home
            </Link>
            <button 
              className="btn-primary"
              onClick={() => window.print()}
            >
              Print Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 