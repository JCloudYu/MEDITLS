/**
 *	Author: JCloudYu
 *	Create: 2019/12/17
**/

import { BitwiseCompareBE } from 'beson/helper.esm.js';
import { Serialize } from 'beson/serialize.esm.js';
import { __HEADER } from './lib/__Header.esm.js';

class _StateMachine {
    constructor(name) {
		this._name = name;
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
    register(key) {
		console.log(`${key} :: Before register ===> `, __HEADER[key].Name, __HEADER[key].Header);

		this._state_map[key] = function() {
			this.push_state(__HEADER[key].Name, __HEADER[key].Header);
		};
		console.log(`${key} :: After register ===> prev_state:`, this.prev_state, 'curr_state:', this.curr_state, 'state_data', this.state_data, '|');
    }
    push_state(...args) {
    	this._prev_state = this._state;
		this._state = args[0];		
		this._state_header = args[1];
		console.log('push_state ====>', args, 'prev_state:', this._prev_state, 'state:', this._state);
    }
    get state() { return this._state; }
    set state(state) { this._state = '' + state; }
    run(...args) {
		if (args[0] === 'Initial') {
			this._state = __HEADER.Initial.Name;
			this._state_header = __HEADER.Initial.Header;
		}
		const processor = this._state_map[args[0]];
		
		console.log('run        ====>', args, this._state, this.curr_state, processor);
    	if ( !processor ) {
    		throw new Error( "Undetermined State!" );
    	}
    	
		const result = processor.call(this._shared_data, this._state_content = args[1]);
		console.log(this._shared_data.state_data);
		
		return result;
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
const client = new StateMachine('Client_Side');


// client.state = "Initial"; client._state_header = __HEADER.Initial; 
console.log(client);
client.register('Initial');
client.register('Client_Hello');
client.register('Client_Certificate');
console.log(client);




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

