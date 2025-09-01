# cha3js

Implementing high-performance stream cipher in JS based on ChaCha20.

Forked from Mykola Bubelich's repository: https://github.com/thesimj/js-chacha20


## Full working example:


```js
import {
    cc20_update,
    cc20_param,
    cc20_to32,
    SIGMA,
    ROUND_DATA,
} from "cha3js";

var
    message_value = `{"hello":"world"}`,
    key_value = "any_key_value",

    te = new TextEncoder(),
    td = new TextDecoder(),

    block_size = 64,
    key_length = 32,
    nonce_length = 12,
    param_length = 16,

    key = new Uint8Array(key_length),
    nonce = crypto.getRandomValues(new Uint8Array(nonce_length)),
    byte_counter = 0,
    rounds = 20,
    data = te.encode(message_value),

    key_stream = new Uint8Array(block_size),

    param = (
        key.set(te.encode(key_value).subarray(0, 32)),

        cc20_param(key,byte_counter,nonce,SIGMA,cc20_to32)
    ),
    param_bf = new Uint32Array(param),

    mix = new Uint32Array(param_length)
;

console.dir(td.decode(data)); // `{"hello":"world"}`

// encoding:
cc20_update(data, key_stream, byte_counter, rounds, block_size, mix, param_bf, ROUND_DATA);

console.dir(td.decode(data)); // U�+�&@�OɌ���z�


// decoding:
key_stream.fill(0);
param_bf.set(param);
cc20_update(data, key_stream, byte_counter, rounds, block_size, mix, param_bf, ROUND_DATA);

console.dir(td.decode(data)); // `{"hello":"world"}`
```
