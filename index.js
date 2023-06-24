const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configuración de Express
app.use(express.static(__dirname + '/public'));

// Configuración de Socket.io
io.on('connection', (socket) => {
  console.log('Un nuevo usuario se ha conectado');

  socket.on('chat message', (message) => {
    console.log('Mensaje recibido:', message);
    if (message.type === 'text') {
      io.emit('chat message', { type: 'text', content: message.content });
    } else if (message.type === 'image') {
      io.emit('chat message', { type: 'image', content: message.content });
    }


    
  });

  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

// Iniciar el servidor
const port = 3000;
server.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
