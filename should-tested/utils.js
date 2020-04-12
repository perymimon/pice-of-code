export function getTimeNow() {
    // Changed because publishers might, and did in the past, overrided Date.new() function.
    return (new Date()).getTime();
}

export function getUserAgent() {
    return window.navigator.userAgent;
}

export function getPageUrl() {
    return window.location.href;
}

export function getPageStructredUrl() {
    return window.location.origin + window.location.pathname;
}

export function getCurrentUrl() {
    try {
        return window.top.location.href;
    } catch (error) {
    }
    return window.location.href;
}

