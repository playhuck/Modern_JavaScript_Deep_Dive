1. **JavaScript 객체의 분류**
    
    자바스크립트 객체는 다음과 같이 크게 3개의 객체로 분류된다.
    
    - **표준 빌트인 객체**
        
        **ECMAScirpt** 사양에 정의된 객체(**`Object, String, Number, RegExp, Date`** … etc..)를 말하며, Application 전역의 공통 기능을 제공한다.
        
        JS 실행환경에 상관없이 언제나 사용할 수 있다.
        
    - **호스트 객체**
        
        **ECMAScirpt** 사양에 정의된 객체는 아니지만 JS 실행환경에서 추가로 제공하는 객체를 말한다. 브라우저 환경에서는 **`DOM, BOM, XMLHttpRequest, fetch`** 등이 있다.
        
    - **사용자 정의 객체**
        
        사용자가 직접 정의한 객체를 말한다.
        
2. **표준 빌트인 객체**
    
    생성자 함수인 표준 빌트인 객체가 생성한 인스턴스의 프로토타입은 표준 빌트인 객체의 prototype 프로퍼티에 바인딩된 객체다.
    
    예를 들어, 표준 빌트인 객체 String을 생성자 함수로서 호출하여 생성한 String 인스턴스의 프로토타입은 String.prototype이다.
    
    ```jsx
    const strObj = new String('Lay') ; // String { "Lee" }
    
    /** String 생성자 함수를 통해 생성한 strObj 객체의 프로토타입은 String.prototype 이다. */
    console.log(Object.getPrototypeOf(strObj) === String.prototype) // true
    ```
    
    표준 빌트인 객체의 prototype에 바인딩된 객체(String.prototype)는 다양한 기능의 빌트인 프로토타입 메서드를 제공한다.
    
    ```jsx
    const numObj = new Number(1.5);
    
    console.log(numObj.toFixed()); // 2
    
    console.log(Number.isInteger(0.5)) // false
    ```
    
3. **원시값과 래퍼 객체**
    
    원시값을 객체처럼 사용하면, JS 엔진이 암묵적으로 연관된 객체를 생성하여 객체로 프로퍼티에 접근하거나 메서드를 호출하고 다시 원시값으로 되돌린다.
    
    ```jsx
    const str = "Lay";
    
    console.log(str.length); // 3
    console.log(str.toUpperCase()); // LAY
    
    console.log(typeof str); // string
    ```
    
    이처럼 **`String, Number, Boolean`** 값에 대해 객체처럼 접근하면 생성되는 임시 객체를 래퍼 객체(**`wrapper object`**)라고 한다.
    
    참고로 Symbol도 래퍼 객체를 생성한다. 심벌은 일반적인 원시값과는 달리, 리터럴 표기법으로 생성할 수 없고 Symbol 함수를 통해 생성해야 하므로 다른 원시값과는 차이가 있다.
    
    String, Number, Boolean, Symbol 생성자 함수를 new 연산자와 함께 호출하여 인스턴스를 생성할 필요가 없으며, 권장하지 않는다.
    
    한편, null과 undefined는 래퍼 객체를 생성하지 않는다.
    
4. **전역 객체**
    
    전역 객체는 **코드가 실행되기 이전 단계에 JS 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체**이며, 어떤 객체에도 속하지 않는 최상위 객체다.
    
    브라우저 환경에서는 **window**(또는 **self, this, frames**)가 전역 객체를 가리키지만,
    
    **`Node.js`** 환경에서는 **global**이 전역 객체를 가리킨다.
    
    전역 객체는 표준 빌트인 객체와 환경에 따른 호스트 객체(클라이언트 Web API 또는 Node.js의 호스트 API), 그리고 **`var 키워드`**로 선언한 전역 변수와 전역 함수를 프로퍼티로 갖는다.
    
    1. 전역 객체는 개발자가 의도적으로 생성할 수 없다. 즉 , 전역 객체를 생성할 수 있는 생성자 함수가 제공되지 않는다.
    2. 전역 객체의 프로퍼티를 참조할 때 window 또는 global을 생략할 수 있다.
        
        ```jsx
        var a = global.parseInt('F', 16);
        var b = parseInt('F', 16);
        
        console.log( a === b) // true
        ```
        
    3. 전역 객체는 **`Object, String, Number, Boolean, Function, Array, RegExp, Date, Math, Promise`**와 같은 모든 표준 빌트인 객체를 프로퍼티로 가지고 있다.
    4. var 키워드로 선언한 전역 변수와 선언하지 않은 변수에 값을 할당한 암묵적 전역, 그리고 전역 함수는 전역 객체의 프로퍼티가 된다.
        
        ```jsx
        var foo = 1;
        console.log(global.foo); // 1
        
        bar = 2;
        console.log(global.bar); // bar는 전역 객체의 프로퍼티
        
        function baz() { return 3;};
        console.log(global.baz())
        ```
        
    5. **`let`**이나 **`const`** 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다. let 이나 const 키워드로 선언한 전역 변수는 보이지 않는 개념적인 블록(**전역 렉시컬 환경의 선언적 환경 레코드**) 내에 존재하게 된다.
    - **빌트인 전역 함수**
        - **`eval`**
            
            문자열을 인수로 전달받아 실행시킨다.
            
            전달받은 문자열 코드가 표현식이라면 문자열을 런타임에 평가하여 값을 생성하고, 표현식이 아니라 문이라면 런타임에 실행한다.
            
            ```jsx
            // 표현식
            eval('1 + 2;') // 3
            // 표현식 아닌 문
            eval('var x = 5;'); // undefined
            ```
            
        - **`isFinite`**
            
            전달받은 인수가 정상적인 유한수인지 검사하여 유한수면 true, 무한수면 false를 리턴한다. 인수가 숫자가 아닌 경우 숫자로 타입 변환 후 검사 수행하는데 변환 후에도 숫자가 아니라면(NaN) false를 반환한다.
            
            ```jsx
            isFinite(2e64) // true
            isFinite(Infinity); // false
            ```
            
        - **`isNaN`**
            
            전달받은 인수가 NaN인지 검사하여 그 결과를 불리언 타입으로 반환한다.
            
        - **`parseFloat`**
            
            전달받은 문자열 인수를 부동 소수점 숫자, 즉 실수로 해석하여 반환한다.
            
            첫 번째 문자열을 숫자로 반환할 수 없다면 NaN을 반환한다.
            
        - **`parseInt`**
            
            전달받은 인수를 정수로 해석하여 반환한다.
            
            ```jsx
            parseInt('10', 16) // 16 '10'을 16진수로 해석하고 그 결과를 10진수 정수로 반환
            ```
            
        - **`encodeURI / deodeURI`**
            
            **encodeURI 함수**는 완전한 URI를 문자열로 전달받아 이스케이프 처리를 위해 인코딩한다. URL는 인터넷에 있는 자원을 나타내는 유일한 주소를 말한다.
            
            https://www.domain.com:80/docs/search?category=js#intro
            
            - https : Protocol
            - [www.domain.com](http://www.domain.com) : Host(Domain)
            - 80 : Port
            - /docs/search : Path
            - ?category=js : Query String
            - #intro : Frament
            
            여기서 **이스케이프 처리**란, 네트워크를 통해 정보를 공유할 때 어떤 시스템에서도 읽을 수 있는 아스키 문자 셋으로 변환하는 것이다.
            
            UTF-8 특수 문자의 경우 1문자당 1~3바이트, 한글 표현의 경우 1문자당 3바이트다.
            
            **URI 문법 형식 표준 RFC3986**에 따르면 URL은 아스키 문자 셋으로만 구성되야 하며, 한글을 포함한 대부분의 외국어나 아스키 문자 셋에 정의되지 않은 특수 문자의 경우 URL에 포함될 수 없다.
            
            따라서, URL 내에 의미를 갖고 있는 문자(**`%, ?, #`**)나 URL에 올 수 없는 문자 또는 시스템에 해석될 수 있는 문자( **`<, >`**)를 이스케이프 처리하여 문제를 예방한다.
            
            decodeURI 함수는 인코딩된 URI를 인수로 전달받아 이스케이프 처리 이전으로 되돌린다.
            
            ```jsx
            const uri = 'http://example.com?name=레이&job=programmer&student';
            
            const enc = encodeURI(uri);
            /** http://example.com?name=%EB%A0%88%EC%9D%B4&job=programmer&student */
            console.log(enc);
            
            const dec = decodeURI(enc);
            /** http://example.com?name=레이&job=programmer&student */
            console.log(dec)
            ```