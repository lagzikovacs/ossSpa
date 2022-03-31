import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appSpinner]'
})
export class SpinnerDirective {
  randomid = '';

  @Input() set appSpinner(value) {
    if (value) {
      document.getElementById(this.randomid).style.display = 'block';
    } else {
      document.getElementById(this.randomid).style.display = 'none';
    }
  }

  constructor(private elementRef: ElementRef) {
    this.randomid = Math.floor((Math.random() * 1000000) + 1).toString();

    elementRef.nativeElement.innerHTML =
      `<div id="${this.randomid}" class="loading" style="display: none"><div class="loader"></div></div>`;
  }
}
