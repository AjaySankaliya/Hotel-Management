const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom
} = require('../controller/roomController');
const restrictToLoggedInOnly = require('../middleware/userMiddleware');
const adminOnly = require('../middleware/adminOnly');

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

// ✅ You missed this line
const upload = multer({ storage });

// Routes
router.post('/', restrictToLoggedInOnly, adminOnly, upload.single('image'), createRoom);
router.put('/:id', restrictToLoggedInOnly, adminOnly, updateRoom);
router.delete('/:id', restrictToLoggedInOnly, adminOnly, deleteRoom);
router.get('/', getAllRooms);
router.get('/:id', getRoomById);

module.exports = router;
