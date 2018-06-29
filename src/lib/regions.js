const regions = {
    bdy: 'bandung',
    blr: 'bengaluru',
    brw: 'broward',
    chn: 'chennai',
    jbd: 'jakarta',
    mum: 'mumbai',
    sby: 'surabaya',
    srg: 'semarang',
};

export default (instanceRegionCode) => {
    if (instanceRegionCode in regions) {
        return regions[instanceRegionCode];
    } else {
        return null;
    }
};
