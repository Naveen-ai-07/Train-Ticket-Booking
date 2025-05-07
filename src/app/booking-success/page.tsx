'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function BookingSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pnrNumber = searchParams.get('pnr');
  
  const [countdown, setCountdown] = useState(10);
  
  // Redirect to homepage after 10 seconds
  useEffect(() => {
    if (!pnrNumber) {
      router.push('/');
      return;
    }
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [pnrNumber, router]);
  
  if (!pnrNumber) {
    return null; // Handle redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Successful!</h1>
          <p className="text-lg text-gray-600">Your train ticket has been booked successfully.</p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Details</h2>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">PNR Number:</span>
            <span className="font-bold">{pnrNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Booking Status:</span>
            <span className="font-bold text-green-600">Confirmed</span>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-2">
            A confirmation email has been sent to your registered email address with all the details.
          </p>
          <p className="text-gray-600">
            You will be redirected to the homepage in {countdown} seconds...
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/pnr" className="btn-primary">
            Check PNR Status
          </Link>
          <Link href="/" className="btn-secondary">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 