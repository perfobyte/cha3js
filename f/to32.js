

export default (
    (d,i) => {
        return (d[i++] ^ (d[i++] << 8) ^ (d[i++] << 16) ^ (d[i] << 24));
    }
);
