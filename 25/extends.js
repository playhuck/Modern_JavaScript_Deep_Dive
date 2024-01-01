// class Animal {

//     constructor(age, weight){
//         this.age = age;
//         this.weight = weight;
//     };

//     eat() {
//         return 'eat';
//     };

//     move() {
//         return 'move';
//     };

// };

// class Bird extends Animal {
    
//     fly() {
//         return 'fly';
//     };
// };

// const bird = new Bird(1, 5);

// console.log(bird);
// console.log(bird instanceof Bird);
// console.log(bird instanceof Animal);

// console.log(bird.eat());
// console.log(bird.move());
// console.log(bird.fly());

// var Animal = (function () {

//     function Animal(age, weight) {
//         this.age = age;
//         this.weight = weight;
//     };

//     Animal.prototype.eat = function () {
//         return 'eat';
//     };

//     Animal.prototype.move = function () {
//         return 'move';
//     };

//     return Animal;
// }());

// // Animal 생성자 함수를 상속하여 확장한 Bird 생성자 함수
// var Bird = (function () {
//     function Bird() {

//         // Animal 생성자 함수에 this와 arguments(인수)를 전달하면서 호출
//         Animal.apply(this, arguments);
//     };

//     // Bird.prototype을 Animal.prototype을 갖는 프로토타입으로 교체
//     Bird.prototype = Object.create(Animal.prototype);

//     // Bird.prototype.constructor를 Animal에서 Bird로 교체
//     Bird.prototype.constructor = Bird;

//     Bird.prototype.fly = function() {
//         return 'fly';
//     };

//     return Bird;

// }());

// var bird = new Bird(1, 5);

// function Base1() {};

// class Base2 {};

// let condition = true;

// class Derived extends (condition ? Base1 : Base2) {};

// const derived = new Derived();

// console.log(derived);
// console.log(derived instanceof Base1);
// console.log(derived instanceof Base2);

// class Base {
//     constructor(name) {
//         this.name = name;
//     };

//     sayHi() {
//         return "Say Hi " + this.name;
//     }
// };

// class Derived extends Base {
    
//     sayHi() {

//         const __supser = Object.getPrototypeOf(Derived.prototype);

//         return `${__supser.sayHi.call(this)}. How are you doing?`
//     }
// };

// const derived = new Derived('lee');

// console.log(derived.sayHi());

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

console.log(derived.sayHi());