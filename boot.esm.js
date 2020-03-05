import fs from "fs";
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
            value: serializer => {
                console.log('write_Stream ==>', serializer);                
                return serializer 
            },
            writable: true,
            configurable: false,
            enumerable: true,
        }
    })

    const __Client = await MEDIISCI.Init(write_Stream);
    console.log('Client Init: ', __Client.state );    
    
    const client_hello = __Client.Client_Hello(write_Stream);
    console.log('Client Hello:', client_hello );

    // let a = Deserializer.init(client_hello).read();
    // console.log(a);
    

    const __Server = await MEDIISCI.Init(write_Stream);
    const server_hello = __Server.Server_Hello(client_hello, write_Stream);
    console.log('Server Hello:', server_hello );
    
    // const b = await __Server_Send_publicKey(a, write_Stream);

    // const { Client_Hello, Server_Hello, Server_Certificate_Request } = await import( '/lib/Hello.esm.js' );

    // const client = new Client_Hello(1, null, write_Stream)
    // console.log( 'client:', client );
    
    // console.log(write_Stream.write(5));

    // const server = new Server_Hello(1, )

})();



