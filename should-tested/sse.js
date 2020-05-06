/* exmaple of axios read data from stream*/
const axios = require('axios');

const response = await axios({
    url: `${Config.puppeteer.url}/sse/integration/check${req.url.search}`,
    headers: req.headers,
    responseType: 'stream'
});

return response.data.on('data',function (chunk) {
    console.log(`integrationCheck: ${chunk.toString()}`);
})


/*js client wrapper for sse*/
export class IntegrationCheckService /*extends EventTarget react compile limitation*/ {
    constructor() {
        this.eventTarget = new EventTarget();
        this.inProgress = false;
    }

    addEventListener(...args) {
        this.eventTarget.addEventListener(...args);
    }

    removeEventListener(...args) {
        this.eventTarget.removeEventListener(...args);
    }

    async getSteps() {
        // const response = await fetch(apiSteps,{
        //     method: "GET",
        //     credentials: 'same-origin',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     }
        // });
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
