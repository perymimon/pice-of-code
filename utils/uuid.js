import {getTimeNow} from "../libs/utils";

export function uuid(pattern) {
    pattern = pattern || "xxxxxxxxxxxx-xxxx-4xxx-yxxxxxx-xxxxxxxxxxxxxxxx";
    return pattern.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c === "x" ? r : r & 3 | 8;
        return v.toString(16);
    });
}

export function generateUID() {
    function s() {
        return Math.floor((1 + Math.random()) * getTimeNow()).toString(16).substring(1);
    }

    return s() + "-" + s() + "-" + s() + "-" + s() + "-" + s();
}
