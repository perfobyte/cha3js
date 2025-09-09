export default (
    (_,key,counter,nonce,_32) => {
        _[4] = _32(key,0);
        _[5] = _32(key,4);
        _[6] = _32(key,8);
        _[7] = _32(key,12);
        
        _[8] = _32(key,16);
        _[9] = _32(key,20);
        _[10] = _32(key,24);
        _[11] = _32(key,28);

        _[12] = counter;
        _[13] = _32(nonce,0);
        _[14] = _32(nonce,4);
        _[15] = _32(nonce,8);

        return _;
    }
);
