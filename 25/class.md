### 클래스(Class). 25

**25.1 클래스는 프로토타입의 문법적 설탕(Syntasx sugar)인가?**

---

자바스크립트는 프로토타입 기반의 객체지향 언어다. 자바스크립트는 강력한 객체지향 프로그래밍 능력을 가지고 있다.

프로토타입 기반의 객체지향 언어는 클래스가 필요 없는 객체지향 프로그래밍 언어이다.

ES5에서는 클래스 없이도 다음과 같이 상속을 구현할 수 있었다.

```jsx
var Person = (function () {

    function Person(name) {
        this.name = name;
    };
    // Person 생성자 함수는 name이라는 속성을 가진 객체를 생성합니다. this.name에는 생성자에 전달된 name이 할당됩니다.

    Person.prototype.sayHi = function () {
        console.log('Hi! My name is ' + this.name);
    };
    //생성자 함수의 프로토타입 객체에 sayHi라는 메서드를 추가합니다. 
    //이 메서드는 객체를 생성할 때마다 복제되지 않고, 모든 Person 객체가 이 메서드에 접근할 수 있게 합니다.

    return Person;

}());

var me = new Person('Lee');
//Person 생성자 함수를 사용하여 me라는 객체를 생성합니다. 생성자에 'Lee'를 전달하여 me 객체의 name 속성을 설정합니다.

console.log(me.sayHi());
//프로토타입을 이용한 상속은 Person 생성자 함수가 생성한 모든 객체가 sayHi 메서드를 공유할 수 있도록 합니다. 
//즉, 모든 Person 객체는 공통된 메서드를 가지며, 이는 메모리를 효율적으로 사용할 수 있도록 도와줍니다.
```

하지만 클래스 기반 언어에 익숙한 개발자들에게 프로토타입 기반은 혼란을 줄 수 있다.

그래서 등장한 것이 ES6의 클래스(class) 키워드다.

그러나 사실 **JS의 클래스는 함수이며 기존 프로토타입 기반 패턴을 클래스 기반 패턴처럼 사용할 수 있도록 하는 문법적 설탕**이라고 볼 수 있다.

물론 클래스와 생성자 함수는 모두 프로토타입 기반의 인스턴스를 생성하지만, 정확하게 동일한 동작을 하지는 않는다. 다음과 같은 차이가 있다.

1. **클래스는 new 연산자 없이 호출하면 에러가 발생한다. 하지만 생성자 함수를 new 연산자 없이 호출하면 일반 함수로서 호출된다.**
2. **클래스는 상속을 지원하는 extends와 super 키워드를 제공한다. 하지만 생성자 함수는 extends와 super 키워드를 제공하지 않는다.**
3. **클래스는 호이스팅이 발생하지 않는 것처럼 동작한다. 하지만 함수 선언문으로 정의된 생성자 함수는 함수 호이스팅이, 함수 표현식으로 정의한 생성자는 변수 호이스팅이 발생한다.**
4. **클래스 내의 모든 코드에는 암묵적으로 strict mode가 지정되어 실행되며, strict mode를 해제할 수 없다. 하지만 생성자 함수는 암묵적으로 strict mode가 지정되지 않는다.**
5. **클래스의 constructor, 프로토타입 메서드, 정적 메서드는 모두 Property Attribute [[Enumerable]]의 값이 false다. 다시 말해, 열거되지 않는다.**

이러한 차이로 사실, 클래스를 단순한 문법적 설탕이라고 보기보다는 새로운 객체 생성 매커니즘으로 보는 것이 좀 더 합당하다.

**25.2 클래스 정의**

---

클래스 이름은 생성자 함수와 마찬가지로 **파스칼 케이스**를 사용하는 것이 일반적이다. 하지만 ,파스칼 케이스를 사용하지 않아도 에러가 발생하지는 않는다.

클래스를 표현식으로 사용할 수 있다는 것은 클래스가 값으로 사용할 수 있는 1급 객체라는 것을 의미한다. 클래스는 1급 객체로서 다음과 같은 특징을 갖는다.

- 임의의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.
- 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
- 함수의 매개변수에 전달할  수 있다.
- 함수의 반환값으로 사용할 수 있다.

좀 더 자세히 말하자면, 클래스는 함수다. 따라서 일급객체인 것이다.

클래스 몸체에는 0개 이상의 메서드만 정의할 수 있다. 클래스 몸체에서 정의할 수 있는 메서드는 **constructor(생성자) / prototype method / static method의 세 가지**가 있다.

```
class Person {

    constructor(name){
        this.name = name;
    } // 인스턴스 생성 및 초기화

    sayHi() {
        console.log(`Hi! My name is ${this.name}`);
    };

    static sayHello() {
        console.log('Hello');
    };
};

const me = new Person('Kim');

console.log(me.name); // Kim

me.sayHi(); // Hi! My name is Kim

Person.sayHello(); // Hello!
```

**25.3 클래스 호이스팅**

---

**클래스는 함수로 평가된다**.

클래스 선언문으로 정의한 클래스는 함수 선언문과 같이 소스코드 평가 과정, 즉 런타임 이전에 먼저 평가되어 함수 객체를 생성한다. 이 때 클래스가 평가되어 생성된 함수 객체는 생성자 함수로써 호출할 수 있는 함수 즉 constructor이다.

생성자 함수로서 호출할 수 있는 함수는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.

단, 클래스는 클래스 정의 이전에 호출할 수 없다.

클래스 키워드도 호이스팅이 발생하지만, let / const 키워드로 선언한 변수처럼 호이스팅된다. 따라서  TDZ에 빠지기 때문에 호이스팅이 발생하지 않는 것처럼 동작한다.

결론만 말하자면 선언식은 발생하지 않고 표현식은 발생한다. let const 처럼 절차형으로 잘 작성하면 된다.

```jsx
class Person {}; // 선언식

const Person = class {}; // 표현식
```

**25.4 인스턴스 생성**

---

클래스 표현식으로 정의된 클래스의 경우 다음 처럼 클래스를 가리키는 식별자를 사용해 인스턴스를 생성하지 않고, 기명 클래스 표현식의 클래스 이름을 사용해 인스턴스를 생성하면 에러가 발생한다.

```jsx
const Person = class MyClass {};

const me = new Person();

console.log(MyClass); // ReferenceError
console.log(new MyClass()); // ReferenceError
```

함수 표현식과 마찬가지로 클래스 표현식에서 사용한 클래스 이름은 외부에서 접근이 불가능하다.

**25.5 메서드**

---

클래스 몸체에는 0개 이상의 메서드만 정의할 수 있다. 클래스 몸체에서 정의할 수 있는 메서드는 **constructor(생성자) / prototype method / static method의 세 가지**가 있다.

1. **constructor**
    
    
    constructor는 인스턴스를 생성하고 초기화하기 위한 특수한 메서드다.
    
    생성자 함수와 마찬가지로, constructor 내부에서 this에 추가한 Property는 Instance Property가 된다. constructor 내부의 this는 생성자 함수와 마찬가지로 클래스가 생성한 instance를 가리킨다.
    
    <aside>
    💡 클래스의 constructor와 프로토타입의 constructor는 이름이 같지만 관련이 없다.
    
    </aside>
    
    constructor는 생성자 함수와 유사하지만 차이가 있다.
    
    - 한 개만 존재할 수 있다.
    - 생략할 수 있다. 생략되면 암묵적으로 **`constructor(){}`**
    - 인스턴스를 생성할 때 class 외부에서 instance property의 초기값을 전달하려면 인스턴스를 생성할 때 초기값을 constructor에 전달한다.
    - constructor는 별도의 return문을 갖지 않는다. new 연산자와 함께 클래스가 호출되면 동일하게 암묵적으로 this, 즉 인스턴스를 반환하기 때문이다.
        - 만약 this가 아닌 다른 객체를 명시적으로 반환하면 this가 반환되지 못하고 return문에 명시한 객체가 반환된다.
        - 명시적 원시값 **`{} (Object) / String / Number`** … 을 반환하면 암묵적으로 this가 반환된다.
    
2. Prototype Method
    
    
    클래스 내부에서 정의된 메서드는 생성자 함수에 의한 객체 생성 방식과는 다르게 클래스의 prototype 프로퍼티에 메서드를 추가하지 않아도 기본적으로 프로토타입 메서드가 된다.
    
    생성자 함수와 마찬가지로 클래스가 생성한 인스턴스는 프로토타입 체인의 일원이 된다.
    
    ```jsx
    class Person {
    
        constructor(name){
            this.name = name;
        }
    };
    
    const me = new Person('Kim');
    
    console.log(Object.getPrototypeOf(me) === Person.prototype); // true
    console.log(me instanceof Person); // true
    
    console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype); // true
    console.log(me instanceof Object); // true
    
    console.log(me.constructor === Person); // true
    ```
    

이처럼 클래스 내부에 정의된 메서드는 인스턴스의 prototype에 존재하는 prototype method가 된다. 인스턴스는 prototype method를 상속받아 사용할 수 있다.

결국 클래스는 생성자 함수와 마찬가지로 인스턴스를 생성하는 생성자 함수라고 볼 수 있다. 다시말해 JS의 ES6 class는 생성자 함수와 마찬가지로 prototype 기반의 객체 생성 매커니즘이다.

1. 정적 메서드
    
    
    정적(static) 메서드는 인스턴스를 생성하지 않아도(**`new Class`**) 호출할 수 있는 메서드를 말한다.
    
    클래스에서는 메서드에 static 키워드를 붙이면 된다.
    
    정적 메서드는 클래스에 바인딩된 메서드가 된다. 클래스는 함수인 일급객체로 평가되기 때문에 자신의 프로퍼티 / 메서드를 소유할 수 있다. 클래스가 평가되는 시점에 같이 생성되기 때문에 별다른 생성과정이 필요 없다.
    
    정적 메서드는 인스턴스로 호출할 수 없다. static 메서드가 binding된 클래스는 instance prototype 체이닝 상에 존재하지 않기 때문이다.
    
    다시말해, 상속받을 수 없다. 그렇기 때문에 **생성된 인스턴스 (new Class)는 프로토타입 체이닝상에 존재하지 않는 static 메서드를 호출할 수 없다**.
    
2. 정적 메서드와 프로토타입 메서드의 차이
    
    
    1. **정적 메서드와 프로토타입 메서드는 속해 있는 프로토타입 체인이 다르다**.
    2. 정적 메서드는 클래스로 호출하고 프로토타입 메서드는 인스턴스로 호출한다.
    3. 정적 메서드는 인스턴스 프로퍼티를  참조할 수 없지만 프로토타입 메서드는 인스턴스 프로퍼티를 참조할 수 있다.

1. 클래스에서 정의한 메서드의 특징
    
    
    1. function 키워드를 생략한 메서드 축약 표현을 사용한다.
    2. 객체 리터럴과 다르게 클래스에 메서드를 정의할 때는 콤마가 필요 없다.
    3. 암묵적으로 strict mode로 실행된다.
    4. for … in 문이나 Object.keys 메서드 등으로 열거할 수 없다. 즉, Property의 열거 가능 여부를 나타내며, Boolean 값을 갖는 property attribute [[Enumerable]]의 값이 false다.
    5. 내부 메서드 [[Construct]]를 갖지 않는 non-constructor다. 따라서 new 연산자와 함께 호출할 수 없다.

**25.6 클래스의 인스턴스 생성 과정**

---

new 연산자와 함께 클래스를 호출하면 클래스의 내부 메서드 [[Construct]]가 호출된다.

1. instance 생성과 this 바인딩
    
    
    new 연산자와 함께 클래스를 호출하면 constructor 내부 코드가 실행되기 앞서 암묵적인 빈 Obejct가 생성된다. 이 빈 객체가 바로 클래스가 생성한 instance다.
    
    이 때 클래스가 생성한 instance의 prototype으로 클래스의 prototype property가리키는 객체가 설정된다. 그리고 암묵적으로 생성된 빈 객체, 즉 인스턴스는 this에 바인딩된다.
    
    따라서 constructor 내부의 this는 클래스가 생성한 instance를 가리킨다.
    
2. 인스턴스 초기화
    
    
    constructor의 내부 코드가 실행되어 this에 바인딩되어 있는 인스턴스를 초기화 한다.
    
    즉, constructor가 인수로 전달받은 초기값으로 인스턴스의 property값을 초기화 한다.
    
3. 인스턴스 반환
    
    
    완성된 인스턴스가 바인딩된 this에 암묵적으로 반환된다.
    

```jsx
class Person {

    constructor(name) {

        // 1. 암묵적으로 생성된 this가 인스턴스에 바인딩 됨
        console.log(this); // Person {}
        console.log(Object.getPrototypeOf(this) === Person.prototype); // true

        // 2. this에 바인딩되어 있는 인스턴스를 초기화
        this.name = name;

        // 3. 완성된 인스턴스가 바인딩된 this를 암묵적으로 반환
    }
}
```

**25.7 프로퍼티**

---

1. instance property
    
    
    instance property는 constructor 내부에서 정의해야 한다.
    
    ES6의 클래스는 인스턴스에 다른 객체지향 언어처럼 private, public, protected 같은 키워드와 같은 접근 제한자(access modifier)를 지원하지 않는다.
    
    따라서, instance property는 언제나 public 하다. **`< TS 에서는 지원한다. >`** 
    
2. accessor property (접근자 프로퍼티)
    
    
    accessor property는 자체적으로 값 [[Value]] 내부슬롯을 갖지 않고 다른 데이터 property의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 property다. 
    
    ```jsx
    const person = {
    
        // data property
        firstName: 'Lay',
        lastName: 'Kim',
    
        // 접근자 함수로 구성된 접근자 프로퍼티
        // getter
        get fullName() {
            return `${this.firstName} ${this.lastName}`;
        },
    
        // setter
        set fullName(name) {
            [this.firstName, this.lastName] = name.split(' ');
        }
    };
    
    console.log(`${person.firstName} ${person.lastName}`); // Lay Kim
    
    /**
     * 접근자 프로퍼티를 통한 프로퍼티 값의 저장
     * fullName에 저장하면 setter함수가 호출된다.
     */
    person.fullName = 'Luke Gang';
    console.log(person); // { firstName: 'Luke', lastName: 'Gang', fullName: [Getter/Setter] }
    
    /**
     * 접근자 프로퍼티를 통한 프로퍼티 값의 참조
     * 프로퍼티 fullName에 접근하면 getter함수가 호출된다.
     */
    console.log(person.fullName);
    
    /**
     * fullName은 접근자 프로퍼티다.
     * 접근자 프로퍼티는 get, set, enumerable, configurable의 property attributes를 갖는다.
     */
    console.log(Object.getOwnPropertyDescriptor(person, 'fullName'));
    
    // {
    //     get: [Function: get fullName],
    //     set: [Function: set fullName],
    //     enumerable: true,
    //     configurable: true
    // }
    ```
    

접근자 함수로 구성된 접근자 프로퍼티는 class에서도 다음과 같이 사용할 수 있다.

```jsx
class Person {
    
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    };

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    };

    set fullName(name) {
        [this.firstName, this.lastName] = name.split(' ');
    }
};

const me = new Person('Lay', 'Kim');

// ... 접근자 함수와 동일하게 작용한다.
```

get(getter)는 instance property에 접근할 때마다 property 값을 조작하거나 별도의 행위가 필요할 때마다 사용한다.

set(setter)는 instacne property에 값을 할당할 때마다 property 값을 조작하거나 별도의 행위가 필요할 때 사용한다.

다시말해, get은 호출하는 것이 아닌 property처럼 값을 참조하는 형식으로 사용하며, 참조시에 내부적으로 getter가 호출된다.

set도 호출하는 것이 아닌 property에 값을 할당하는 형식으로 사용되며 setter가 호출된다.

**get은** 무언가를 취득할 때 사용하므로 **반드시 무언가를 반환(return)**해야 하고, **set은** 무언가를 할당해야 하기 때문에 **반드시 매개변수**가 있어야 한다.

클래스의 메서드는 기본적으로 prototype 메서드가 된다. 따라서 클래스의 accessor property 또한 instance property가 아닌 prototype property가 된다.

```jsx
Object.getOwnPropertyNames(me) ; // ["firstName", "lastName"]
Object.getOwnPropertyNames(Object.getPrototypeof(me)); // ["constructor", "fullName"]
```

1. 클래스 필드(생략)

1. private 필드 정의 제안
    
    
    ES6의 클래스는 생성자 함수와 마찬가지로 다른 클래스 기반 객체지향 언어에서 지원하는 private, public, protected와 같은 접근 제한자를 지원하지 않는다.
    
    따라서 instance property는 instance를 통해 클래스 외부에서 언제나 참조할 수 있다. 즉 언제나 public이다.
    
    <aside>
    💡 단, 위에서 언급한 것 처럼 Typescript에서는 public, private, protected 및 abstract까지 모두 지원하며 기본적으로 의미또한 동일하다.
    
    </aside>
    
    ES6의 기준에 따라 제안된 문법에 따르면 JS에서도 private을 구현할 수 있는데 #을 붙이면 된다.
    
    ```jsx
    class Person {
    
        #name = '';
        
        constructor(firstName, lastName, name) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.#name = name;
        };
    	....
    };
    
    const me = new Person('Lay', 'Kim', "Kim Lay");
    
    console.log(me.name); // undefined
    ```
    
    #private 필드는 반드시 class 필드에 먼저 정의해야하고, private 필드를 직접 constructor에 정의하면 에러가 발생한다.
    
1. static 필드 정의 제안
    
    
    클래스에는 static 키워드를 사용하여 정적 메서드를 정의할 수 있다.
    
    하지만, static 키워드를 사용하여 정적 field를 정의할 수는 없었다.
    
    static public, static private 메서드를 정의할 수 있는 새로운 표준 사양인 Static class features가 제안됐다.
    
    ```jsx
    class MyMath {
    
        static Pi = 22 / 7;
    
        static #num = 10;
    
        static increment() {
            return ++MyMath.#num;
        }
    };
    
    console.log(MyMath.Pi); //3.142857142857143
    console.log(MyMath.increment()); // 11
    ```
    

**25.8 상속에 의한 클래스 확장**

---

1. 클래스 상속과 생성자 함수 상속
    
    
    상속에 의한 클래스 확장은 지금까지 본 prototype 기반의 상속과는 다른 개념이다.
    
    **prototype 기반 상속은 prototype chain을 통해 다른 객체의 자산을 상속받는 개념이지만, 상속에 의한 클래스 확장은 기존 클래스를 상속받아 새로운 클래스를 확장(extends)하여 정의하는 것** 이다.
    
    ```jsx
    class Animal {
    
        constructor(age, weight){
            this.age = age;
            this.weight = weight;
        };
    
        eat() {
            return 'eat';
        };
    
        move() {
            return 'move';
        };
    
    };
    
    class Bird extends Animal {
        
        fly() {
            return 'fly';
        };
    };
    
    const bird = new Bird(1, 5);
    
    console.log(bird);
    console.log(bird instanceof Bird);
    console.log(bird instanceof Animal);
    
    console.log(bird.eat());
    console.log(bird.move());
    console.log(bird.fly());
    
    Bird { age: 1, weight: 5 }
    true
    true
    eat
    move
    fly
    ```
    

이처럼 상속은 재사용성에서 뛰어나다.

클래스는 상속을 통해 다른 클래스를 확장할 수 있는 문법인 extends 키워드가 기본적으로 제공된다. 하지만, 생성자 함수는 제공되지 않는다.

물론, 의사 클래스 상속 패턴을 사용하여 상속에 의한 클래스 확장을 흉내 내기도 했다.

```jsx
var Animal = (function () {

    function Animal(age, weight) {
        this.age = age;
        this.weight = weight;
    };

    Animal.prototype.eat = function () {
        return 'eat';
    };

    Animal.prototype.move = function () {
        return 'move';
    };

    return Animal;
}());

// Animal 생성자 함수를 상속하여 확장한 Bird 생성자 함수
var Bird = (function () {
    function Bird() {

        // Animal 생성자 함수에 this와 arguments(인수)를 전달하면서 호출
        Animal.apply(this, arguments);
    };

    // Bird.prototype을 Animal.prototype을 갖는 프로토타입으로 교체
    Bird.prototype = Object.create(Animal.prototype);

    // Bird.prototype.constructor를 Animal에서 Bird로 교체
    Bird.prototype.constructor = Bird;

    Bird.prototype.fly = function() {
        return 'fly';
    };

    return Bird;

}());

var bird = new Bird(1, 5);
```

1. extends 키워드
    
    
    상속을 통해 확장하려면 extends키워드를 사용한다.
    
    상속을 통해 확장된 클래스를 서브클래스(subclass)라고 부르고, 서브클래스에게 상속된 클래스를 슈퍼클래스(super-class)라고 부른다. 서브클래스를 파생 클래스(derived class) 또는 자식 클래스(child-class), 혹은 슈퍼클래스를 베이스 클래스(base-class) 또는 부모 클래스(parent class)라고 부르기도 한다.
    
    자식 클래스와 부모 클래스는 instance의 prototype chain 뿐만 아니라, 클래스 간의 prototype chain도 생성한다. 이를 통해 prototype method, static method 모두 상속이 가능하다.
    
2. 동적 상속
    
    
    extends 키워드는 클래스 뿐만 아니라 생성자 함수를 상속받아 클래스를 확장할 수도 있다. 단, extends 키워드 앞에는 반드시 클래스가 와야 한다.
    
    - 클래스 extends 생성자 함수 O
    - 생성자 함수 extends 생성자 함수 X
    - 생성자 함수 extends 클래스 X
    - 클래스 extends 클래스 O
    
    ```jsx
    function Base1() {};
    
    class Base2 {};
    
    let condition = true;
    
    class Derived extends (condition ? Base1 : Base2) {};
    
    const derived = new Derived();
    
    console.log(derived);
    console.log(derived instanceof Base1);
    console.log(derived instanceof Base2);
    
    Derived {}
    true
    false
    false
    ```
    

extends 키워드 다음에는 클래스 뿐만 아니라, [[Construct]] 내부 메서드를 갖는 모든 함수 객체로 평가될 수 있는 표현식을 사용할 수 있다.

1. 자식 클래스의 constructor
    
    
    자식 클래스에서 constructor를 생략하면 클래스에 다음과 같은 constuctor가 암묵적으로 정의된다.
    
    args는 new 연산자와 함께 클래스를 호출할 때 전달한 인수의 리스트다.
    
    ```jsx
    constructor(...agrs) { super(...args); };
    ```
    
    **`super()`**는 부모 클래스의 constructor를 호출하여 인스턴스를 생성한다.
    

1. super 키워드
    
    
    super키워드는 함수처럼 호출할 수도 있고 this와 같이 식별자처럼 참조할 수도 있는 특수한 키워드다.
    
    - super를 호출하면 부모클래스의 constructor를 호출한다.
    - super를 참조하면 부모클래스의 메서드를 호출할 수 있다.

**super 호출**

---

super를 호출하면 부모클래스의 constructor를 호출한다.

만약, 부모 클래스에서 추가된 property와 자식클래스에서 추가한 property를 갖는 인스턴스를 생성한다면 자식 클래스의 constructor를 생략할 수 없다.

이 때 자식 클래스로 전달하고 싶은 인수를 super를 통해 전달한다.

super를 호출할 때 주의 사항은 다음과 같다.

- 자식 클래스에서 constructor를 생략하지 않는 경우 자식 클래스의 constructor에서는 반드시 super를 호출해야 한다.
- 자식 클래스의 constructor에서 super를 호출하기 전에는 this를 참조할 수 없다.
    
    ```jsx
    class Base {};
    
    class Derived extends Base {
        constructor() {
            this.a = 1;
            super();
        }
    };
    
    const derived = new Derived(1);
    
    ReferenceError: Must call super constructor in derived class before 
    accessing 'this' or returning from derived constructor
    ```
    
- super는 반드시 자식 클래스의 constructor에서만 호출된다.

**super 참조**

---

메서드 내에서 super를 참조하면 부모 클래스의 메서드를 호출할 수 있다.

- 자식 클래스의 prototype 메서드 내에서 super.sayHi는 부모 클래스의 prototype sayHi를 가리킨다.
    
    ```jsx
    class Base {
        constructor(name) {
            this.name = name;
        };
    
        sayHi() {
            return "Say Hi " + this.name;
        }
    };
    
    class Derived extends Base {
        
        sayHi() {
    
            return `${super.sayHi()}. How are you doing?`
        }
    };
    
    const derived = new Derived('lee');
    
    console.log(derived.sayHi());
    ```
    
    위 예제는 아래와 같이 동작한다.
    
    ```jsx
    class Derived extends Base {
        
        sayHi() {
    
            const __supser = Object.getPrototypeOf(Derived.prototype);
    
            return `${__supser.sayHi.call(this)}. How are you doing?`
        }
    };
    ```
    
    super는 자신을 참조하고 있는 메서드가 바인딩되어 있는 객체의 프로토타입(Base.prototype)을 가리킨다.
    
    따라서, super.sayHi는 Base.prototype.sayHi를 가리킨다. 단, Base.prototype.sayHi를 호출할 때 call 메서드를 사용해 this를 전달해야 한다.
    
    this를 전달하지 않고 호출하면 Base.prototype.sayHi 메서드 내부의 this는 Base.prototype을 가리킨다. Base.prototype.sayHi 메서드는 프로토타입 메서드이기 때문에 **내부의 this는 Base.prototype이 아닌 instance를 가리켜야 한다**. **name property는 instance에 존재하기 때문**이다.
    
    이처럼 **super 참조가 동작하기 위해서는 super를 참조하고 있는 메서드가 바인딩되어 있는개체의 프로토타입을 찾을 수 있어야 한다**.
    
    **주의할 것은, ES6의 메서드 축약 표현으로 정의된 함수만이 [[HomeObject]]를 갖는다는 것이고, [[HomeObject]] 갖는 함수만이 super를 참조할 수 있다.**
    
    ```jsx
    // 기존
    var myObject = {
      myMethod: function() {
        console.log('Hello, World!');
      }
    };
    
    // 축약표현
    var myObject = {
      myMethod() {
        console.log('Hello, World!');
      }
    };
    ```
    
    super는 클래스의 전유물은 아니고, 객체 리터럴에서도 super를 사용할 수 있다. 단 축약 표현으로 정의된 함수만 가능하다.
    
    ```jsx
    const base = {
        name: 'kim',
        sayHi() {
            return `Hi! ${this.name}`
        }
    };
    
    const derived = {
        __proto__: base,
        sayHi() {
            return `${super.sayHi()}. xx`
        }
    };
    
    console.log(derived.sayHi()); //Hi! kim. xx
    ```
    

- 자식 클래스의 static 메서드 내에서 super.sayHi는 부모 클래스의 정적 메서드 sayHi를 가리킨다.

1. 상속 클래스의 인스턴스 생성 과정

---

**6-1. 서브클래스의 super 호출**

---

JS 엔진은 클래스를 평가할 때 자식과 부모를 구분하기 위해 “base” 또는 “derived”를 값으로 갖는 내부 슬롯 **`[[ConstructorKind]]`**를 갖는다. 다른 클래스를 상속받지 않는 클래스는 [[ConstructorKind]]의 값이 “base”로 상속받은 클래스는 “derived”로 설정된다.

일반적으로 클래스는 생성과정에서 암묵적으로 빈 객체, 즉 instance를 생성하고 이를 this에 바인딩하는데

**자식 클래스는 자신이 직접 instance를 생성하지 않고, 부모 클래스에게 instance 생성을 위임한다. 이것이 바로 constructor가 반드시 super를 호출해야하고 암묵적으로 실행되는 이유**다.

**6-2. 부모 클래스의 인스턴스 생성과 this 바인딩**

---

자식 클래스가 인스턴스를 생성할 때, 해당 인스턴스의 프로토타입은 부모 클래스의 프로토타입이 아니라 자식 클래스의 프로토타입을 가리킵니다. 이는 **`super`**를 통해 부모 클래스의 생성자를 호출할 때 발생합니다.

```jsx
javascriptCopy code
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 부모 클래스의 생성자 호출
    this.breed = breed;
  }
}

const myDog = new Dog('Buddy', 'Golden Retriever');
console.log(myDog instanceof Dog);    // true
console.log(myDog instanceof Animal); // true

```

**`instanceof`**를 통해 확인할 수 있듯이, **`myDog`**는 **`Dog`** 클래스의 인스턴스이기도 하지만, **`Animal`** 클래스의 인스턴스이기도 합니다.

**6-3. 부모 클래스의 인스턴스 초기화:**

자식 클래스에서 **`super`**를 호출하면, 부모 클래스의 생성자가 실행됩니다. 이때 **`this`**는 자식 클래스의 인스턴스를 가리키며, 부모 클래스의 생성자에서 자식 클래스의 프로퍼티 초기화가 이루어집니다.

```jsx
javascriptCopy code
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 부모 클래스의 생성자 호출
    this.breed = breed;
  }
}

const myDog = new Dog('Buddy', 'Golden Retriever');
console.log(myDog); // Dog { name: 'Buddy', breed: 'Golden Retriever' }

```

**`myDog`** 인스턴스는 **`Dog`** 클래스의 생성자에서 정의한 **`this.breed`**와 함께, 부모 클래스의 생성자에서 정의한 **`this.name`**도 가지고 있습니다. 이렇게 부모 클래스의 생성자가 실행되면서 자식 클래스의 인스턴스가 초기화되는 것이죠.

**6-4. 자식 클래스의 constructor로의 복귀와 this 바인딩**

---

super 호출이 종료되고, 제어 흐름이 자식 클래스의 constructor로 돌아오면, 이 때 super가 반환한 instance가 this에 바인딩된다. **자식 클래스는 별도의 instance를 생성하지 않고 super가 반환한 인스턴스를 그대로 바인딩하여 사용한다**.

```jsx
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 부모 클래스의 생성자 호출
    this.breed = breed;
  }
}

const myDog = new Dog('Buddy', 'Golden Retriever');
console.log(myDog); // Dog { name: 'Buddy', breed: 'Golden Retriever' }
```

여기서 **`super(name)`**이 반환한 인스턴스가 **`this`**에 바인딩되어 **`myDog`**에 할당됩니다. 따라서 **`myDog`**는 **`Dog`** 클래스의 인스턴스이면서 부모 클래스인 **`Animal`** 클래스의 인스턴스이기도 합니다.

이처럼 자식 클래스에서는 별도의 인스턴스를 생성하지 않고, **`super`**가 반환한 인스턴스를 그대로 사용하여 초기화된 인스턴스를 활용합니다.

이처럼 super가 호출되지 않으면 인스턴스가 생성되지 않으며, this 바인딩도 할 수 없다. 자식 클래스의 constructor에서 super를 호출하기 전에는 this를 참조할 수 없는 이유가 바로 이것이다.

**6-5. 자식 클래스의 인스턴스 초기화**

---

**6-6. 인스턴스 반환**