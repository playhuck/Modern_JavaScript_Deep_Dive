// // 함수 객체는 prototype 프로퍼티를 소유한다.
// const function_property = (function () {}).hasOwnProperty('prototype');

// console.log(function_property); // true

// // 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
// const normal_object_property = ({}).hasOwnProperty('prototype');

// console.log(normal_object_property); // false

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