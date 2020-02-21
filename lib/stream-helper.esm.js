/**
 *	Author: JCloudYu
 *	Create: 2019/07/16
**/
import fs from "fs";
import crypto from "crypto";


// NOTE: Process Input
export async function ReadDrain(input_stream) {
	return new Promise((resolve, reject)=>{
		input_stream.on('end', resolve).on('error', reject).on('data', ()=>{});
	});
}
export async function ReadJSON(input_stream, encoding='utf8') {
	return new Promise((resolve, reject)=>{
		const chunks = [];
		input_stream
		.on('end', ()=>{
			try {
				const str = Buffer.concat(chunks).toString(encoding);				
				resolve(JSON.parse(str));
			}
			catch(e) {
				resolve(undefined);
			}
		})
		.on('error', reject)
		.on('data', (chunk)=>{chunks.push(chunk)});
	});
}
export async function ReadString(input_stream, encoding='utf8') {
	return new Promise((resolve, reject)=>{
		const chunks = [];
		input_stream
		.on('end', ()=>{
			try {
				resolve(Buffer.concat(chunks).toString(encoding));
			}
			catch(e) {
				resolve(undefined);
			}
		})
		.on('error', reject)
		.on('data', (chunk)=>{chunks.push(chunk)});
	});
}
export async function SaveToFile(input_stream, dest_path) {
	return new Promise((resolve, reject)=>{
		const output_stream = fs.createWriteStream(dest_path);
		input_stream.on('end', resolve).on('error', reject).pipe(output_stream);
	});
}
export async function ReadAndSaveToFile(input_stream, dest_path, options={hash_alg:'sha1'}) {
	return new Promise((resolve, reject)=>{
		const output_stream = fs.createWriteStream(dest_path);
		const hash = crypto.createHash(options.hash_alg);
		
		let size = 0;
		input_stream
		.on('end', ()=>resolve({ size, hash: hash.digest(), }))
		.on('error', reject)
		.on('data', (chunk)=>{
			size += chunk.length;
			hash.update(chunk);
			output_stream.write(chunk);
		});
	});
}

// NOTE: Process Output
export function WriteRedirect(res, location, headers={}, code=302) {
	if ( typeof headers === "number" ) {
		code = headers;
		headers = {};
	}

	res.writeHead(code, Object.assign(headers, { Location:location }));
	res.end();
}
export function WriteJSON(res, data, headers={}, code=200) {
	if ( typeof headers === "number" ) {
		code = headers;
		headers = {};
	}
	
	res.writeHead(code, Object.assign(headers, { "Content-Type": "application/json" }));
	res.end(JSON.stringify(data));
}
export function WriteHeaders(res, headers={}, code=200) {
	if ( typeof headers === "number" ) {
		code = headers;
		headers = {};
	}
	
	res.writeHead(code, Object.assign(headers, { "Content-Type": "application/json" }));
	res.end();
}
export function WriteStream(res, stream, headers={}, code=200) {
	if ( typeof headers === "number" ) {
		code = headers;
		headers = {};
	}
	
	return new Promise((resolve, reject)=>{
		res.writeHead(code, headers);
		
		stream
		.on('end', ()=>resolve(res.end()))
		.on('data', (chunk)=>res.write(chunk))
		.on('error', reject);
		
		res.on('error', ()=>reject);
	});
}
export function WriteFile(res, file_path, headers={}, code=200) {
	return new Promise((resolve, reject)=>{
		const stream = fs.createReadStream(file_path);
		WriteStream(res, stream, headers, code).then(resolve).catch(reject);
	});
}
