//@ts-nocheck
//* Built-in directives

// Directives are classes that add additional behaviour to elements in angular application.

//* Types of Angular directives:
// 1. Components - Used with a template. Most common directive type
// 2. Attribute directives - Change the apperance or behaviour of an element, component, or
// another diretive
// 3. Structural directives - Change the DOM layout by adding and removing DOM Elements

//todo Built-in attribute directives
// NgClass, NgStyle, NgModel

//* NgClass Directive
//import
import { NgClass } from "@angular/common";
@Component({
  standalone: true,
  imports: [NgClass], // <-- import into the component
})
export class AppComponent implements OnInit {
  setCurrentClasses() {
    // CSS classes: added/removed per current state of component properties
    this.currentClasses = {
      saveable: this.canSave,
      modified: !this.isUnchanged,
      special: this.isSpecial,
    };
  }
}
//using
//<!-- toggle the "special" class on/off with a property -->
//<div [ngClass]="isSpecial ? 'special' : ''">This div is special</div>
// can be used with a method:
//<div [ngClass]="currentClasses">This div is initially saveable, unchanged, and special.</div>

//* NgStyle directive;

import { NgStyle } from "@angular/common";
@Component({
  standalone: true,
  imports: [NgStyle], // <-- import into the component
})
export class AppComponent implements OnInit {
  setCurrentClasses() {
    // CSS classes: added/removed per current state of component properties
    this.currentClasses = {
      saveable: this.canSave,
      modified: !this.isUnchanged,
      special: this.isSpecial,
    };
  }
}
//usage
// <div [ngStyle]="currentStyles">
//   This div is initially italic, normal weight, and extra large (24px).
// </div>

//* NgModel
// Use NgModel derective to display a data property and update that property when make changes
import { FormsModule } from "@angular/forms";
@Component({
  standalone: true,
  imports: [FormsModule], // <-- import into the component
})
export class AppComponent implements OnInit {
  trackByItems(index: number, item: any): number {
    return item.id;
  }
}
// add [(ngModel)] binding on an HTML:
// <label for="example-ngModel">[(ngModel)]:</label>
// <input [(ngModel)]="currentItem.name" id="example-ngModel">

// it can be customized by separating two-way binding:
// <input [ngModel]="currentItem.name" (ngModelChange)="setUppercaseName($event)" id="example-uppercase">

//! NgModel directive works for an element supported by a ControlValueAccessor. Angular provide value accessors
//! for all basic HTML form elements.

// todo Built-in structural directives:
// NgIf (conditional rendering) NgFor(listing items) NgSwitch(switch case rendering)

//* NgFor
// /*ngFor="let item of items; let i=index; trackBy: trackByItems"

//* TrackBy -
// reduce the number of backend API calls by tracking changes to an item list. Angular can change and
// rerenderonly those items that have changed rather than reloading the entire list of items

// With no `trackBy`, complete DOM element replacement.
// With `trackBy`, only changing the `id` triggers element replacement.

//* directive without DOM element:
// we can use <ng-container *ngIf=value> ng-container has similar behaviour to react.fragment

//todo BUILDING AN ATTRIBUTE DIRECTIVE
// to create directive we can use CLI $ ng generate directive highlight
// will be created directive and a test file
import { Directive, ElementRef, HostListener, Input } from "@angular/core";
@Directive({
  standalone: true,
  selector: "[appHighlight]",
})
export class HighlightDirective {
  @Input() appHighlight = "";

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = "yellow";
  }

  @HostListener("mouseenter") onMouseEnter() {
    this.highlight("yellow");
  }
  @HostListener("mouseleave") onMouseLeave() {
    this.highlight("");
  }
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}

// @Directive decorator specifies the directive css attribute selector [appHighlight]
// 2. import elementRef and inject it, to recieve access to the host DOM element through nativeProperty
// 3. add logic that sets the background to yellow
// use <p appHighlight>This is invalid</p>

//* Handling user events
// 1. Import HOST listener
// 2. add two event handlers hat respond when the mouse enter and leaves
// 3. handle logic

//* passing values into an attribute directive
// import and implement Input() decorator with variable

// use directive with binded value
// <p [appHighlight]="color">Highlight me!</p>

// todo STRUCTURAL DIRECTIVES
// Applied to an <ng-template> element that conditionally ore repeatedly render the content of that ng-template

// exampled SelectDirective fetches data from a given data source and renders its template
// <ng-template select let-data [selectFrom]="source">
//   <p>The data is: {{ data }}</p>
// </ng-template>

// its not need to explicity use it in ng-select, possible:
// <p *select="let data from source">The data is: {{data}}</p>

//* Creating structural directive
// 1. using CLI $ ng generate directive select
// 2. Import TemplateRef, and ViewContainerRef. Inject TemplateRef and ViewContainerRef
// in the directive constructor as private variables.
// 3. add selectForm input
// 4. add business logic (ngOnInit ) to fetch data and render the template
import { Directive, TemplateRef, ViewContainerRef } from "@angular/core";
@Directive({
  standalone: true,
  selector: "[select]",
})
export class SelectDirective {
  @Input({ required: true }) selectFrom!: DataSource;

  constructor(
    private templateRef: TemplateRef,
    private ViewContainerRef: ViewContainerRef
  ) {}

  async ngOnInit() {
    const data = await this.selectFrom.load();
    this.viewContainerRef.createEmbeddedView(this.templateRef, {
      // Create the embedded view with a context object that contains
      // the data via the key `$implicit`.
      $implicit: data,
    });
  }
}
//That's it - SelectDirective is up and running. A follow-up step might be to add template type-checking support.

// todo Directives Composition API

// Angular directives - great way to encapsulate reusable behaviours - directives can apply attributes, css classes
// and event listeners to an element

// here we apply MenuBehavior to the host element of Admin Menu
// Directives used in hostDirectives must be standalone: true.

@Component({
  standalone: true,
  selector: "admin-menu",
  template: "admin-menu.html",
  hostDirectives: [MenuBehavior],
})
export class AdminMenu {}
