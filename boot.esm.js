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
    let client_resp = await __Client.Client_Hello(write_Stream);
    console.log('Client Response:', {client_resp, state:__Client.state} );


    

    const __Server = await MEDIISCI.Init(write_Stream);
    console.log('Server Init:', __Server );
    let server_resp = await __Server.Server_Hello(client_resp, write_Stream);
    console.log('Server Response:', {server_resp, state:__Server.state} );
    
    
   
    client_resp = await __Client.Client_Send_publicKey(server_resp, write_Stream);
    console.log('Client Response:', client_resp, __Client.state );


    server_resp = await __Server.Server_Send_publicKey(client_resp, write_Stream);
    console.log('Server Response:', {server_resp, state:__Server.state} );
    

})();



