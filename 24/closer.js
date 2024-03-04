
// const x = 1;

// function outerFunc() {
//     const x = 10;

//     function innerFunc() {
//         console.log(x);
//     };

//     innerFunc();
// };

// outerFunc();

// const x = 1;

// function foo() {
    
//     const x = 10;

//     bar();

// };

// function bar(param) {
//     console.log(x);
// }

// foo();
// bar();

// const x = 1;

// function outer() {
//     const x = 10;
//     const inner = function () {
//         console.log(x);
//     };
//     return inner;
// };

// const innerFunc = outer();
// innerFunc();

// let num = 0;

// const increase = function () {
    
//     return ++ num;

// };

// console.log(increase());
// console.log(increase());
// console.log(increase());

// const increase = function () {
    
//     let num = 0;

//     return ++num;
// };

// console.log(increase());
// console.log(increase());
// console.log(increase());

// const increase = (function () {
    
//     let num = 0;

//     return function(){
//         return ++num;
//     }
// })

// function makeCounter(aux) {
    
//     let counter = 0;

//     return function() {
//         counter = aux(counter);
//         return counter;
//     }
// };

// function increase(n) {
//     return ++n;
// };

// function decrease(n) {
//     return --n;
// }

// const increaser = makeCounter(increase);
// console.log(increaser()); // 1
// console.log(increaser()); // 2

// const decreaser = makeCounter(decrease);
// console.log(decreaser()); // -1
// console.log(decreaser()); // -2

// const counter = (function() {
    
//     let counter = 0;

//     return function ( aux ) {

//         counter = aux(counter)
//         return counter;
//     }
// })();

// function increase(n) {
//     return ++n;
// };

// function decrease(n) {
//     return --n;
// }

// console.log(counter(increase)); // 1
// console.log(counter(decrease)); // 0

// console.log(counter(increase)); // 1
// console.log(counter(decrease)); // 0

// function Person(name, age) {
    
//     this.name = name; // public
//     let _age = age; // private

//     this.sayHi = function () {
//         console.log(`Hi My name is ${this.name}. i am ${_age}`);
//     }
// };

// const me = new Person('Kim', '28');
// me.sayHi(); // Hi My name is Kim. i am 28
// console.log(me.name); // Kim
// console.log(me._age); // undefined

// function Person(name, age) {
    
//     this.name = name; // public
//     let _age = age; // private
// };

// Person.prototype.sayHi = function () {
//     console.log(`Hi My name is ${this.name}. i am ${_age}`);
// }
// const me = new Person('Kim', '28');
// me.sayHi(); // Hi My name is Kim. i am 28
// console.log(me.name); // Kim
// console.log(me._age); // undefined

// const Person = (function () {

//     let _age = 0; // private

//     function Person(name, age) {
    
//         this.name = name; // public
//         _age = age; // private
//     };

//     Person.prototype.sayHi = function () {
//         console.log(`Hi My name is ${this.name}. i am ${_age}`);
//     };


//     return Person;
// }());
// const me = new Person('Kim', '28');
// me.sayHi(); // Hi My name is Kim. i am 28
// console.log(me.name); // Kim
// console.log(me._age); // undefined;

// console.log(hello);

// let hello;