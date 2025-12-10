export function resolvePromise(prms, promiseState) {
    function dataACB(response) {
        //console.log("Resolving promise: ", prms, promiseState.promise, prms == promiseState.promise);
        if (promiseState.promise == prms) {
            promiseState.data = response;
            console.log("LOG: ", response, {... {... promiseState.data}[0]}, promiseState.data == response);
        }
    }
    function errorACB(error) {
        promiseState.error = error;
        if (promiseState.promise && !promiseState.data) {
            console.error("ERROR OCCURED:", error);
        }
    }
    promiseState.promise = prms;
    promiseState.data = null;
    promiseState.error = null;
    //console.log("Resolving promise: ", prms, promiseState.promise, prms == promiseState.promise);
    if (prms) {
        prms.then(dataACB).catch(errorACB);
    }
}