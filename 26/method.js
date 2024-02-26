
const obj = {
    x: 1,

    /** foo는 메서드다 */
    foo() {return  this.x; },
    
    /** bar는 메서드가 아닌, 일반 함수다. */
    bar: function() {
        return this.x;
    }

};

console.log(new obj.bar()); // bar {}
console.log(new obj.foo()); // TypeError: obj.foo is not a constructor