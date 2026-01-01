import { runInAction } from "mobx";

export function resolvePromise(prms, promiseState) {
    function dataACB(response) {
        if (promiseState.promise == prms) {
            runInAction(() => {
                promiseState.data = response;
            });
        }
    }
    function errorACB(error) {
        runInAction(() => {
            promiseState.error = error;
        });
        if (promiseState.promise && !promiseState.data) {
            console.error("ERROR OCCURED:", error);
        }
    }

    runInAction(() => {
        promiseState.promise = prms;
        promiseState.data = null;
        promiseState.error = null;
    });

    if (prms) {
        prms.then(dataACB).catch(errorACB);
    }
}