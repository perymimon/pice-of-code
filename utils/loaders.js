export class LoadingError extends Error {
};

export function loaderScript(scriptUrl, attachOnTop) {
    return new Promise(function (res, rej) {
        let script = document.createElement('script');
        script.src = scriptUrl;
        script.type = 'text/javascript';
        script.onError = rej;
        script.async = true;
        script.onload = res;
        script.addEventListener('load', res);
        script.addEventListener('error', rej);
        const head = attachOnTop ? top.document.head : document.head;
        head.appendChild(script);
    })
}

export function loaderStyle(linkUrl) {
    let link = document.createElement('link');
    link.href = linkUrl;
    link.type = "text/css";
    link.rel = "stylesheet";
    // link.async = true;
    document.head.appendChild(link);

    return function remove() {
        link.remove()
    }
}

export function getJsonp(url) {
    // const c = ++counter;
    const rand = getJsonp.rand = getJsonp.rand || ~~(Math.random() * 10000);
    const c = getJsonp.counter = ++getJsonp.counter || 0;
    return new Promise(function (res, rej) {
        let script = document.createElement('script');
        const callback = 'minuteJsonp_' + c + '_' + rand;
        // const callback = 'minuteJsonp';//_'+ c + '_'+ rand;

        script.src = url + '?callback=' + callback;
        script.type = 'text/javascript';
        script.async = true;
        window[callback] = function (data) {
            res(data);
            script.parentNode.removeChild(script);// IE support
            delete window[callback];
        };
        script.onError = rej;
        document.head.appendChild(script);
    });

}


export function getJSON(url, callback) {
    return new Promise(function (res, req) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            res(this.responseText);
        };
        xhr.open('GET', url, true);
        xhr.send();
    })

}

export function fetchJson(...args) {
    return fetch(...args).then((res) => res.json())
}

export function fetchBlob(...args) {
    // const myInit = {
    //     method: 'GET',
    //     mode: 'no-cors',
    //     cache: 'default' };
    //
    // const request = new Request(url, myInit);
    // var myHeaders = new Headers().append('Content-Type', 'video/mp4');

    return fetch(...args).then(res => res.blob())
}


export function getBlob(url) {
    return new Promise(function (res, rej) {
        const req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.responseType = 'blob';
        req.addEventListener('load', function (event) {
            switch (this.status) {
                case 200:
                    const blob = this.response;
                    res(blob);
                    break;
                case 403:
                case 404:
                    fail.call(this);
            }
        });
        /**
         * never suppose to get here:
         */
        req.addEventListener('error', fail);

        function fail(e) {
            rej(new LoadingError(`${this.status}, blob not loaded from url \n${url}`));
        }

        req.send();
    })
}

// todo : need redesign, some promise, some callback
export function submitAsForm(src, obj, method = 'post', target = "_blank") {
    var form = document.createElement('form');
    form.action = src;
    form.method = method;
    form.target = target;
    for (let k in obj) {
        var tokenField = document.createElement('input');
        tokenField.type = 'hidden';
        tokenField.name = k;
        tokenField.value = obj[k];
        form.appendChild(tokenField);
    }

    document.body.appendChild(form);
    form.submit();
    return form;
}