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

const obj = Object.create(null);
obj.a = 1;

console.log(Object.prototype.hasOwnProperty.call(obj, 'a')); // true