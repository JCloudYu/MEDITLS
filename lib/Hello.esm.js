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


function __Client_Hello(write_stream) {
	this.serializer = this.serializer.write(__HEADER.__Client_Hello);		
	this.state = 2;
	return write_stream.write(this.serializer.buffer);
}
function __Server_Hello(buffer, write_stream) {
	if( !(buffer instanceof ArrayBuffer) ) return false;
	const deserializer = this.__Deserializer(buffer);	
	
	if( BitwiseCompareBE(__HEADER.__Client_Hello, deserializer) === 0 ) {
		this.serializer = this.serializer.write(__HEADER.__Server_Hello);
		this.state = 2;
		return write_stream.write(this.serializer.buffer);
	} 
	else {
		return false;
	}
}






export { __Client_Hello, __Server_Hello }