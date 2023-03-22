/** 생성자 함수 */
function Person(name) {
    this.name = name;
}

const me = new Person("Lay");

/** 프로토타입으로 교체할 객체 */
const parent = {};

/** 
 * 프로토타입 교체 
 * Object.setPrototypeOf(me, parent) 메서드는 me 객체의 프로토타입(즉, 내부 [[prototype]] Property)을 parent 객체로 설정합니다.
 * 즉, me는 프로토타입 체인을 통해 parent로부터 프로퍼티와 메서드를 상속받게 됩니다. 
 * 다시 말해, parent에 정의된 프로퍼티와 메서드를 마치 나에게 직접 정의된 것처럼 접근할 수 있습니다.
*/
Object.setPrototypeOf(me, parent);

Person.prototype = parent;

/** Person 생성자 함수와 parent 객체는 연결되어 있지 않다. */
console.log(Person.prototype === parent); // false
console.log(parent.constructor === Person); // false

/** Person.prototype이 me 객체의 프로토타입 체인 상에 존재하지 않아 false */
console.log(me instanceof Person) // false

/** Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true */
console.log(me instanceof Object) // true

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