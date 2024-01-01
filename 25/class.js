// var Person = (function () {

//     function Person(name) {
//         this.name = name;
//     };
//     // Person 생성자 함수는 name이라는 속성을 가진 객체를 생성합니다. this.name에는 생성자에 전달된 name이 할당됩니다.

//     Person.prototype.sayHi = function () {
//         console.log('Hi! My name is ' + this.name);
//     };
//     //생성자 함수의 프로토타입 객체에 sayHi라는 메서드를 추가합니다. 
//     //이 메서드는 객체를 생성할 때마다 복제되지 않고, 모든 Person 객체가 이 메서드에 접근할 수 있게 합니다.

//     return Person;

// }());

// var me = new Person('Lee');
// //Person 생성자 함수를 사용하여 me라는 객체를 생성합니다. 생성자에 'Lee'를 전달하여 me 객체의 name 속성을 설정합니다.

// console.log(me.sayHi());
// //프로토타입을 이용한 상속은 Person 생성자 함수가 생성한 모든 객체가 sayHi 메서드를 공유할 수 있도록 합니다. 
// //즉, 모든 Person 객체는 공통된 메서드를 가지며, 이는 메모리를 효율적으로 사용할 수 있도록 도와줍니다.

// class Person {

//     constructor(name){
//         this.name = name;
//     } // 인스턴스 생성 및 초기화

//     sayHi() {
//         console.log(`Hi! My name is ${this.name}`);
//     };

//     static sayHello() {
//         console.log('Hello');
//     };
// };

// const me = new Person('Kim');

// console.log(me.name); // Kim

// me.sayHi(); // Hi! My name is Kim

// Person.sayHello(); // Hello!

// class Person {

//     constructor(name){
//         this.name = name;
//     }
// };

// const me = new Person('Kim');

// console.log(Object.getPrototypeOf(me) === Person.prototype); // true
// console.log(me instanceof Person); // true

// console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype); // true
// console.log(me instanceof Object); // true

// console.log(me.constructor === Person); // true

// class Person {

//     constructor(name) {

//         // 1. 암묵적으로 생성된 this가 인스턴스에 바인딩 됨
//         console.log(this); // Person {}
//         console.log(Object.getPrototypeOf(this) === Person.prototype); // true

//         // 2. this에 바인딩되어 있는 인스턴스를 초기화
//         this.name = name;

//         // 3. 완성된 인스턴스가 바인딩된 this를 암묵적으로 반환
//     }
// }

// const person = {

//     // data property
//     firstName: 'Lay',
//     lastName: 'Kim',

//     // 접근자 함수로 구성된 접근자 프로퍼티
//     // getter
//     get fullName() {
//         return `${this.firstName} ${this.lastName}`;
//     },

//     // setter
//     set fullName(name) {
//         [this.firstName, this.lastName] = name.split(' ');
//     }
// };

// console.log(`${person.firstName} ${person.lastName}`); // Lay Kim

// /**
//  * 접근자 프로퍼티를 통한 프로퍼티 값의 저장
//  * fullName에 저장하면 setter함수가 호출된다.
//  */
// person.fullName = 'Luke Gang';
// console.log(person); // { firstName: 'Luke', lastName: 'Gang', fullName: [Getter/Setter] }

// /**
//  * 접근자 프로퍼티를 통한 프로퍼티 값의 참조
//  * 프로퍼티 fullName에 접근하면 getter함수가 호출된다.
//  */
// console.log(person.fullName);

// /**
//  * fullName은 접근자 프로퍼티다.
//  * 접근자 프로퍼티는 get, set, enumerable, configurable의 property attributes를 갖는다.
//  */
// console.log(Object.getOwnPropertyDescriptor(person, 'fullName'));

// // {
// //     get: [Function: get fullName],
// //     set: [Function: set fullName],
// //     enumerable: true,
// //     configurable: true
// // }

// class Person {

//     #name = '';
    
//     constructor(firstName, lastName, name) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.#name = name;
//     };

//     get fullName() {
//         return `${this.firstName} ${this.lastName}`;
//     };

//     set fullName(name) {
//         [this.firstName, this.lastName] = name.split(' ');
//     }
// };

// const me = new Person('Lay', 'Kim', "Kim Lay");

// console.log(me.name); // undefined

// // ... 접근자 함수와 동일하게 작용한다.

class MyMath {

    static Pi = 22 / 7;

    static #num = 10;

    static increment() {
        return ++MyMath.#num;
    }
};

console.log(MyMath.Pi); //3.142857142857143
console.log(MyMath.increment()); // 11