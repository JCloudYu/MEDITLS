/**
 * @author: Cheny
 * @create: 2020/02/17
 * 
 * @param {*} buffer 
 * @param {*} write_stream 
 */
import crypto from 'crypto';
import { Serializer, Deserializer } from "beson/beson.esm.js";
import { BitwiseCompareBE } from "beson/helper.esm.js";
import { __HEADER } from "./__Header.esm.js";
import { __Client_Hello, __Server_Hello } from "./Hello.esm.js"
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


	__Deserializer(buffer) {		
		let deserializer='';
		for(let i=0; i<this.state; i++) {
			if(i===0) {
				deserializer = Deserializer.init(buffer);
				console.log('__Deserializer', deserializer);	
			}
			deserializer = deserializer.read();
			console.log('__Deserializer', deserializer);			
		};
		return deserialize;
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