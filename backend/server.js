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
const chatRouter = require('./routes/chats');

app.use('/events', eventRouter);
app.use('/users', usersRouter);
app.use('/chats', chatRouter);

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

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log("Emitting " + data + " to " + data.chatroom)
    socket.broadcast.emit("received_message", data)
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });

})

server.listen(5001, () => {
  console.log('listening on *:5001');
});


