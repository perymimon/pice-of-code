export function objectGet(obj, path) {
    const parts = path.split(/\.|\[['"`]|['"`]]/).filter(Boolean);
    let i = 0, value, key;
    while ((key = parts[i++]) && (obj = obj[key])) ;
    return obj;
}
/*
* get object with deep levels of objects and return object with one level of keys
* example:
*   flatObject({
*     a1:1,
*     b1:{ a2:2, b2:2, c2:{a3:3} }
*   })
*   return
*   obj {
*     a1: 1,
*     b1.a2: 2,
*     b1.b2: 2,
*     b1.c2.a3: 3,
*   }
* */

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

/* like form url */
export function joinObject(object, delKv = '=', delPairs = '&') {
    return Object.entries(object)
        .map(pair => pair.join(delKv)).join(delPairs);
}
