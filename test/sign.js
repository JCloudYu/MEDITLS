const crypto = require('crypto');
const sign = crypto.createSign('SHA256');
sign.update('some data to sign');



const client = crypto.generateKeyPairSync('ec', {
    namedCurve: 'secp256k1',
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    }
  });

const server = crypto.generateKeyPairSync('ec', {
    namedCurve: 'secp256k1',
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    }
});



const signature =sign.sign({key:alice.privateKey, passphrase:'top secret'}, 'hex');

console.log(signature);
