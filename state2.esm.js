'use strict'

import { EventEmitter } from  'events';
import { BitwiseCompareBE } from "beson/helper.esm.js";
import { Serialize } from 'beson/serialize.esm.js';
import { _ContentType, _Version, _Handshake } from './lib/__RrecordProtocolFormat.esm.js/index.js.js';



class FiniteStateMachines extends EventEmitter {
    constructor() {
        super();

    }


}


Object.defineProperties(FiniteStateMachines.prototype, {
    _Client_Hello: {
        value: new Uint8Array(
            [
                _ContentType.HANDSHAKE,
                _Version.MAJOR,
                _Version.MINOR,
                _Handshake.CLIENT_HELLO
            ]),
        writable: false,
        configurable: false
    },

    _Server_ACK: {
        Value: new Uint8Array(
            [
                _ContentType.HANDSHAKE,
                _Version.MAJOR,
                _Version.MINOR,
                _Handshake.SERVER_ACK
            ]),
        writable: false,
        configurable: false
    },

    _Certificate: {
        Value: new Uint8Array(
            [
                _ContentType.HANDSHAKE,
                _Version.MAJOR,
                _Version.MINOR,
                _Handshake.CERTIFICATE   
            ]),
        writable: false,
        configurable: false
    },

    _Certificate: {
        Value: new Uint8Array(
            [
                _ContentType.HANDSHAKE,
                _Version.MAJOR,
                _Version.MINOR,
                _Handshake.CERTIFICATE   
            ]),
        writable: false,
        configurable: false
    },
    
    _Change_Cipher_Spec: {
        Value: new Uint8Array(
            [
                _ContentType.CHANGE_CIPHER_SPEC,
                _Version.MAJOR,
                _Version.MINOR,  
            ]),
        writable: false,
        configurable: false
    }
})

const a = new FiniteStateMachines();
console.log(
 a);


export const _Client_Hello = Serialize(new Uint8Array(
    [
        _ContentType.HANDSHAKE,
        _Version.MAJOR,
        _Version.MINOR,
        _Handshake.CLIENT_HELLO
    ]) );

export const _Server_ACK = Serialize(new Uint8Array(
    [
        _ContentType.HANDSHAKE,
        _Version.MAJOR,
        _Version.MINOR,
        _Handshake.SERVER_ACK
    ]) );
