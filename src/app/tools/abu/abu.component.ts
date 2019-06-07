import {Component, Input, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-abu',
  templateUrl: './abu.component.html'
})
export class AbuComponent implements OnDestroy {
  msg: string;
  latszik = false;
  szamlalo: any;

  Uzenet(msg: string) {
    this.msg = msg;
    this.latszik = true;
    if (this.szamlalo !== null) {
      clearInterval(this.szamlalo);
    }
    this.szamlalo = setInterval(() => { this.next(); }, 1200);
  }

  next() {
    clearInterval(this.szamlalo);
    this.latszik = false;
  }

  ngOnDestroy() {
    clearInterval(this.szamlalo);

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
