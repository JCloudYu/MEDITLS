/**
 *	Author: JCloudYu
 *	Create: 2019/12/17
**/
import { BitwiseCompareBE } from 'beson/helper.esm.js';
import { Serialize } from 'beson/serialize.esm.js';
import { __HEADER } from './lib/__Header.esm.js';

class _StateMachine {
    constructor(flow) {
		this._flow = flow;
		this._keys = Object.keys(flow);
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
		console.log('register', processor);
		console.log('register ==> key, processor', key);
		const nextIndex = this._keys.indexOf(key) + 1;

		if (nextIndex < this._keys.length) {
			const nextKey = keys[nextIndex];
			this._state_map[key] = this._flow[nextKey].processor;
		}

    }
    push_state(state_key, state_data) {
		console.log('push_state', state_key, state_data);
		
    	this._prev_state = this._state;
		this._state = state_key;
		this._state_data = state_data;
    }
    get state() { return this._state; }
	set state(state) { this._state = state; }
	
    run(...args) {
		const processor = this._state_map[this._state];
		console.log('run', this._state);
		
    	if ( !processor ) {
    		throw new Error( "Undetermined State!" );
    	}
    	
    	return processor.call(this._shared_data, ...args);
    }
}





export const StateMachine = new Proxy(_StateMachine, {
	construct: (target, args)=>{
		const inst = new Proxy(new target(...args), {
			apply: (target, args)=>{
				target.run(...args);
			}
		});
		
		return inst;
	}
});

const __CLIENT_FSM_FLow = Object.freeze({ 
	INITIAL: {
		processor: (params) => {
			
		},
		value: null
	},
	CLIENT_HELLO: {
		processor: (params) => {
			
		},
		value: __HEADER._Client_Hello
	},
	CLIENT_CERTIFICATE: {
		processor: (params) => {
			
		},
		value: __HEADER._Clinet_Certificate,
	},
	FINISHED_MESSAGE: {
		processor: (params) => {
			
		},
		value: __HEADER._Finished_Message
	}
})

// console.log('__CLIENT_FSM_FLow', __CLIENT_FSM_FLow);

let keys = Object.keys(__CLIENT_FSM_FLow)
// console.log(keys);

let nextIndex = keys.indexOf('CLIENT_CERTIFICATE') + 1
// console.log(nextIndex);

let nextItem = keys[nextIndex];

// console.log(nextItem);


const __SEVER_FSM_FLow = Object.freeze({ 
	INITIAL: {
		processor: null,
		value: null
	},
	SERVER_HELLO: {
		processor: null,
		value: __HEADER._Server_Hello
	},
	SERVER_CERTIFICATE_REQUEST: __HEADER._Server_Certificate_Request,
	SERVER_VERIFY_CERTIFCATE: __HEADER._Server_Verify_Certificate,
	FINISHED_MESSAGE: __HEADER._Finished_Message,
	DISCONNECTED: __HEADER._Disconnected
})

const __CLIENT_FSM = new StateMachine(__CLIENT_FSM_FLow);
const __SERVER_FSM = new StateMachine(__SEVER_FSM_FLow);



/**
 * Client State Machine
 */
__CLIENT_FSM.state = Object.keys(__CLIENT_FSM_FLow)[0];

__CLIENT_FSM.register(Object.keys(__CLIENT_FSM_FLow)[0], function(...args){	
	this._name = "Cloud";
	
	console.log(`The ${Object.keys(__CLIENT_FSM_FLow)[0]} STATE`, this.prev_state, this.state_data, args);
	this.push_state(Object.keys(__CLIENT_FSM_FLow)[1], null);
});


// console.log(__CLIENT_FSM);
// __CLIENT_FSM.register('CLIENT_HELLO', function(...args){
// 	console.log("CLIENT_HELLO State", this._name, this.prev_state, this.state_data, args);
// 	this.push_state('a', {a:1,b:2,c:3});
// });
// __CLIENT_FSM.register('b', function(...args) {
// 	console.log("B State", this._name, this.prev_state, this.state_data, args);
// 	this.push_state('terminate', {g:1,h:2,i:3});
// });
// __CLIENT_FSM.register('terminate', function(...args){
// 	console.log("Terminate State", this._name, this.prev_state, this.state_data, args);
// });



console.log( "run1" );
__CLIENT_FSM.run('run1', function name(params) {
	this._name = "Cloud";
	console.log("Initial State", this.prev_state, this.state_data, args);
	this.push_state('a', {a:1,b:2,c:3});
	
});

console.log( "\nrun2" );
__CLIENT_FSM.run('run2', 4, 5, 6);

// console.log( "\nrun3" );
// __CLIENT_FSM.run('run3', 7, 8, 9);

// console.log( "\nrun4" );
// __CLIENT_FSM.run('run4', 10, 11, 12);

// console.log( "\nrun5" );
// __CLIENT_FSM.run('run5', 13, 14, 15);

// console.log( "\nrun6" );
// __CLIENT_FSM.run('run6', 16, 17, 18);

