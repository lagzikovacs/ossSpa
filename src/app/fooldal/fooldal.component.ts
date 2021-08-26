import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-fooldal',
  templateUrl: './fooldal.component.html'
})
export class FooldalComponent implements OnInit, OnDestroy {
  @ViewChild('hatterkep', {static: true}) hatterkep: ElementRef;

  ngOnInit() {
    this.resize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.stopPropagation();
    event.preventDefault();

    this.resize();
  }

  resize() {
    if (window.innerWidth > window.innerHeight) {
      this.hatterkep.nativeElement.width = window.innerWidth;
      this.hatterkep.nativeElement.height = window.innerHeight;
    } else {
      this.hatterkep.nativeElement.width = 0;
      this.hatterkep.nativeElement.height = 0;
    }
  }

  ngOnDestroy(): void {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
