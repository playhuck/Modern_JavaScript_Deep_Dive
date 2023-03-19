// const person = {
//     name : "kim"
// }

// person.age = 20;

// console.log(Object.getOwnPropertyDescriptors(person))

// // {
// //     name: {
// //       value: 'kim',
// //       writable: true,
// //       enumerable: true,
// //       configurable: true
// //     },
// //     age: { value: 20, writable: true, enumerable: true, configurable: true }
// //   }

// const person = {
//   fir: "Lay",
//   last: "Kim",

//   get fullName() {
//     return `${this.fir} ${this.last}`;
//   },

//   set fullName(name) {
//     [this.fir, this.last] = name.split(' ');
//   }
// };

// console.log(person.fir + ' ' + person.last);

// person.fullName = 'Kim Lay';
// console.log(person);

// console.log(person.fullName)

// let descriptor = Object.getOwnPropertyDescriptor(person, 'fir');
// console.log(descriptor);

// descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
// console.log(descriptor);

// {
//     get: [Function: get fullName],
//     set: [Function: set fullName],
//     enumerable: true,
//     configurable: true
//   }

console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
(console.log(Object.getOwnPropertyDescriptor(function() {}, 'prototype')));