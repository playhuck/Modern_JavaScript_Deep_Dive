### Promise. 45

<aside>
💡 **해당 게시물은 Javascript Deep Dive를 기반으로 작성 됐습니다.**

</aside>

전통의 자바스크립트는 비동기 처리를 위해 콜백 함수를 사용했다.

ES6에선 비동기 함수나 동작의 처리를 위한 패턴으로 ES6에선 Promise라는 개념을 도입했다.

비동기 함수란 무엇일까?

Javascript Deep Diev에선 이렇게 말한다.

> *비동기 함수를 호출하면 함수 내부의 비동기로 동작하는 코드가 완료되지 않았다고 해도 기다리지 않고 즉시 종료된다. 즉, 비동기 함수 내부의 비동기로 동작하는 코드는 비동기 함수가 종료된 이후에 완료된다. 따라서 비동기 함수 내부의 비동기로 동작하는 코드에서 처리 결과를 외부로 반환하거나 상위 스코프의 변수에 할당하면 기대한 대로 동작하지 않는다.*
> 

### 그렇다면, 비동기 처리에 Promise가 없다면 무엇이 문제가 될까?

1. **비동기 동작을 제어할 수 없음**

setTimeout 함수는 비동기고 비동기인 이유는 callback 함수의 호출이 비동기로 동작한다.

```jsx
let g = 0;
	
setTimeout(() => {
   g = 100;

}, 0);

console.log(g); // 0
```

아래쪽 console이 100을 가리킬 것을 예상하고 작성했겠지만, setTimeout은 비동기 함수이기 때문에 callback 함수는 동작이 완료된 시점인 `console.log(g)`가 실행된 후에 내부 callback 함수가 실행된다.

1. **callback 지옥**
    
    
    또 전통의 Javascript에서는 이러한 비동기 처리 때문에 callback 지옥이 발생하곤 했는데, 요즘 ES6의 async/await 문법이 보편화된 이후로 개발에 입문한 사람이라면 겪지 못했을 것이다.
    
    ```jsx
    function stepOne(callback) {
        setTimeout(function () {
            console.log("Step One completed");
            callback();
        }, 3000);
    }
    
    function stepTwo(callback) {
        setTimeout(function () {
            console.log("Step Two completed");
            callback();
        }, 3000);
    }
    
    stepOne(function () {
        stepTwo(function () {
            console.log("All steps completed");
        });
    });
    
    // Step One completed
    // Step Two completed
    // All steps completed
    ```
    

이런식으로, callback의 순서 보장을 위해 비동기 함수가 실행되면 callback 함수를 실행시키고… 또 실행이 완료되면 callback을 실행시키고.. 끝없는 callback 지옥에 빠지게 된다.

1. **Error Handling의 어려움**
    
    
    ```jsx
    try {
    
        setTimeout(() => {
    
            throw new Error("ERROR!");
            
        }, 1000);
    
    } catch (e) {
    
        console.log("CATCH ERROR:", e);
    
    }
    
    // Error: ERROR!
    ```
    
    위 강제로 발생시킨 에러는 catch 블록에서 실행되지 않는다.
    
    setTimeout 함수가 호출되면 함수의 실행 컨텍스트가 생성되고 call stack에 push된 후 실행된다. setTimeout은 비동기 함수이기 때문에 callback 함수가 호출되는 것을 기다리지 않고 즉시 종료된 후 콜스택에서 제거된다.
    
    설정해 둔 1000ms인 1초가 지나고 나면, setTimeout 함수의 callback 함수는 task 큐로 push된 후 call stack이 비어졌을 때 Event loop에 의해 call stack으로 push되어 실행된다.
    
    callback 함수가 실행되는 시점에 이미, 호출자인 setTimeout 함수는 call stack에서 제거된 상태다. 이 말은 callback의 호출자(caller)가 setTimeout이 아니라는 소리이며, 현재 실행된 파일의 컨테스트의 하위 컨텍스트가 setTimeout의 실행 컨텍스트여야 하는데 callback이 포함되지 않았다는 것은 setTimeout은 하위 실행컨텍스트가 아니라는 것이다.
    
    에러는 호출자 방향으로 전파된다. 기존 함수의 실행컨텍스트(setTimeout)가 호출자가 아니기 때문에 catch block에 포함되지 않은 것이다.
    
    단순하게 말하면, 실행이 완료되는 시점에 callback이 실행되지 않았기 때문에 catch에서 인식하지 못한 것이다.
    

### Promise

promise는 ES6에서 도입된 문법이다. 

실제로 stackoverflow나 reddit 같은 사이트들의 매우 오래된 8년 이상된 과거 게시물들을 보면 비동기 처리에 관한 질문이 상당히 많고, 2018년이나 2019년 쯤에는 async / await을 어떻게 사용해야 하는지에 대한 질문이 또 많다. 근래에는 ES6인 Arrow function이나 async / await 등 promise 문법들이 보편화되어 쉽게 사용하고 있지만, 과거의 Javascript 생태계는 아주 혼란스러웠던 것 같다. 

1. **Promise 생성자**
    
    
    Promise 생성자 함수가 인수로 전달받은 callback 함수 내부에서 비동기 처리를 실행한다.
    
    비동기 처리가 실행되면 resolve 함수를 호출하고, 실패하면 reject 함수를 호출한다.
    
    ```jsx
    const promise = new Promise((resolve, reject) => {
            const success = true;
            if (success) {
                return resolve("Operation successful");
            } else {
                return reject("Operation failed");
            }
    });
    
    console.log(promise);
    
    // Promise { <pending> }
    ```
    
    Promise는 다음의 상태로 비동기 처리 정보를 표시한다.
    
    - pending
        
        
        비동기 처리가 아직 수행되지 않은 상태, Promise가 생성된 직후
        
    
    - fulfilled
        
        
        비동기 처리가 수행된 상태(성공), Resolve 함수 호출
        
    
    - rejected
        
        
        비동기 처리가 수행된 상태(실패), Reject 함수 호출
        
    
    fulfilled 또는 rejected된 상태를 settled 상태라고 한다. settled 상태로 변화한 후에는 다른 상태로 변화할 수 없다.
    
1. **후속 처리 메서드**
    
    
    - **then**
        
        
        첫 번째 callback 함수는 Promise가 성공 했을 때, 두 번째 callback은 Promise가 실패 했을 때 받는다.
        
        ```jsx
        const promise = new Promise((resolve, reject) => {
                const success = true;
                if (success) {
                    return resolve("Operation successful");
                } else {
                    return reject("Operation failed");
                }
        }).then((v) => {
            console.log("Resolve:", v);
        }, (e) => {
            console.log("Reject:", e);
        });
        
        // Resolve: Operation successful
        
        const promise = new Promise((resolve, reject) => {
                const success = false;
                if (success) {
                    return resolve("Operation successful");
                } else {
                    return reject("Operation failed");
                }
        }).then((v) => {
            console.log("Resolve:", v);
        }, (e) => {
            console.log("Reject:", e);
        });
        
        // Reject: Operation failed
        ```
        
    
    - **catch**
        
        
        Promise가 rejected된 상태인 경우 호출되며, then과 마찬가지로 언제나 Promise를 반환한다. 에러 핸들링을 위해 주로 사용된다.
        
    - **finally**
        
        
        Promise의 fulfilled나 rejected와 상관없이 무조건 한 번 호출된다. 언제나 Promise를 반환한다.
        
    
    이러한 callback 처리 메서드는, 코드 제어에 지대한 영향을 끼쳤지만 이 또한 callback 패턴이기 때문에 가독성이 좋지 않다.
    
2. **Promise Static 메서드**
    
    
    1. Promise.resolve / Promise.reject
        
        
        ```jsx
        const resolve = Promise.resolve([1,2,3]
        resolve.then(console.log) // [1,2,3]
        
        const reject = Promise.reject(new Error('Error!'));
        reject.catch(console.log) // Error: Error!
        ```
        
        인수로 전달받은 값을 resolve나 reject로 래핑하여 Promise를 생성하는 문법이다.
        
    
    1. Promise.all
        
        
        여러 개의 비동기 처리를 모두 병렬로 처리할 때 사용한다.
        
        ```jsx
        const promise1 = () => {
            return new Promise(resolve => setTimeout(() => {
                resolve(1)       
            }, 3000))
        };
        
        const promise2 = () => {
            return new Promise(resolve => setTimeout(() => {
                resolve(2)       
            }, 2000))
        }
        
        const promise3 = () => {
            return new Promise(resolve => setTimeout(() => {
                resolve(3)       
            }, 1000));
            
        };
        
        Promise.all([
            promise1(),
            promise2(),
            promise3()
        ]).then((resolve) => {
            console.log("Resolve:", resolve);
        });
        
        // Resolve: [ 1, 2, 3 ]
        ```
        
        Promise.all은 Promise를 가진 값의 배열 등의 이터러블을 인수로 전달받는다.
        
        전달받은 모든 Promise가 fulfilled 상태가 되면 모든 처리 결과를 배열에 저장해 새로운 Promise를 반환한다.
        
        첫번째 promise1이 제일 나중에 fulfilled 상태가 된다고 하더라도 Promise.all은 첫 번째 프로미스가 처리한 결과부터 차례대로 배열에 저장한다.
        
        즉, 처리 순서가 보장된다.
        
        한편 Promise가 하나라도 rejected가 된다면 나머지 promise가 fulfilled가 되는 것을 기다리지 않고 즉시 종료한다.
        
    2. Promise.race
        
        
        Promise.all과 비슷하게 동작하지만, 모든 프로미스가 fulfilled 상태가 되는 것을 기다리는 것이 아닌 가장 먼저 fulfilled 상태가 된 처리 결과를 resolve하는 새로운 프로미스를 반환한다.
        
        ```jsx
        ...
        
        Promise.race([
            promise1(),
            promise2(),
            promise3()
        ]).then((resolve) => {
            console.log("Resolve:", resolve);
        });
        
        // Resolve: 3
        ```
        
    
    1. Promise.allSettled
        
        
        Promise가 모두 settled 상태가 되면 처리 결과를 배열로 반환한다.
        
        Promise.all이 모두 resolve되야 하는 것을 기다리는 것과 달리, allSettled는
        
        rejected된 상태도 반환한다.
        
        만약 rejected된 경우 reason property를 가진다.
        
        ```jsx
        const promise1 = () => {
            return new Promise(resolve => setTimeout(() => {
                resolve(1)       
            }, 3000))
        };
        
        const promise2 = () => {
            return new Promise(resolve => setTimeout(() => {
                resolve(2)       
            }, 2000))
        }
        
        const promise3 = () => {
            return new Promise((resolve, reject) => {
        
                return reject(new Error("Reject ERROR"))
            });
            
        };
        
        Promise.allSettled([
            promise1(),
            promise2(),
            promise3()
        ]).then((resolve) => {
            console.log("Resolve:", resolve);
        }).then(e => {
            console.log("Error:", e);
        });
        
        // Resolve: [
        //     { status: 'fulfilled', value: 1 },
        //     { status: 'fulfilled', value: 2 },
        //     {
        //       status: 'rejected',
        //       reason: Error: Reject ERROR
        //           ...
        //           at node:internal/main/run_main_module:23:47
        //     }
        //   ]
        //   Error: undefined
        ```
        
    

### async/await

async/await은 Promise 기반으로 동작한다.

then/catch/finally를 사용하지 않고도 비동기 처리 결과를 동기적으로 동작하는 것 처럼 Promise의 처리 결과를 사용할 수 있다.

```jsx
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
```

1. **async**
    
    
    await 키워드는 반드시 async function 내부에서 사용해야 한다.
    
    async function은 async 키워드를 통해 정의하며 언제나 promise를 반환한다.
    
    async 함수 inner의 실행 스크립트가 실제 promise를 반환하지 않더라도, async는 언제나 반환값을 resolve하는 promise를 반환한다.
    

1. **await**
    
    
    await은 Promise가 settled 상태가 될 때까지 대기하다 settled가 되면 promise가 resolve한 처리 결과를 반환한다.
    
    await을 모든 키워드에 사용하는 것은 주의해야 하는데, 만약 선행 Promise가 종료될 때까지 많은 시간이 소요된다면, 선행 Promise의 완료 시점을 다음 Promise가 기다리기 때문인데 이럴 경우에는 Promise.all을 사용하는 것이 좋다.
    

1. **Error Handling**
    
    
    async 함수 내에서 catch 문을 사용해서 error 처리를 하지 않으면 async 함수는 발생한 에러를 reject하는 promise를 반환한다.
    

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