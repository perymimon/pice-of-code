/*
 async test lib that active all tests and return iterable
 object that emit result for any test that finish
*/

class TestStepper {
    constructor(stringsLookingFor) {
        this.generalState = {};
        this.string = stringsLookingFor;
    }

    // async {
    async* test(freshPage) {
        this.generalState = { // create the final state handler
            startTime: new Date().toUTCString(),
            // url: freshPage.url() to early to ask
        };
        const {promiseEggs} = TestStepper;
        const {generalState} = this;
        const DoneSets = new promiseDoneGenerator(promiseEggs.map(egg => egg(freshPage, generalState)));
       yield * DoneSets;
        /* waiting */
        this.generalState.url = freshPage.url();
    }

    getFinalState() {
        const {generalState} = this;
        return generalState;
    }


};

let id = 0;
TestStepper.promiseEggs = [];
TestStepper.stepsDesc = [];
TestStepper.getStepsDesc = function () {
    return TestStepper.stepsDesc;
};
TestStepper.xstep = function noop (desc, fnTest) {};
TestStepper.step = function (desc, fnTest) {
    const stepId = id++;
    const testDesc = {desc, id:stepId};
    TestStepper.stepsDesc.push(testDesc);
    TestStepper.promiseEggs.push(promiseEgg);

    async function promiseEgg(freshPage, generalState) {
        const step = {
            id: stepId,
            status: TestStepper.Status.PENDING,
            desc,
            notes: [],
        };

        function assert(test, message, errorMessage) {
            errorMessage = errorMessage || message;
            if (test instanceof Promise) {
                test.then(
                    _ => step.notes.push([true, message]),
                    _ => step.notes.push([false, errorMessage]),
                )
            } else {
                test = !!test;
                step.notes.push([test, test ? message : errorMessage]);
            }
            return test;
        }

        try {
            await fnTest(freshPage, assert, generalState);
            const atLeastOneFail = step.notes.find(n => n[0] == false);
            const notAnyNote = step.notes.length  === 0;
            step.status = atLeastOneFail || notAnyNote ? TestStepper.Status.FAIL : TestStepper.Status.SUCCESS
        } catch (rej) {
            assert(false, rej.toString());
            step.status = TestStepper.Status.FAIL
        }


        return step;
    }

    return testDesc;
};

TestStepper.Status = {};
TestStepper.Status.PENDING = 'pending';
TestStepper.Status.SUCCESS = 'success';
TestStepper.Status.FAIL = 'fail';

module.exports = TestStepper;

function promiseDoneGenerator(iterable) {
    const pending = new Set(iterable);
    const doneQueue = [];
    for (let p of iterable) {
        p.finally(_ => {
            doneQueue.push(p);
            pending.delete(p);
        });
    }
    return {
        get size() {
            return pending.size;
        },
        async * [Symbol.asyncIterator]() {
            while(pending.size){
                await Promise.race(pending);
                const yields = [...doneQueue];
                doneQueue.length = 0;
                yield* yields;
            }

        }
    }
}
