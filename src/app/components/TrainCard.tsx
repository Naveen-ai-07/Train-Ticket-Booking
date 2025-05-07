'use client';

import React from 'react';
import Link from 'next/link';
import { Train, TrainClass } from '@/types';

interface TrainCardProps {
  train: Train;
}

const TrainCard: React.FC<TrainCardProps> = ({ train }) => {
  // Format the time for display
  const formatTime = (timeString: string): string => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  // Get the lowest priced class
  const lowestPrice = Math.min(...train.classes.map((cls: TrainClass) => cls.price));

  return (
    <div className="train-card">
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl font-bold">{train.name}</h3>
          <p className="text-gray-600 text-sm">Train #{train.number}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-blue-600">₹{lowestPrice} onwards</p>
          <p className="text-sm text-gray-500">
            {train.classes.some(cls => cls.seatsAvailable > 0) 
              ? 'Seats Available' 
              : 'Waiting List'}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div>
          <p className="text-xl font-bold">{formatTime(train.departureTime)}</p>
          <p className="text-sm text-gray-600">{train.from.station}</p>
          <p className="text-xs text-gray-500">{train.from.district}, {train.from.state}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm text-gray-600">{train.duration}</p>
          <div className="relative w-full h-0.5 bg-gray-300 my-2">
            <div className="absolute w-2 h-2 rounded-full bg-gray-500 -left-1 -top-0.5"></div>
            <div className="absolute w-2 h-2 rounded-full bg-gray-500 -right-1 -top-0.5"></div>
          </div>
          <p className="text-xs text-gray-500">Direct</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold">{formatTime(train.arrivalTime)}</p>
          <p className="text-sm text-gray-600">{train.to.station}</p>
          <p className="text-xs text-gray-500">{train.to.district}, {train.to.state}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-2 mb-3">
          {train.classes.map((cls, index) => (
            <span 
              key={index} 
              className={`text-xs px-2 py-1 rounded ${
                cls.seatsAvailable > 0 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {cls.name}: {cls.seatsAvailable > 0 ? `${cls.seatsAvailable} available` : 'WL'}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-600">
            Runs on: {train.days.join(', ')}
          </div>
          <Link 
            href={`/train/${train._id}`}
            className="btn-primary text-sm py-1.5"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainCard; 