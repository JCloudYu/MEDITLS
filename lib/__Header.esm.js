import { _ContentType, _Version, _Handshake } from './__RrecordProtocolFormat.esm.js';

export const __HEADER = Object.freeze({
    Initial: {},
    Client_Hello: new Uint8Array(
            [
                _ContentType.HANDSHAKE,
                _Version.MAJOR,
                _Version.MINOR,
                _Handshake.CLIENT_HELLO
            ]),

    Server_Hello: new Uint8Array(
            [
                _ContentType.HANDSHAKE,
                _Version.MAJOR,
                _Version.MINOR,
                _Handshake.SERVER_HELLO
            ]),

    Server_Certificate_Request: new Uint8Array(
        [
            _ContentType.HANDSHAKE,
            _Version.MAJOR,
            _Version.MINOR,
            _Handshake.CERTIFICATE_REQUEST
        ]),

    Clinet_Certificate: new Uint8Array(
            [
                _ContentType.HANDSHAKE,
                _Version.MAJOR,
                _Version.MINOR,
                _Handshake.CERTIFICATE   
            ]),

    Server_Certificate_Verify: new Uint8Array(
            [
                _ContentType.HANDSHAKE,
                _Version.MAJOR,
                _Version.MINOR,
                _Handshake.CERTIFICATE_VERIFY
            ]),
        
    Change_Cipher_Spec: new Uint8Array(
            [
                _ContentType.CHANGE_CIPHER_SPEC,
                _Version.MAJOR,
                _Version.MINOR,  
            ]),

    Finished_Message: new Uint8Array(
            [
                _ContentType.CHANGE_CIPHER_SPEC,
                _Version.MAJOR,
                _Version.MINOR,  
            ]),

    Disconnected: new Uint8Array(
        [
            _ContentType.HANDSHAKE,
            _Version.MAJOR,
            _Version.MINOR,  
        ]),
})