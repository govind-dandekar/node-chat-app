//will load when we load index.html

var socket = io(); //initiating request to open socket and keep open
//variable required to listen

socket.on('connect', function() {
  console.log('Connected to server');

  socket.emit('createMessage', {
      from: 'Govind',
      text: 'test message'
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log(message);
})
