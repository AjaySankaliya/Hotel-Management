const express = require('express');
const Booking = require('../model/bookingModel');
const User = require('../model/userModel');
const Room = require('../model/roomModel');
const adminOnly = require('../middleware/adminOnly');

const router = express.Router();

// ✅ Get all bookings (with user and room info)
router.get('/bookings', adminOnly, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('room')
      .populate('user');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// ✅ Get all customers
router.get('/users', adminOnly, async (req, res) => {
  try {
    const users = await User.find({ role: 'customer' });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// ✅ Cancel a booking by ID
router.delete('/bookings/:id', adminOnly, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking canceled' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

// ✅ Delete a user by ID
router.delete('/users/:id', adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// ✅ Delete a room by ID
router.delete('/rooms/:id', adminOnly, async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: 'Room removed' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete room' });
  }
});

module.exports = router;
