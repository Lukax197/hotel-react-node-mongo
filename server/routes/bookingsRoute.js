const express = require("express")
const router = express.Router()
const Booking = require("../models/booking")
const Room = require("../models/room")

router.post('/bookroom', async(req, res) => {
    const {room, userId, fromDate, toDate, totalAmount, totalDays} = req.body

    try {
        const newBooking = new Booking({
            room: room.name,
            roomId: room._id,
            userId,
            fromDate,
            toDate,
            totalAmount,
            totalDays
        })

        const booking = await newBooking.save()

        const roomTemp = await Room.findOne({_id: room._id})
        roomTemp.currentbookings.push({
            bookingId: booking._id, 
            fromDate: fromDate, 
            toDate: toDate,
            userId: userId,
            status: booking.status
        })

        await roomTemp.save()

        res.send('Room booked successfully')
    } catch (error) {
        return res.status(400).json({error})
    }
})

router.post('/getbookingsbyuserid', async(req, res) => {
    const userId = req.body.userId

    try {
        const bookings = await Booking.find({userId: userId})
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({error})
    }
})

router.post('/cancelbooking', async(req, res) => {
    const {bookingId, roomId} = req.body

    try {
        const booking = await Booking.findOne({_id: bookingId})
        booking.status = 'Zamknięte'
        await booking.save()

        const room = await Room.findOne({_id: roomId})
        const bookings = room.currentbookings

        const temp = bookings.filter(booking => booking.bookingId.toString() !== bookingId)
        room.currentbookings = temp
        await room.save()

        res.send('Your booking cancelled successfully')
    } catch (error) {
        return res.status(400).json({error})
    }
})

module.exports = router