import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-fooldal',
  templateUrl: './fooldal.component.html',
  styleUrls: ['./fooldal.component.css']
})
export class FooldalComponent implements OnInit, OnDestroy {
  @ViewChild('hatterkep', {static: true}) hatterkep: ElementRef;

  dwith = 0;
  dheight = 0;

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
    this.dwith = this.hatterkep.nativeElement.width;
    this.dheight = this.hatterkep.nativeElement.height;

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
