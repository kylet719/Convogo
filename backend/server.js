const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


const eventRouter = require('./routes/events');
const usersRouter = require('./routes/users');

app.use('/events', eventRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


//Socket.io stuff
const http = require('http');
const {Server} = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
})


io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`)

  socket.on("send_message", (data) => {
    console.log(data)
    socket.broadcast.emit("received_message", data)
  })

})

server.listen(5001, () => {
  console.log('listening on *:5001');
});


