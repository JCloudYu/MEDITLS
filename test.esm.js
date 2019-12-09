import { Serialize } from "beson/serialize.esm.js";
import { Deserialize } from "beson/deserialize.esm.js";

var arr = new Uint8Array([22,3,5,1]);

let buf_ta1  = Serialize(arr);
console.log(buf_ta1);
let data = Deserialize(buf_ta1)
console.log(data);
