const express = require('express');
const router = express.Router();
const path = require('path');
const { handleUserSignUp, handleUserLogin } = require('../controller/userController');
const restrictToLoggedInOnly = require('../middleware/userMiddleware');
const adminOnly=require('../middleware/adminOnly')

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/api/me', restrictToLoggedInOnly, (req, res) => {
    res.json(req.user);
});

router.get('/admin-dashboard', restrictToLoggedInOnly, adminOnly, (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/admin.html'));
});

router.get('/home', restrictToLoggedInOnly, (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/home.html'));
});


router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/signup.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/login.html'));
});

router.get('/logout', (req, res) => {
    res.clearCookie('uid');
    res.redirect('/login?logout=success');
});

router.get('/rooms', restrictToLoggedInOnly, (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/rooms.html'));
});

router.get('/booking', restrictToLoggedInOnly, (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/booking.html'));
});

// Route: Show Bookings Page (frontend)
router.get('/mybookings', restrictToLoggedInOnly, (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/mybookings.html'));
});


router.post('/signup', handleUserSignUp);
router.post('/login', handleUserLogin);

module.exports = router;
