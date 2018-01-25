var socket = io();

socket.on('connect', function () {
  console.log('Connected to Server at localhost:3000');

  socket.emit('createEmail', {
    to: 'mike@test.com',
    text: 'hey whats up'
  });

  socket.emit('createMessage', {
    to: 'someguy',
    text: 'hey whats up',
    createAt: 123
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from Server at localhost:3000');
});

socket.on('newEmail', function (email) {
  console.log('New email: ', email);
});

socket.on('newMessage', function (message) {
  console.log('New message: ', message);
});
