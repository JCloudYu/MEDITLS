import { Beson, Serializer, Deserializer } from "beson/beson.esm.js";
import { MEDIISCI } from "./lib/MEDIISCI.esm.js"


(async () => {

    const write_Stream = Object.create(null);
    Object.defineProperties(write_Stream, {
        'init': {
            value: () => { return Serializer.init(); },
            writable: true,
            configurable: false,
            enumerable: true,
        },
        'write': {
            value: buffer => {
                console.log('write_Stream ==>', buffer);                
                return Beson.Serialize(buffer)
            },
            writable: true,
            configurable: false,
            enumerable: true,
        }
    })

    const __Client = await MEDIISCI.Init(write_Stream);
    console.log('Client Init: ', __Client.state );    
    const client_hello = await __Client.Client_Hello(write_Stream);
    console.log('Client Hello:', client_hello );


    

    const __Server = await MEDIISCI.Init(write_Stream);
    console.log('Server Init:', __Server );
    const server_hello = await __Server.Server_Hello(client_hello, write_Stream);
    console.log('Server Hello:', server_hello );
    


})();



