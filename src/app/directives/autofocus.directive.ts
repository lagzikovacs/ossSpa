import {AfterContentInit, AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterContentInit {

  constructor(private elementRef: ElementRef) {
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    }, 500);
  }
}
