import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appSpinner]'
})
export class SpinnerDirective {
  private _alapkeretdiv: any;
  private _loadingdiv: any;

  @Input() set appSpinner(value) {
    if (value) {
      document.getElementById('loadingdiv').style.display = 'block';
    } else {
      document.getElementById('loadingdiv').style.display = 'none';
    }
  }

  constructor(private elementRef: ElementRef) {
    this._alapkeretdiv = elementRef.nativeElement;

    this._alapkeretdiv.innerHTML = '<div id="loadingdiv" class="loading" style="display: none"><div class="loader"></div></div>';
    this._loadingdiv = document.getElementById('loadingdiv');
  }
}
