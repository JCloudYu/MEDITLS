import fs from "fs";
import {Version} from "jsboost/version.esm.js";

import {WorkingRoot, KernelInfo} from "/kernel-info.esm.js";



(async()=>{
	let UpdateRuntime = null;
	logger.info( "Trying to initialize update runtime environment..." );
	try {
		UpdateRuntime = await import("/update/update.runtime.esm.js");
	}
	catch(e) {}
	
	if ( UpdateRuntime ) {
		if ( UpdateRuntime.Init ) {
			await UpdateRuntime.Init();
		}
		
		logger.info( "Application runtime environment initialized!" );
	}
	
	
	
	// NOTE: Query the system version
	let system_version = KernelInfo.version;
	if ( !system_version ) {
		system_version = KernelInfo.version = "0.0.0";
		await KernelInfo.save();
	}
	
	
 	// NOTE: Fetch update files
 	const content_list = fs.readdirSync(`${WorkingRoot}/update/updates`);
 	const versions = [];
 	for( const item of content_list ) {
 		if ( item === "." || item === ".." || item.substr(-7) !== ".esm.js" ) continue;
 		const version = Version.From(item.substring(0, item.length-7));
 		if ( !version ) continue;
 		
 		versions.push(version);
 	}
 	versions.sort((a, b)=>{return a.compare(b);});
 	
 	
 	
 	// NOTE: Run update
 	const start_version = system_version;
 	const indented_logger = logger.indent();
 	for( const version of versions ) {
 		if ( version.compare(system_version) <= 0 ) continue;
 		logger.log( `Updating to ${version._raw}...` );
 		const {Update} = await import( `/update/updates/${version._raw}.esm.js` );
 		await Update(system_version, indented_logger);
 		KernelInfo.version = system_version = version._raw;
 		await KernelInfo.save();
 		logger.log( '' );
 	}
 	
 	if (system_version === start_version) {
 		logger.log( `Nothing to update!` );
 	}
 	else {
 		logger.log( `Update finished! (${start_version} -> ${system_version})` );
 	}
 	
 	
 	if ( UpdateRuntime && UpdateRuntime.CleanUp ) {
		logger.info( `Cleaning up application runtime environment...` );
		await UpdateRuntime.CleanUp();
	}
})()
.catch((e)=>{setTimeout(()=>{throw e;})});
