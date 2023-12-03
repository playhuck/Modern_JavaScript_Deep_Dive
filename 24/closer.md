## 24. 클로저

---

클로저는 JS의 고유 개념이 아니다. 함수를 일급 객체로 취급하는 하스켈같은 함수형 프로그래밍 언어에서 사용되는 중요 특성이다.

MDN에서는 클로저를 다음과 같이 정의하고 있다.

> **클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.**
> 

무척 난해하기 때문에, 먼저 예제를 살펴보면

```jsx
const x = 1;

function outerFunc() {
    const x = 10;

    function innerFunc() {
        console.log(x);
    };

    innerFunc();
};

outerFunc();
```

outerFunc 함수 내부에서 중첩 함수 innerFunc가 정의되고 호출됐다.

이 때 중첩함수 innerFunc의 상위 스코프는 outerFunc의 스코프다.

따라서, 중첩 함수 innerFunc 내부에서 자신을 포함하고 있는 회부 함수 outerFunc의 변수에 접근할 수 있다.

### 24.1 렉시컬 스코프

---

**JS 엔진은 함수를 어디서 호출했는지가 아니라 함수를 어디에 정의했는지에 따라 상위 스코프를   결정한다.** 이를 렉시컬 스코프(정적 스코프)라고 한다.

Scope의 실체는 실행컨텍스트의 렉시컬 환경이다. 이 렉시컬 환경은 자신의 ‘외부 렉시컬 환경에 대한 참조’를 통해 상위 렉시컬 환경과 연결된다.

이것이 바로 “Scope Chain”이다.

따라서, **함수의 상위 스코프를 결정한다**는 것은 **렉시컬 환경의 외부 렉시컬 환경에 대한 참조에 저장할 참조값을 결정**한다는 것과 같다.

이것이 바로 렉시컬 스코프(Lexical Scope)다.

### 24.2 함수 객체의 내부  슬롯 [[ Environment ]]

---

함수가 정의된 환경(위치)와 호출되는 환경(위치)은 다를 수 있다. 따라서 렉시컬 스코프가 가능하려면 함수는 자신이 호출되는 환경과는 상관없이 자신이 정의된 환경, 즉 상위 스코프를 기억해야 한다.

이를 위해 함수는 **자신의 내부 슬롯 [[ Environment ]]에 자신이 정의된 환경, 즉 상위 스코프의 참조를 저장**한다.

이 때 자신의 내부 슬롯에 저장된 상위 스코프의 참조는 현재 실행 중인 실행 컨텍스트의 렉시컬 환경을 가리킨다.

**따라서 함수 객체의 내부 슬롯 [[ Environment ]]에 저장된 현재 실행 중인 실행 컨텍스트의 렉시컬 환경의 참조가 바로 상위 스코프다. 또한 자신이 호출되었을 때 생성될 함수 렉시컬 환경의 “외부 렉시컬 환경에 대한 참조”에 저장될 값이다. 함수 객체는 내부 슬롯 [[ Environment ]]에 정의된 렉시컬 환경의 참조, 즉 상위 스코프를 자신이 존재하는 한 기억한다**.

```jsx
const x = 1;

function foo() {
    
    const x = 10;

    bar();

};

function bar(param) {
    console.log(x);
}

foo();
bar();
```

함수 코드평가는 아래와 같이 진행되는데,

1. 함수 실행 컨텍스트 생성
2. 함수 렉시컬 환경 생성
    1. 함수 환경 레코드 생성
    2. this 바인딩
    3. 외부 렉시컬 환경에 대한 참조 결정

이 때 함수 렉시컬 환경의 구성 요소인 외부 렉시컬 환경에 대한 참조에는 함수 객체의 내부 슬롯에 저장된 렉시컬 환경의 참조가 할당되고, 이 할당된 참조가 곧 렉시컬 함수가 선언될 당시의 상위 스코프를 말한다.

### 24.3 클로저와 렉시컬 환경

---

예제를 먼저 살펴보면,

```jsx
const x = 1;

function outer() {
    const x = 10;
    const inner = function () {
        console.log(x);
    };
    return inner;
};

const innerFunc = outer();
innerFunc();
```

outer 함수를 호출하면, inner를 반환하고 생명 주기(life cycle)을 마감한다. 즉, outer 함수의 실행이 종료되면 outer 함수의 실행 컨텍스트는 실행 컨텍스트에서 제거(pop) 된다.

이 때 outer 함수의 지역 변수  x와 변수 값 10을 저장하고 있던 outer 함수의 실행 컨텍스트가 제거 됐으므로 outer 함수의 지역변수 x(10) 또한 생명 주기를 마감한다.

하지만, 위 코드를 실행시키면 outer 함수의 지역변수 x 값인 10이다. 생명주기가 종료된 실행 컨텍스트 스택에서 제거된 outer 함수의 지역 변수 x가 불리고 있다.

**외부 함수보다 중첩함수가 더 오래가는 이유는 중첩 함수는 이미 생명주기가 종료된 외부 함수의 변수를 참조할 수 있기 때문이다. 이런 중첩 함수를 클로저라고 한다.**

결국 클로저 내부 슬롯에 저장된 상위 스코프의 참조 값을 불러내어 동작하고 있는 것이다.

함수를 어디서 호출하든 자신이 기억하는 상위 스코프의 식별자를 JS는 참조할 수 있으며 식별자에 바인딩된 값을 변경할 수도 있다.

위 예제에서 outer 함수의 실행이 종료하면 inner 함수를 반환하며 outer 함수의 생명주기가 종료 되지만(실행 컨택스트 스택에서의 제거), **outer 함수의 실행 컨텍스트가 제거되지만 outer 함수의 렉시컬 환경까지 소멸하는 것은 아니다.**

outer 함수의 렉시컬 환경은 [[ Environment ]] 내부 슬롯에 의해 참조되고 있고 inner 함수는 전역 변수 innerFunc에 의해 참조되고 있으므로 가비지 컬렉션의 대상이 되지 않는다.

가비지 컬렉터는 누군가 참조하고 있는 메모리 공간을 함부로 침범하지 않는다.

JS의 모든 함수는 상위 스코프를 기억하므로 이론적으로 모든 함수는 클로저지만, 상위 스코프의 어떤 식별자도 참조하지 않는 함수는 클로저가 아니다.

따라서 **클로저는 중첩 함수가 상위 스코프의 식별자를 참조하고 있고 중첩 함수가 외부 함수보다 더 오래 유지되는 경우에 한정하는 것이 일반적이다.**

### 24.4 클로저의 활용

---

**클로저는 상태(state)를 안전하게 변경하고 유지하기 위해 사용된다.** 다시 말해, 상태가 의도치 않게 변경되지 않도록 **상태를 은닉하고 특정 함수에게만 상태 변경을 허용**하기 위해 사용된다.

```jsx
let num = 0;

const increase = function () {
    
    return ++ num;

};

console.log(increase());
console.log(increase());
console.log(increase());
```

위 코드의 num은 전역 변수로서 누구나 접근할 수 있기 때문에 의도치 않게 상태가 변경될 수 있다. 따라서 카운트 상태를 안정적으로 유지하기 위해서는 increase() 함수만이 num 변수를 참조하고 변경할 수 있게 하는 것이 바람직하다. 이를 위해 전역 변수 num을 increase 함수의 지역 변수로 바꿔보면

```jsx
const increase = function () {
    
    let num = 0;

    return ++num;
}
```

전역 변수를 지역적으로 변경하여 간섭은 줄였지만, increase가 호출될 때마다 항상 0으로 초기화 되기 때문에 출력 결과는 언제나 1일 것이다.

```jsx
const increase = (function () {
    
    let num = 0;

    return function(){
        return ++num;
    }
})
```

코드를 위처럼 바꾼다면, 즉시 실행 함수가 반횐한 클로저는 카운트 상태를 유지하기 위한 자유 변수 num을 언제 어디서 호출하든지 참조하고 변경할 수 있다.

이처럼 클로저는 상태가 의도치 않게 변경되지 않도록 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용하여 상태를 안전하게 변경하고 유지하기 위해 사용한다.

```jsx
function makeCounter(aux) {
    
    let counter = 0;

    return function() {
        counter = aux(counter);
        return counter;
    }
};

function increase(n) {
    return ++n;
};

function decrease(n) {
    return --n;
}

const increaser = makeCounter(increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

const decreaser = makeCounter(decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

위 코드는 makeCounter **함수를 호출해 함수를 반환할 때 반환된 함수는 자신만의 독립된 렉시컬 환경을 갖는다는 것**을 보여준다.

만약, 각각의 렉시컬 환경을 공유하는 클로저를 만들고 싶다면 위 코드를 아래와 같이 수정하면 된다.

```jsx
const counter = (function() {
    
    let counter = 0;

    return function ( aux ) {

        counter = aux(counter)
        return counter;
    }
})();

function increase(n) {
    return ++n;
};

function decrease(n) {
    return --n;
}

console.log(counter(increase)); // 1
console.log(counter(decrease)); // 0

console.log(counter(increase)); // 1
console.log(counter(decrease)); // 0
```

위처럼 작성하면 렉시컬 환경을 공유한다.

### 24.5 캡슐화와 정보 은닉

---

캡슐화는 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것을 말한다.

일반적으로 캡슐화는 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는데, 이를 정보 은닉이라고 한다.

정보 은닉은 외부 공개의 필요가 없는 것을 감추고, 적절치 못한 접근을 방지해 정보를 보호하고 객체 간의 상호 의존성, 즉 결합도를 낮추는 효과가 있다.

클래스를 사용하지 않는 JS의 객체의 모든 프로퍼티와 메서드는 기본적으로 외부에 공개되어 있다. 즉, 기본적으로 public하다.

```jsx
function Person(name, age) {
    
    this.name = name; // public
    let _age = age; // private

    this.sayHi = function () {
        console.log(`Hi My name is ${this.name}. i am ${_age}`);
    }
};

const me = new Person('Kim', '28');
me.sayHi(); // Hi My name is Kim. i am 28
console.log(me.name); // Kim
console.log(me._age); // undefined
```

위 name은 public이라 잘 접근할 수 있지만, _age는 private이라 접근할 수 없다.

하지만, 위 예제의 sayHi 메서드는 인스턴스 메서드이기 때문에 Person 객체가 생성될 때마다 중복 생성된다.

중복 생성을 방지하도록 수정하면,

```jsx
function Person(name, age) {
    
    this.name = name; // public
    let _age = age; // private
};

Person.prototype.sayHi = function () {
    console.log(`Hi My name is ${this.name}. i am ${_age}`);
}
const me = new Person('Kim', '28');
me.sayHi(); // Hi My name is Kim. i am 28
console.log(me.name); // Kim
console.log(me._age); // undefined
```

이렇게 고칠 수 있지만, 또 문제가 _age에 접근할 수 없는 문제가 발생한다.

한번 더 고치면,

```jsx
const Person = (function () {

    let _age = 0; // private

    function Person(name, age) {
    
        this.name = name; // public
        _age = age; // private
    };

    Person.prototype.sayHi = function () {
        console.log(`Hi My name is ${this.name}. i am ${_age}`);
    };

    return Person;
}());
const me = new Person('Kim', '28');
me.sayHi(); // Hi My name is Kim. i am 28
console.log(me.name); // Kim
console.log(me._age); // undefined
```

이제는 age에 접근할 수 있고 중복을 막으며 접근 또한 다룰 수 있게 됐다.

클로저를 통해 구현한 위 함수는 더 많은 기능을 할 수 있지만 문제가 존재하는데, 그것은 바로 Person 생성자 함수가 여러 개의 인스턴스를 생성할 경우 _age의 변수의 상태가 유지되지 않는다는 것이다.

```jsx
const me1 = new Person("Kim", 28);
me.sayHi(); // ... I am 28

const me2 = new Person("Lee", 27);
me.sayHi(); // ... I am 27
```

이는 Person.prototype.sayHi가 단 한 번 생성되는 클로저이기 때문에 발생하는 현상이다.

또한 sayHi 메서드가 자신의 상위 스코프인 렉시컬 환경의 참조를 [[ Environment ]]에 저장하여 기억하기 때문이고 Person 생성자 함수의 모든 인스턴스가 상속을 통해 호출할 수 있는 Person.prototype.sayHi 메서드의 상위 스코프는 어떤 인스턴스로 호출하더라도 하나의 동일한 상위 스코프를 사용하게 된다.

이처럼 완전한 은닉을 JS는 지원하지 않는다. ES7의 Symbol 또는 WeakMap을 사용하여 private한 프로퍼티를 흉내 냈으나 근본적인 해결책은 아니었다.