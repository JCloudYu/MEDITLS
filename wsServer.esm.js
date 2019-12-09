import fs from 'fs';
import https from 'http';
import WebSocket from 'ws';
import { Deserialize } from "beson/deserialize.esm.js";
import { _Client_Hello, _Server_ACK } from './state.esm.js';

const server = https.createServer();
const wss = new WebSocket.Server({ server });


wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {        
        // console.log(message);
        
        message = Deserialize(message);
        let client = Deserialize(_Client_Hello);
        
        console.log( BitwiseCompareBE(message, client) );

        if (message instanceof Uint8Array) {
            console.log('received: %s', message);
        }
        
    });

    ws.send('something');
});

server.listen(8080, () => {
    console.log(`Linstening on port of 8080`);    
});