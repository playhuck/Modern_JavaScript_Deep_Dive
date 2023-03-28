1. **`strict mode란?`**
    
    다음의 코드를 살펴보자.
    
    ```jsx
    function foo() {
        x = 10;
    };
    
    foo()
    console.log(x)
    ```
    
    딱 보면, **`ReferenceError: x is not defined`** 란 에러를 발생시킬 것만 같지만
    
    실제로 실행시키면 10 이라는 값이 콘솔창에 입력된다.
    
    이는 x 변수가 어디에 선언됐는지 스코프 체인을 통해 JS에서 찾아가던 중 더이상 상위 스코프에서도 찾을 수 없다면 ReferenceError를 발생시키는 것이 아닌,
    
    암묵적인 전역 객체에 x 프로퍼티를 동적으로 생성하기 때문에 x =10이라는 값이 콘솔창에 입력되는 것이다.
    
    이는 암묵적 전역(implicit global)을 발생시키기 때문에, 전역적으로 사용할 수 있는 것처럼 생성된 암묵적 전역변수가 에러를 발생시킬 수 있는 위험이 존재한다.
    
    따라서, JS에서 반드시 의도대로 **`var, let, const`** 를 사용하여 변수를 선언 후 사용해야 한다.
    
    하지만 잠재적인, 인적 오류(Human Error)를 방지하기 위해 추가된 것이, 바로
    
    `**strict mode**` 이다.
    
    strict mode는 JS의 문법을 좀 더 엄격하게 적용해 오류를 발생시킬 가능성이 높거나 엔진 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킨다.
    
2. **`strict mode의 적용`**
    
    strict mode를 적용하려면, 전역의 선두 또는 함수 몸체의 맨위에 **`‘use strict’;`**를 추가한다.
    
    ```jsx
    'use strict';
    
    function foo() {
        x = 10;
    };
    
    foo()
    console.log(x)
    /** 
    strict 모드가 선언되지 않았을 때와 다르게 err가 발생한다. 
    ReferenceError: x is not defined
    *
    ```
    
3. **전역에 strict mode를 적용하는 것은 피하자.**
4. **함수 단위로 strict mode를 적용하는 것도 피하자.**
    
    strict mode는 즉시 실행 함수로 감싼 non-script 코드가 없는 script 단위로 적용하는 것이 바람직하다.
    
5. **strict mode가 발생시키는 에러.**
    - **암묵적 전역**
        
        선언하지 않은 변수를 참조하면 `ReferenceError`가 발생한다.
        
    - **변수, 함수, 매개변수의 삭제**
        
        delete 연산자로 변수, 함수, 매개변수를 삭제하면 `SyntaxError`가 발생한다.
        
        ```jsx
        (function() {
            'use strict';
        
            var x = 1;
            delete x;
        })();
        /** strict 모드에서는 식별자에 대해 'delete'를 호출할 수 없습니다. */
        ```
        
    - **매개변수 이름의 중복**
        
        중복된 매개변수 이름을 사용하면 `SyntaxError`가 발생한다.
        
    - `**with` 문의 사용**
        
        with문을 사용하면 SyntaxError가 발생한다. with 문은 전잘된 객체를 스코프 체인에 추가한다. with문은 동일한 객체의 프로퍼티를 반복해서 사용할 때 객체 이름을 생략할 수 있어서 코드가 간단해지지만, 성능과 가독성이 떨어진다.
        
6. **strict mode 적용에 의한 변화**
    - **일반 함수의 `this`**
        
        strict mode에서 함수를 일반 함수로서 호출하면 this에 undefined가 바인딩된다. 이 때 에러는 발생하지 않는다.
        
    - **`arguments` 객체**
        
        strict mode에서는 매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체에 반영되지 않는다.