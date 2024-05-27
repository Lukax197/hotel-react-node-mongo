const mongoose = require("mongoose")

var mongoURL = 'mongodb://localhost:27017/hotelBooking'

mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewUrlParser: true})

var connection = mongoose.connection

connection.on('error', () => {
    console.log('MongoDB Connection failed')
})

connection.on('connected', () => {
    console.log('MongoDB Connection Successful')
})

module.exports = mongoose