/**
 * @author: Cheny
 * @create: 2020/02/17
 * 
 * @param {*} buffer 
 * @param {*} write_stream 
 */
import crypto from 'crypto';
import { Serializer } from "beson/beson.esm.js";
import { BitwiseCompareBE } from "beson/helper.esm.js";
import { __HEADER } from './__Header.esm.js';





//@export
function __Client_Send_publicKey (buffer, write_stream) {
	if( !(buffer instanceof ArrayBuffer) ) return false;
	const deserializer = this.__Deserializer(buffer);	
	
	if( BitwiseCompareBE(__HEADER.__Server_Hello, deserializer) === 0 ) {
		const ecdh_publicKey = ecdh.generateKeys();		
		this.serializer = this.serializer.write(__HEADER.__Clinet_Certificate);
		this.serializer = this.serializer.write(ecdh_publicKey);
		this.state = 3;
		return write_stream.write(this.serializer.buffer);
	} 
	else {
		return false;
	}
}
function __Server_Send_publicKey (buffer, write_stream) {
	if( !(buffer instanceof ArrayBuffer) ) return false;
	const deserializer = this.__Deserializer(buffer);	
	
	if( BitwiseCompareBE(__HEADER.__Clinet_Certificate, deserializer) === 0 ) {
		const ecdh_publicKey = ecdh.generateKeys();		
		this.serializer = this.serializer.write(__HEADER.__Server_Certificate);
		this.serializer = this.serializer.write(ecdh_publicKey);
		this.state = 3;
		return write_stream.write(this.serializer.buffer);
	} 
	else {
		return false;
	}
}

// async function __Server_Send_publicKey(buffer, write_stream) {
// 	const ecdh = crypto.createECDH('secp521r1');
// 	const ecdh_publicKey = ecdh.generateKeys();
// 	return write_stream.write(ecdh_publicKey)
// }

// function __Client_Generate_SecretKey(buffer, write_stream) {
// 	const server_publicKey = Deserialize(buffer);
// 	const secretKey = computeSecret(server_publicKey);
// 	return write_stream.write(secretKey)
// }

// function __Server_Generate_SecretKey(buffer, write_stream) {
// 	const client_publicKey = Deserialize(buffer);
// 	const secretKey = computeSecret(client_publicKey);
// 	return write_stream.write(secretKey)
// }

//@endexport


export { __Client, __Server }