import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appHscroll]'
})
export class HscrollDirective {
  private _tabladiv: any;
  private _oldX = 0;

  constructor(private elementRef: ElementRef) {
    this._tabladiv = elementRef.nativeElement;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(mm) {
    if (mm.ctrlKey) {
      if (mm.clientX > this._oldX) {
        this._tabladiv.scrollLeft += 25;
      } else {
        this._tabladiv.scrollLeft -= 25;
      }
    }

    this._oldX = mm.clientX;
  }
}
