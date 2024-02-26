// try {

//     setTimeout(() => {

//         throw new Error("ERROR!");
        
//     }, 1000);

// } catch (e) {

//     console.log("CATCH ERROR:", e);

// }

// const promise = new Promise((resolve, reject) => {
//         const success = true;
//         if (success) {
//             return resolve("Operation successful");
//         } else {
//             return reject("Operation failed");
//         }
// }).then((v) => {
//     console.log("Resolve:", v);
// }, (e) => {
//     console.log("Reject:", e);
// });

// console.log(promise);

// const promise1 = () => {
//     return new Promise(resolve => setTimeout(() => {
//         resolve(1)       
//     }, 3000))
// };

// const promise2 = () => {
//     return new Promise(resolve => setTimeout(() => {
//         resolve(2)       
//     }, 2000))
// }

// const promise3 = () => {
//     return new Promise((resolve, reject) => {

//         return reject(new Error("Reject ERROR"))
//     });
    
// };

// Promise.allSettled([
//     promise1(),
//     promise2(),
//     promise3()
// ]).then((resolve) => {
//     console.log("Resolve:", resolve);
// }).then(e => {
//     console.log("Error:", e);
// });

const func = () => {

    const promise = new Promise(resolve => setTimeout(() => {
        resolve(1)       
    }, 3000));

    return promise

};

(async() => {

    const resolve = await func();

    console.log("Resolve:", resolve);

})();

console.log("Start");

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function asyncOperation() {
    await delay(2000);
    console.log("Async operation completed");
}

const firstPromise = async() => {
    await delay(3000);
    console.log("First Promise resolved");
}

const secondPromise = async() => {
    await delay(1000);
    console.log("Second Promise resolved");
}

async function main() {
    await firstPromise();
    await secondPromise();
    await asyncOperation();
    console.log("All promises and async operations completed");
}

main();

console.log("End");