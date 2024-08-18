//@ts-nocheck
// todo Understanding pipes

// Pipes are siple functions to use in templates
// to accept an input value and return a transformed value.  THey are reusable

// Can create custom pipes
//Builtin: datePipe, upperCasePipe,
//! AsyncPipe - subscribe/unsubscribe to an async source such as an observable

// custom pipe example
import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "greet",
  standalone: true,
})
export class GreetPipe implements PipeTransform {
  transform(value: string, param1: boolean, param2: boolean): string {
    return `Hello ${value}`;
  }
}

// to apply a pipe To apply a pipe, use the pipe operator (|) within a template expression as shown in the following code example.
