/*
* The Promise.allSettled() method returns a promise that resolves after all
* of the given promises have either resolved or rejected,
* with an array of objects that each describes the outcome of each promise.
* */
module.exports.allSettled = function allSettled(promises) {
    return Promise.all(
        promises.map((promise, i) =>
            promise
                .then(value => ({
                    status: "fulfilled",
                    value,
                }))
                .catch(reason => ({
                    status: "rejected",
                    reason,
                }))
        )
    );
};


/*
Promise.any() takes an iterable of Promise objects and, as soon as one of the promises in the iterable fulfills,
 returns a single promise that resolves with the value from that promise. If no promises in the iterable fulfill
 (if all of the given promises are rejected), then the returned promise is rejected with an object that is still
 up for debate: either an array of rejection reasons, or an AggregateError, a new subclass of Error that groups
 together individual errors. Essentially, this method is the opposite of Promise.all().
* */
function reverse(promise) {
    return new Promise((resolve, reject) =>
        Promise.resolve(promise).then(reject, resolve)
    );
}

export function promiseAny(iterable) {
    return reverse(Promise.all([...iterable].map(reverse)));
}

/*yield any time promise resolve*/
export function promiseRaceIterator(iterable) {
    const pending = new Set(iterable);

    const doneBuffer = [];
    for (let p of iterable) {
        p.finally(_ => {
            doneBuffer.push(p);
            pending.delete(p);
        });
    }
    return {
        get size() {
            return pending.size;
        },
        async * [Symbol.asyncIterator]() {
            while (pending.size) {
                await Promise.race(pending);
                const yields = [...doneBuffer];
                doneBuffer.length = 0;
                yield* yields;
            }

        }
    }
}

export function Deferred() {
    let resolve, reject;
    const promise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });

    return {
        promise: promise,
        resolve: resolve,
        reject: reject
    }
}
