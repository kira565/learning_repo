// * What is Angular ? (WE USE ANGULAR 17, this is for v18)

// Angular is a web framework, gives a solid platform, prodiding many out of the box tools, APIs and libraries to write complex SPAs.
// Angular 2 provides TypeScript support out of the box

//? Essentials:

//Todo: COMPONENTS
// 1. Component-based
// Components repesent structure of all application, these are easy-to understand parts of the application. It makes application well-scalable.

// Defining components:

// Every component has a core properties:
// 1. @Component Decoreator that contains some configuration (https://www.typescriptlang.org/docs/handbook/decorators.html)
// 2. An HTML template that controls what renders into the DOM;
// 3. a CSS selector that defines how component is used in html
// 4. A TypeScript class with behaviours such as managing state, handling user input, or fetching data from a server

// 5. standalone: true - The recommended approach. (Angular classes marked as standalone do not need to be declared in an NgModule)
// 6. styles - a string or array of strings that contains any CSS styles.
// todo-list-item.component.ts
//@ts-ignore
@Component({
  standalone: true,
  selector: "todo-list-item",
  template: ` <li>(TODO) Read Angular Essentials Guide</li> `,
  styles: `
    li {
      color: red;
      font-weight: 300;
    }
  `,
  //separating html and css files:
  templateUrl: "./todo-list-item.component.html",
  styleUrl: "./todo-list-item.component.css",
  // Importing another components:
  //@ts-ignore
  imports: [TodoListItem],
})
export class TodoListItem {
  /* Component behavior is defined in here */
}
// Using a component:
// 1 Import required component to a file , Add component to the imports array, use component selector n the template. <todo-list></todo-list>

//Todo Rendering dynamic data, using Dynamic Properties:
//@ts-ignore
@Component({
  selector: "todo-list-item",
  template: `
    // here is dynamic data rendered
    <p>Title: {{ taskTitle }}</p>
    //here is dynamic property [disabled] used
    <button [disabled]="formIsInvalid"></button>
    // here is dynamic attribute [data-test-id] used
    <button [data-test-id]="testId"></button>
    used
  `,
})
export class TodoListItem3 {
  testId = 1212;
  formIsInvalid = true;
  taskTitle = "Read cup of coffee";
  isComplete = false;

  completeTask() {
    // managing dynamic data
    this.isComplete = true;
  }
  updateTitle(newTitle: string) {
    this.taskTitle = newTitle;
  }
}

// todo CONDITIONAL AND LOOPS

// in v18 there is new syntax for loops and conditions @if, @else, @for, etc
// for previous verion we had use *ngFor, *ngIf, *ngSwitchCase
// user-controls.component.ts,
//@ts-ignore
@Component({
  standalone: true,
  selector: "user-controls",
  template: `
    @if (isAdmin) {
    <button>Erase database</button>
    } @else {
    <p>You are not authorized.</p>
    }

    <ul>
      @for (ingredient of ingredientList; track ingredient.name) { //! track
      property
      <li>{{ ingredient.quantity }} - {{ ingredient.name }}</li>
      }
    </ul>
  `,
})
export class UserControls {
  isAdmin = true;
}

// * track property - similar to react key, when angular renders a list, items inside could change or move, Angular needs to track each element
// * through any reordering, (ангуляру нужно отслеживать элементы при каждом перемещении) it needs to optimize rendering and not rerender
// * half of the list when element in the middle has been moved

//todo Handling user interactions

// we can add an event handler to an element by:
// Adding an atribute with the event name inside parentheses (внутри скобок)
// specify what js statement we need to run
//@ts-ignore
@Component({
  standalone: true,
  selector: "text-transformer",
  template: `
    <p>{{ announcement }}</p>
    <button (click)="transformText()">Abracadabra!</button>

    // ? If its need to access event object, we need to pass $event
    <button (click)="transformText($event)">Abracadabra!</button>
  `,
})
export class TextTransformer {
  announcement = "Hello again Angular!";
  transformText() {
    this.announcement = this.announcement.toUpperCase();
  }
}

//todo Sharing the Logic (SERVICES)
// when we need to share logic, Angular leverages the dependency injection pattern.
// DI - injection of reusable parts of functionality declared inside services, like HTTP service to make backend calls.
// these parts can be injected to other parts of an application that require them.

// So, Services are reusable pieces of code that can be injected

// Similar to defining a component, services are comprised of the following.

//1. A TS decorator that declares the class as angular service @injectable()
//2. A TS class that defines the desired code that will be acessible when the service is injected
//@ts-ignore
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
//@ts-ignore
export class CalculatorService {
  add(x: number, y: number) {
    return x + y;
  }
}

//* usage:
//1. import a service
//2. declare a class field where the service is injected.
//@ts-ignore
import { Component, inject } from "@angular/core";
//@ts-ignore
import { CalculatorService } from "./calculator.service";
@Component({
  selector: "app-receipt",
  template: `<h1>The total is {{ totalCost }}</h1>`,
})
export class Receipt {
  private calculatorService = inject(CalculatorService);
  totalCost = this.calculatorService.add(50, 25);
}
