// The Infer keyword; A Primer;

// infer keyword is used within conditional types to create temporary type variables
//  These type variables can then be used to infer types within  a true or false
// branch of a conditional type (Эти переменные созданные инфер моэно затем использовать
//  дял вывода типов внутри истинной или ложной ветви условного типа)

// The infer keyword allows TS to determine a specific type based on the context in
// which its used.

// * To better understand how it works lets take a look at the basic syntax of
// * a conditional type

type TrueType = {};
type FalseType = {};
type SomeType = {
  name: string;
};

type MyConditionalType<T> = T extends SomeType ? TrueType : FalseType;

// In this example , T is a generic type param. And SomeType represents a type that T
// is being compared to. if T extends SomeType, the type of MyConditionalType<T>
// will be TrueType, if not - FalseType

const objTruly: MyConditionalType<{ name: string }> = {}; // obj: TrueType

const objFalsy: MyConditionalType<{ age: number }> = {}; // obj: FalseType

// Now lets introduce infer keyword into the mix:
type SomeType2<U> = {};
type MyInferredType<T> = T extends SomeType2<infer U> ? U : FalseType;

// we use infer to create temorary type variable U within the true branch of the
// conditional type. If T extends SomeType, TS will try to infer type of U based
// on the type of T

//* Examples
// 1 Return type

// ReturnType is utility type that extract the return type of fucntion. Its a perfect
// example of how the infer keyword can be used to create dynamic types. Heres the
// definition of ReturnType:

type ReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any;

// In this definition, T is a function type that takes any number of args
// and returns any type. Unsing the infer keyword, we create a temproary type
// variable R to represent the return type of the function. If T is a function,
// TS infers the return type and assigns it to R

// Lets see ReturnType in Action:

function greet(name: string): string {
  return `Hello, ${name}`;
}

type GreetReturnType = ReturnType<typeof greet>; //GreetReturnType inferred as string
