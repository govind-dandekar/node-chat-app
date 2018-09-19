//will load when we load index.html

var socket = io(); //initiating request to open socket and keep open
//variable required to listen

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
    var li = jQuery('<li></li>'); //user to create an element then add to markup to make visible
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li); //render message to DOM -- add as last child
});

jQuery('#message-form').on('submit', function(e){
  e.preventDefault(); //prevents default behavior for event

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function() {

  })
})
