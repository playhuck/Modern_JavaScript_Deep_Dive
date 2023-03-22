const person = {
    name : 'Lay',
    address : 'Dragon 2',
    __proto__ : { age : 20}
};

for(const key in person) {
    if(!person.hasOwnProperty(key)) continue;
    console.log(key + ": " + person[key])
}

console.log(Object.keys(person)); // [ 'name', 'address' ]
console.log(Object.values(person)); // [ 'Lay', 'Dragon 2' ]
console.log(Object.entries(person)); // [ [ 'name', 'Lay' ], [ 'address', 'Dragon 2' ] ]

console.log('name' in person);

console.log('toString' in person)

console.log(Reflect.has(person, 'name')); // true

console.log(person.hasOwnProperty('name')); // true

for(const key in person) {
    console.log(key + ": " + person[key])
}

const sym = Symbol();
const a = {
    a : 1,
    [sym] : 10
};

for(const key in a) {
    console.log(key + ": " + a[key]);
}; //a: 1
