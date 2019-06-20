import {Component, OnDestroy, OnInit} from '@angular/core';
import {UgyfelService} from '../ugyfel.service';
import {ProjektService} from '../../projekt/projekt.service';
import {ProjektDto} from '../../projekt/projektdto';
import {SzMT} from '../../dtos/szmt';
import {Szempont} from '../../enums/szempont';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-ugyfel-projekt',
  templateUrl: './ugyfel-projekt.component.html'
})
export class UgyfelProjektComponent implements OnInit, OnDestroy {
  ugyfelservice: UgyfelService;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _projektservice: ProjektService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              ugyfelservice: UgyfelService) {
    this.ugyfelservice = ugyfelservice;
  }

  ngOnInit() {
    this.ugyfelservice.ProjektDto = new Array<ProjektDto>();

    this.ugyfelservice.pp.fi = new Array<SzMT>();
    this.ugyfelservice.pp.fi.push(
      new SzMT(Szempont.UgyfelKod, this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex].Ugyfelkod.toString()));

    this._projektservice.Select(this.ugyfelservice.pp)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.ugyfelservice.ProjektDto = res.Result;

        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
