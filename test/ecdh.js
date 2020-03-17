const crypto = require('crypto');
const ec_pem = require('ec-pem');
 
let alice_pem_private, alice_pem_public;
{
    let curve = 'secp521r1'
    let alice = crypto.createECDH(curve);
    alice.generateKeys();
    alice = ec_pem(alice, curve);
    
    alice_pem_private = alice.encodePrivateKey();
    console.log(alice_pem_private);
    
    alice_pem_public = alice.encodePublicKey();
    console.log(alice_pem_public);
}
 
 
const data = Buffer.from('a message to sign');
 
let signature;
{
    const sign = crypto.createSign('sha512');
    sign.update(data);
    signature = sign.sign(alice_pem_private);
    console.log(signature.toString('hex'))
}
 
 
{
    const verify = crypto.createVerify('sha512');
    verify.update(data);
    const matched = verify.verify(alice_pem_public, signature);
    console.log({matched})
    if (!matched)
        throw new Error("Verification failed");
}


