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

   var formattedTime = moment(message.createdAt).format('h:mm a');
   var template = jQuery('#message-template').html();
   var html = Mustache.render(template, {
     text: message.text,
     from: message.from,
     createdAt: formattedTime
   });
   jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    createdAt: formattedTime,
    from: message.from
  })

  jQuery('#messages').append(html);
})

jQuery('#message-form').on('submit', function(e){
  e.preventDefault(); //prevents default behavior for event

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val('');
  })
})

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location');

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function() {
    //console.log('navigator.geolocation not functioning');
    alert('Unable to fetch location');
    locationButton.removeAttr('disabled').text('Send location');
  })

})
