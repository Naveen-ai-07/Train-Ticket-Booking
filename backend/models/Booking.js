const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  train: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Train',
    required: true
  },
  trainNumber: {
    type: String,
    required: true
  },
  trainName: {
    type: String,
    required: true
  },
  journeyDate: {
    type: Date,
    required: true
  },
  passengers: [{
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Other']
    },
    seatNumber: {
      type: String
    }
  }],
  class: {
    type: String,
    required: true,
    enum: ['Sleeper', '3AC', '2AC', '1AC', 'General']
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
  status: {
    type: String,
    enum: ['Confirmed', 'Waitlisted', 'Cancelled'],
    default: 'Confirmed'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending'
  },
  totalFare: {
    type: Number,
    required: true
  },
  pnrNumber: {
    type: String,
    required: true,
    unique: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
});

// Generate a unique PNR number before saving
bookingSchema.pre('save', async function(next) {
  if (!this.isNew) return next();
  
  // Generate a random 10-digit PNR number
  const pnr = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  this.pnrNumber = pnr;
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking; 