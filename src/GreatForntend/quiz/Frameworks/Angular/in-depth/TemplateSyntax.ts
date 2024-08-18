//@ts-nocheck
//todo Template Syntax in short words(easy principles)

// text interpolation: <div> {{ variableText }} </div>
// template statements (click)="deleteHero()"

// One-way bindinf [disabled]="isDisabled"
// property binding allows set values for properties of HTML

// Two-way binding [(size)]="fontSizePx"
// two-way binding gives components a way to share dats
// it is used for listening events and update values simultaneously between parent and child
// components

// two-way binding combines property-binding with event binding
// @input() size @Output sizeChange - two-way binding pattern
export class SizerComponent {
  @Input() size!: number | string;
  @Output() sizeChange = new EventEmitter<number>();
  dec() {
    this.resize(-1);
  }
  inc() {
    this.resize(+1);
  }
  resize(delta: number) {
    this.size = Math.min(40, Math.max(8, +this.size + delta));
    this.sizeChange.emit(this.size);
  }
}
// <div>
//   <button type="button" (click)="dec()" title="smaller">-</button>
//   <button type="button" (click)="inc()" title="bigger">+</button>
//   <span [style.font-size.px]="size">FontSize: {{size}}px</span>
// </div>

// App.component:
// fontSizePx = 16 // initial

// so we change fontSize and its updating both in child and in parent

//<app-sizer [(size)]="fontSizePx"></app-sizer>

//todo TEMPLATE VARIABLES

// Template variables help use data from one part of a template in another part of template.
// Use template variables to perform tasks such as respond to user input or finely tune
// your applciation forms

//* Syntax
//<input #phone placeholder="phone number" />

// ... some other code

// <button type="button" (click)="callPhone(phone.value)">Call</button>

// # used to declare template variable. #phone declares phone variable with the input
// element as its value

// * How angular assign values to template vars:

// 1. If we declare the variable on a component, the variable refers to the component inst
// 2. If standart HTML tag, to the Element

//* Using NgForm with template vars
// <form #itemForm="ngForm" (ngSubmit)="onSubmit(itemForm)">
//   <label for="name">Name</label>
//   <input type="text" id="name" class="form-control" name="name" ngModel required />
//   <button type="submit">Submit</button>
// </form>
// <div [hidden]="!itemForm.form.valid">
//   <p>{{ submitMessage }}</p>
// </div>
