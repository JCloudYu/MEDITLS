/**
 *	Author: JCloudYu
 *	Create: 2019/07/16
**/
const {IndexedError} = ExtES;
export class HTTPRequestRejectError extends IndexedError {
	constructor(info_obj, detail=null, ...args) {
		const {headers={}, ...inits} = info_obj;
		super(inits, detail, ...args);
		
		Object.defineProperties(this, {
			headers: {
				configurable:false, writable:false, enumerable:false,
				value:Object.assign({}, headers)
			}
		});
	}
	get httpStatus() { return ((this.code/1000)|0)%1000; }
}
export class SystemError extends IndexedError {
	constructor(...args) {
		super(...args);
	}
}



