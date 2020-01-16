'use strict'

import { EventEmitter } from  'events';
import { BitwiseCompareBE } from "beson/helper.esm.js";
import { Serialize } from 'beson/serialize.esm.js';
import { __Header, __StateMachine } from './lib/index.esm.js';


//console.log(StateMachine);
const client = new __StateMachine('Client_Side');


// client.state = "Initial"; client._state_header = __HEADER.Initial; 
console.log('__proto__', client.__proto__);
client.register('Initial');
client.register('Client_Hello');
client.register('Client_Certificate');
console.log('__proto__', client.__proto__);




// console.log( "Initial" );
client.run("Initial", {a:1});

// console.log( "\nrun2" );
client.run('Client_Hello', {abc: 'abcdefg'} );

// console.log( "\nrun3" );
// client.run('run3', 7, 8, 9);

// console.log( "\nrun4" );
// client.run('run4', 10, 11, 12);

// console.log( "\nrun5" );
// client.run('run5', 13, 14, 15);

// console.log( "\nrun6" );
// client.run('run6', 16, 17, 18);



// class FiniteStateMachines extends EventEmitter {
//     constructor() {
//         super();

//     }


// }


// Object.defineProperties(FiniteStateMachines.prototype, {
//     _Client_Hello: {
//         value: new Uint8Array(
//             [
//                 _ContentType.HANDSHAKE,
//                 _Version.MAJOR,
//                 _Version.MINOR,
//                 _Handshake.CLIENT_HELLO
//             ]),
//         writable: false,
//         configurable: false
//     },

//     _Server_ACK: {
//         Value: new Uint8Array(
//             [
//                 _ContentType.HANDSHAKE,
//                 _Version.MAJOR,
//                 _Version.MINOR,
//                 _Handshake.SERVER_ACK
//             ]),
//         writable: false,
//         configurable: false
//     },

//     _Certificate: {
//         Value: new Uint8Array(
//             [
//                 _ContentType.HANDSHAKE,
//                 _Version.MAJOR,
//                 _Version.MINOR,
//                 _Handshake.CERTIFICATE   
//             ]),
//         writable: false,
//         configurable: false
//     },

//     _Certificate: {
//         Value: new Uint8Array(
//             [
//                 _ContentType.HANDSHAKE,
//                 _Version.MAJOR,
//                 _Version.MINOR,
//                 _Handshake.CERTIFICATE   
//             ]),
//         writable: false,
//         configurable: false
//     },
    
//     _Change_Cipher_Spec: {
//         Value: new Uint8Array(
//             [
//                 _ContentType.CHANGE_CIPHER_SPEC,
//                 _Version.MAJOR,
//                 _Version.MINOR,  
//             ]),
//         writable: false,
//         configurable: false
//     }
// })

// const a = new FiniteStateMachines();
// console.log(
//  a);


// export const _Client_Hello = Serialize(new Uint8Array(
//     [
//         _ContentType.HANDSHAKE,
//         _Version.MAJOR,
//         _Version.MINOR,
//         _Handshake.CLIENT_HELLO
//     ]) );

// export const _Server_ACK = Serialize(new Uint8Array(
//     [
//         _ContentType.HANDSHAKE,
//         _Version.MAJOR,
//         _Version.MINOR,
//         _Handshake.SERVER_ACK
//     ]) );
