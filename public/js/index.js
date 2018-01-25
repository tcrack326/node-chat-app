const socket = io();

socket.on('connect', function () {
  console.log('Connected to Server at localhost:3000');

  // socket.emit('createEmail', {
  //   to: 'mike@test.com',
  //   text: 'hey whats up'
  // });

  socket.emit('createMessage', {
    from: 'someguy',
    text: 'hey whats up',
    createAt: 123
  }, function(message) {
    console.log('got the message: ', message);
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from Server at localhost:3000');
});

// socket.on('newEmail', function (email) {
//   console.log('New email: ', email);
// });

socket.on('newMessage', function (message) {
  console.log('New message: ', message);
  let li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
  console.log(e);
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function (result){
    console.log(result);
  });

});
