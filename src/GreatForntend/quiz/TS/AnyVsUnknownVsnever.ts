//* Any Vs Unknown Vs Never

// 1. any - simplest type
// it disables any types checking of values we assign this type

function tommorow(date: Date) {}

let val: any = 1;

val++;
val.toUpperCase();
val.map(val);
val.foobar = 2;
// we can do whatever we want

// in general it is bad practice

//* 2 . unknown - is a set of all possible values
// when we want to disable type checking, just say that there can be all possible types
let val2: unknown = 1;

//? how to propertly use unknown ?

if (typeof val === "number") val++;

if (typeof val === "string") val.toUpperCase();

if (Array.isArray(val)) val.map(val[0]);

if (
  val &&
  typeof val === "object" &&
  "foobar" in val &&
  typeof val.foobar === "number"
) {
  val.foobar = 3;
}

if (val instanceof Date) tommorow(val);

//* 3. never - empty set (no possible values)

type A = number & string; //never, because we dont have such type intersection between
// number and string

//common use case
type User = "standart" | "admin";

function login(user: User) {
  switch (user) {
    case "standart":
      return true;
    case "admin":
      return true;
    default:
      const _unreachable: never = user; // when we add new user to union it will throw error
      throw "wrong user type";
  }
}
