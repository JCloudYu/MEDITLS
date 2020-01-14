/**
 *	Author: JCloudYu
 *	Create: 2019/12/17
**/

import { BitwiseCompareBE } from 'beson/helper.esm.js';
import { Serialize } from 'beson/serialize.esm.js';
import { __HEADER } from './lib/__Header.esm.js';

class _StateMachine {
    constructor() {
    	this._prev_state = false;
        this._state = false;
		this._state_header = null;
		this._state_content = null;
        this._state_map = Object.create(null);
        this._shared_data = {};
        Object.defineProperties(this._shared_data, {
        	push_state: {
        		value: (...args) => this.push_state(...args),
        		configurable:false, writable:false, enumerable:true
        	},
        	prev_state: { get:() => this._prev_state, configurable:false, enumerable:true },
        	curr_state: { get:() => this._state, configurable:false, enumerable:true },
			state_data: { get:() => ({ 
					header: this._state_header,
					content: this._state_content
				}), 
				configurable:false, enumerable:true 
			}
        })
    }
    register(key, processor) {
		console.log('register', processor);
		
    	this._state_map[key] = processor;
    }
    push_state(...args) {
		console.log('push_state ====> ', ...args);
		
    	this._prev_state = this._state;
		this._state = args[0];		
		this._state_header = args[1];
		this._state_content = args[2];
    }
    get state() { return this._state; }
    set state(state) { this._state = '' + state; }
    run(...args) {
		console.log('run ====>', args, this._state, this.curr_state);
		
    	const processor = this._state_map[this._state];
    	if ( !processor ) {
    		throw new Error( "Undetermined State!" );
    	}
    	
    	return processor.call(this._shared_data, ...args);
    }
}




export const StateMachine = new Proxy(_StateMachine, {
	construct: (target, args)=>{
		const inst = new Proxy(new target(...args), {
			apply:(target, args)=>{
				target.run(...args);
			}
		});
		
		return inst;
	}
});




//console.log(StateMachine);
const client = new StateMachine();
//console.log(client);

client.state = "Initial"; client._state_header = __HEADER.Initial; 
client.register('Initial', function(...args){
	this._name = "Client_Side";
	console.log("Before:", this.prev_state, this.state_data, '| Args:', args, '|  __HEADER.Initial',  __HEADER.Initial);
	this.push_state(args[0], __HEADER.Initial, args[1]);
	console.log("After:", this._name, this.prev_state, this.state_data, '|');
	console.log("After:", this._name, this.curr_state, this.state_data, '|');
});
client.register('Client_Hello', function(...args){
	console.log("Before:", this._name, this.prev_state, this.state_data, '| Args:', args, '| __HEADER.Client_Hello', __HEADER.Client_Hello);	
	this.push_state(args[0], __HEADER.Client_Hello, args[1]);
	console.log("After:", this._name, this.prev_state, this.state_data, '|');
	console.log("After:", this._name, this.curr_state, this.state_data, '|');	
});
client.register('Clinent_', function(...args) {
	console.log("Before:", this._name, this.prev_state, this.state_data, '| Args:', args);
	this.push_state('terminate', {g:1,h:2,i:3});
});
client.register('terminate', function(...args){
	console.log("Terminate State", this._name, this.prev_state, this.state_data, args);
});



console.log( "Initial" );
client.run("Initial", null);

console.log( "\nrun2" );
client.run('Client_Hello', {abc: 'abcdefg'} );

console.log( "\nrun3" );
client.run('run3', 7, 8, 9);

console.log( "\nrun4" );
client.run('run4', 10, 11, 12);

console.log( "\nrun5" );
client.run('run5', 13, 14, 15);

console.log( "\nrun6" );
client.run('run6', 16, 17, 18);

