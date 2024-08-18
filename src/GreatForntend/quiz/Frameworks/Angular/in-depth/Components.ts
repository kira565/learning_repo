// @ts-nocheck

//? Basic of components i declared inside General.ts

//todo Accepting data with input properties

// When creating a component, we can mark specific class properties as binable by
// adding @Input() decorator on the property

@Component()
export class CustomSlider {
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
} from "@angular/core";
@Component()
export class CustomSlider {
  @Input({ transform: booleanAttribute }) disabled = false; // imitates standart HTML boolean attrs
  @Input({ transform: numberAttribute }) number = 0; // attempts to parse a number
}

// todo CustomEvents with outputs:

// Angular components can define custom events by assigning a property to a new Event Emitter and adding @Output() decorator
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

//? view vs content explaination:
//? view - elements/components/directives defined within the template

//? content - elements/directives projected into the component from its parent component
//? (inside <ng-content>)

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
//* inspectingchanges:
// ngOnChange accepts one SimpleChanges argument. This object s a record mapping each component
// input name to a SingleChange object. Each SimpleChange contains the inputs prev value,
// current value and a flag for wetther this is the first time input has changed

//? ngOnDestroy
// method runs once just before component is destroyed. Angular destroys a component
// when it is no longer shown on the page. eg hidden by ngif
//? destroyRef:
// alternative we can inject instance of DestroyRef and register callback upon calling
// onDestroy method. We can pass DestroyRef instance to functions or classes outside
// component. Use this patter if you gave other code that should run some cleanup

//? ngDoCheck
// this method runs bedore every time angular checks a componenent template for changes
// can be used for manually check state of component.
//! But its called very frequently, try to avoid

//? ngAfterViewInit
// method runs after all the children in template(its view) have been initialized
// can use it to read the resul of view queries. (ViewChild)
//! note that attempting to change any state in this method result an
//! ExpressionChangedAfterViewInitError

//? ngAfterContentInit
// method runs once after all childrent nested inside the component (its content)
//have been initialized
// can use it to read the resul of view queries. (ViewChild)
//! note that attempting to change any state in this method result an
//! ExpressionChangedAfterViewInitError

//? ngAfterViewChecked
// runsevery time the children in the component template (its view) has been checked for
// changes
//! runs very frequently try to avoid

//? ngAfterContentChecked
// runs every time children nested inside the component (content) have been checked for
// changes
//! runs very frequently try to avoid
//While you can access the updated state of view queries here (view child),
// attempting to change any state in this method results
//in an ExpressionChangedAfterItHasBeenCheckedError.
//! ExpressionChangedAfterViewInitError

//? afterRender and afterNextRender
// register render callback to be invoked after Angular finished rendering all components
// on the page into the DOM

//* note these functions are different from the others lifecycle functions. They are
// standalone functions that accept callback. The execution of renderer callbacks are not tied
// to any specific component instance

// after render and afterNextrender must be called inside a constructor.

// we can use render callbacks to perform manual DOM operations

//* LIFECYCLE EXECUTION Order
//During initialization : constructor -> ngOnChanges -> ngOnInit -> ngDoCheck -> afterContentInit/Checked + afterViewInit/Checked --> after render
//Subsequent updates: ngOnChanges->ngDoCheck  -> after ContentChecked, ngAfterViewChecked ---> after render

//todo REFERENCING COMPONENT CHILDREN WITH QUEERIES
// a component can define queries that find child elements and read values from their
// injectors

// most commonly use queries to retrive reference to child components, directives,
// DOM elements and more
//There are two categories of query: view queries and content queries.
// * View Queries:
@Component({
  selector: "custom-card-header",
})
export class CustomCardHeader {
  text: string;
}
@Component({
  selector: "custom-card",
  template: "<custom-card-header>Visit sunny California!</custom-card-header>",
})
export class CustomCard {
  @ViewChild(CustomCardHeader) header: CustomCardHeader;
  // view query values available in the ngAfterViewInit method, before this point
  // value is undefined
  ngAfterViewInit() {
    console.log(this.header.text); // we accessed state of child component
    //it can be undefined if component hidden and query not found a result
  }

  @ViewChildren(CustomCardAction) actions: QueryList<CustomCardAction>;
  // this method allows query for multiple results
}

//* Content queries:

// in this example CustomExpando component queries for a child CustomToggle
// and accesses the result in ng AfterConentInit
@Component({
  selector: "custom-toggle",
})
export class CustomToggle {
  text: string;
}
@Component({
  selector: "custom-expando",
})
export class CustomExpando {
  @ContentChild(CustomToggle) toggle: CustomToggle;
  ngAfterContentInit() {
    //same rules like for view
    console.log(this.toggle.text);
  }
}
@Component({
  selector: "user-profile",
  template: `
    <custom-expando>
      <custom-toggle>Show</custom-toggle>
    </custom-expando>
  `,
})
export class UserProfile {}

// * Query locators
// This first parameter for each query decorator is its locator.
// Most of the time we want to use a component or direcribe as your locator.

//You can alternatively specify a string locator corresponding
//to a template reference variable.
@Component({
  template: `
    <button #save>Save</button>
    <button #cancel>Cancel</button>
  `,
})
export class ActionBar {
  @ViewChild("save") saveButton: ElementRef<HTMLButtonElement>;
}

// * Content descendants
// By default content queries find only direct children of the component and not traverse
// to descendants. By setting {descendants: true}, we can traverse deeper in the
// same template //! but not other templates

//todo USING DOM API

// Components can inject ElementRef to get a reference to the components host element.

// nativeElement property references to the host Element(basic general html elem) instance

// we can use Angular afterRender and afterNextRendr functions to register a render
// callback that runs when Angular has finished rendering the page
@Component()
export class ProfilePhoto {
  constructor(elementRef: ElementRef) {
    afterRender(() => {
      // Focus the first input element in this component.
      elementRef.nativeElement.querySelector("input")?.focus();
    });
  }
}

//* Common use cases of DOM API:
// 1. Element focus
// 2. Measuring geometry such us getBoundingClientRect
// 3. Reading an elements text content
// 4. Setting up native observers such as MutationObserver

// todo Inheritance

// Like TS classes components in angular support inheritance

// Component can extend any base class:
export class ListboxBase {
  value: string;
}
@Component()
export class CustomListbox extends ListboxBase {
  // CustomListbox inherits the `value` property.
}

// Extending other components and directives:

// It inherits all the metadata defined in the base class decorator an the base class
// decorated members. This includes the selector, template, styles, host bindings, inputs,
// outputs, lifecycle methods, any other settings
// its overriding selector and template with its own value (типо темплейт и селектор
// оверрайдятся)
@Component({
  selector: "base-listbox",
  template: ` ... `,
  host: {
    "(keydown)": "handleKey($event)",
  },
})
export class ListboxBase {
  @Input() value: string;
  handleKey(event: KeyboardEvent) {
    /* ... */
  }
}
@Component({
  selector: "custom-listbox",
  template: ` ... `,
  host: {
    "(click)": "focusActiveOption()",
  },
})
export class CustomListbox extends ListboxBase {
  @Input() disabled = false;
  focusActiveOption() {
    /* ... */
  }
}

// Forwarding injected dependencies:

// If a base class relies on di , the child class must explicity pass these
// dependencies to super:
@Component()
export class ListboxBase {
  constructor(private element: ElementRef) {}
}
@Component()
export class CustomListbox extends ListboxBase {
  constructor(element: ElementRef) {
    super(element);
  }
}

// Overriding lifecycle methods
// If base classs defines a lifecycle method a child class that also implements
// this method overrodes the base class implementation. If we want to preserve the base class
// method we need to call the method with super:

@Component()
export class ListboxBase {
  protected isInitialized = false;
  ngOnInit() {
    this.isInitialized = true;
  }
}
@Component()
export class CustomListbox extends ListboxBase {
  override ngOnInit() {
    super.ngOnInit();
    /* ... */
  }
}

//todo programmaticaly rendering components

// In addition to using a component directly in a template we can also dynamically
// render components. There are two main ways:
// 1.NgComponentOutlet
// 2.ViewContainerRef

// * Using NgComponentOutlet:

@Component()
export class AdminBio {
  /* ... */
}
@Component()
export class StandardBio {
  /* ... */
}
@Component({
  template: `
    <p>Profile for {{ user.name }}</p>
    <ng-container *ngComponentOutlet="getBioComponent()" />
  `,
})
export class CustomDialog {
  @Input() user: User;
  getBioComponent() {
    return this.user.isAdmin ? AdminBio : StandardBio;
  }
}

// 2. using ViewContainerRef
//private viewContainer: ViewContainerRef
// this.viewContainer.createComponent(LeafContent);

// * Lazy loading components:
//we can use both practices for lazy loading components;
@Component({
  template: `
    <section>
      <ng-container *ngComponentOutlet="advancedSettings" />
    </section>
  `,
})
export class AdminSettings {
  advancedSettings: { new (): AdminSettings } | undefined;
  async loadAdvanced() {
    this.advancedSettings = await import("path/to/advanced_settings.js");
  }
}

//todo ADVANCED CONFIGURATION:

// * 1. ChangeDetectionStrategy:

// The component decorator accepts a changeDetection option that controls the component
// change detection mode. There are two change detection mode options:
// 1. ChangeDetectionStrategy.Default - it is default strategy. In this mode, Angular
// checks whether(нуждается ли) the component DOM needs an update, whenever any
// activity may have occured application wide(каждый раз когда какая либо активность
// происходит во всем приложении). Activities that trigger this checking:
// user iteraction, network response, timers, and more.

// 2. ChangeDetectionStrategy.OnPush - is an optional mode, that reduces the amount of
// checking Angular needs to perform. In this mode, the framework only checks if a
// components DOM needs an update when:
// 1. Component input has changes as result of binding template
// 2. An event listener in this component runs
// 3. THe cimponent is explicity marked for check, via ChangeDeterotRef.markForCheck
// or something which wraps it, like AsyncPipe

// Additionaly, when OnPush component is checked, Angular also checks all of its ancestor
// (предков) components traversing upwards through the application tree.

// * PreserveWhitespace

// By default Angular removes and collapses superflous whitespaces(лишние пробелы)
// in templates. It can be turned off by preserveWhitespace: false
