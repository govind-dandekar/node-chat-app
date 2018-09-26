const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app); //already using in app.listen()
var io = socketIO(server);
//need to configure server to user Socket.io
//can do anything we want on IO in terms of connections, emitting and receiving events


app.use(express.static(publicPath));

//register event listener upon connection
io.on('connection', (socket) => {
  console.log('New user connected');

  //socket.emit -- message to user from admin with text 'Welcome to the chat app'
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  //socket.broadcast.emit -- from Admit text: 'new user joined' -- from, text, createdAt
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

  socket.on('createMessage', (message, callback) => {
    console.log('Server received a new message', message)
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback();
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  })

})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`)
}); //now user HTTP server (not app)
