const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');

const app = express();

//initialize a simple http server
const server = http.createServer(app);

const wss = new WebSocketServer({ server });

/**
 * type Channel = {
 *   messages: Message[];
 *   name: string;
 * };
 */
const channels /* : Channel[] */ = [
  { name: 'Monica', messages: [] },
  { name: 'Erica', messages: [] },
  { name: 'Rita', messages: [] },
  { name: 'Tina', messages: [] },
  { name: 'Sandra', messages: [] },
  { name: 'Mary', messages: [] },
  { name: 'Jessica', messages: [] },
];

console.log('Starting the server...')

wss.on('request', ws => {
  console.log('Request triggered');
});

wss.on('connection', ws => {
  console.log('Client connected');

  ws.on('message', message => {
    try {
      const msgString = message.toString(); // Convert Buffer to string
      console.log('str', msgString)
      const { event, data } = JSON.parse(msgString);
      console.log('event', event)
      console.log('data', data)
      switch (event) {
        case 'join':
          ws.send(JSON.stringify({ event, data }));
          break;
        case 'request-channels':
          ws.send(JSON.stringify({ event: 'list-channels', data: { channels } }));
          break;
        case 'message':
          // TODO: get the channel
          const channelName = data.channel;
          const channel = channels.find(({ name }) => name === channelName);
          if (channel) {
            const yourChatMessage = { value: data.message, yours: true };
            const theirChatMessage = { value: `${data.message}? Well I'm convinced. Let's get married.`, yours: false };
            // add two messages to it
            channel.messages.push(yourChatMessage);
            channel.messages.push(theirChatMessage);
            // send back the response
            ws.send(JSON.stringify({ event, data: { message: theirChatMessage.value }}));
          }
          break;
        default:
          console.error(`Invalid event value:`, event, `Received:`, msgString)
      }
    } catch (e) {
      console.error(e)
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', error => {
    console.error('WebSocket error:', error);
  });
});

server.listen(80, () => {
  console.log(`Server started on port ${server.address().port} @ ${(new Date())}`);
});
