- **16.2 - `Property Attribute`와 `Property Descriptor` 객체**
    
    JS 엔진은 Property를 생성할 때, Property의 상태를 나타내는 `Property Attribute`를 `Dafult`로 자동 정의한다.
    
    Property Attribute는 JS 에닌이 관리하는 내부 상태 값(meta-property)인 내부 슬롯이다.
    
    Object.getOwnPropertyDescriptor 메서드를 사용하여 간접적으로 확인할 수는 있다.
    
    ```jsx
    const person = {
        name : "kim"
    }
    
    console.log(Object.getOwnPropertyDescriptor(person, 'name'))
    
    // { value: 'kim', writable: true, enumerable: true, configurable: true }
    ```
    
- **16.3 - 데이터 Property와 접근자 Property**
    - Property는 **`data property`**와 **`accessor property`**로 나뉜다.
        - **데이터 프로퍼티(data property)**
            
            Key : Value로 구성된 일반적인 Property이다.
            
        - **접근자 프로퍼티(accessor property)**
            
            자체적으로 값을 갖지 않고, 다른 데이터 Property의 값을 읽거나 저장할 때, 호출되는 접근자 함수(accessor function)로 구성된 Property이다.
            
    - **16.3.1** - **data property**
        
        **data property는 일반적으로 다음과 같은 값을 갖는다. (Default)**
        
        ```jsx
        const person = {
            name : "kim"
        }
        
        console.log(Object.getOwnPropertyDescriptor(person, 'name'))
        
        // { value: 'kim', writable: true, enumerable: true, configurable: true }
        ```
        
        이것은 Property를 동적으로 추가해도 마찬가지다.
        
        ```jsx
        const person = {
            name : "kim"
        }
        
        person.age = 20;
        
        console.log(Object.getOwnPropertyDescriptors(person))
        
        // {
        //     name: {
        //       value: 'kim',
        //       writable: true,
        //       enumerable: true,
        //       configurable: true
        //     },
        //     age: { value: 20, writable: true, enumerable: true, configurable: true }
        //   }
        ```
        
    - **16.3.2 - accssor property**
        
        accssor property는 자체적으로 값을 갖지 않고, 다른 데이터 Property의 값을 읽거나 저장할 때 사용하는 접근자 함수(accessor function)로 구성된 Property다.
        
        접근자 함수는 **`getter/setter`** 함수라고도 부른다. 접근자 Property의 getter와 setter 함수를 모두 정의할 수도 있고, 하나만 정의할 수도 있다.
        
        ```jsx
        const person = {
          fir: "Lay",
          last: "Kim",
        
          get fullName() {
            return `${this.fir} ${this.last}`;
          },
        
          set fullName(name) {
            [this.fir, this.last] = name.split(' ');
          }
        };
        
        console.log(person.fir + ' ' + person.last); // Lay Kim
        
        person.fullName = 'Kim Lay';
        console.log(person); // { fir: 'Kim', last: 'Lay', fullName: [Getter/Setter] }
        
        console.log(person.fullName) // Kim Lay
        
        let descriptor = Object.getOwnPropertyDescriptor(person, 'fir');
        console.log(descriptor);
        // { value: 'Kim', writable: true, enumerable: true, configurable: true }
        
        descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
        console.log(descriptor);
        
        // {
        //     get: [Function: get fullName],
        //     set: [Function: set fullName],
        //     enumerable: true,
        //     configurable: true
        //  }
        ```
        
        person 객체의 `fir`, `last`는 일반적인 data property이다.
        
        accssor property는 자체적으로 값(property attribute **value**)을 가지지 않으며 data property의 값을 읽거나 저장할 때 관여할 뿐이다.
        
        접근자 property의 값은 getter (get) 함수를 호출하여 그 결과값을 반환한다. 
        
        접근자 property와 data property를 구별하는 방법은 다음과 같다.
        
        ```jsx
        console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
        {
          get: [Function: get __proto__],
          set: [Function: set __proto__],
          enumerable: false,
          configurable: true
        }
        
        (console.log(Object.getOwnPropertyDescriptor(function() {}, 'prototype')));
        
        { value: {}, writable: true, enumerable: false, configurable: false }
        ```