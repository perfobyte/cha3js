
export * from './f/i.js';

import {
    cc20_update,
    cc20_param,
    cc20_to32
} from './f/i.js';

export var
    SIGMA = [0x61707865, 0x3320646e, 0x79622d32, 0x6b206574],
    ROUND_DATA = [
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],

        [0, 5, 10, 15],
        [1, 6, 11, 12],
        [2, 7, 8, 13],
        [3, 4, 9, 14],
    ]
;

var
    message_value = `{"hello":"world"}`,
    key_value = "пішов нахуй ",

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

console.dir(td.decode(data));

cc20_update(data, key_stream, byte_counter, rounds, block_size, mix, param_bf, ROUND_DATA);

console.dir(td.decode(data)); // encoded

key_stream.fill(0);
param_bf.set(param);

cc20_update(data, key_stream, byte_counter, rounds, block_size, mix, param_bf, ROUND_DATA);

console.dir(td.decode(data));
