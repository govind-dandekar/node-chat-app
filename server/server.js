const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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
  socket.emit('newMessage', {
    from: "admin",
    text: "Welcome to the chat app!",
    createdAt: new Date().getTime()
  })

  //socket.broadcast.emit -- from Admit text: 'new user joined' -- from, text, createdAt
  socket.broadcast.emit('newMessage', {
    from: 'admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  })

  socket.on('createMessage', (message) => {
    console.log('Server received a new message', message)
    //io.emit -- emits to every single connection
    // socket.broadcast.emit('newMessage', {
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    // })
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  })


  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  })

})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`)
}); //now user HTTP server (not app)
