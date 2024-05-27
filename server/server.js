const bodyParser = require('body-parser');
const credentials = require('./middlewares/credentials');
const corsOptions = require('./config/corsOptions');
const cors = require('cors');

const express = require("express")

const app = express()

app.use(credentials);
app.use(cors(corsOptions));

const dbConfig = require('./db')
const roomsRoute = require('./routes/roomsRoute')
const usersRoute = require('./routes/usersRoute')
const bookingsRoute = require('./routes/bookingsRoute')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)
app.use('/api/bookings', bookingsRoute)

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}!`))