// * Generic
//TypeScript Generics is a tool which provides a way to create reusable components

// Without gernerics we have to identify functions with specific type:
function identity(arg: number): number {
  return arg;
}
// Or we could use any, which is also basically generic, but this is bad practice

function identityAny(arg: any): any {
  return arg;
}

// Instread we need a way of capturing the type of the argument

function identityGeneric<Type>(arg: Type): Type {
  return arg;
}

//now we can use the function as follows;
const output = identityGeneric<string>("bibo"); // return bibo
const outputNumber = identityGeneric<number>(1); // return 1
// so <Type> where replaced to string and number

// *OR we can use multiple Generic types

function functionMultiGereric<TArg, TReturnable>(arg: TArg): TReturnable {
  return Number(arg) as TReturnable;
}

//Generic classes
class GenericNumber<NumType> {
  zeroValue: NumType | null = null;
  add?: (x: NumType, y: NumType) => NumType;
}

// Type Parameters in Generic Constraints
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");

// Or <Data> is generic
type ApiResponse<Data = { status: number }> = {
  // Data = {status:number} is default generic value
  data: Data;
  isError: boolean;
};

const response: ApiResponse<{ name: string }> = {
  data: {
    name: "Bibo",
  },
  isError: false,
};

//*  Generic type constraints:

type ApiResponse2<Data extends object> = {
  data: Data;
  isError: boolean;
};

// so if we try we will get an error that string does not satisfy object
//@ts-ignore
const resp: ApiResponse2<string> = {
  isError: false,
  data: "data",
};
