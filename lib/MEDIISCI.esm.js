/**
 * @author: Cheny
 * @create: 2020/02/17
 * 
 * @param {*} buffer 
 * @param {*} write_stream 
 */
import crypto from 'crypto';
import { Beson, Serializer, Deserializer } from "beson/beson.esm.js";
import { BitwiseCompareBE } from "beson/helper.esm.js";
import { __HEADER } from "./__Header.esm.js";
import { __Client_Hello, __Server_Hello } from "./Hello.esm.js"
import { __Client_Send_publicKey, __Server_Send_publicKey } from "./Certificate.esm.js"
import { deserialize } from 'v8';


class MEDIISCI {
    constructor(state, serializer) {
		Object.defineProperties(this, {
			'state': {
				value: state,
				writable: true,
				configurable: false,
				enumerable: true
			},
			'serializer': {
				value: serializer,
				writable: true,
				configurable: false,
				enumerable: true
			},
			'ecdh': {
				value: crypto.createECDH('secp521r1'),
				writable: false,
				configurable: false,
				enumerable: true
			},
			'other_publicKey': {
				value: null,
				writable: false,
				configurable: false,
				enumerable: true
			}
		})
	}

	Client_Hello = __Client_Hello;
	Server_Hello = __Server_Hello;

	Client_Send_publicKey = __Client_Send_publicKey;
	Server_Send_publicKey = __Server_Send_publicKey;


	//It will change to array in future
	__Cerificate_Format(params) {
		return {
			Issued_Certificate: {
				Version: 3,
				Serial_Number: '72:14:11:D3:D7:E0:FD:02:AA:B0:4E:90:09:D4:DB:31',
				Not_Before: 'Mar 6 00:00:00 1996 GMT',
				Not_After: 'Mar 5 23:59:59 2020 GMT'
			},
			Issuer: {
				Country_or_Region: 'US',
				State_or_Province: 'Texas',
				Locality: 'Houston',
				Organization: 'SSL Corp',
				Common_Name: 'SSL.com EV SSL Intermediate CA RSA R3'
			},
			subject_Name: {
				Country_or_Region: 'US',
				State_or_Province: 'Texas',
				Locality: 'Houston',
				Organization: 'SSL Corp',
				Serial_Number: 'NV20081614243',
				Common_Name: 'www.ssl.com',
				Postal_Code: '77098',
				Business_Category: 'Private Organization',
				Street_Address: '3100 Richmond Ave',
				Inc_State_or_Province: 'Nevada',
				Inc_Country_or_Region: 'US'
			},
			Public_Key_Info: {
				Key_Algorithm: 'EC Encryption',				
				Key_Size: 256,
				Key_SHA1_Fingerprint: '',
				Public_Key: '',
			},
			Signature: {
				Algorithm:	'1.2.840.113549.1.1.11',
				Signature: ''
			}
		}
	}

	

	isBuffer(buffer) {
		buffer = Beson.Deserialize(buffer);
		if( !(buffer instanceof ArrayBuffer) ) return false;
	}

	static Init(write_stream) {
		const state = 1;
		const serializer = write_stream.init();
		
		
		return new MEDIISCI(state, serializer)
	}
}



// function __Client_Hello(write_stream) {
// 	console.log('hihi', this);	
// 	MEDIISCI.serializer = MEDIISCI.serializer.write(__HEADER.__Client_Hello);
// 	console.log(this.serializer);	
// 	this.state = 2;
// 	write_stream.write(this.serializer.buffer);
// }
// function _Server_Hello(state, buffer, write_stream) {
// 	if( !(buffer instanceof ArrayBuffer) ) return false;
// 	Init.call(this);
// 	const deserializer = Deserializer.init().read();	
	
// 	if( BitwiseCompareBE(__HEADER.__Client_Hello, deserializer) === 0 ) {
// 		const serializer = Serializer.init().write(__HEADER.__Server_Hello);
// 		console.log(serializer.buffer);
// 		write_stream.write(serializer.buffer);
// 		this.state = 2;
// 	} 
// 	else {
// 		return false;
// 	}
// }

// function Server_Certificate_Request(buffer, write_stream) {
// 	return Serialize(__HEADER.__Server_Certificate_Request);
// }



export { MEDIISCI }