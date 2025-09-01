const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  roomType: {
    type: String,
    enum: ['Single', 'Double', 'Deluxe'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'maintenance'],
    default: 'available'
  },
  image: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);