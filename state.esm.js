'use strict'

import { EventEmitter } from  'events';
import { BitwiseCompareBE } from 'beson/helper.esm.js';
import { Serialize } from 'beson/serialize.esm.js';
import { _ContentType, _Version, _Handshake } from './recordProtocolFormat.esm.js';


class _StateMachine {
    constructor() {
    	this._prev_state = false;
        this._state = false;
        this._state_data = null;
        this._state_map = Object.create(null);
        this._shared_data = {};
        Object.defineProperties(this._shared_data, {
        	push_state: {
        		value: (...args) => this.push_state(...args),
        		configurable:false, writable:false, enumerable:true
        	},
        	prev_state: { get:() => this._prev_state, configurable:false, enumerable:true },
        	curr_state: { get:() => this._state, configurable:false, enumerable:true },
        	state_data: { get:() => this._state_data, configurable:false, enumerable:true }
        })
    }
    register(key, processor) {
    	this._state_map[key] = processor;
    }
    push_state(state_key, state_data) {
    	this._prev_state = this._state;
		this._state = state_key;
		this._state_data = state_data;
    }
    get state() { return this._state; }
    set state(state) { this._state = '' + state; }
    run(...args) {
    	const processor = this._state_map[this._state];
    	if ( !processor ) {
    		throw new Error( "Undetermined State!" );
    	}
    	
    	return processor.call(this._shared_data, ...args);
    }
}

class FiniteStateMachines extends EventEmitter {
    constructor() {
        super();

    }

}

FiniteStateMachines.prototype.__HEADER = Object.freeze({ 
    _Client_Hello: new Uint8Array(
            [
                _ContentType.HANDSHAKE,
                _Version.MAJOR,
                _Version.MINOR,
                _Handshake.CLIENT_HELLO
            ]),

    _Server_ACK: new Uint8Array(
            [
                _ContentType.HANDSHAKE,
                _Version.MAJOR,
                _Version.MINOR,
                _Handshake.SERVER_ACK
            ]),

    _Certificate: new Uint8Array(
            [
                _ContentType.HANDSHAKE,
                _Version.MAJOR,
                _Version.MINOR,
                _Handshake.CERTIFICATE   
            ]),
    
    _Change_Cipher_Spec: new Uint8Array(
            [
                _ContentType.CHANGE_CIPHER_SPEC,
                _Version.MAJOR,
                _Version.MINOR,  
            ]),
})



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
console.log(a.__HEADER._Change_Cipher_Spec);


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
