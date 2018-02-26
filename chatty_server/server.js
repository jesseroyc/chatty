const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');
const WebSocket = require('ws');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.broadcastData = function broadcastData(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.broadcastUserCount = function broadcastData() {
  wss.clients.forEach((client) => {

    let userCount = {
      type: 'clientCount',
      count: wss.clients.size,
    };

    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(userCount));
    }

  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');
  wss.broadcastUserCount();

  ws.on('error', () => console.log('error'));

  ws.on('message', function incoming(message) {
    let messageObj = JSON.parse(message);
    messageObj.id = uuid.v4();
    wss.broadcastData(JSON.stringify(messageObj));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    wss.broadcastUserCount();
  });
});