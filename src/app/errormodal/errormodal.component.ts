import {Component, Input, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

declare let $: any;

@Component({
  selector: 'app-errormodal',
  templateUrl: './errormodal.component.html',
  styleUrls: ['./errormodal.component.css']
})
export class ErrormodalComponent implements OnDestroy {
  // egyedi azonosításhoz, h a jquery ezt a példányt találja meg
  idrandom = Math.floor((Math.random() * 1000000) + 1).toString();

  constructor(private _router: Router) { }

  @Input() cim: string;
  hiba: any;
  ahibastring = true;

  show(hiba: any) {
    this.hiba = hiba;
    this.ahibastring = typeof(hiba) === 'string';

    $('#' + this.idrandom).modal('show');
  }
  hide() {
    $('#' + this.idrandom).modal('hide');
  }
  halejart() {
    if (this.hiba === undefined) {
      this._router.navigate(['/bejelentkezes']);
      return;
    }
    if (this.hiba.indexOf('Ismeretlen Sid') !== -1) {
      this._router.navigate(['/bejelentkezes']);
    }
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
