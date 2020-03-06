import { createHash, createECDH } from 'crypto';
import { Beson, Serializer } from "beson/beson.esm.js";
import { UniqueId } from "jsboost/unique-id.esm.js";

const { UInt8, UInt16 } = Beson;

let _unique_id = new UniqueId();
console.log(_unique_id);


let ecdh = createECDH('secp521r1'); 
let publicKey = ecdh.generateKeys();

//@Init
let serializer = Serializer.init();
//@profile

    

//@cert_ctnt
serializer =  serializer
                .write(UInt8.from(0)) 
                .write(_unique_id ) //@uint8( 1) @iss_id ::= @unique-id
				.write('US' ) //@uint8( 2) @iss_country_code ::= beson(@string)
				.write('Texus' ) //@uint8( 3) @iss_state_code ::= beson(@string)
				.write('Houston') //@uint8( 4) @iss_locality ::= beson(@string)
				.write('SSL Corp') //@uint8( 5) @iss_org ::= beson(@string)
                .write('SSL.com EV SSL Intermediate CA RSA R3') //@uint8( 6) @iss_common ::= beson(@string)
            
for(let i=7; i<20; i++){
    serializer = serializer.write(UInt8.from(0)) 
}

serializer =  serializer
                .write('US')  //@uint8(20) @subj_country_code ::= beson(@string)
				.write('Texus') //@uint8(21) @subj_state_code ::= beson(@string)
				.write('Houston') //@uint8(22) @subj_locality ::= beson(@string)
				.write('SSL Corp') //@uint8(23) @subj_org ::= beson(@string)
				.write('www.ssl.com') //@uint8(24) @subj_common ::= beson(@string)
				.write(_unique_id) //@uint8(25) @subj_serial_number :: @unique-
				.write('77098') //@uint8(26) @subj_postal_code ::= beson(@string)
				.write('Private Organization') //@uint8(27) @subj_business_category ::= beson(@string)
				.write('3100 Richmond Ave') //@uint8(28) @subj_street_address ::= beson(@string)
				.write('Nevada') //@uint8(29) @subj_inc_state_code ::= beson(@string)
                .write('US') //@uint8(30) @subj_inc_country_code ::= beson(@string)

for(let i=31; i<197; i++){
    serializer = serializer.write(UInt8.from(0)) 
}

serializer =  serializer
				.write('EC Encryption')  //@uint8(197)@pk_info_algoithm ::= beson(@string)
				.write(UInt16.from(256)) //@uint8(198)@pk_info_size ::= beson(@string)
				.write(createHash('sha1').update('TLS').digest('hex')) //@uint8(199)@pk_info_SHA1_fingerprint ::= beson(@string)
                .write(publicKey) //@uint8(200)@pk_info_public_Key ::= beson(@string)                       
                
for(let i=201; i<197; i++){
    serializer = serializer.write(UInt8.from(0)) 
}
                console.log(serializer.buffer);


                