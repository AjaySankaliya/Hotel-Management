const Booking=require('../model/bookingModel')
const Room=require('../model/roomModel')


const bookRoom=async(req,res)=>{
    try {
        const {room,checkInDate,checkOutDate}=req.body
        const roomData=await Room.findById(room)

        if(!roomData || roomData.status !='available')
        {
            return res.status(400).send("Room not available")
        }

        const booking=await Booking.create({
            user:req.user._id,
            room,
            checkInDate,
            checkOutDate,
        })
        roomData.status='booked';
        await roomData.save();
        res.status(200).json(booking)
    } catch (err) {
        res.status(500).send("Booking failed");
    }
}


const cancelBooking=async(req,res)=>{
    try {
        const booking=await Booking.findOne({
            _id:req.params.id,
            user:req.user._id
        })
        if(!booking) return res.status(404).send("Booking not found")

        booking.status='cancelled'
        await booking.save()

        await Room.findByIdAndUpdate(booking.room,{status:'available'})

        res.json({message:"Booking cancelled"})
    }
    catch(err)
    {
        res.status(500).send("Cancellation failed")
    }
}


const getMyBookings=async(req,res)=>{
    try {
        const bookings=await Booking.find({user:req.user._id})
        .populate('room')
        .sort({createdAt:-1})

        res.json(bookings)
    } catch (err) {
        res.status(500).send("Failed to fetch bookings")
    }
}

module.exports={bookRoom,cancelBooking,getMyBookings};

