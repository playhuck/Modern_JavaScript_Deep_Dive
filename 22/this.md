1. **`this 키워드`**
    
    메서드가 자신이 속한 객체의 프로퍼티를 참조하려면, 먼저 **자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 한다**.
    
    객체 리터럴 방식으로 생성한 객체의 경우 내부에서 메서드 자신이 속한 객체를 가리키는 식별자를 재귀적으로 참조할 수 있다.
    
    ```jsx
    const circle = {
        radius : 5,
        getDiameter(){
    			/** 객체 circle이 가지고 있는 Property radius */
            return 2 * circle.radius;
        }
    }
    ```
    
    이 참조 표현식이, 평가되는 시점은 getDiameter 메서드가 호출되어 함수 몸체가 실행되는 시점이다.
    
    위 예제의 객체 리터럴은 circle 변수에 할당되기 직전에 평가된다. getDiameter 메서드가 호출되는 시점에는 이미 객체 리터럴의 평가가 완료되어 객체가 생성되었고, circle 식별자에 생성된 객체가 할당된 이후다.
    
    하지만, 자기 자신이 속한 객체를 재귀적으로 참조하는 방식은 일반적이지 않으며 바람직하지 않다.
    
    생성자 함수로 인스턴스를 생성하려면, 먼저 생성자 함수가 존재해야 한다.
    
    따라서, 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 특수한 식별자가 필요한데 이를 위해 JS에는 **`this`**라는 식별자가 존재한다.
    
    **this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수다**.
    
    **this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다**.
    
    **this가 가리키는 값, this 바인딩은 함수 호출 방식에 의해 동적으로 결정된다**.
    
    자바나 C++같은 클래스 기반 언어에서는 this는 언제나 클래스가 생성할 인스턴스를 가리키지만, JS에서 this는 함수가 호출되는 방식에 따라 this에 바인딩된 값, 즉 this 바인딩이 동적으로 결정된다. (한편, strict mode역시 this 바인딩에 영향을 준다.)
    
    this는 코드 어디에서든 참조 가능하다.
    
    전역에서도 함수 내부에서도 참조할 수 있다.
    
2. **`함수 호출 방식과 this 바인딩`**
    - 일반 함수 호출
        
        기본적으로 this에는 전역 객체가 바인딩 된다. 어떠한 함수라도 일반 함수로 호출되면 this에 전역 객체가 바인딩된다.
        
        일반 함수로 호출된 모든 함수(중첩 함수, 콜백 함수 포함) 내부의 this에는 전역 객체가 바인딩된다.
        
        ```jsx
        var val = 1;
        var data = [1,2,3];
        
        const obj = {
            value : 100,
            bar () {
                console.log(this.value) // 100
                function bars () {
                    console.log(typeof this); // object
                    console.log(this.value); // undefined
                    console.log(this.data) // undefined
                }
        
                bars()
            }
        }
        
        obj.bar()
        ```
        
        일반적으로 메서드 내부에 중첩 함수, 혹은 콜백 함수의 this가  전역 객체를 바인딩 하는 것은 문제가 있다.
        
        그렇기 때문에 메서드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메서드의 this 바인딩과 일치시키기 위한 기법이 존재한다.
        
        ```jsx
        var val = 1;
        
        const obj = {
            value : 100,
            bar () {
                const that = this;
                console.log(this.value) // 100
                function bars () {
                    console.log(typeof that); // object
                    console.log(that.value); // 100
                }
        
                bars()
            }
        }
        
        obj.bar()
        ```
        
        이런식으로 내부 메서드에 this를 할당하면 바로 아래의 중첩 함수에서 이 this의 값을 읽어들일 수 있다.
        
    - 메서드 호출
        
        ```jsx
        const person = {
            name : "Lay",
            getName() {
                return this.name;
            }
        }
        
        console.log(person.getName()) // Lay
        ```
        
        위 예제에서 getName 메서드는 person 객체의 메서드로 정의 됐다.
        
        하지만, person 객체의 getName 프로퍼티가 가리키는 함수 객체는 person 객체에 포함된 것이 아니라 독립적으로 존재하는 별도의 객체다.
        
        getName 프로퍼티가 함수 객체를 가리키고 있을 뿐이다.
        
        즉, getName 메서드는 다른 객체에 프로퍼티에 할당하는 것으로 다른 객체의 메서드가 될 수도 있고, 일반 변수에 할당하여 일반 함수로 호출될 수도 있다.
        
        ```jsx
        const person = {
            name : "Lay",
            getName() {
                return this.name;
            }
        }
        
        const anotherPerson = {
            name : 'KIM'
        };
        /** 
         * getName 메서드를 호출한 것은 anotherPerson이기 때문에, 
         * anotherPerson의 name에 바인딩된 "KIM"이 출력된다.
         * */
        anotherPerson.getName = person.getName;
        console.log(anotherPerson.getName()) // KIM
        
        /**
         * 메서드가 호출됐을 때 getName 메서드에
         * 바인딩된 name이 없기 때문에 undefined이다.
         */
        const getName = person.getName
        console.log(getName()) // undefined
        ```
        
        따라서, 메서드 내부의 this는 프로퍼티로 메서드를 가리키고 있는 객체와는 관계가 없고, 메서드를 호출한 객체에 바인딩된다.
        
        this에 바인딩될 객체는 호출 시점에 결정된다.
        
    - 생성자 함수 호출
        
        생성자 함수 내부의 this에는 생성자 함수가 생성할 인스턴스가 바인딩된다.
        
        ```jsx
        function Circle(radius) {
            this.radius = radius;
            this.getDiameter = function () {
                return this.radius * 2
            }
        };
        
        const circle1 = new Circle(5)
        const circle2 = new Circle(10)
        
        console.log(circle1.getDiameter()) // 10
        console.log(circle2.getDiameter()) / 20
        ```
        
        참고로 new 연산자와 더불어 인스턴스를 생성하지 않으면 생성자 함수로서 작동하지 않는다.
        
        ```jsx
        const circle3 = Circle(3);
        console.log(circle3); // undefined
        ```
        
        **apply와 call 메서드의 본질적인 기능은 함수를 호출하는 것이다**.
        
        ```jsx
        function getThisBinding() {
            console.log("Arg:", arguments) // [Arguments] { '0': 1, '1': 2, '2': 3 }
            return this;
        };
        
        const thisArg = { a : 1 };
        
        /**
         * getThisBinding 함수를 호출하면서 인수로 전달한 객체(thisArg)를 getThisBinding 함수의 this에 바인딩했다.
         * apply 메서드는 호출할 함수(getThisBinding)의 인수를 배열로 묶어 전달한다.
         */
        console.log(getThisBinding.apply(thisArg, [1,2,3])) 
        // Arg: [Arguments] { '0': 1, '1': 2, '2': 3 }
        // { a: 1 }
        
        /**
         * call 메서드는 호출할 함수(getThisBinding)의 인수를 쉼표로 구분한 리스트 형식으로 전달한다.
         */
        console.log(getThisBinding.call(thisArg, 1, 2, 3))
        // Arg: [Arguments] { '0': 1, '1': 2, '2': 3 }
        // { a: 1 }
        ```
        
        apply 메서드와 call 메서드의 대표적인 용도는 arguments 객체와 같은 유사 배열 객체에 배열 메서드를 사용하는 경우다.
        
        arguments는 배열이 아니기 때문에 Array.prototype.slice 같은 배열 메서드를 사용할 수 없으나 apply나 call 메서드를 이용하면 가능하다.
        
        ```jsx
        function convertArgsToArray(){
            console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3 }
        
            const arr = Array.prototype.slice.call(arguments);
        		
        		// 나열되있던 인수를 배열로 정리
            console.log(arr) // [ 1, 2, 3 ]
            
            return arr;
        };
        
        convertArgsToArray(1,2,3)
        ```
        
        **bind**메서드는 메서드의 this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 유용하게 사용된다.
        
        ```jsx
        const person = {
            name : "Lay",
            foo(cb) {
                // (1)
                setTimeout(cb, 100);
            }
        };
        
        person.foo( function(){
            console.log(`Hi my name is ${this.name}`) // (2) Hi my name is undefined
        })
        ```
        
        (1)의 시점에서 this는 foo 메서드를 호출한 객체, 즉 person 객체를 가리킨다.
        
        그러나, `[person.foo](http://person.foo)` 의 콜백 함수가 일반 함수로서 호출된 (2)의 시점에 this는 전역 객체 window를 가리킨다. 
        
        따라서 Node.js 환경에서 this.name이 undefined이기 때문에 저런 값이 출력되는 것이다.
        
        이를 일치시키기 위해서,
        
        ```jsx
        const person = {
            name : "Lay",
            foo(cb) {
                // (1)
                setTimeout(cb.bind(this), 100);
            }
        };
        
        person.foo( function(){
            console.log(`Hi my name is ${this.name}`) // (2) Hi my name is Lay
        })
        ```
        
        이렇게 바인딩을 시켜주면, person 객체의 name을 읽어오는 것을 알 수 있다.