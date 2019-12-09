import WebSocket from 'ws';
import stream from 'stream';
import { _Client_Hello } from './state.esm.js';

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', function open() {
  console.log(_Client_Hello);
  
  ws.send(_Client_Hello);
});

ws.on('message', function incoming(data) {
  console.log(data);
});