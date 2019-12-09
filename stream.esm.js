'use strict'

import http from 'http';
import util from 'util';
import { Duplex } from 'stream';


const server = http.createServer(connection);

async function connection(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World!');
    res.end();
}

server.on('connect', (req, cltSocket, head) => {
    // Connect to an origin server
    const { port, hostname } = new URL(`http://${req.url}`);
    const srvSocket = net.connect(port || 80, hostname, () => {
      cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                      'Proxy-agent: Node.js-Proxy\r\n' +
                      '\r\n');
      srvSocket.write(head);
      srvSocket.pipe(cltSocket);
      cltSocket.pipe(srvSocket);
    });
});

server.listen(8080);

// function DRTimeWLog(options) {
//     // allow use without new operator
//     if (!(this instanceof DRTimeWLog)) {
//         return new DRTimeWLog(options);
//     }
//     Duplex.call(this, options); // init
//     this.readArr = []; // array of times to read
  
//     // every second, add new time string to array
//     this.timer = setInterval(addTime, 1000, this.readArr);
// }
// util.inherits(DRTimeWLog, Duplex);
  

// /* add new time string to array to read */
// function addTime(readArr) {
//     readArr.push((new Date()).toString());
// }

// DRTimeWLog.prototype._read = function readBytes(n) {
//     var self = this;
//     while (this.readArr.length) {
//         var chunk = this.readArr.shift();
//         if (!self.push(chunk)) {
//             break; // false from push, stop reading
//         }
//     }
//     if (self.timer) { // continuing if have timer
//         // call readBytes again after a second has
//         // passed to see if more data then
//         setTimeout(readBytes.bind(self), 1000, n);
//     } else { // we are done, push null to end stream
//         self.push(null);
//     }
// };

// /* stops the timer and ends the read stream */
// DRTimeWLog.prototype.stopTimer = function () {
//     if (this.timer) clearInterval(this.timer);
//     this.timer = null;
// };
  
// /* for write stream just ouptut to stdout */
// DRTimeWLog.prototype._write =
//     function (chunk, enc, cb) {
//         console.log('write: ', chunk.toString());
//         cb();
// };

// // try out DRTimeWLog
// var duplex = new DRTimeWLog();
// console.log(duplex)
// duplex.on('readable', function () {
//     var chunk;
//     while (null !== (chunk = duplex.read())) {
//         console.log('read: ', chunk.toString());
//     }
// });
// duplex.write('Hello \n');
// duplex.write('World');
// duplex.end();

// // after 3 seconds stop the timer
// setTimeout(function () {
//   duplex.stopTimer();
// }, 3000);

