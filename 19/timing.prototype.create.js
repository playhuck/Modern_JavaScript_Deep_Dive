
// /** 생성자 함수 */
// function Person(name) {
//     this.name = name;
// }

// /**  함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.*/
// console.log(Person.prototype)

// /** 일반 콘솔을 찍으면 {} 빈객체로 나오지만, 브라우저의 콘솔창에 입력하면 { constructor : f }로 나온다. */

// const Person = name => {
//     this.name = name;
// };

// console.log(Person.prototype); // undefined

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

me.sayHello(); // Hi ! My name is Lay
you.sayHello(); // Hi ! My name is Luke

/** 자식 객체(인스턴스)가 상속받아 메서드를 사용한다. */