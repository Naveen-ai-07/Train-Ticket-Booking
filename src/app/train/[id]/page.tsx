'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { sampleTrains } from '../../utils/sampleData';
import { Train } from '@/types';

// Define interface for passenger details
interface Passenger {
  name: string;
  age: string;
  gender: 'Male' | 'Female' | 'Other';
}

export default function TrainDetailPage() {
  const params = useParams();
  const router = useRouter();
  const trainId = params.id as string;
  
  // Find train from sample data
  const train = sampleTrains.find(t => t._id === trainId);
  
  const [passengerCount, setPassengerCount] = useState(1);
  const [passengers, setPassengers] = useState<Passenger[]>([{ name: '', age: '', gender: 'Male' }]);
  const [selectedClass, setSelectedClass] = useState('');
  const [journeyDate, setJourneyDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Redirect if train not found
  useEffect(() => {
    if (!train) {
      router.push('/search');
    }
  }, [train, router]);
  
  // Update passengers array when passenger count changes
  useEffect(() => {
    if (passengerCount > passengers.length) {
      // Add new passenger entries
      const newPassengers = [...passengers];
      for (let i = passengers.length; i < passengerCount; i++) {
        newPassengers.push({ name: '', age: '', gender: 'Male' });
      }
      setPassengers(newPassengers);
    } else if (passengerCount < passengers.length) {
      // Remove extra passenger entries
      setPassengers(passengers.slice(0, passengerCount));
    }
  }, [passengerCount]);

  if (!train) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  // Format the time for display
  const formatTime = (timeString: string): string => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });
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

  // Format today's date as min attribute for date input
  const today = new Date().toISOString().split('T')[0];

  // Calculate total fare
  const calculateFare = (): number => {
    if (!selectedClass) return 0;
    const classData = train.classes.find(c => c.name === selectedClass);
    return classData ? classData.price * passengerCount : 0;
  };

  // Update passenger details
  const handlePassengerChange = (index: number, field: keyof Passenger, value: string) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value
    };
    setPassengers(updatedPassengers);
  };

  // Handle booking submission
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!selectedClass) {
      setError('Please select a travel class');
      return;
    }
    
    if (!journeyDate) {
      setError('Please select a journey date');
      return;
    }
    
    // Validate all passengers have complete details
    const isPassengersValid = passengers.every(p => p.name && p.age && parseInt(p.age) > 0);
    if (!isPassengersValid) {
      setError('Please fill in details for all passengers');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simulate API call for booking
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would make an API call to book the ticket
      // and then redirect to a confirmation page with the booking details
      
      // For demo, redirect to a "success" page
      router.push('/booking-success?pnr=1234567890');
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/search" className="text-blue-600 hover:text-blue-800 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Search Results
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{train.name}</h1>
        <p className="text-gray-600 mb-4">Train #{train.number}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">FROM</h3>
            <p className="text-lg font-bold">{train.from.station}</p>
            <p className="text-sm text-gray-600">{formatTime(train.departureTime)}</p>
            <p className="text-xs text-gray-500">{train.from.district}, {train.from.state}</p>
          </div>
          
          <div className="flex flex-col justify-center items-center">
            <p className="text-sm text-gray-600 mb-1">{train.duration}</p>
            <div className="relative w-full h-0.5 bg-gray-300 my-2">
              <div className="absolute w-2 h-2 rounded-full bg-gray-500 -left-1 -top-0.5"></div>
              <div className="absolute w-2 h-2 rounded-full bg-gray-500 -right-1 -top-0.5"></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{train.distance} km</p>
          </div>
          
          <div className="text-right">
            <h3 className="text-sm font-medium text-gray-500">TO</h3>
            <p className="text-lg font-bold">{train.to.station}</p>
            <p className="text-sm text-gray-600">{formatTime(train.arrivalTime)}</p>
            <p className="text-xs text-gray-500">{train.to.district}, {train.to.state}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-bold mb-3 text-gray-800">Running Days</h3>
          <div className="flex flex-wrap gap-2">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <span 
                key={day}
                className={`text-xs px-3 py-1 rounded-full ${
                  train.days.includes(day) 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {day.slice(0, 3)}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Book Your Ticket</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleBooking} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="journey-date" className="block text-gray-700 mb-2">Journey Date</label>
                  <input
                    type="date"
                    id="journey-date"
                    className="input-field"
                    min={today}
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="travel-class" className="block text-gray-700 mb-2">Travel Class</label>
                  <select
                    id="travel-class"
                    className="input-field"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    required
                  >
                    <option value="">Select Class</option>
                    {train.classes.map((cls, index) => (
                      <option 
                        key={index} 
                        value={cls.name}
                        disabled={cls.seatsAvailable === 0}
                      >
                        {cls.name} - ₹{cls.price} ({cls.seatsAvailable} available)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="passengers" className="block text-gray-700 mb-2">Number of Passengers</label>
                <select
                  id="passengers"
                  className="input-field"
                  value={passengerCount}
                  onChange={(e) => setPassengerCount(parseInt(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-bold mb-3 text-gray-800">Passenger Details</h3>
                
                {passengers.map((passenger, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-3">Passenger {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor={`name-${index}`} className="block text-gray-700 mb-1 text-sm">Full Name</label>
                        <input
                          type="text"
                          id={`name-${index}`}
                          className="input-field"
                          placeholder="Enter full name"
                          value={passenger.name}
                          onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor={`age-${index}`} className="block text-gray-700 mb-1 text-sm">Age</label>
                        <input
                          type="number"
                          id={`age-${index}`}
                          className="input-field"
                          placeholder="Enter age"
                          min="1"
                          max="120"
                          value={passenger.age}
                          onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor={`gender-${index}`} className="block text-gray-700 mb-1 text-sm">Gender</label>
                        <select
                          id={`gender-${index}`}
                          className="input-field"
                          value={passenger.gender}
                          onChange={(e) => handlePassengerChange(index, 'gender', e.target.value as 'Male' | 'Female' | 'Other')}
                          required
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                type="submit"
                className="btn-primary w-full py-3"
                disabled={isLoading}
              >
                {isLoading ? 'Processing Booking...' : 'Book Now'}
              </button>
            </form>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Fare Summary</h2>
            
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Base Fare ({passengerCount} {passengerCount === 1 ? 'passenger' : 'passengers'})</span>
                <span className="font-medium">₹{calculateFare()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">GST (5%)</span>
                <span className="font-medium">₹{Math.round(calculateFare() * 0.05)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Convenience Fee</span>
                <span className="font-medium">₹{passengerCount * 20}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total Amount</span>
              <span className="text-blue-600">
                ₹{calculateFare() + Math.round(calculateFare() * 0.05) + (passengerCount * 20)}
              </span>
            </div>
            
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Important Information</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Please carry valid ID proof while traveling</li>
                <li>• Arrive at least 30 minutes before departure</li>
                <li>• Children below 5 years travel free without seat</li>
                <li>• Cancellation charges may apply as per rules</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 