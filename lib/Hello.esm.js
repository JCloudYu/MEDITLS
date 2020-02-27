/**
 * @author: Cheny
 * @create: 2020/02/17
 * 
 * @param {*} buffer 
 * @param {*} write_stream 
 */
import { Serializer } from "beson/serializer.esm.js";
import { BitwiseCompareBE } from "beson/helper.esm.js";
import { __HEADER } from './__Header.esm.js';
import { log } from "util";



function Init(state) {
	this.state = state;
}
function Client_Hello(state, buffer, write_stream) {
	Init.call(this);
	const serializer = Serializer.init().write(__HEADER.__Client_Hello);
	console.log(serializer.buffer);
	
	this.state = 2;
	this.buffer = write_stream.write(serializer.buffer);
}
function Server_Hello(state, buffer, write_stream) {
	if( !(buffer instanceof ArrayBuffer) ) return false;
	Init.call(this);
	const deserializer = Deserializer.init().read();	
	
	if( BitwiseCompareBE(__HEADER.__Client_Hello, deserializer) === 0 ) {
		const serializer = Serializer.init().write(__HEADER.__Server_Hello);
		console.log(serializer.buffer);
		write_stream.write(serializer.buffer);
		this.state = 2;
	} 
	else {
		return false;
	}
}

function Server_Certificate_Request(buffer, write_stream) {
	return Serialize(__HEADER.__Server_Certificate_Request);
}



export { Client_Hello, Server_Hello, Server_Certificate_Request }