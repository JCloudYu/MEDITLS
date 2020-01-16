/**
 *	Author: JCloudYu
 *	Create: 2019/12/17
**/
class _StateMachine {
    constructor() {
    	this._prev_state = false;
        this._state = false;
        this._state_data = null;
        this._state_map = Object.create(null);
        this._shared_data = {};
        Object.defineProperties(this._shared_data, {
        	push_state: {
        		value:(...args)=>this.push_state(...args),
        		configurable:false, writable:false, enumerable:true
        	},
        	prev_state: { get:()=>this._prev_state, configurable:false, enumerable:true },
        	curr_state: { get:()=>this._state, configurable:false, enumerable:true },
        	state_data: { get:()=>this._state_data, configurable:false, enumerable:true }
        })
    }
    register(key, processor) {
		console.log('register', processor);
		
    	this._state_map[key] = processor;
    }
    push_state(state_key, state_data, ...args) {
		console.log('push_state ====>', args);
		
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
const item = new StateMachine();
//console.log(item);


item.state = 'initial';
item.register('initial', function(...args){
	this._name = "Cloud";
	console.log("Initial State", this.prev_state, this.state_data, args);
	this.push_state('a', {a:1,b:2,c:3});
});
item.register('a', function(...args){
	console.log("A State", this._name, this.prev_state, this.state_data, args);
	this.push_state('a', {a:1,b:2,c:3});
});
item.register('b', function(...args) {
	console.log("B State", this._name, this.prev_state, this.state_data, args);
	this.push_state('terminate', {g:1,h:2,i:3});
});
item.register('terminate', function(...args){
	console.log("Terminate State", this._name, this.prev_state, this.state_data, args);
});



console.log( "run1" );
item.run('run1', 1, 2, 3);

console.log( "\nrun2" );
item.run('run2', 4, 5, 6);

console.log( "\nrun3" );
item.run('run3', 7, 8, 9);

console.log( "\nrun4" );
item.run('run4', 10, 11, 12);

console.log( "\nrun5" );
item.run('run5', 13, 14, 15);

console.log( "\nrun6" );
item.run('run6', 16, 17, 18);

