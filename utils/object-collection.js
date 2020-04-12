export function objectGet(obj, path) {
    const parts = path.split(/\.|\[['"`]|['"`]]/).filter(Boolean);
    let i = 0, value, key;

    while ((key = parts[i++]) && (obj = obj[key])) ;
    return obj;
}

export function flatObject(obj) {
    const flatObject = {};
    const path = [];

    function dig(obj) {
        for (let key in obj) {
            path.push(key);
            flatObject[path.join('.')] = dig(obj[key]);
            path.pop();
        }
        return obj;
    }

    dig(obj);
    return flatObject;
}

export function toFormDataEncoding(object) {
    return Object.entries(object)
        .map(pair => pair.join("=")).join('&');
}