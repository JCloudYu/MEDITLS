/**
 * @author: Cheny
 * @create: 2020/02/17
 * 
 * @param {*} buffer 
 * @param {*} write_stream 
 */
import { Beson } from "beson/beson.esm.js";
import { BitwiseCompareBE } from "beson/helper.esm.js";
import { __HEADER } from './__Header.esm.js';

const { Serialize, Deserialize } = Beson;



//@export
function __Client_Hello(buffer, write_stream) {
   return Serialize(__HEADER.__Client_Hello);
}

function __Server_Hello(buffer, write_stream) {
	if(!buffer) return false;
	const isClient_Hello = Deserialize(buffer);	

	if( BitwiseCompareBE(__HEADER.__Client_Hello, isClient_Hello) === 0 ) {
		return Serialize(__HEADER.__Server_Hello);
	} 
	else {
		return false;
	}
}

function __Server_Certificate_Request(buffer, write_stream) {
	return Serialize(__HEADER.__Server_Certificate_Request);
}

//@endexport

export const Client_Hello = __Client_Hello;
export const Server_Hello = __Server_Hello;
export const Server_Certificate_Request = __Server_Certificate_Request;