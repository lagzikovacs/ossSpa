import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Szempont} from '../../enums/szempont';
import {SzMT} from '../../dtos/szmt';
import {ProjektService} from '../../projekt/projekt.service';
import {ProjektDto} from '../../projekt/projektdto';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {environment} from '../../../environments/environment';
import {ProjektParameter} from '../../projekt/projektparameter';

@Component({
  selector: 'app-ajanlatkeres-projekt',
  templateUrl: './ajanlatkeres-projekt.component.html'
})
export class AjanlatkeresProjektComponent implements OnInit, OnDestroy {
  @Input() Email = '';

  pp = new ProjektParameter(0, environment.lapmeret);
  ProjektDto = new Array<ProjektDto>();

  projektservice: ProjektService;
  spinnerservice: SpinnerService;

  constructor(private _errorservice: ErrorService,
              spinnerservice: SpinnerService,
              projektservice: ProjektService) {
    this.projektservice = projektservice;
    this.spinnerservice = spinnerservice;
  }

  ngOnInit() {
    this.ProjektDto = new Array<ProjektDto>();

    this.pp.fi = new Array<SzMT>();
    this.pp.fi.push(
      new SzMT(Szempont.UgyfelEmail, this.Email));

    this.spinnerservice.eppFrissit = true;
    this.projektservice.Select(this.pp)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.ProjektDto = res.Result;
        this.spinnerservice.eppFrissit = false;
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
