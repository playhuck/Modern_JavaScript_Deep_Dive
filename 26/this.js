class Prefixer {

    constructor(prefix) {
        this.prefix = prefix;
    };

    add(arr) {
        return arr.map((item) => {
             // TypeError: Cannot read properties of undefined (reading 'prefix')
            return this.prefix + item;
        });
    }
};

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transaction']));