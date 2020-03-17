import fs from 'fs';
import { createHash, createECDH, createSign } from 'crypto';
import { Beson, Serializer } from "beson/beson.esm.js";
import { UniqueId } from "jsboost/unique-id.esm.js";
import { Buffer } from 'buffer';

const { UInt8, UInt16, Serialize } = Beson;




var current_date = (new Date()).valueOf().toString();
var random = Math.random().toString();
var sha1 = createHash('sha1').update(current_date + random).digest('hex');


let ecdh = createECDH('secp384r1'); 
ecdh.generateKeys();
const privateKey = `-----BEGIN PRIVATE KEY-----\n${ecdh.getPrivateKey('base64').match(/.{1,64}/g).join('\n')}\n-----END PRIVATE KEY-----`;
const publicKey = `-----BEGIN PUBLIC KEY-----\n${ecdh.getPublicKey('base64').match(/.{1,64}/g).join('\n')}\n-----END PUBLIC KEY-----`;


var pem = fs.readFileSync('cheny_asus.pub');
var key = pem.toString('ascii');

var sign = createSign('RSA-SHA256');
sign.write("This is the test document")
sign.end();
var signature = sign.sign(key, 'hex');


const data = [
	'3',
	new UniqueId().toString('hex'),
	Math.ceil(new Date().getTime()/1000),
	Math.ceil(new Date().getTime()/1000),
	new UniqueId().toString('hex'),
	'US',
	'Texas',
	'Houston',
	'SSL Corp',
	'SSL.com EV SSL Intermediate CA RSA R3',
	'US',
	'Texas',
	'Houston',
	'SSL Corp',
	new UniqueId().toString('hex'),
	'SSL.com EV SSL Intermediate CA RSA R3',
	'999999',
	'Private Organization',
	'3100 Richmond Ave',
	'Nevada',
	'US',
	'EC Encryption',
	256,
	sha1,
	publicKey,
	'1.2.840.113549.1.1.11',
	signature
]


// console.log(data);
let obj = {}
data.forEach((elm, index) => {
	obj[index] = elm;
})

let serialize = Serialize(obj);
console.log('serialize', serialize);



function roughSizeOfObject( object ) {

    var objectList = [];

    var recurse = function( value )
    {
        var bytes = 0;

        if ( typeof value === 'boolean' ) {
            bytes = 1;
        }
        else if ( typeof value === 'string' ) {
            bytes = value.length * 2;
        }
        else if ( typeof value === 'number' && value < 65536 ) {
            bytes = 2;
		}
		else if ( typeof value === 'number' && value > 65536 ) {
            bytes = 4;
        }
        else if
        (
            typeof value === 'object'
            && objectList.indexOf( value ) === -1
        )
        {
            objectList[ objectList.length ] = value;

            for( let i in value ) {
                bytes+= 8; // an assumed existence overhead
                bytes+= recurse( value[i] )
            }
        }

        return bytes;
    }

    return recurse( object );
}



console.log(roughSizeOfObject(obj));
