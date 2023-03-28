// const strObj = new String('Lay') ; // String { "Lee" }

// /** String 생성자 함수를 통해 생성한 strObj 객체의 프로토타입은 String.prototype 이다. */
// console.log(Object.getPrototypeOf(strObj) === String.prototype) // true

// const numObj = new Number(1.5);

// console.log(numObj.toFixed()); // 2

// console.log(Number.isInteger(0.5)) // false

// const str = "Lay";

// console.log(str.length); // 3
// console.log(str.toUpperCase()); // LAY

// console.log(typeof str); // string

// var a = global.parseInt('F', 16);
// var b = parseInt('F', 16);

// console.log( a === b) // true


// var foo = 1;
// console.log(global.foo); // 1

// bar = 2;
// console.log(global.bar); // bar는 전역 객체의 프로퍼티

// function baz() { return 3;};
// console.log(global.baz())

const uri = 'http://example.com?name=레이&job=programmer&student';

const enc = encodeURI(uri);
/** http://example.com?name=%EB%A0%88%EC%9D%B4&job=programmer&student */
console.log(enc);

const dec = decodeURI(enc);
/** http://example.com?name=레이&job=programmer&student */
console.log(dec)