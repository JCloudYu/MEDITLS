// import "extes";
// import "/kernel/logger.esm.js";
// import {ColorCode} from "/kernel/terminal-ctrl.esm.js";


import { Client_Hello, Server_Hello, Server_Certificate_Request } from "/lib/Hello.esm.js";
import { Certificate } from "/lib/Certificate.esm.js";


console.log( Server_Hello(Client_Hello()) );
console.log( Server_Certificate_Request() );



// process
// .on( 'unhandledRejection', (rej)=>{
// 	logger.error( `${ColorCode.LIGHT_RED}Receiving unhandled rejection! Exiting...${ColorCode.RESET}` );
// 	console.error(rej);
// 	process.exit(1);
// })
// .on( 'uncaughtException', (e)=>{
// 	logger.error(`${ColorCode.LIGHT_RED}Receiving uncaught exception! Exiting...${ColorCode.RESET}`);
// 	console.error(e);
// 	process.exit(1);
// })
// .on( 'SIGINT', (...args)=>{
// 	process.emit( 'SIGNAL_INTERRUPTION', ...args );
// })
// .on( 'SIGTERM', (...args)=>{
// 	process.emit( 'SIGNAL_TERMINATION', ...args );
// });



// const DEFAULT_BOOT_MAP = {
// 	"": "/index.esm.js",
// 	main: "/index.esm.js",
// 	version: "/kernel/boot-scripts/version.esm.js",
// 	update: "/kernel/boot-scripts/update.esm.js"
// };

// (async()=>{
// 	// INFO: Idle everything to hoist warning verbose
// 	await setTimeout.idle(100);
	
// 	// INFO: Decide boot script
// 	const [,, boot_cmd=''] = process.argv;
	
// 	// INFO: Collect information about current runtime environment
// 	console.error( `${ColorCode.DARK_GRAY}Obtaining kernel info...${ColorCode.RESET}` );
// 	const ProjectInfo = await import('/kernel-info.esm.js').then(async({Init, ProjectInfo})=>{await Init(); return ProjectInfo;});
	
// 	// INFO: Load environmental configurations
// 	console.error( `${ColorCode.DARK_GRAY}Loading configurations...${ColorCode.RESET}` );
// 	await import( "/kernel/config.esm.js" ).then(({Init})=>Init());
	
// 	// INFO: Load environmental configurations
// 	console.error( `${ColorCode.DARK_GRAY}Loading configurations...${ColorCode.RESET}` );
// 	await import( "/kernel/runtime.esm.js" ).then(({Init})=>Init());
	
	
	
// 	// INFO: Detect boot script
// 	const boot_map = Object.assign({}, ProjectInfo.kernel_script_map||{}, DEFAULT_BOOT_MAP);
// 	const boot_script = boot_map[boot_cmd];
// 	if ( !boot_script ) {
// 		console.error( `${ColorCode.RED}Invalid command \`${boot_cmd}\`!${ColorCode.RESET}` );
// 		process.exit(1);
// 		return;
// 	}
	
// 	await import(boot_script);
// })()
// .catch((e)=>{
// 	// NOTE: Force to cast unexpectedly rejected promises into exceptions
// 	setTimeout(()=>{throw e;});
// });

