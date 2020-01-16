/*
 extension to node express
* to support sever-event-stream one direct event stream
    exmaple :
    async function (req, res) {
        sse = new SSE(res, req);
        sse.message('test', {a:1}});
        sse.message('final', {})
        sse.end();
    }
* */
class SSE {
    constructor(res, req) {
        this.res = res;
        this.counter = 0;
        res.writeHead(200, {
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Content-Type': 'text/event-stream; charset=utf-8',
            // 'Transfer-Encoding': 'chunked', /*option*/
            // 'Access-Control-Allow-Origin': 'http://localhost',
            // 'Access-Control-Expose-Headers': '*',
            // 'Access-Control-Allow-Credentials': true
        });

        /*The browser attempts to reconnect to the source roughly 3 seconds after each connection
         is closed. You can change that timeout by including a line beginning with "retry:"*/
        res.write(`retry: ${10 * 1000}\n\n`)
    }

    message(eventName, data) {
        const {res} = this;
        res.write(`id: ${this.counter++}\n`);
        res.write(`event: ${eventName}\n`);
        try {
            res.write(`data: ${JSON.stringify(data)}\n\n`);
        } catch (e) {
            res.write(`data: error:${e.message} \n\n`);
        }

        // res.flush();
    }

    end(successStatus) {
        const {res} = this;
        successStatus = successStatus === undefined ? true : successStatus;
        res.write(`id: ${this.counter}\n`);
        res.write(`event: end\n`);
        res.write(`data: ${JSON.stringify({success: successStatus})}\n\n`);
        res.end();
    }

}

module.exports = SSE;

/* CLIENTS */


export class IntegrationCheckService /*extends EventTarget react compile limitation*/ {
    constructor() {
        this.eventTarget = new EventTarget();
    }
    addEventListener(...args) {
        this.eventTarget.addEventListener(...args);
    }
    removeEventListener(...args) {
        this.eventTarget.removeEventListener(...args);
    }

    async getSteps() {
        if (this.steps) return this.steps;
        const response = await fetch(apiSteps);
        const steps = await response.json();
        this.steps = steps.map(step => Object.freeze(step));
        return steps;
    }

    startCheck(url) {
        this.inProgress = true;
        this.evtSource && this.evtSource.close();
        const evtSource = this.evtSource = new EventSource(
            `${apiCheck}?url=${url}`,
            {withCredentials: true});
        const me = this;

        const proxyEvent = (event) => {
            const data = event.data && JSON.parse(event.data);
            const {currentTarget, eventPhase, returnValue} = event;
            const dic = {currentTarget: this, eventPhase, returnValue};
            const nEvent = new CustomEvent(event.type, dic);
            nEvent.data = data;
            me.eventTarget.dispatchEvent(nEvent);
        };

        const ProxyAndClose = (event) => {
            this.stop();
            proxyEvent(event);
        };

        evtSource.addEventListener('open', () => {
            this.inProgress = true;
        });
        evtSource.addEventListener('end', () => {
            this.stop()
        });
        evtSource.onmessage = proxyEvent;
        evtSource.onopen = proxyEvent;
        evtSource.onerror = ProxyAndClose;
        evtSource.addEventListener('test', proxyEvent);
        evtSource.addEventListener('final', proxyEvent);
        evtSource.addEventListener('end', ProxyAndClose);

    }

    stop() {
        this.evtSource.close();
        this.inProgress = false;
    }
}
