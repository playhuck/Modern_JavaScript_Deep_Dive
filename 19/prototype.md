**자바스크립트**는 클래스 기반 객체지향 프로그래밍 언어보다 효율적이며 더 강력한 객체지향 프로그래밍 능력을 지니고 있는 프로토타입 기반의 객체지향 프로그래밍 언어이다.

**자바스크립트**는 객체 기반의 프로그래밍 언어이며, 자바스크립트룰 이루고 있는 거의 “모든 것”이 객체다. 원시 타입(primitive type)의 값을 제외한 나머지 값들(Function, Array, Regxep 등)은 모두 객체다.

1. **객체지향 프로그래밍**
    - **Node.js에서 생성자 함수가 잘 안쓰이게 되는 이유.**
        
        Node.js에서 생성자 함수를 잘 안쓰게되는 이유는 다음과 같습니다.
        
        - **모듈 시스템**: Node.js는 CommonJS 모듈 시스템을 사용하여 코드를 모듈화하고 재사용성을 높입니다. 생성자 함수를 사용하면 모듈이 더 많은 의존성을 가지게되고 코드를 더 복잡하게 만들 수 있습니다.
        - **함수형 프로그래밍**: Node.js는 JavaScript 함수형 프로그래밍을 적극적으로 채택합니다. 함수형 프로그래밍에서는 객체 생성보다는 함수를 조합하고 사용하는 것이 중요합니다. 이러한 방식으로 코드를 작성하면 더 간결하고 효율적인 코드를 작성할 수 있습니다.
        - **비동기 프로그래밍**: Node.js는 비동기 프로그래밍을 위한 콜백 함수와 프로미스를 적극적으로 사용합니다. 생성자 함수는 객체를 동기적으로 생성하는 방식이기 때문에 비동기 프로그래밍에 적합하지 않습니다.
        - **클래스와 상속**: ES6에서 클래스와 상속이 도입되었습니다. 클래스와 상속을 사용하면 객체 지향 프로그래밍에서 생성자 함수와 유사한 패턴을 사용할 수 있습니다. 따라서 Node.js에서는 클래스와 상속을 사용하여 객체를 생성하는 것이 더 일반적입니다.
    
    객체지향 프로그래밍은 실세계의 실체를 인식하는 철학적 사고를 프로그래밍에 접목하려는 시도에서 시작한다.
    
    실체는 특징이나 성질을 나타내는 **`속성`(`Property`/`Attribue`)**을 가지고 있다.
    
    다양한 속성 중에서 필요한 속성만 간추려 내어 표현하는 것을 **`추상화(abstraction)`**라고 한다.
    
    속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조를 **`객체(Object)`**라고 한다.
    
    원(circle)이라는 개념을 객체로 만들면
    
    ```jsx
    const circle = {
        /** 반지름 */
        radius : 5,
        
        /** 원의 지름 2r */
        getDiameter() {
            return 2 * this.radius;
        },
        /** 원의 둘레, 2πr */
        getPerimeter() {
            return 2 * Math.PI * this.radius;
        },
        /** 원의 넓이, πrr */
        getArea() {
            return Math.PI * this.radius ** 2;
        }
    };
    
    console.log(circle)
    // {
    //     radius: 5,
    //     getDiameter: [Function: getDiameter],  
    //     getPerimeter: [Function: getPerimeter],
    //     getArea: [Function: getArea]
    // }
    console.log(circle.getDiameter()); // 10
    console.log(circle.getPerimeter()); // 31.41592653589793
    console.log(circle.getArea()) // 78.53981633974483
    ```
    
    이런식으로 구성할 수 있고, **반지름(radius)**라는 속성이 있고 이 속성으로 지름,둘레,넓이를 구할 수 있다. 이때 반지름은 원의 `**상태를 나타낼 수 있는 데이터**`이며 지름,둘레,넓이를 구하는 행동은 **`동작`**이다.
    
    이처럼 객체지향 프로그래밍(통칭 OOP)은 객체의 **상태(state)**를 나타내는 데이터와 상태 데이터를 조작할 수 있는 **동작(behavior)**을 하나의 논리적 단위인 객체(Object)로 묶어서 생각한다.
    
    ---
    
2. **상속과 프로토타입**
    
    **`상속(inheritance)`**은 객체지향 프로그래밍의 핵심 개념으로, 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말한다.
    
    자바스크립트는 프로토타입을 기반으로 상속을 구현하며 불필요한 중복을 제거한다. 중복을 제거하는 방법은 기존의 코드를 적극적으로 재사용하는 것이다.
    
    ---
    
3. **프로토타입 객체**
    - **Node.js에서 프로토 타입이 잘 사용되지 않는 이유**
        
        Node.js에서 프로토타입이 잘 사용되지 않는 이유는 다음과 같습니다:
        
        - **자바스크립트의 클래스 기반 상속이 발전되어왔습니다.**
        ES6에서 클래스 문법이 도입되면서 자바스크립트 개발자들은 이를 통해 객체지향 프로그래밍에서 사용하는 클래스 기반 상속을 보다 쉽게 사용할 수 있게 되었습니다. 이러한 클래스 기반 상속 방식은 프로토타입을 사용하는 방식보다 직관적이며, 상속 관련 코드를 더욱 간결하게 작성할 수 있습니다.
        - **코드 가독성이 낮습니다.**
        프로토타입 기반의 상속 방식은 클래스 기반 상속보다 코드 가독성이 떨어집니다. 프로토타입은 객체 자체에 존재하기 때문에 클래스의 정의와 객체의 생성이 복잡해질 수 있습니다. 이는 코드를 이해하기 어렵게 만들어 코드 유지보수를 어렵게 만듭니다.
        - **모듈 시스템의 영향**
        Node.js에서는 모듈 시스템이 도입되어 코드를 모듈 단위로 구성하는 것이 권장됩니다. 이로 인해 프로토타입을 사용하는 방식보다는 클래스를 사용하는 것이 모듈 단위로 코드를 구성하기에 더욱 적합합니다.
    
    프로토타입 객체란 객체지향 프로그래밍의 근간을 이루는 객체 간 상속을 구현하기 위해 사용된다. 프로토타입은 어떤 객체의 상위(부모) 객체의 역할을 하는 객체로서 다른 객체에 공유 프로퍼티(메서드 포함)를 제공한다.
    
    프로토타입을 상속받은 하위(자식) 객체는 상위 객체의 프로퍼티를 자유롭게 사용할 수 있다.
    
    모든 객체는 `**[[Prototype]]**`이라는 내부 슬롯을 가지며, 이 내부 슬롯의 값은 프로토타입의 참조(null인 경우도 있다)다. `**[[Prototype]]`** 에 저장되는 프로토타입은 객체 생성 방식에 의해 결정된다.
    
    모든 객체는 하나의 프로토타입을 가지고 있다. 그리고 모든 프로토타입은 생성자 함수와 연결되어 있다.
    
    - **`__proto__` 접근자 프로퍼티**
        
        모든 객체는 __proto__ 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 **`[[Prototype]]`** 내부 슬롯에 직접적으로 접근할 수 있다.
        
        내부 슬롯은, 엄밀히 말하자면 프로퍼티가 아니다. 따라서 JS는 원칙적으로 내부 슬롯과 내부 메서드에 직접 접근하여 호출하는 방법을 제공하지 않는다.
        
        단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 한다.
        
        그것이 바로, **`__proto__`** 접근자 프로퍼티이며 이를 통해 내부 슬롯의 값, 프로토타입에 접근할 수 있다.
        
        **접근자 프로퍼티는** 자체적으로는 **`값([[Value]] Property Attibute)`**를 갖지 않고, 다른 데이터 타입의 값을 읽거나 저장할 때 사용하는 접근자 함수, 즉 `**[[Get]]**`, **`[[Set]]`** Propery Attribute로 구성된 프로퍼티다.
        
        Object.prototype의 접근자 프로퍼티인 __proto__는 **`getter/setter`** 함수라고 부르는 접근자 함수를 통해 내부 슬롯의 값, 즉 프로토타입을 취득하거나 할당한다.
        
        접근자 프로퍼티는 상속을 통해 사용된다. 즉, 객체가 직접 소유하지 않는다. Object의 프로퍼티가 아니라 Object.prototype의 프로퍼티다.
        
        ```jsx
        const person = { name : "Lay" };
        
        // 객체 자체는 __proto__ 프로퍼티를 소유하지 않는다.
        console.log(person.hasOwnProperty('__proto__')); // false
        
        // __proto__는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티다.
        console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
        // {
        //     get: [Function: get __proto__],
        //     set: [Function: set __proto__],
        //     enumerable: false,
        //     configurable: true
        // }
        
        // 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
        console.log({}.__proto__ === Object.prototype); // true
        ```
        
        프로토타입 접근자 프로퍼티인 __proto__를 사용해 접근하는 이유는 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해서다.
        
        **프로토타입 체인은 단방향 링크드 리스트로 구현되야 한다.** 즉, 프로퍼티 검색 방향이 한쪽 방향으로만 흘러가야 한다.
        
        **프로토타입 체인이 순환참조를 이루게되면, 프로토타입 체인 종점이 존재하지 않기 때문에 체인 안에서 프로퍼티를 검색할 때 무한 루프에 빠지게 된다.**
        
        따라서, 아무런 체크 없이 무조건적으로 프로토타입을 교체할 수 없도록 __proto__ 접근자 프로퍼티를 통해 프로토타입에 접근하고 교체하도록 구현되있다.
        
        __proto__를 코드 내에서 직접 사용하는 것은 권장하지 않는다.
        
        __proto__보다는 만약 프로토 타입의 참조를 취득하고 싶은 경우 **`Object.getPrototypeOf()`**를 사용하는 것을 권장한다. 프로토타입을 교체하고 싶은 경우는 **`Object.setPrototypeOf()`** 메서드를 사용할 것을 권장한다.
        
    - **함수 객체의 prototype 프로퍼티**
        
        함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.
        
        ```jsx
        // **함수 객체는 prototype 프로퍼티를 소유한다.**
        const function_property = (function () {}).hasOwnProperty('prototype');
        
        console.log(function_property); // true
        
        // **일반 객체는 prototype 프로퍼티를 소유하지 않는다.**
        const normal_object_property = ({}).hasOwnProperty('prototype');
        
        console.log(normal_object_property); // false
        ```
        
        prototype 프로퍼티는 생성자 함수가 생성할 객체(인스턴스)의 프로토타입을 가리킨다. 따라서 생성자 함수로서 호출할 수 없는 함수, 즉 **non-constructor**인 **화살표 함수(arrow function)와 ES6 메서드 축약 표현으로 정의한 메서드**는 prototype 프로퍼티를 소유하지 않으며, 프로토타입도 생성하지 않는다.
        
        ```jsx
        const Person = name => {
            this.name = name;
        };
        
        console.log(Person.hasOwnProperty('prototype')); // false
        
        console.log(Person.prototype); // undefined
        
        const obj = {
            foo(){}
        };
        
        console.log(obj.foo.hasOwnProperty('prototype')); // false
        
        console.log(obj.foo.prototype); // undefined
        ```
        
        **모든 객체가 가지고 있는(Object.prototype)으로부터 상속받은 __proto__ 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype 프로퍼티는 결국 동일한 프로타입을 가리킨다.** 하지만, 이들을 사용하는 주체가 다르다.
        
        - **__proto__ 접근자 프로퍼티**
            - **소유 :** 모든 객체
            - **값 :** 프로토타입의 참조
            - **사용 주체 :** 모든 객체
            - **사용 목적 :** 객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용
        - **prototype 프로퍼티**
            - **소유 :** constructor
            - **값 :** 프로토타입의 참조
            - **사용 주체 :** 생성자 함수
            - **사용 목적 :** 생성자 함수가 자신이 생성할 객체(인스턴스)의 프로토타입을 할당하기 위해 사용
    
    ---
    
4. **리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입**
    
    앞서서, 생성자 함수에 의해 생성된 인스턴스는 프로토타입의 constructor 프로퍼티에 의해 생성자 함수(constructor)와 연결된다는 사실을 알게 됐다.
    
    하지만, **`리터럴 표기법`**에 의한 객체 생성 방식과 같이 명시적으로 new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하지 안흔 객체 생성 방식도 있다.
    
    ```
    /** 객체 리터럴 */
    const obj = {}; // new Object()
    
    /** 함수 리터럴 */
    const add = function(a,b){return a + b}; // new Function()
    
    /** 배열 리터럴 */
    const arr = [] // new Array()
    
    /** 정규 표현식 리터럴 */
    const regexp = /is/ig;
    ```
    
    리터럴 표기법에 의해 생성된 객체도 물론 프로토타입이 존재하지만, 이 객체의 경우 프로토타입의 constructor가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수는 없다.
    
    객체 리터럴로 생성된 객체는 Object 생성자 함수가 생성한 객체가 아니다.
    
    한편, 리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요하다. 따라서 리터럴 표기법에 의해 생성된 객체도 **가상적인 생성자 함수를 갖는다**. 프로토타입은 생성자 함수와 더불어 생성되며, prototype constructor 프로퍼터에 의해 연결되어 있기 때문이다.
    
    다시말해, **프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍(pair)으로 존재한다.**
    
    리터럴 표기법에의해 생성된 객체는 사실, 본질적으로 보면 생성자 함수에 의해 생성된 것과 그 본질에 있어서는 다를바가 없다.
    
    ---
    
5. **프로토타입의 생성 시점**
    
    **프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다.**
    
    [**리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입**](https://www.notion.so/a73c9f17361c45af9ebed3988940b1dd) 에서 살펴본 바와 같이 프로토타입과 생성자 함수는 단독으로 존재할 수 없고, 언제나 쌍으로 존재하기 때문이다.
    
    - **사용자 정의 생성자 함수와 프로토타입 생성 시점**
        
        일반 함수로 정의한 함수 객체는 new 연산자와 함께 생성자 함수로서 호출할 수 있다.
        
        생성자 함수로서 호출할 수 있는 함수, **즉 constructor는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.**
        
        ```tsx
        /** 생성자 함수 */
        function Person(name) {
            this.name = name;
        }
        
        /**  함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.*/
        console.log(Person.prototype)
        
        /** 일반 콘솔을 찍으면 {} 빈객체로 나오지만, 
        브라우저의 콘솔창에 입력하면 { constructor : f }로 나온다. */
        ```
        
        생성자 함수로서 호출할 수 없는 함수, 즉 non-constructor는 프로토타입이 생성되지 않는다.
        
        ```tsx
        const Person = name => {
            this.name = name;
        };
        
        console.log(Person.prototype); // undefined
        ```
        
        함수 선언문은 런타임 이전에 JS엔진에 의해 먼저 실행된다.
        
        따라서 함수 선언문으로 정의된 Person 생성자 함수는 어떤 코드보다도 먼저 평가되어 함수 객체가 된다. 이 때 프로토타입도 더불어 생성된다.
        
        생성된 프로토타입은 Person 생성자 함수의 prototype 프로퍼티에 바인딩된다.
        
        이때 생성된 프로토타입은 오로지 constructor 프로토타입이며, 이 프로토타입도 자신의 프로토타입인 Object.prototype을 가진다.
        
    - **빌트인 생성자 함수와 프로토타입 생성 시점**
        
        빌트인 생성자 함수(Object, String, Number, Function, Array, RegExp, Date, Promise) 등과 같은 빌트인 생성자 함수도 일반 함수와 마찬가지로 생성자 함수가 생성될 때 프로토타입이 생서되고, **모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성된다.**
        
        생성된 프로토타입은 빌트인 생성자 함수의 prototype 프로퍼티에 바인딩된다.
        
        ---
        
    1. **객체 생성 방식과 프로토타입의 결정**
        
        객체는 다음과 같은 생성 방식이 있다.
        
        1. 객체 리터럴
        2. Object 생성자 함수
        3. 생성자 함수
        4. Object.create 메서드
        5. 클래스(ES6)
        
        모든 객체는 추상 연산 OrdinaryObjectCreate에 의해 생성된다는 공통점이 있다.
        
        - **객체 리터럴에 의해 생성된 객체의 프로토타입**
            
            객체 리터럴에 의해 생성되는 객체의 프로토타입은 **`Object.prototype`**이다.
            
            ```tsx
            const obj = { x : 1 };
            ```
            
        - **Object 생성자 함수에 의해 생성된 객체의 프로토타입**
            
            Object 생성자 함수를 인수 없이 호출하면 빈 객체가 생성된다.
            
            Object 생성자 함수에 의해 생성되는 객체의 프로토타입은 **`Object.prototype`**이다.
            
            ```tsx
            const obj = new Object();
            obj.x = 1;
            ```
            
        - **생성자 함수에 의해 생성된 객체의 프로토타입**
            
            new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하면 위와 마찬가지로 추상 연산자 **OrdinaryObjectCreate**가 호출되는데, 이 때 추상 연산 **OrdinaryObjectCreate**에 전달되는 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩되있는 객체다.
            
            즉, 생성자 함수에 의해 생성되는 객체의 프로토타입은 **생성자 함수의 prototype 프로퍼티에 바인딩 되있는 객체다**.
            
            ```tsx
            /** 생성자 함수 */
            function Person(name) {
                this.name = name;
            }
            
            const me = new Person('Lee');
            ```
            
            사용자 정의 생성자 함수 Person과 더불어 생성된 프로토타입 Person.prototype의 프로퍼티는 constructor 뿐이다.
            
            프로토타입 Person.prototype에 프로퍼티를 추가하여 하위(자식) 객체가 상속받을 수 있도록 구현해보면, 프로토타입 또한 객체이기 때문에 일반 객체와 같이 프로토타입에도 프로퍼티를 추가/삭제할 수 있다.
            
            이러한 추가/삭제된 프로퍼티는 프로토타입 체인에 즉각 반영된다.
            
            ```jsx
            function Person(name) {
                this.name = name;
            }
            
            // Person에 바인딩 되있는 name 프로퍼티를 프로토타입의 메서드에도 사용할 수 있다.
            Person.prototype.sayHello = function() {
                console.log(`Hi ! My name is ${this.name}`);
            };
            
            const me = new Person("Lay");
            const you = new Person("Luke");
            
            me.sayHello(); // Hi ! My name is Lay
            you.sayHello(); // Hi ! My name is Luke
            
            /** 자식 객체(인스턴스)가 상속받아 메서드를 사용한다. */
            ```
            
            Person 생성자 함수를 통해 생성된 모든 객체는 프로토타입에 추가된 sayHello 메서드를 상속받아 자신의 메서드처럼 사용할 수 있다.
            
            ---
            
    2. **프로토타입 체인**
        
        ```jsx
        function Person(name) {
            this.name = name;
        }
        
        // Person에 바인딩 되있는 name 프로퍼티를 프로토타입의 메서드에도 사용할 수 있다.
        Person.prototype.sayHello = function() {
            console.log(`Hi ! My name is ${this.name}`);
        };
        
        const me = new Person("Lay");
        
        console.log(me.hasOwnProperty('name')); // true
        const you = new Person("Luke");
        ```
        
        Person 생성자 함수에 의해 생성된 인스턴스 **`me`**는 hasOwnProperty를 사용할 수 있는데, 이를 통해 Person.prototype 뿐만 아니라, Object.prototype도 상속받았다는 것을 의미한다.
        
        **자바스크립트는 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 [[Prototype]] 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다.**
        
        이를 **`프로토타입 체인`**이라고 한다.
        
         
        
        프로토타입 체인의 최상위에 위치하는 객체는 언제나 Object.prototype이다. 따라서, 모든 객체는 Object, prototype을 상속 받는다.
        
        **Object.prototype을 프로토타입 체인의 종점(end of prototype chain)이라 한다**.
        
        Object.prototype의 프로토타입, 즉 `**[[Prototype]]**` 내부 슬롯의 값은 null이다.
        
        체인의 종점에서도 프로퍼티를 검색할 수 없는 경우, undefined를 반환한다. 이 때 에러가 발생하지 않게 주의해야 한다.
        
        ---
        
    3. **오버라이딩과 프로퍼티 섀도잉**
        
        ```jsx
        const Person = (function(){
            function Person(name) {
                this.name = name;
            }
        
            Person.prototype.sayHello = function() {
                console.log(`Hi! My name is ${this.name}`)
            };
        
            return Person;
        }());
        
        const me = new Person('Lay');
        
        me.sayHello = function(){
            console.log(`Hey! My name is ${this.name}`);
        }
        
        me.sayHello();
        ```
        
        생성자 함수로 객체(인스턴스)를 생성한 다음, 인스턴스에 메서드를 추가 했다.
        
        인스턴스 메서드 sayHello는 프로토타입 메서드 sayHello를 **오버라이딩**했고, 프로토타입 메서드 sayHello는 가려진다.
        
        이 처럼 상속 관계에 의해 프로퍼티가 가려지는 현상을 **프로퍼티 섀도잉**이라고 한다.
        
        ---
        
    4. 프로토타입의 교체
    5. **instanceof 연산자**
        
        
        instanceof 연산자는 이항 연산자로서 좌변에 객체를 가리키는 식별자, 우변에 생성자 함수를 가리키는 식별자를 피연산자로 받는다. 
        
        만약, 우변의 피연산자가 함수가 아닌 경우 **TypeError**가 발생한다. 
        
        ```tsx
        객체 instanceof 생성자 함수
        ```
        
        **우변 생성자 함수의 prototype에 바인딩된 객체가 좌변의 객체의 프로토타입 체인 상에 존재하면 true로 평가되고, 그렇지 않은 경우 false로 평가된다.** 
        
        ⇒ 우변의 객체가 좌변의 생성자의 prototype에 존재하면 true 아니면 false
        
        ```tsx
        /** 생성자 함수 */
        function Person(name) {
            this.name = name;
        }
        
        const me = new Person("Lay");
        
        /** Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true */
        console.log(me instanceof Person); // true
        
        /** Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true */
        console.log(me instanceof Object); // true
        ```
        
        instanceof 연산자의 동작을 추가적으로 살펴보면,
        
        ```jsx
        /** 생성자 함수 */
        function Person(name) {
            this.name = name;
        }
        
        const me = new Person("Lay");
        
        /** 프로토타입으로 교체할 객체 */
        const parent = {};
        
        /** 프로토타입 교체 */
        Object.setPrototypeOf(me, parent);
        
        /** Person 생성자 함수와 parent 객체는 연결되어 있지 않다. */
        console.log(Person.prototype === parent); // false
        console.log(parent.constructor === Person); // false
        
        /** Person.prototype이 me 객체의 프로토타입 체인 상에 존재하지 않아 false */
        console.log(me instanceof Person)
        
        /** Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true */
        console.log(me instanceof Object)
        ```
        
        me 객체는 비록 프로토타입이 교체되어 프로토타입과 생성자 함수 간의 연결이 파괴됐지만, Person 생성자 함수에 의해 생성된 인스턴스임에는 틀림 없다.
        
        그러나, me instanceof Person은 false가 된다.
        
        Why?
        
        이는, Person.prototype이 me 객체의 프로토타입 체인 상에 존재하지 않기 때문인데, 따라서 프로토타입으로 교체한 parent 객체를 Person 생성자 함수의 prototype 프로퍼티에 바인딩하면 me instance Person은 true로 평가될 것이다.
        
        비교해보면 다음과 같다.
        
        ```jsx
        /** Person 생성자 함수와 parent 객체는 연결되어 있지 않다. */
        console.log(Person.prototype === parent); // false
        console.log(parent.constructor === Person); // false
        
        /** Person.prototype이 me 객체의 프로토타입 체인 상에 존재하지 않아 false */
        console.log(me instanceof Person) // false
        
        /** Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true */
        console.log(me instanceof Object) // true
        
        //////////////////////////////////////
        
        /** parent 객체를 Person 생성자 함수의 prototype 프로퍼티에 바인딩*/
        Person.prototype = parent;
        
        /** Person 생성자 함수와 parent 객체는 연결되어 있지 않다. */
        console.log(Person.prototype === parent); // tre
        console.log(parent.constructor === Person); // false
        
        /** Person.prototype이 me 객체의 프로토타입 체인 상에 존재하지 않아 false */
        console.log(me instanceof Person) // true
        
        /** Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true */
        console.log(me instanceof Object) // true
        ```
        
        이처럼 instanceof 연산자는 constructor 프로퍼티가 가리키는 생성자를 찾는 것이 아닌 **생성자 함수의 prototype에 바인딩된 객체가 프로토타입 체인 상에 존재하는지** 확인한다.
        
        ```jsx
        /** instanceof 연산자를 함수로 표현하면 다음과 같다. */
        
        function isInstanceOf(instance, constructor) {
            
            /** 프로토타입 취득 */
            const prototype = Object.getPrototypeOf(instance);
        
            /**
             * 재귀호출 탈출조건
             * prototype이 null이면 프로토타입 체인의 종점에 다다른 것.
             */
            if(prototype === null) return false;
        
            /**
             * 프로토타입이 생성자 함수의 prototype 프로퍼티에 바인딩된 객체라면 true
             * else 재귀 호출로, 체인 상의 상위 프로토타입으로 이동
             */
            return prototype === constructor.prototype || isInstanceOf(prototype, constructor);
        };
        
        console.log(isInstanceOf(me, Person)) // true
        console.log(isInstanceOf(me, Object)) // true
        console.log(isInstanceOf(me, Array)) // false
        ```
        
        ---
        
    6. **직접 상속**
        - Object.create에 의한 직접 상속
            
            Object.create 메서드는 명시적으로 프로토타입을 지정하여 새로운 객체를 생성한다.
            
            ```jsx
            /** 프로토타입이 null인 객체를 갖는 생성합니다. 생성된 객체는 체인의 종단에 위치합니다. */
            
            /** obj => null */
            let obj = Object.create(null);
            console.log(Object.getPrototypeOf(obj) === null); // true
            console.log(obj.toString());
            /**
             * typeError: obj.toString is not a function
             * Object.prototype을 상속받지 못했다.
             * */
            
            /**
             * obj => Object.prototype => null
             * obj = {};와 동일하다.
             */
            obj = Object.create(Object.prototype);
            console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
            
            /**
             * obj => Object.prototype => null
             * obj = { x : 1 }; 와 동일하다.
             */
            obj = Object.create(Object.prototype, {
              x: { value: 1, writable: true, enumerable: true, configurable: true },
            });
            
            /**
             * 위 코드는 아래와 동일하다.
             * obj = Object.create(Object.prototype);
             * obj.x = 1;
             */
            console.log(obj.x); // 1
            console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
            
            const myProto = { x : 10 };
            /**
             * 임의의 객체를 직접 상속받는다.
             * ojb = > myProto => Object.prototype => null
             */
            obj = Object.create(myProto);
            console.log(obj.x); // 10
            console.log(Object.getPrototypeOf(obj) === myProto) // true
            
            /**
             * obj => Person.prototype => Object.prototype => null
             * obj = new Person("Lay")와 동일하다.
             */
            obj = Object.create(Person.prototype);
            obj.name = "Lay";
            console.log(obj.name) // Lay
            console.log(Object.getPrototypeOf(obj) === Person.prototype); // true
            ```
            
            이처럼 Object.create 메서드는 첫 번째 매개변수에 전달한 객체의 프로토타입 체인에 속하는 객체를 생성한다.
            
            즉, **객체를 생성하면서 직접적으로 상속을 구현**한다.
            
            이런식으로 코드를 작성하면 장점이 3가지가 있는데,
            
            - new 연산자 없이도 객체를 생성할 수 있다.
            - 프로토타입을 지정하면서 객체를 생성할 수 있다.
            - 객체 리터럴에 의해 생성된 객체도 상속받을 수 있다.
            
            그런데 ESLint에서는 Object.prototype의 빌트인 메서드를 객체가 직접 호출하는 것을 권장하지 않는다. 그 이유는 Object.create 메서드를 통해 프로토타입 체인의 종점에 위치하는 객체를 생성할 수 있기 때문이다.
            
            종점에 위치한 객체는 Object.prototype의 빌트인 메서드를 사용할 수 없다. 
            
            따라서, 간접적으로 호출하는 것이 좋다.
            
            ```jsx
            const obj = Object.create(null);
            obj.a = 1;
            
            console.log(Object.prototype.hasOwnProperty.call(obj, 'a')); // true                                                                                                                             
            ```
            
        - **객체 리터럴에 내부에서 __proto__에 의한 직접 상속**
            
            ```tsx
            const myProto = { x : 10 };
            
            const obj = {
                y : 20,
                __proto__ : myProto
            };
            
            console.log(obj.x, obj.y); // 10 20
            console.log(Object.getPrototypeOf(obj) === myProto); // true
            ```
            
            ---
            
        1. **정적 프로퍼티 / 메서드**
            
            정적(static) Property/Method는 생성자 함수로 **인스턴스를 생성하지 않아도** 호출할 수 있는 것을 말한다.
            
            ```tsx
            /** 생성자 함수 */
            function Person(name) {
                this.name;
            };
            
            /** Prototype 메서드 */
            Person.prototype.sayHello = function () {
                console.log(`Hi my name is ${this.name}`);
            };
            
            /** static(정적) Property */
            Person.staticProp =  'static prop';
            
            /** static(메서드) Method */
            Person.staticMethod = function () {
                console.log('static Method');
            };
            
            const me = new Person('Lay');
            
            /** 생성자 함수에 추가한 정적 프로퍼티/메서드는 생성자 함수로 참조/호출한다. */
            Person.staticMethod(); // static Method
            
            /**
             * 정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다.
             * 인스턴스로 참조/호출할 수 있는 프로퍼티/메서드는 프로토타입 체인 상에 존재해야 한다.
             */
            me.staticMethod(); // TypeError: me.staticMethod is not a function
            ```
            
            ---
            
        2. **프로퍼티 존재 확인**
            - **in 연산자**
                
                in 연산자는 객체 내에 프로퍼티가 존재하는지 확인 한다.
                
                ```jsx
                const person = {
                    name : 'Lay',
                    address : 'Dragon 2'
                };
                
                console.log('name' in person);
                ```
                
                in 연산자는 다음과 같은 코드도 돌아가는데, 그 이유는 체인 상에 존재하는 모든 프로토타입에서 toString 프로퍼티를 검색했기 때문이다.
                
                toString() 메서드는 Object.prototype의 메서드다.
                
                ```tsx
                console.log('toString' in person)
                ```
                
                ES6에선 Reflect.has 메서드를 사용할 수도 있다.
                
                ```tsx
                console.log(Reflect.has(person, 'name')); // true
                ```
                
                다른 방식으론 Object.prototype.hasOwnProperty 메서드가 있다.
                
                ```tsx
                console.log(person.hasOwnProperty('name')); // true
                ```
                
                ---
                
            1. **프로퍼티 열거**
                - **in 연산자**
                
                객체의 모든 프로퍼티를 순회하면서 열거(enumeration)아려면 for …in문을 사용한다.
                
                ```jsx
                for(const key in person) {
                    console.log(key + ": " + person[key])
                }
                
                // name: Lay
                // address: Dragon 2
                ```
                
                for in문은 순회 대상 객체의 프로퍼티 뿐만아니라, 상속받은 prototype의 프로ㅓ티까지 열거한다.
                
                근데 위 예제에선 `toString()`이 열거되지 않았는데, 그 이유는 열거형으로 막혀 있는 메서드이기 때문이다.
                
                **for in문은 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 true인 프로퍼티를 순회하며 열거(enumeration)한다.**
                
                for in문은 프로퍼티 키가 Symbol인 프로퍼티는 열거하지 않는다.
                
                ```tsx
                const sym = Symbol();
                const a = {
                    a : 1,
                    [sym] : 10
                };
                
                for(const key in a) {
                    console.log(key + ": " + a[key]);
                }; //a: 1
                ```
                
                상속받은 프로퍼티는 제외하고, 객체 자신만의 프로퍼티만 열거하려면 Object.prototype.hasOwnProperty 메서드를 사용해서 객체 자신의 프로퍼티인지 확인해야 한다.
                
                ```jsx
                const person = {
                    name : 'Lay',
                    address : 'Dragon 2',
                    __proto__ : { age : 20}
                };
                
                for(const key in person) {
                    if(!person.hasOwnProperty(key)) continue;
                    console.log(key + ": " + person[key])
                }
                // name: Lay
                // address: Dragon 2
                ```
                
                주의 할점은 for..in문은 열거할 떄 순서를 보장하지 않는다는 점이다.
                
                배열에는 **for…in**문이 아닌, 일반적인 **for**문이나 **for .. of** 혹은
                
                **`Array.prototype.forEach`**메서드를 사용하기를 권장한다.
                
                - **Object.keys/values/entries 메서드**
                    
                    객체 자신의 고유 프로퍼티만 열거하기 위해서는 for… in문 보다는
                    
                    **Object.keys/values/entries 메서드**를 사용하는 것을 권장한다.
                    
                    ```jsx
                    const person = {
                        name : 'Lay',
                        address : 'Dragon 2',
                        __proto__ : { age : 20}
                    };
                    
                    console.log(Object.keys(person)); // [ 'name', 'address' ]
                    console.log(Object.values(person)); // [ 'Lay', 'Dragon 2' ]
                    console.log(Object.entries(person)); // [ [ 'name', 'Lay' ], [ 'address', 'Dragon 2' ] ]
                    ```
