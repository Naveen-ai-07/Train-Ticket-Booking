import { Train } from '@/types';

// Sample train data for demonstration
export const sampleTrains: Train[] = [
  {
    _id: '1',
    name: 'Rajdhani Express',
    number: '12345',
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
    departureTime: '2023-07-10T18:30:00.000Z',
    arrivalTime: '2023-07-11T10:30:00.000Z',
    duration: '16h 00m',
    distance: 1400,
    classes: [
      { name: 'Sleeper', price: 800, seatsAvailable: 120 },
      { name: '3AC', price: 1500, seatsAvailable: 80 },
      { name: '2AC', price: 2200, seatsAvailable: 40 },
      { name: '1AC', price: 3500, seatsAvailable: 15 }
    ],
    days: ['Monday', 'Wednesday', 'Friday']
  },
  {
    _id: '2',
    name: 'Shatabdi Express',
    number: '12001',
    from: {
      state: 'Karnataka',
      district: 'Bangalore',
      station: 'Bangalore City Junction'
    },
    to: {
      state: 'Tamil Nadu',
      district: 'Chennai',
      station: 'Chennai Central'
    },
    departureTime: '2023-07-10T06:00:00.000Z',
    arrivalTime: '2023-07-10T12:30:00.000Z',
    duration: '6h 30m',
    distance: 350,
    classes: [
      { name: 'General', price: 400, seatsAvailable: 200 },
      { name: '3AC', price: 800, seatsAvailable: 0 },
      { name: '2AC', price: 1200, seatsAvailable: 35 }
    ],
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  {
    _id: '3',
    name: 'Duronto Express',
    number: '22201',
    from: {
      state: 'West Bengal',
      district: 'Kolkata',
      station: 'Howrah Junction'
    },
    to: {
      state: 'Uttar Pradesh',
      district: 'Varanasi',
      station: 'Varanasi Junction'
    },
    departureTime: '2023-07-10T20:00:00.000Z',
    arrivalTime: '2023-07-11T09:00:00.000Z',
    duration: '13h 00m',
    distance: 680,
    classes: [
      { name: 'Sleeper', price: 650, seatsAvailable: 0 },
      { name: '3AC', price: 1200, seatsAvailable: 0 },
      { name: '2AC', price: 1800, seatsAvailable: 0 },
      { name: '1AC', price: 3000, seatsAvailable: 5 }
    ],
    days: ['Tuesday', 'Friday', 'Sunday']
  },
  {
    _id: '4',
    name: 'Humsafar Express',
    number: '22913',
    from: {
      state: 'Gujarat',
      district: 'Ahmedabad',
      station: 'Ahmedabad Junction'
    },
    to: {
      state: 'Rajasthan',
      district: 'Jaipur',
      station: 'Jaipur Junction'
    },
    departureTime: '2023-07-10T14:30:00.000Z',
    arrivalTime: '2023-07-10T23:15:00.000Z',
    duration: '8h 45m',
    distance: 490,
    classes: [
      { name: '3AC', price: 950, seatsAvailable: 85 }
    ],
    days: ['Monday', 'Wednesday', 'Thursday', 'Saturday']
  },
  {
    _id: '5',
    name: 'Gatimaan Express',
    number: '12049',
    from: {
      state: 'Delhi',
      district: 'New Delhi',
      station: 'New Delhi Railway Station'
    },
    to: {
      state: 'Uttar Pradesh',
      district: 'Agra',
      station: 'Agra Cantt'
    },
    departureTime: '2023-07-10T08:10:00.000Z',
    arrivalTime: '2023-07-10T09:50:00.000Z',
    duration: '1h 40m',
    distance: 188,
    classes: [
      { name: 'General', price: 300, seatsAvailable: 150 },
      { name: '2AC', price: 750, seatsAvailable: 45 }
    ],
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  {
    _id: '6',
    name: 'Chennai Express',
    number: '11027',
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
    departureTime: '2023-07-10T19:15:00.000Z',
    arrivalTime: '2023-07-11T16:30:00.000Z',
    duration: '21h 15m',
    distance: 1280,
    classes: [
      { name: 'Sleeper', price: 750, seatsAvailable: 110 },
      { name: '3AC', price: 1400, seatsAvailable: 65 },
      { name: '2AC', price: 2000, seatsAvailable: 30 }
    ],
    days: ['Monday', 'Thursday', 'Saturday']
  }
]; 