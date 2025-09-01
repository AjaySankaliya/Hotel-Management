const express = require('express');
const router = express.Router();
const { bookRoom, cancelBooking, getMyBookings } = require('../controller/bookingController');
const restrictToLoggedInOnly = require('../middleware/userMiddleware');

router.use(restrictToLoggedInOnly); // All routes require login

router.post('/', bookRoom);
router.put('/:id/cancel', cancelBooking);
router.get('/my', getMyBookings);

module.exports = router;
