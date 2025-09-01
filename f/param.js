export default (
    (key,counter,nonce,SIGMA,to32) => [
        SIGMA[0],
        SIGMA[1],
        SIGMA[2],
        SIGMA[3],

        to32(key,0),
        to32(key,4),
        to32(key,8),
        to32(key,12),

        to32(key,16),
        to32(key,20),
        to32(key,24),
        to32(key,28),

        counter,
        to32(nonce,0),
        to32(nonce,4),
        to32(nonce,8),
    ]
);
