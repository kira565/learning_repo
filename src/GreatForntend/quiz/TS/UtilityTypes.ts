//* TS provides several UtilityTypes to faciliate common type
//* transformations. These utilities are available globally

//? Awaited
// This type is for operations like awain in async ot then on Promises

type A = Awaited<Promise<string>>; // string
type B = Awaited<Promise<Promise<number>>>; // number
type C = Awaited<boolean | Promise<number>>; // number | boolean

//? Partial<Type>
// Construct a type where all properties of Type set to optional

interface Todo {
  title: string;
  description: string;
}

const todo1: Partial<Todo> = {}; // allowed all undefined

//? Required<Type>
// all properties of Type are set to required (vice versa Partial)

//? Readonly<Type>
// construct a type with all properties of type set to readonly
const readonly: Readonly<Todo> = { title: "da", description: "a" };
//@ts-ignore
readonly.title = "aa";
//! Error: cannot assign to title because it is a readonly

//? Record<Keys, Type>
// construct a type with keys of type Keys and values of types Type
type CatName = "miffy" | "boris" | "mordred";
interface CatInfo {
  age: number;
  breed: string;
}
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};

//? Pick<Type, keys>
// construct a type from selected properties of type Type
//type TodoPreview = Pick<Todo, "title" | "completed">;

//? Omit<Type, Keys>
// Construct a type by picking all properties from Type and Removing Keys
//type TodoPreview = Omit<Todo, "description">;

//? Exclude<UnionType, ExcludeMembers>
//Constructs a type by excluding from UnionType all union members that are assignable
// to ExcludedMembers.
type T0 = Exclude<"a" | "b" | "c", "a">;
// T0 = "b" | "c"
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };
type T3 = Exclude<Shape, { kind: "circle" }>;
// T3 square, triangle

//? Extract<Type, Union>
// Constructs a type by extracting from Type all union members that are assignable to Union
type T1 = Extract<"a" | "b" | "c", "a" | "f">; // T0 = "a"

//? NonNullable<Type>
// Constructs a type by excluding null and undefined from Type
type T2 = NonNullable<string | number | undefined>; // T2 = string | number

//? Parameters<Type>
// Constructs a tuple(кортеж) from the types used in the parameters of a function type Type.
type T4 = Parameters<() => string>; // []

type T5 = Parameters<(s: string) => void>; // [s: string]

//? ConstructorParameters<Type>
// construct a tuple or array type from the types of a constructor
type T6 = ConstructorParameters<ErrorConstructor>;
//[message?: string | undefined, options?: ErrorOptions | undefined]

//? ReturnType
// Construct a type consisting of the return type of function type
type T7 = ReturnType<() => string>; // string

//? InstanceType<Type>
//Constructs a type consisting of the instance type of a constructor function type

class Class {
  x = 0;
  y = 0;
}

type T8 = InstanceType<typeof Class>; // Class

// ? ThisType<Type>
// This utility doesnt return a transformed type, Instead, it serves as a marker
// for a contextual this type. Note that the noImplicitThis flag must be enabled to
// use the utility

type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};
function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}
let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});
