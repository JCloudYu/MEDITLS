import http from 'http';

const option = {
    keepAlive: true,
    keepAliveMsecs: 1000,
    maxSockets: 256,
    maxFreeSockets: 256
}

const keepAliveAgent = new http.Agent(option);

http.get({
    hostname: 'localhost',
    port: 4000,
    path: '/',
    agent: keepAliveAgent 
  }, (res) => {
    console.log(res);
})
.on('error', (err) => {
    // Check if retry is needed
    if (req.reusedSocket && err.code === 'ECONNRESET') {
      retriableRequest();
    }
});
  


console.log(keepAliveAgent);


// options.agent = keepAliveAgent;
// http.request(options, onResponseCallback);