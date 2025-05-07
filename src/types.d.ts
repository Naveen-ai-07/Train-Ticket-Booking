import React from 'react';

export interface Train {
  _id: string;
  name: string;
  number: string;
  from: {
    state: string;
    district: string;
    station: string;
  };
  to: {
    state: string;
    district: string;
    station: string;
  };
  departureTime: string;
  arrivalTime: string;
  duration: string;
  distance: number;
  classes: TrainClass[];
  days: string[];
  isActive?: boolean;
}

export interface TrainClass {
  name: string;
  price: number;
  seatsAvailable: number;
}

export interface Passenger {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  seatNumber?: string;
}

export interface Booking {
  _id?: string;
  user?: string;
  train: string;
  trainNumber: string;
  trainName: string;
  journeyDate: string;
  passengers: Passenger[];
  class: string;
  from: {
    state: string;
    district: string;
    station: string;
  };
  to: {
    state: string;
    district: string;
    station: string;
  };
  departureTime: string;
  arrivalTime: string;
  status: 'Confirmed' | 'Waitlisted' | 'Cancelled';
  paymentStatus: 'Pending' | 'Completed' | 'Failed';
  totalFare: number;
  pnrNumber: string;
  bookingDate?: string;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  state: string;
  district: string;
  isAdmin?: boolean;
  createdAt?: string;
}

declare global {
  interface Window {
    // Add any global window properties if needed
  }
} 