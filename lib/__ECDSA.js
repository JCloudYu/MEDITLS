var os = require('os');
if (os.platform() == 'win32') {  
    if (os.arch() == 'ia32') {
        var chilkat = require('@chilkat/ck-node11-win-ia32');
    } else {
        var chilkat = require('@chilkat/ck-node11-win64'); 
    }
} else if (os.platform() == 'linux') {
    if (os.arch() == 'arm') {
        var chilkat = require('@chilkat/ck-node11-arm');
    } else if (os.arch() == 'x86') {
        var chilkat = require('@chilkat/ck-node11-linux32');
    } else {
        var chilkat = require('@chilkat/ck-node11-linux64');
    }
} else if (os.platform() == 'darwin') {
    var chilkat = require('@chilkat/ck-node11-macosx');
}

function chilkatExample() {

    // This example requires the Chilkat API to have been previously unlocked.
    // See Global Unlock Sample for sample code.

    // To create an ECDSA signature, the data first needs to be hashed.  Then the hash
    // is signed.

    // Use Chilkat Crypt2 to generate a hash for any of the following
    // hash algorithms: SHA256, SHA384, SHA512, SHA1, MD5, MD2, HAVAL, RIPEMD128/160/256/320

    var crypt = new chilkat.Crypt2();
    crypt.HashAlgorithm = "SHA256";
    crypt.Charset = "utf-8";
    crypt.EncodingMode = "base64";

    // Hash a string.
    var hash1 = crypt.HashStringENC("The quick brown fox jumps over the lazy dog");
    console.log("hash1 = " + hash1);

    // Or hash a file..
    var hash2 = crypt.HashFileENC("qa_data/hamlet.xml");
    console.log("hash2 = " + hash2);

    // (The Crypt2 API provides many other ways to hash data..)

    // -----------------------------------------------------------
    // An ECDSA private key is used for signing.  The public key is for signature verification.
    // Load our ECC private key.
    // Our private key file contains this:

    // 	// -----BEGIN PRIVATE KEY-----
    // 	MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQg3J8q/24D1sEKGdP9
    // 	72MGYElLGpw/a56Y3t6pfON3uhShRANCAATlSmoizyhAwoYZAOuFBATl07/1RR54
    // 	a1Dzfm16grxJe666AGKR+bSs24hk7TEpaeCTvT8YOOM3l+xKFg7zq6Q9
    // 	-----END PRIVATE KEY-----

    var privKey = new chilkat.PrivateKey();
    var success = privKey.LoadPemFile("qa_data/ecc/secp256r1-key-pkcs8.pem");
    if (success !== true) {
        console.log(privKey.LastErrorText);
        return;
    }

    // We'll need a PRNG source for random number generation.
    // Use Chilkat's PRNG (for the Fortuna PRNG algorithm).
    var prng = new chilkat.Prng();

    // Sign the hash..
    var ecdsa = new chilkat.Ecc();
    var ecdsaSigBase64 = ecdsa.SignHashENC(hash1,"base64",privKey,prng);
    if (ecdsa.LastMethodSuccess !== true) {
        console.log(ecdsa.LastErrorText);
        return;
    }

    console.log("ECDSA signature = " + ecdsaSigBase64);

    // -----------------------------------------------------------
    // Now let's verify the signature using the public key.

    var pubKey = new chilkat.PublicKey();
    success = pubKey.LoadFromFile("qa_data/ecc/secp256r1-pubkey.pem");
    if (success !== true) {
        console.log(pubKey.LastErrorText);
        return;
    }

    var result = ecdsa.VerifyHashENC(hash1,ecdsaSigBase64,"base64",pubKey);
    if (result == 1) {
        console.log("Signature is valid.");
        return;
    }

    if (result == 0) {
        console.log("Signature is invalid.");
        return;
    }

    if (result < 0) {
        console.log(ecdsa.LastErrorText);
        console.log("The VerifyHashENC method call failed.");
        return;
    }


}

chilkatExample();