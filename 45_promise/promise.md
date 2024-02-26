### Promise. 45

1. **후속 처리 메서드**
1. **Promise Static 메서드**

### async/await

그렇다면, 마지막 예제로 Promise의 실행 순서에 대해서 알아보면

```jsx
console.log("Start"); // 1

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function asyncOperation() {
    await delay(2000);
    console.log("Async operation completed"); // 5
}

const firstPromise = new Promise(resolve => {
    setTimeout(() => {
        console.log("First promise resolved"); // 4
        resolve();
    }, 3000);
});

const secondPromise = new Promise(resolve => {
    setTimeout(() => {
        console.log("Second promise resolved"); // 3
        resolve();
    }, 1000);
});

async function main() {
    await firstPromise;
    await secondPromise;
    await asyncOperation();
    console.log("All promises and async operations completed"); // 6
}

main();

console.log("End"); // 2
```

여기서 들 수 있는 의문은, 왜 firstPromise의 setTimeout의 callback이 먼저 실행안되고, second가 먼저 실행 됐는지 일 것이다.

위에서 설명한 것처럼 코드의 구조에 따르면 **`await firstPromise;`**가 먼저 실행되어야 할 것으로 예상되지만, **`secondPromise`**의 setTimeout 함수의 시간이 더 짧아서 해당 Promise가 먼저 완료된 것이다.

비동기 에러 핸들링의 어려움에서 설명했던 것 처럼, setTimeout 자체는 비동기 함수고 Promise의 실행은 이미 완료 됐기 때문에, task queue에 빠져 있던 callback 함수가 call stack에 순차적으로 실행되는 것 뿐 실행 자체는 의도한 대로 실행됐다.

만약 위 코드를 정말로 동작 자체를 순서대로 실행시키고 싶다면 resolve를 인수로 받아 promise를 return하는 

```jsx
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
```

delay함수를 이용해 이렇게 바꿔 준다면, Promise 를 원하는대로 동작시킬 수 있다.