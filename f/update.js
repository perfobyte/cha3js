
// [default]:
// byte_counter = 0
// rounds = 20 // must be even

export default (
    (data, I,L, key_stream, byte_counter, rounds, block_size, mix, param, ROUND_DATA) => {
        var
            i = 0,
            b = 0,
            j = 0,

            ro = ROUND_DATA[0],

            _a = 0,
            _b = 0,
            _c = 0,
            _d = 0,

            D = 0
        ;
        
        for (; I < L; I++) {
            if (
                (byte_counter === block_size)
                ? (
                    (byte_counter = 0),
                    true
                )
                : (byte_counter === 0)
            ) {

                i = 0;
                for (; i < 16; i++) {
                    mix[i] = param[i]
                }
                
                i = 0;
                for (; i < rounds; i += 2) {
                    j = 0;
                    for (;j<8;j++) {
                        
                        mix[
                            _d = (ro = ROUND_DATA[j])[3]
                        ] = (
                            ((D = mix[_d] ^ (mix[_a = ro[0]] += mix[_b = ro[1]])) << 16)
                            | (D >>> 16)
                        );
                        mix[_b] = (((D = (mix[_b] ^ (mix[_c = ro[2]] += mix[_d]))) << 12) | (D >>> 20));
                        mix[_d] = (((D = (mix[_d] ^ (mix[_a] += mix[_b]))) << 8)  | (D >>> 24));
                        mix[_b] = (((D = (mix[_b] ^ (mix[_c] += mix[_d]))) << 7)  | (D >>> 25));
                    
                        mix[_a] >>>= 0;
                        mix[_b] >>>= 0;
                        mix[_c] >>>= 0;
                        mix[_d] >>>= 0;
                    }
                }
            
                b = i = 0;
                for (; i < 16; i++) {
                    key_stream[b++] = (mix[i] += param[i]) & 0xFF;
                    key_stream[b++] = (mix[i] >>> 8) & 0xFF;
                    key_stream[b++] = (mix[i] >>> 16) & 0xFF;
                    key_stream[b++] = (mix[i] >>> 24) & 0xFF;
                };
                param[12]++;
            };
            
            data[I] ^= key_stream[byte_counter++];
        }
    
        return data;
    }
);
