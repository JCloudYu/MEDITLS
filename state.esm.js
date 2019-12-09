import { Serialize } from "beson/serialize.esm.js";
import { _ContentType, _Version, _Handshake } from './recordProtocolFormat.esm.js';

export const _Client_Hello = new Uint8Array(
    [
        _ContentType.HANDSHAKE,
        _Version.MAJOR,
        _Version.MINOR,
        _Handshake.CLIENT_HELLO
    ]);

export const _Server_ACK = new Uint8Array(
    [
        _ContentType.HANDSHAKE,
        _Version.MAJOR,
        _Version.MINOR,
        _Handshake.SERVER_ACK
    ]);