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

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  })
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`)
}); //now user HTTP server (not app)
