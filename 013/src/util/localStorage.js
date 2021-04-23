const getItem = (key) => {
    const value = localStorage.getItem(key);

    return value === null ? [] : JSON.parse(value);
}

const setItem = (key, value) => {
    if (value === null || value === undefined) return;

    const toJson = JSON.stringify(value);

    localStorage.setItem(key, toJson);
}

const deleteItem = (key, value) => {
    const values = JSON.parse(localStorage.getItem(key)).filter(({ idx }) => idx !== value);

    const toJson = JSON.stringify(values);

    localStorage.setItem(key, toJson);
}

export { getItem, setItem, deleteItem }