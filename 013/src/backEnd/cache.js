const myCache = {};

const StoreKey = (key, value) => {
    return myCache[key] = value;
}

const RetrieveKey = (key) => {
    return myCache[key];
}

export { StoreKey, RetrieveKey }