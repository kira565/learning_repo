//* TS Support full support of the class keyword introduced in E

class Point {
  x = 0; // field declaration
}
const pt = new Point();
//@ts-ignore
pt.x = "a"; // Type 'string' is not assignable to type 'number'.

// * Class Parameter Properties

//? readonly -
// Fields must be prefixed with the readonly modifier to prevent assigment to
// the field outside the constructor

//? public
// can be accessed anywhere

//? protected
//protected members are only visible to subclasses of the class they are declared in

//? private
// private is like protected but doesnt allow access to the member even from subclasses

//? Static members
// Classes may have static mbmers. These members arent associated with a particular
// instance of the class. They can be accessed through the class constructor object
// itself
