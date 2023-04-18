// const circle = {
//     radius : 5,
//     getDiameter(){
//         /** 객체 circle이 가지고 있는 Property radius */
//         return 2 * circle.radius;
//     }
// }

// var val = 1;

// const obj = {
//     value : 100,
//     bar () {
//         const that = this;
//         console.log(this.value) // 100
//         function bars () {
//             console.log(typeof that); // object
//             console.log(that.value); // 100
//         }

//         bars()
//     }
// }

// obj.bar()

// const person = {
//     name : "Lay",
//     getName() {
//         return this.name;
//     }
// }

// const anotherPerson = {
//     name : 'KIM'
// };
// /**
//  * getName 메서드를 호출한 것은 anotherPerson이기 때문에,
//  * anotherPerson의 name에 바인딩된 "KIM"이 출력된다.
//  * */
// anotherPerson.getName = person.getName;
// console.log(anotherPerson.getName()) // KIM

// /**
//  * 메서드가 호출됐을 때 getName 메서드에
//  * 바인딩된 name이 없기 때문에 undefined이다.
//  */
// const getName = person.getName
// console.log(getName()) // undefined

// function Circle(radius) {
//     this.radius = radius;
//     this.getDiameter = function () {
//         return this.radius * 2
//     }
// };

// // const circle1 = new Circle(5)
// // const circle2 = new Circle(10)

// // console.log(circle1.getDiameter()) // 10
// // console.log(circle2.getDiameter()) / 20

// const circle3 = Circle(3);
// console.log(circle3); // undefined

// function getThisBinding() {
//     console.log("Arg:", arguments) // [Arguments] { '0': 1, '1': 2, '2': 3 }
//     return this;
// };

// const thisArg = { a : 1 };

// /**
//  * getThisBinding 함수를 호출하면서 인수로 전달한 객체(thisArg)를 getThisBinding 함수의 this에 바인딩했다.
//  * apply 메서드는 호출할 함수(getThisBinding)의 인수를 배열로 묶어 전달한다.
//  */
// console.log(getThisBinding.apply(thisArg, [1,2,3]))
// // Arg: [Arguments] { '0': 1, '1': 2, '2': 3 }
// // { a: 1 }

// /**
//  * call 메서드는 호출할 함수(getThisBinding)의 인수를 쉼표로 구분한 리스트 형식으로 전달한다.
//  */
// console.log(getThisBinding.call(thisArg, 1, 2, 3))
// // Arg: [Arguments] { '0': 1, '1': 2, '2': 3 }
// // { a: 1 }

// function convertArgsToArray(){
//     console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3 }

//     const arr = Array.prototype.slice.call(arguments);

//     console.log(arr) // [ 1, 2, 3 ]

//     return arr;
// };

// convertArgsToArray(1,2,3)

const person = {
  name: "Lay",
  foo(cb) {
    // (1)
    setTimeout(cb.bind(this), 100);
  },
};

person.foo(function () {
  console.log(`Hi my name is ${this.name}`); // (2) Hi my name is Lay
});
