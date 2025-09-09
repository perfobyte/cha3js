

export default (
    (_,SIGMA) => {
        _[0] = SIGMA[0];
        _[1] = SIGMA[1];
        _[2] = SIGMA[2];
        _[3] = SIGMA[3];
        return _;
    }
);
