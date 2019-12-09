const http = require('http');
const net = require('net');
const { URL } = require('url');

// Create an HTTP tunneling proxy
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});

server.on('connection', function (socket) {
    // Add a newly connected socket
    console.log(socket);
    

    // Remove the socket when it closes
    socket.on('close', function () {
        console.log('close');
        
    });

    // Extend socket lifetime for demo purposes
    socket.setTimeout(4000);
});

// Now that proxy is running

server.listen(4000);
