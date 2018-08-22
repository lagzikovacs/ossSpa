import {Component, Input, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

declare let $: any;

@Component({
  selector: 'app-errormodal',
  templateUrl: './errormodal.component.html',
  styleUrls: ['./errormodal.component.css']
})
export class ErrormodalComponent {
  // egyedi azonosításhoz, h a jquery ezt a példányt találja meg
  idrandom = Math.floor((Math.random() * 1000000) + 1).toString();

  constructor(private _router: Router) { }

  @Input() cim: string;
  hiba: any;

  show(hiba: any) {
    this.hiba = hiba;

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
}
