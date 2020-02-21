/**
 *	Author: JCloudYu
 *	Create: 2019/05/27
**/
import http from "http";
import { ParseURLPathDescriptor } from "jsboost/web/uri-parser.esm.js"

import { CheckDataSystemVersion } from "/kernel-info.esm.js";
import { Config } from "/kernel/config.esm.js";

import {
	Init as InitRequestHandler,
	CleanUp as CleanUpRequestHandler,
	Handle as HandleRequest,
	HandleSystemError
} from "/handler/_.esm.js";






(async()=>{
	const { server:SERVER_INFO, database:DATA_SOURCE } = Config;

	const { default:Mongo } = await import( '/lib/mongodb.esm.js' );
	const uri = `mongodb://${DATA_SOURCE.host}:${DATA_SOURCE.port}`;
	await Mongo.Connect(uri, DATA_SOURCE.db_name);
	global.__consultation = await Mongo[DATA_SOURCE.db_name].collection(DATA_SOURCE.collection[0]);
	console.log(__consultation)

	
	// NOTE: Compare version to prevent incompatible versions between data and project
	if ( !CheckDataSystemVersion() ) return;
	
	
	
	// NOTE: Initializing data source environment
	logger.info( "Trying to initialize application runtime environment..." );
	let AppRuntime = null;
	try {
		AppRuntime = await import("/index.runtime.esm.js");
	}
	catch(e) {}
	
	if ( AppRuntime ) {
		if ( AppRuntime.Init ) {
			await AppRuntime.Init();
		}
		
		logger.info( "Application runtime environment initialized!" );
	}
	
	
	
	
	
	
	// NOTE: Initialize api modules
	logger.info( `Initializing request handler...` );
	await InitRequestHandler();
	
	

	// NOTE: Create server
	logger.info( `Creating server instance...` );
	const SERVER = http.createServer((req, res)=>{
		let {path, query, fragment} = ParseURLPathDescriptor(req.url||"/");
		
		
		// INFO: Resolve current request's information
		{
			const req_headers = req.headers;
			const now = Date.now();
		
			Object.defineProperty(req, 'info', {
				configurable:false, writable:false, enumerable:true,
				value: Object.assignConstants({}, {
					host: req_headers['x-forwarded-host']||req_headers['host']||null,
					protocol: req_headers['x-forwarded-proto']||'http',
					remote_ip: req_headers['x-real-ip']||req.socket.remoteAddress,
					
					// Note that the req.url is able to be manipulated
					url: { raw:req.url, path, query, fragment },
					time: Math.floor(now/1000),
					time_milli:now
				})
			});
		}
		
		
		
		// NOTE: Handle incoming request with corresponding handler
		Promise.resolve()
		.then(()=>HandleRequest(req, res))
		.catch((err)=>HandleSystemError(req, res, err))
		.finally(async()=>{
			if ( req.readable ) {
				await ((input_stream)=>new Promise((resolve, reject)=>{
					input_stream.on('end', resolve).on('error',reject).on('data',()=>{});
				}))(req);
			}
		
			if ( !(res.writableFinished||res.finished) ) {
				res.end();
			}
		});
	})
	.on('error', (e) => {
		if (e.code === 'EADDRINUSE') {
			SERVER.close();
			logger.error( `Cannot bind server onto ${SERVER_INFO.host}:${SERVER_INFO.port}!` );
			setTimeout(()=>process.emit('SIGNAL_TERMINATION'));
			return;
		}
		
		throw e;
	})
	.on('clientError', (err, socket) => {
		socket.end( 'HTTP/1.1 400 Bad Request\r\n\r\n' );
	});
	
	
	
	// NOTE: Start listening
	logger.info( `Binding server...` );
	SERVER.listen(SERVER_INFO.port, SERVER_INFO.host, ()=>{
		logger.info( `Server is now listening at ${SERVER_INFO.host}:${SERVER_INFO.port}...` );
	});
	
	
	process
	.on( 'SIGNAL_INTERRUPTION', ()=>{})
	.on( 'SIGNAL_TERMINATION', async()=>{
		logger.info( `Cleaning up request handlers...` );
		await CleanUpRequestHandler();
		
		
		
		if ( AppRuntime && AppRuntime.CleanUp ) {
			logger.info( `Cleaning up application runtime environment...` );
			await AppRuntime.CleanUp();
		}
		
		
		
		if ( SERVER.listening ) {
			logger.info( `Terminating server...` );
			SERVER.close();
		}
		
		
		logger.info( `Exiting...` );
		setTimeout(()=>process.exit(1));
	});
})().catch((e)=>setTimeout(()=>{throw e}));
