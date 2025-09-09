# cha3js

Implementing high-performance stream cipher in JS based on ChaCha20.

Forked from Mykola Bubelich's repository: https://github.com/thesimj/js-chacha20


## Full working example:


```js
import {
    c3_update,
    c3_param,
    c3_param_setup,
    c3_to32,
    c3_reload,
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
    data_length = data.length,

    key_stream = new Uint8Array(block_size),

    param_for_any = c3_param_setup(new Uint32Array(param_length),SIGMA,),

    param = (
        key.set(te.encode(key_value).subarray(0, 32)),

        c3_param(
            param_for_any,
            key,
            byte_counter,
            nonce,
            c3_to32
        )
    ),
    param_bf = new Uint32Array(param),

    mix = new Uint32Array(param_length),

    to_string = (data) => td.decode(data),

    from = 0,
    to = data_length
;

console.dir(to_string(data)); // output: `{"hello":"world"}`

// [ ENCODING ]:
console.log(
    to_string(
        c3_update(data, from, to, key_stream, byte_counter, rounds, block_size, mix, param_bf, ROUND_DATA)
    )
);
// output: U�+�&@�OɌ���z�


// [ DECODING ]:
console.dir(
    to_string(
        c3_update(
            data,
            from,
            to,
            key_stream,
            byte_counter,
            rounds,
            block_size,
            mix,
            c3_reload(param_bf, param),
            ROUND_DATA
        )
    )
);
// output: `{"hello":"world"}`

```
