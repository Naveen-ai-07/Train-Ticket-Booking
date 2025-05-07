'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { sampleTrains } from '../utils/sampleData';
import { Booking, Passenger } from '@/types';

// Sample booking data for demonstration
const sampleBookings: Booking[] = [
  {
    _id: '1',
    user: 'user123',
    train: '1',
    trainNumber: '12345',
    trainName: 'Rajdhani Express',
    journeyDate: '2023-08-15',
    passengers: [
      { name: 'John Doe', age: 35, gender: 'Male', seatNumber: 'B1-23' },
      { name: 'Jane Doe', age: 32, gender: 'Female', seatNumber: 'B1-24' }
    ],
    class: '2AC',
    from: {
      state: 'Delhi',
      district: 'New Delhi',
      station: 'New Delhi Railway Station'
    },
    to: {
      state: 'Maharashtra',
      district: 'Mumbai',
      station: 'Mumbai Central'
    },
    departureTime: '2023-08-15T18:30:00.000Z',
    arrivalTime: '2023-08-16T10:30:00.000Z',
    status: 'Confirmed',
    paymentStatus: 'Completed',
    totalFare: 4400,
    pnrNumber: '1234567890',
    bookingDate: '2023-07-20T14:30:00.000Z'
  },
  {
    _id: '2',
    user: 'user123',
    train: '6',
    trainNumber: '11027',
    trainName: 'Chennai Express',
    journeyDate: '2023-09-10',
    passengers: [
      { name: 'John Doe', age: 35, gender: 'Male', seatNumber: 'S4-56' }
    ],
    class: 'Sleeper',
    from: {
      state: 'Maharashtra',
      district: 'Mumbai',
      station: 'Mumbai CSMT'
    },
    to: {
      state: 'Tamil Nadu',
      district: 'Chennai',
      station: 'Chennai Central'
    },
    departureTime: '2023-09-10T19:15:00.000Z',
    arrivalTime: '2023-09-11T16:30:00.000Z',
    status: 'Confirmed',
    paymentStatus: 'Completed',
    totalFare: 750,
    pnrNumber: '9876543210',
    bookingDate: '2023-08-05T10:15:00.000Z'
  }
];

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // In a real app, you would check if user is logged in and fetch their bookings
    // For demo purposes, we'll simulate a logged-in user and fetch the sample bookings
    
    setTimeout(() => {
      setIsLoggedIn(true);
      setBookings(sampleBookings);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Format date for display
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
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

  // Cancel booking handler
  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      // In a real app, you would make an API call to cancel the booking
      // For demo purposes, we'll just update the local state
      setBookings(bookings.map(booking => 
        booking._id === bookingId 
          ? { ...booking, status: 'Cancelled' } 
          : booking
      ));
    }
  };

  if (!isLoggedIn && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Login Required</h2>
          <p className="text-gray-600 mb-6">Please log in to view your bookings.</p>
          <Link href="/login" className="btn-primary">
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">My Bookings</h1>
      
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
          </svg>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">No Bookings Found</h2>
          <p className="text-gray-600 mb-6">You haven't made any bookings yet.</p>
          <Link href="/search" className="btn-primary">
            Book a Train Ticket
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map(booking => (
            <div key={booking._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start border-b border-gray-200 pb-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{booking.trainName}</h2>
                  <p className="text-gray-600 text-sm">PNR: {booking.pnrNumber}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === 'Confirmed' 
                    ? 'bg-green-100 text-green-700' 
                    : booking.status === 'Waitlisted' 
                      ? 'bg-yellow-100 text-yellow-700' 
                      : 'bg-red-100 text-red-700'
                }`}>
                  {booking.status}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">FROM</h3>
                  <p className="text-lg font-bold">{booking.from.station}</p>
                  <p className="text-sm text-gray-600">{formatTime(booking.departureTime)}</p>
                  <p className="text-xs text-gray-500">{formatDate(booking.journeyDate)}</p>
                </div>
                
                <div className="flex flex-col justify-center items-center">
                  <div className="relative w-full h-0.5 bg-gray-300 my-2">
                    <div className="absolute w-2 h-2 rounded-full bg-gray-500 -left-1 -top-0.5"></div>
                    <div className="absolute w-2 h-2 rounded-full bg-gray-500 -right-1 -top-0.5"></div>
                  </div>
                  <p className="text-xs text-gray-500">Class: {booking.class}</p>
                </div>
                
                <div className="text-right">
                  <h3 className="text-sm font-medium text-gray-500">TO</h3>
                  <p className="text-lg font-bold">{booking.to.station}</p>
                  <p className="text-sm text-gray-600">{formatTime(booking.arrivalTime)}</p>
                  <p className="text-xs text-gray-500">{formatDate(booking.journeyDate)}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-bold mb-3 text-gray-800">Passengers</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                        <th className="py-2 px-4 text-left">Name</th>
                        <th className="py-2 px-4 text-left">Age</th>
                        <th className="py-2 px-4 text-left">Gender</th>
                        <th className="py-2 px-4 text-left">Seat</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm">
                      {booking.passengers.map((passenger, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="py-2 px-4">{passenger.name}</td>
                          <td className="py-2 px-4">{passenger.age}</td>
                          <td className="py-2 px-4">{passenger.gender}</td>
                          <td className="py-2 px-4">{passenger.seatNumber || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-gray-600 text-sm">Booking Date: {formatDate(booking.bookingDate || '')}</p>
                  <p className="font-bold text-blue-600">Total Fare: ₹{booking.totalFare}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/pnr?pnr=${booking.pnrNumber}`} className="btn-secondary text-sm py-1.5">
                    View Details
                  </Link>
                  {booking.status === 'Confirmed' && (
                    <button 
                      onClick={() => handleCancelBooking(booking._id || '')}
                      className="btn-danger text-sm py-1.5"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 