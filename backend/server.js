const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const userRouter = require('./router/userRouter');
const roomRoutes = require('./router/roomRoutes');
const bookingRoutes = require('./router/bookingRoutes');
const adminRoutes = require('./router/adminRoutes');


require('dotenv').config();

const app = express();

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database connected"))
.catch((err) => console.log(err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/', userRouter);   
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

app.use('/admin', adminRoutes);


// Server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
