//? Basic of components i declared inside General.ts

//todo Accepting data with input properties

// When creating a component, we can mark specific class properties as binable by
// adding @Input() decorator on the property

//@ts-ignore
@Component()
//@ts-ignore
export class CustomSlider {
  //@ts-ignore
  @Input() value = 0;
}
// It let us bind the property in a template
// <custom-slider [value]="50" />

//* Customizing inputs

// 1. Required Inputs: @Input({ reauired: true })

// 2. Input transforms: @Input({ transform: trimString }) label = ""
function trimString(value: string | undefined) {
  return value?.trim() ?? "";
}

//3. Type checking (setting type to transform function)
//  @Input({transform: appendPx}) widthPx: string = '';
function appendPx(value: number) {
  // specified type is number
  return `${value}px`;
}

//? there are few built-in transform functions:
import {
  Component,
  Input,
  booleanAttribute,
  numberAttribute,
  //@ts-ignore
} from "@angular/core";
//@ts-ignore
@Component()
//@ts-ignore
export class CustomSlider {
  @Input({ transform: booleanAttribute }) disabled = false; // imitates standart HTML boolean attrs
  @Input({ transform: numberAttribute }) number = 0; // attempts to parse a number
}

// todo CustomEvents with outputs:

// Angular components can define custom events by assigning a property to a new Event Emitter and adding @Output() decorator
//@ts-ignore
@Component()
export class ExpandablePanel {
  // @ts-ignore
  @Output() panelClosed = new EventEmitter<void>();

  close() {
    this.panelClosed.emit();
  }
}
// Angular refers to properties marked with the @Output decorator as outputs.
// You can use outputs to pass data to other components, similar to native browser events like click.

// <expandable-panel (panelClosed)="savePanelState()" />

// * Emitting event data
//@ts-ignore
@Component()
export class ExpandablePanel2 {
  // @ts-ignore
  @Output() panelClosed = new EventEmitter<void>();

  emit() {
    // You can emit primitive values.
    this.panelClosed.emit(7);
    // You can emit custom event objects
    this.panelClosed.emit({
      pointerX: 123,
      pointerY: 456,
    });
  }
}
//When defining an event listener in a template, you can access the event data from the $event variable:
//<custom-slider (valueChanged)="logValue($event)" />

//todo Contenct Projection(проекция контента) with ng-content

// Sometimes we need to use components as containers for different types of content (Similar like react children prop)
@Component({
  selector: "custom-card",
  template: '<div class="card-shadow"> <ng-content></ng-content> </div>',
})
export class CustomCard {
  /* ... */
}
//When we use a component with <ng-content>, any children of the component host element are rendered,
//or projected, at the location of that <ng-content>:
// <!-- Using the component -->
// <custom-card>
//   <p>This is the projected content</p>
// </custom-card>

//note, that the <ng-content> element is neither a component nor DOM element (это не компонент и не дом элемент)

// * Multiple content placeholders
// <!-- Component template -->
// <div class="card-shadow">
//   <ng-content select="card-title"></ng-content>
//   <div class="card-divider"></div>
//   <ng-content select="card-body"></ng-content>
// </div>

// <!-- Using the component -->
// <custom-card>
//   <card-title>Hello</card-title>
//   <card-body>Welcome to the example</card-body>
// </custom-card>

//todo COMPONENT LIFECYCLE
// A component lifecycle is the sequance of steps that happen between the components creation and its destruction. Each step represents a
// different part of Angulars process of rendering and checking them for updates over time.

// In component we can implement lifecycle hooks to run code during these steps. Lifecycle hooks that relate to a specific component instance
// are implemented as methods inside component class. Such functions are implemented as functions that accept callback

// For understanding this lifecycle we need only knwow that angular walks through application from top to bottom, checking templates bindings
// for changes. Lifecycle hooks run when angular doing traversal of component tree.

//* Indepth under  the hood angular staff: Angular uses Incremental DOM, the key idea is behind this:
// Every component compliles into a series of instructions. These instructions create DOM trees and update them in place when data changes
// The set of generated instructioins inst rendered by rendering engine of the framework. The instructions are the rendering engine.

// The two main advantages of the incremental dome are:
// 1. The incremental DOM is tree-shakable (removing dead/unreachable code)
// 2. The incremental DOM has a low memory footprint (требует мало памяти)

// As result, the incremental DOM performs really well on mobile devices and this was actually main focus of google team

// Because the incremental DOM doesnt interpret components, but the set of instructions (не интерпритирует компоненты а только инструкции(классы))
// it can trmove all unused instructions at compile time.

// * Summary
// * Creation Phase
// 1. Constructor -  standart js class constructor functions. Runs when angular instantiates the component.(запускается когда ангуляр создает экземляр компонента)

// * Change Detection Phase
// 1. ngOnInit - Runs once after Angular has initialized all the components inputs
// 2. ngOnChanges - Runs every ti,e the component inputs changed
// 3. ngDoCheck - Runs every time this component is checked for changes
// 4. ngAfterViewInit - Runs once after the component view has been initialized
// 5. ngAfterContentInit - Runs once after the component content has been initialized
// 6. ngAfterViewChecked - Runs every time the components view has been checked for changes
// 7. ngAfterContentChecked - Runs every time this component content has been checked for changes
// * Rendering phase
// 1. afterNextRender - Runs once the next time that ALL components have been rendered to the DOM
// 2. afterRender - Runs every time ALL components have been rendered to the DOM
// * Destruction
// 1. ngOnDestroy - Runs once before the component is destroyed

// * Methods descriptions

//? ngOnInit
// runs after all component inputs are initialized. This step is before component template is initialized. This means we can update the
// component state based on its initial input values

//? ngOnChanges
// runs after component inputs have changed
// this step happens before the component template is checked, so we can update the component state based on initial values

// during the initialization first ngOnChanges runs before ngOnInit
//*inspectingchanges:
// ngOnChange accepts one SimpleChanges argument. This object s a record mapping each component input name to a SingleChange object
