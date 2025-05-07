const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  number: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  from: {
    state: {
      type: String,
      required: true
    },
    district: {
      type: String,
      required: true
    },
    station: {
      type: String,
      required: true
    }
  },
  to: {
    state: {
      type: String,
      required: true
    },
    district: {
      type: String,
      required: true
    },
    station: {
      type: String,
      required: true
    }
  },
  departureTime: {
    type: Date,
    required: true
  },
  arrivalTime: {
    type: Date,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  classes: [{
    name: {
      type: String,
      required: true,
      enum: ['Sleeper', '3AC', '2AC', '1AC', 'General']
    },
    price: {
      type: Number,
      required: true
    },
    seatsAvailable: {
      type: Number,
      required: true,
      default: 100
    }
  }],
  days: [{
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }],
  isActive: {
    type: Boolean,
    default: true
  }
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train; 