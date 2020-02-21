/**
 *	Author: JCloudYu
 *	Create: 2020/01/30
**/
const LogLevel = {
	SILENT: 0,
	DEBUG:	1,
	INFO:	2,
	WARN:	3,
	ERROR:	4,
	SILLY:	5
};
const LogSource = Object.freeze({
	log(level, message) {
		switch(level) {
			case LogLevel.DEBUG:
				console.debug(message);
				break;
			
			case LogLevel.INFO:
				console.log(message);
				break;
			
			case LogLevel.WARN:
				console.warn(message);
				break;
				
			case LogLevel.ERROR:
				console.error(message);
				break;
			
			default:
				break;
		}
	}
});


const _PRIVATES = new WeakMap();
class LogInterface {
	_log(level, message) {
		if ( level < LogLevel.DEBUG || level > LogLevel.ERROR ) return;
	
		const {indent, source} = _PRIVATES.get(this);
		const indention = '    '.repeat(indent);
		source.log(level, (''+message).split('\n').map((item)=>indention+item).join('\n'));
	}
	debug(message) {
		this._log(LogLevel.DEBUG, message);
	}
	log(message) {
		this._log(LogLevel.INFO, message);
	}
	info(message) {
		this._log(LogLevel.INFO, message);
	}
	warn(message) {
		this._log(LogLevel.WARN, message);
	}
	error(message) {
		this._log(LogLevel.ERROR, message);
	}
	
	
	
	indent() {
		const {indent, source} = _PRIVATES.get(this);
		return CreateLogInterface({source, indent:indent+1});
	}
}

function CreateLogInterface({source, indent}) {
	const i_logger = new LogInterface();
	_PRIVATES.set(i_logger, {source, indent});
	return i_logger;
}




/**
 * @global
 * @type {LogInterface}
**/
const logger = global.logger = CreateLogInterface({
	source:LogSource, indent:0
});
