const Room = require('../model/roomModel');

// Create Room
// Create Room
const createRoom = async (req, res) => {
  try {
    const { roomNumber, roomType, price, status } = req.body;

    // ✅ Store only filename
    const image = req.file ? req.file.filename : '';

    const existingRoom = await Room.findOne({ roomNumber });
    if (existingRoom) return res.status(400).send("Room number already exists.");

    const room = await Room.create({ roomNumber, roomType, price, status, image });
    res.status(201).json(room);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating room.");
  }
};


// Get All Rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).send("Error fetching rooms.");
  }
};

// Get Single Room
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).send("Room not found.");
    res.status(200).json(room);
  } catch (err) {
    res.status(500).send("Error fetching room.");
  }
};

// Update Room
const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoom) return res.status(404).send("Room not found.");
    res.status(200).json(updatedRoom);
  } catch (err) {
    res.status(500).send("Error updating room.");
  }
};

// Delete Room
const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) return res.status(404).send("Room not found.");
    res.status(200).json({ message: "Room deleted successfully." });
  } catch (err) {
    res.status(500).send("Error deleting room.");
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom
};
