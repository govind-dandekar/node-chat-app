//will load when we load index.html

var socket = io(); //initiating request to open socket and keep open
//variable required to listen

function scrollToBottom () {
  //Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight(); //prev moves to previous child

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);//move to bottom of messages area
  }
} //run every time we send a new message

socket.on('connect', function() {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err) {
    if(err){
      alert(err);
      window.location.href = '/'; //redirect to root page
    } else {
      console.log('No error');
    }
  }); //client emits; server sets up rooms

});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

//users = array
socket.on('updateUserList', function(users) {
  var ol = jQuery('<ol></ol>');

  users.forEach(function(user) {
    ol.append(jQuery('<li></li>').text(user))
  })

  jQuery('#users').html(ol);
})

socket.on('newMessage', function(message) {

   var formattedTime = moment(message.createdAt).format('h:mm a');
   var template = jQuery('#message-template').html();
   var html = Mustache.render(template, {
     text: message.text,
     from: message.from,
     createdAt: formattedTime
   });
   jQuery('#messages').append(html);
   scrollToBottom();
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
  scrollToBottom();
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
