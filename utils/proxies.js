export function proxyEvent(object, eventName, sourceObject) {
    sourceObject.addEventListener(eventName, function (evt) {
        return object.dispatchEvent(evt);
    });
}

export function proxyEvent2(object, fireEvent, sourceObject, whenEvent) {
    sourceObject.addEventListener(whenEvent, function (evt) {
        // var event = Object.setPrototypeOf(new Event(eventName), evt);
        const newEvent = Object.create(evt);
        object.assign(newEvent, {
            type: fireEvent
            // data = data
            // originalTarget = null
        })
        return object.dispatchEvent(newEvent);
    });
}
