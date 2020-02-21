import { __ContentType, __Version, __Handshake } from './__RrecordProtocolFormat.esm.js';

export const __HEADER = Object.freeze({ 
    __Client_Hello: new Uint8Array(
            [
                __ContentType.HANDSHAKE,
                __Version.MAJOR,
                __Version.MINOR,
                __Handshake.CLIENT_HELLO
            ]),

    __Server_Hello: new Uint8Array(
            [
                __ContentType.HANDSHAKE,
                __Version.MAJOR,
                __Version.MINOR,
                __Handshake.SERVER_HELLO
            ]),

    __Server_Certificate_Request: new Uint8Array(
        [
            __ContentType.HANDSHAKE,
            __Version.MAJOR,
            __Version.MINOR,
            __Handshake.CERTIFICATE_REQUEST
        ]),

    __Clinet_Certificate: new Uint8Array(
            [
                __ContentType.HANDSHAKE,
                __Version.MAJOR,
                __Version.MINOR,
                __Handshake.CERTIFICATE   
            ]),

    __Server_Certificate_Verify: new Uint8Array(
            [
                __ContentType.HANDSHAKE,
                __Version.MAJOR,
                __Version.MINOR,
                __Handshake.CERTIFICATE_VERIFY
            ]),
        
    __Change_Cipher_Spec: new Uint8Array(
            [
                __ContentType.CHANGE_CIPHER_SPEC,
                __Version.MAJOR,
                __Version.MINOR,  
            ]),

    __Finished__Message: new Uint8Array(
            [
                __ContentType.CHANGE_CIPHER_SPEC,
                __Version.MAJOR,
                __Version.MINOR,  
            ]),

    __Disconnected: new Uint8Array(
        [
            __ContentType.HANDSHAKE,
            __Version.MAJOR,
            __Version.MINOR,  
        ]),
})