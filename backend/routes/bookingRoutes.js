const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Train = require('../models/Train');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware for authentication
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      throw new Error();
    }
    
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

// Admin middleware
const admin = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
};

// Create a new booking
router.post('/', auth, async (req, res) => {
  try {
    const {
      trainId,
      journeyDate,
      passengers,
      className
    } = req.body;
    
    // Find the train
    const train = await Train.findById(trainId);
    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }
    
    // Find the selected class
    const selectedClass = train.classes.find(c => c.name === className);
    if (!selectedClass) {
      return res.status(400).json({ message: 'Invalid class selected' });
    }
    
    // Check if enough seats are available
    if (selectedClass.seatsAvailable < passengers.length) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }
    
    // Calculate total fare
    const totalFare = selectedClass.price * passengers.length;
    
    // Create booking
    const booking = new Booking({
      user: req.user._id,
      train: train._id,
      trainNumber: train.number,
      trainName: train.name,
      journeyDate,
      passengers,
      class: className,
      from: train.from,
      to: train.to,
      departureTime: train.departureTime,
      arrivalTime: train.arrivalTime,
      totalFare,
      status: 'Confirmed',
      paymentStatus: 'Completed' // For simplicity, we're setting this to completed
    });
    
    // Update available seats
    selectedClass.seatsAvailable -= passengers.length;
    await train.save();
    
    // Save booking
    await booking.save();
    
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all bookings for a user
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .sort({ bookingDate: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get booking by PNR
router.get('/pnr/:pnrNumber', async (req, res) => {
  try {
    const booking = await Booking.findOne({ pnrNumber: req.params.pnrNumber });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get booking by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if the booking belongs to the user or if the user is an admin
    if (booking.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Cancel booking
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if the booking belongs to the user
    if (booking.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }
    
    // Check if booking is already cancelled
    if (booking.status === 'Cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }
    
    // Update booking status
    booking.status = 'Cancelled';
    await booking.save();
    
    // Increase available seats in the train
    const train = await Train.findById(booking.train);
    if (train) {
      const selectedClass = train.classes.find(c => c.name === booking.class);
      if (selectedClass) {
        selectedClass.seatsAvailable += booking.passengers.length;
        await train.save();
      }
    }
    
    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all bookings (admin only)
router.get('/', auth, admin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ bookingDate: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 