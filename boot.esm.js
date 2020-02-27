// import "extes";
// import "/kernel/logger.esm.js";
// import {ColorCode} from "/kernel/terminal-ctrl.esm.js";
import fs from "fs";
import { Serializer, Deserializer  } from "beson/beson.esm.js";
import { Certificate } from "/lib/Certificate.esm.js";

(async () => {

    const initialValue = 0;
    const FMS =  Object.create(null);
    const write_Stream = Object.create(null);
    // Object.defineProperty(FMS, 'state', {
    //     get() { return initialValue; },
    //     set(newValue) { initialValue = newValue; },
    //     configurable: false,
    //     enumerable: true,
    // })
    Object.defineProperties(write_Stream, {
        'init': {
            value: () => { return Serializer.init(); },
            writable: true,
            configurable: false,
            enumerable: true,
        },
        'write': {
            value: serializer => {return serializer },
            writable: true,
            configurable: false,
            enumerable: true,
        }
    })


    
    
    

    const { Client_Hello, Server_Hello, Server_Certificate_Request } = await import( '/lib/Hello.esm.js' );

    const client = new Client_Hello(1, null, write_Stream)
    console.log( 'client:', client );
    
    console.log(write_Stream.write(5));

    const server = new Server_Hello(1, )

})();



