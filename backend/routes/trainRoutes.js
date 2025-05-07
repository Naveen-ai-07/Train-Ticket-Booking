const express = require('express');
const router = express.Router();
const Train = require('../models/Train');
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

// Get all trains
router.get('/', async (req, res) => {
  try {
    const trains = await Train.find({ isActive: true });
    res.json(trains);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Search trains
router.post('/search', async (req, res) => {
  try {
    const { fromState, fromDistrict, toState, toDistrict, date } = req.body;
    
    // Create query object
    const query = { isActive: true };
    
    if (fromState) {
      query['from.state'] = fromState;
    }
    
    if (fromDistrict) {
      query['from.district'] = fromDistrict;
    }
    
    if (toState) {
      query['to.state'] = toState;
    }
    
    if (toDistrict) {
      query['to.district'] = toDistrict;
    }
    
    // Check if date is part of the train's running days
    if (date) {
      const dayOfWeek = new Date(date).toLocaleString('en-us', { weekday: 'long' });
      query.days = dayOfWeek;
    }
    
    const trains = await Train.find(query);
    res.json(trains);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get train by ID
router.get('/:id', async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    
    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }
    
    res.json(train);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add a new train (admin only)
router.post('/', auth, admin, async (req, res) => {
  try {
    const {
      name,
      number,
      from,
      to,
      departureTime,
      arrivalTime,
      duration,
      distance,
      classes,
      days
    } = req.body;
    
    const train = new Train({
      name,
      number,
      from,
      to,
      departureTime,
      arrivalTime,
      duration,
      distance,
      classes,
      days
    });
    
    await train.save();
    res.status(201).json(train);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a train (admin only)
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    
    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }
    
    const {
      name,
      number,
      from,
      to,
      departureTime,
      arrivalTime,
      duration,
      distance,
      classes,
      days,
      isActive
    } = req.body;
    
    if (name) train.name = name;
    if (number) train.number = number;
    if (from) train.from = from;
    if (to) train.to = to;
    if (departureTime) train.departureTime = departureTime;
    if (arrivalTime) train.arrivalTime = arrivalTime;
    if (duration) train.duration = duration;
    if (distance) train.distance = distance;
    if (classes) train.classes = classes;
    if (days) train.days = days;
    if (isActive !== undefined) train.isActive = isActive;
    
    await train.save();
    res.json(train);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a train (admin only)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    
    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }
    
    // Soft delete by setting isActive to false
    train.isActive = false;
    await train.save();
    
    res.json({ message: 'Train removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 