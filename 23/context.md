1. **소스코드의 타입**
    
    ECMAScript 사양은 소스코드를 4가지 타입으로 구분한다.
    
    4가지 타입의 소스코드는 **실행 컨텍스트를 생성**한다.
    
    | 소스코드의 타입 | 설명 |
    | --- | --- |
    | 전역 코드(Global code) | 전역에 존재하는 소스코드를 말한다. 전역에 정의된 함수, 클래스 등의 내부 코드는 포함되지 않는다. |
    | 함수 코드(Function code) | 함수 내부에 존재하는 소스코드를 말한다. 함수 내부에 중첩된 함수, 클래스 등의 내부 코드는 포함하지 않는다. |
    | eval 코드(Eval code) | 빌트인 전역 함수인 eval 함수에 인수로 전달되어 실행되는 소스코드를 말한다. |
    | 모듈 코드(Module code) | 모듈 내부에 존재하는 소스코드를 말한다. 모듈 내부의 함수, 클래스 등의 내부 코드는 포함하지 않는다. |
    1. **전역 코드**
        
        **var 키워드**로 선언된 전역 변수와 **함수 선언문**으로 정의된 전역 함수를 
        
        전역 객체의 프로퍼티와 메서드로 바인딩하고, 
        
        참조하기 위해 **전역 객체와 연결**되어야 한다.
        
        이를 위해 전역 코드가 평가되면 전역 실행 컨텍스트가 생성된다.
        
    2. **함수 코드**
        
        함수 내부에 존재하는 코드를 말한다. 함수 내부에 중첩된 함수, 클래스 등의 내부 코드는 포함되지 않는다.
        
        **함수 코드는 지역 스코프를 생성**하고, 지역 변수 | 매개변수 | arguments 객체를 관리해야 한다. 그리고 생성한 지역 스코프를 전역 스코프에서 시작하는 스코프 체인의 일원으로 관리해야 한다.
        
        이를 위해 함수 코드가 평가되면, 함수 실행 컨텍스트가 생성된다.
        
    3. **eval 코드**
        
        빌트인 전역 함수인 eval 함수에 인수로 전달되어 실행되는 소스코드를 말한다.
        
        eval 코드는, strict mode에서 자신만의 독자적인 스코프를 생성한다.
        
        이를 위해 eval 코드가 평가되면 eval 실행 컨텍스트가 생성된다.
        
    4. **모듈 코드**
        
        모듈 내부에 존재하는 소스코드를 말한다. 모듈 내부의 함수, 클래스 등의 내부 코드는 포함되지 않는다.
        
        모듈 코드는 독립적인 모듈 스코프를 생성한다.
        
        이를 위해 모듈 코드가 평가되면 모듈 실행 컨텍스트가 실행된다.
        
2. **소스코드의 평가와 실행**
    
    JS 엔진은 소스코드들 2개의 과정, “소스코드의 평가”와 “소스코드의 실행”과정으로 나누어 처리한다.
    
    **소스코드의 평가 과정에서는** 실행 컨텍스트를 생성하고 변수, 함수 등의 선언문만 먼저 실행하여 생성된 변수나 함수 식별자를 키로 실행 컨텍스트가 관리하는 스코프(렉시컬 환경의 환경 레코드)에 등록한다.
    
    **소스코드의 평가 과정이 끝나면** 비로소 선언문을 제외한 소스코드가 순차적으로 실행되기 시작한다. 즉, **런타임이 시작**된다.
    
    이 때에 소스코드 실행에 필요한 정보, 즉 변수나 함수의 참조를 실행 컨텍스트가 관리하는 스코프에서 검색해서 취득한다. 그리고 **변수 값의 변경 등 소스코드의 실행 결과는** 다시 실행 컨텍스트가 관리하는 **스코프에 등록**된다.
    
    예를 들어, 다음과 같은 코드가 실행된다고 한다면
    
    ```json
    var x;
    x = 1;
    ```
    
    JS 엔진은 위 예제를 2개의 과정으로 나누어 처리하게 되고,
    
    먼저 **소스코드 평가 과정**에서는 변수 선언문 var x;를 먼저 실행한다. 이 때 생성된 변수 식별자 x는 실행 컨텍스트가 관리하는 스코프에 등록되고 undefined로 초기화 된다.
    
    **소스코드 평가 과정이 끝나면** 비로소 **소스코드 실행과정이 시작**된다.
    
    변수 선언문 var x;는 이미 소스코드 평가 과정에서 이미 실행이 완료됐다.
    
    따라서 소스코드 실행 과정에서는 변수 할당문 x = 1;만 실행된다. 이 때 x변수에 값을 할당하려면 먼저 **x 변수가 선언된 변수인지** 확인해야 한다
    
    이를 위해, 실행 컨텍스트가 관리하는 스코프에 x 변수가 등록되어 있는지 확인한다.
    
    x 변수가 스코프에서 선언된 변수라면 값을 할당하고 결과를 실행 컨텍스트에 등록하여 관리한다.
    
    ### 23.4 실행 컨텍스트의 역할
    
    ---
    
    코드가 실행되려면 다음과 같이 스코프, 식별자, 코드 실행 순서 등의 관리가 필요하다.
    
    - 선언에 의해 생성된 모든 식별자(변수, 함수, 클래스 등)를 구분하여 등록하고 상태 변화(식별자에 바인딩된 값의 변화)를 지속적으로 관리할 수 있어야 한다.
    - Scope는 중첩 관계에 의해 스코프 체인을 형성해야 한다. 즉, Scope Chain을 통해 상위 스코프로 이동하며 식별자를 검색할 수 있어야 한다.
    - 현재 실행 중인 코드의 실행 순서를 변경할 수 있어야 한다. 다시 되돌아갈 수도 있어야 한다.
    
    **이 모든 것을 관리하는 것이 바로 실행 컨텍스트**다. 실행 컨텍스트는 소스코드를 실행하는데 필요한 환경을 제공하고 코드의 실행 결과를 실제로 관리하는 영역이다.
    
    좀 더 구체적으로, **실행 컨텍스트는 식별자를 등록하고 관리하는 스코프와 코드 실행 순서 관리를 구현한 JS 내부 메커니즘으로, 모든 코드는 실행 컨텍스트를 통해 실행되고 관리된다.**
    
    식별자와 스코프는 실행 컨텍스트의 **렉시컬 환경**으로 관리하고, 코드 실행 순서는 **실행 컨텍스트 스택**으로 관리한다.
    
    ### 23.4 실행 컨텍스트 스택
    
    ---
    
    소스코드가 실행되면 JS 엔진은 먼저 전역 코드를 평가하여 전형 실행 컨텍스트를 생성하고, 함수가 호출되면 함수 코드를 평가하여 함수 실행 컨텍스트를 생성한다.
    
    이때 생성된 실행 컨텍스트는 **스택 자료구조**로 관리된다. 이를 **실행 컨텍스트 스택**이라고 부른다.
    
    실행 컨텍스트 스택은 코드의 실행 순서를 관리한다. 소스코드가 평가되면 실행 컨텍스트가 생성되고 실행 컨텍스트 스택의 최상위에 쌓인다.
    
    실행 컨텍스트 스택의 최상위에 존재하는 실행 컨텍스트는 언제나 현재 실행중인 코드의 실행 컨텍스트다. 따라서, 실행 컨텍스트 스택의 최상위에 위치한 실행 컨텍스트를 **실행 중인 실행 컨텍스트**라고 부른다.
    
    ### 23.5 렉시컬 환경
    
    ---
    
    렉시컬 환경은 식별자와 식별자에 바인딩된 값, 그리고 상위 스코프에 대한 참조를 기록하는 자료구조로 실행 컨텍스트를 구성하는 컴포넌트다.
    
    **실행 컨텍스트 스택이 코드의 실행 순서를 관리한다면 렉시컬 환경은 스코프와 식별자를 관리한다.**
    
    즉, 렉시컬 환경은 스코프를 구분하여 식별자를 등록하고 **관리하는 저장소 역할**을 하는 것이 실체다.
    
    렉시컬 환경은 다음과 같이 두 개의 컴포넌트로 구성된다.
    
    - 환경 레코드(EnviromentRecord)
        - 스코프에 포함된 식별자를 등록하고 등록된 식별자에 바인딩된 값을 관리하는 저장소다. 환경 레코드는 소스코드의 타입에 따라 관리하는 내용의 차이가 있다.
    - 외부 렉시컬 환경에 대한 참조(OuterLexicalEnviromentReference)
        - 외부 렉시컬 환경에 대한 참조는 상위 스코프를 가리킨다. 이때 상위 스코프란 외부 렉시컬 환경, 즉 해당 실행컨텍스트를 생성한 소스코드를 포함하는 상위 코드의 렉시컬 환경을 말한다. **외부 렉시컬 환경에 대한 참조를 통해 단방향 링크드 리스트인 스코프 체인을 구현**한다.
    
    ### 23.6 실행 컨텍스트의 생성과 식별자 검색 과정
    
    ---
    
    **23.6.1 전역 객체 생성**
    
    ---
    
    전역 객체는 전역 코드가 평가되기 이전에 생성된다. 이때 전역 객체에는 빌트인 전역 프로퍼티와 빌트인 전역 함수, 그리고 표준 빌트인 객체가 추가되며 동작환경에따라 CSR Web API 또는 특정 환경을 위한 호스트 객체를 생성한다.
    
    전역 객체도 Object.prototype을 상속받는데, 전역 객체가 곧 프로토타입 체인의 일원이라는 소리다.
    
    ```jsx
    window.__prototype__.__prototype__.__prototype__.__prototype__ === Object.prototype
    // true
    ```
    
    **23.6.2 전역 코드 평가**
    
    ---
    
    소스코드가 실행되면 JS 엔진은 전역 코드를 평가한다.
    
    1. 전역 실행 컨텍스트 생성
    2. 전역 렉시컬 환경 생성
        1. 전역 환경 레코드 생성
            
            기존의 var 키워드로 선언한 전역 변수와 ES6에 추가된 let, const 키워드로 선언한 전역 변수를 구분하여 관리하기 위해 **전역 스코프 역할을 하는 전역 환경 레코드는 객체 환경 레코드(var)와 선언적 환경 레코드(let, const)로 구분되게 됐다**.
            
            1. **객체 환경 레코드 생성**
                
                var 키워드로 선언한 변수나 함수 선언문으로 정의된 전역함수는 전역 환경 레코드의 객체 환경 레코드에 연결된 BindingObject를 통해 전역 객체의 프로퍼티와 메서드가 된다. 이 BindingObject는 전역 객체가 생성될때 같이 생성된 전역객체로서 var 키워드로 선언된 변수는 **코드 실행 단계이전에 평가되기 때문에 변수 선언문 이전에도 참조할 수 있는데 이것이 바로 호이스팅**이 발생하는 원인이기도 하다.
                
            2. **선언적 환경 레코드 생성**
                
                var 키워드와 다르게, 개념적인 블록(Scope) 내부에 존재하게 된다. 한편 const 키워드로 선언한 변수는 “선언 단계”와 “초기화 단계”가 분리되어 진행한다. 즉, 런타임에 실행 흐름이 변수 선언문에 도달하기 전까지 **일시적 사각지대(TDZ)**에 빠지게 되기 때문에 소스코드 흐름이 변수 선언문에 도달하기 까지 이전에 참조할 수 없게 된다.
                
        2. this 바인딩
            
            일반적으로 전역 코드에서 this는 전역 객체를 가리키므로 전역 환경 레코드의 [[ GlobalThisValue]] 내부 슬롯에는 전역 객체가 바인딩된다. 따라서 전역 코드에서 this를 참조하면 [[ GlobalThisValue]] 내부 슬롯에 바인딩된 객체가 반환된다.
            
        3. 외부 렉시컬 환경에 대한 참조 결정
    
    **23.6.3 전역 코드 실행**
    
    ---
    
    식별자는 스코프가 다르면 같은 이름을 가질 수 있다.
    
    즉, 동일한 이름의 식별자가 다른 스코프에 여러개 존재할 수도 있다. 따라서 어느 스코프의 식별자를 참조하면 되는지 결정할 필요가 있다. 이를 **“식별자 결정”**이라 한다.
    
    식별자 결정을 위해 식별자를 검색할 때는 실행 중인 실행 컨텍스트에서 식별자를 검색하기 시작한다. 선언된 식별자는 실행 컨텍스트의 렉시컬 환경의 환경 레코드에 등록되어 있다.
    
    현재 **스코프에서 식별자를 찾을 수 없다면 외부 렉시컬 환경에 대한 참조가 가리키는 렉시컬 환경(상위 스코프)**를 이동하며 식별자를 검색한다.
    
    이것이 바로 스코프 체인의 동작 원리다. 만약, 최상위 스코프에서도 찾을 수 없다면 참조에러가 발생한다.
    
    …..
    
    대체적으로 실행컨텍스트 생성과 그 동작은 아래와 같다.
    
    1. 전역 실행 컨텍스트 생성
    2. 전역 렉시컬 환경 생성
        1. 전역 환경 레코드 생성
            1. **객체 환경 레코드 생성**
            2. **선언적 환경 레코드 생성**
        2. this 바인딩
        3. 외부 렉시컬 환경에 대한 참조 결정
    
    대체적으로 위와 같은 과정을 거쳐서 소스코드가 평가된 후 해당 컨텍스트의 소스코드에 대한 실행이 이루어지고 실행이 종료되면 컨텍스트는 제거되지만 렉시컬 환경은 다른 곳에서 해당 환경을 참조하고 있다면 살아있게 된다.
    
    비슷한 과정을 거치며 외부 렉시컬 환경에 대한 참조는 그 상위 스코프로 이루어지는…
    
    이 일련의 흐름이 실행 컨텍스트의 실행이라고 볼 수 있다.
    
    ### 23.7 실행 컨텍스트와 블록 레벨 스코프
    
    ---
    
    let, const로 선언한 변수는 모든 코드 블록(Function, if 문, while 문,  try ~ catch 문 등…)을 지역 스코프로 인정하는 블록 레벨 스코프를 따른다. 반면, var 키워드로 선언한 변수는 함수의 코드 블록만 지역 스코프로 인정하는 함수 레벨 스코프를 따른다.