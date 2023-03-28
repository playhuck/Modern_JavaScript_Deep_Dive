// 'use strict';

// function foo() {
//     x = 10;
// };

// foo()
// console.log(x)

// (function() {
//     'use strict';

//     var x = 1;
//     delete x;
// })();

(function (a) {
    'use strict'
    a = 2;

    console.log(arguments)
    
})(1)