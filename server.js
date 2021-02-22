const express = require('express');
const app = express();

const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT | 9000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
// setting up from the server
io.on('connection', (socket) => {
  console.log('a user connected');

  // listing to event which was send from the client .on is for listening
  //the name shuld be same for instance if u have named message in the client it should be named as message not something else
  socket.on('message', (message) => {
    console.log(message);
    // send the msg

    // broadcast means it will send to all the user except the user who created it
    socket.broadcast.emit('message', message);
  });
});

http.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
