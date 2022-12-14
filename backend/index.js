const express = require('express');

const app = express();
const PORT = 4000;

const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const socketIO = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:5173'
  }
});

socketIO.on('connection', (socket) => {
  console.log(`⚡ : ${socket.id} user just connected!`);

  socket.emit('browse', async ({ url }) => {
    console.log(`Here is the URL >>> ${url}`);
  });

  socket.on('disconnect', () => {
    socket.disconnect();
    console.log(`🔥: A user disconnected`);
  });
});


app.get('/api', (req, res) => {
  res.json({
    message: 'Hello World'
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

