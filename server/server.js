const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const bodyParser = require('body-parser');
const env = process.env.NODE_ENV || 'development';
console.log("env*****", env);

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.set('view engine', 'html');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
// app.use(bodyParser.json());

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin','Welcome to the Chat!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'Welcome a new user to the chat!'));

  // socket.emit('newEmail', {
  //   from: 'someguy@mail.com',
  //   text: 'this is an email',
  //   createAt: 123
  // });
  //
  // socket.emit('newMessage', {
  //   from: 'someguy',
  //   text: 'this is a message',
  //   createAt: 123
  // });

  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail: ', newEmail);
  // });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage: ', message);
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback('created the message');
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime();
    // }
  });

  socket.on(('disconnect'), () => {
    console.log('User was disconnected');
  });

});

app.get('/', (req, res) => {
  res.send('index');
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
