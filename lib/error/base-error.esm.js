/**
 *	Author: JCloudYu
 *	Create: 2020/01/29
**/
/**
 *	Author: JCloudYu
 *	Create: 2019/07/16
**/
export const BaseError = Object.freeze({
	// 400
	BAD_REQUEST: Object.freeze({
		code:400001, key:'base#bad-request',
		msg:'Request payload contains invalid information'
	}),
	INVALID_REQUEST_PAYLOAD: Object.freeze({
		code:400002, key:'base#invalid-request-payload',
		msg:'Cannot correctly parse request payload'
	}),
	INVALID_REQUEST_PAYLOAD_CONTENT: Object.freeze({
		code:400003, key:'base#missing-required-fields',
		msg:'Request content lacks some required fields'
	}),
	
	// 401
	UNAUTHORIZED_ACCESS: Object.freeze({
		code:401001, key:'base#unauthorized',
		msg:'Authorization is required to access this resource'
	}),
	
	// 403
	FORBIDDEN_ACCESS: Object.freeze({
		code:403001, key:'base#forbidden',
		msg:"You're not allowed to access this resource"
	}),
	
	//404
	RESOURCE_NOT_FOUND: Object.freeze({
		code:404001, key:'base#res-not-found',
		msg:'Requested resource cannot be found'
	}),
	
	// 405
	METHOD_NOT_ALLOWED: Object.freeze({
		code:405001, key:'base#method-not-allowed',
		msg:'Requesting method is not supported by the resource'
	}),
	
	// 413
	REQUEST_PAYLOAD_IS_TOO_LARGE: Object.freeze({
		code:413001, key:'base#payload-is-too-large',
		msg:'Request body payload is too large'
	}),
	
	// 415
	UNSUPPORTED_MEDIA_TYPE: Object.freeze({
		code:415001, key:'base#unsupported-media-type',
		msg:'Unsupported requesting media type'
	}),
	
	// 500
	UNEXPECTED_SERVER_ERROR: Object.freeze({
		code:500001, key:'base#unexpected-error',
		msg:'Unexpected error has occurred'
	}),
	UNEXPECTED_DB_FAILURE: Object.freeze({
		code:500002, key:'base#unexpected-db-failure',
		msg:'Unexpected database failure has occurred'
	}),
	UNEXPECTED_MISSING_DATA: Object.freeze({
		code:500003, key:'base#unexpected-missing-data',
		msg:'Related data is missing unexpectedly'
	})
});


