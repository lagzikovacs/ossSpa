import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UgyfelService} from '../ugyfel.service';
import {ProjektService} from '../../projekt/projekt.service';
import {ProjektDto} from '../../projekt/projektdto';
import {SzMT} from '../../dtos/szmt';
import {Szempont} from '../../enums/szempont';
import {ErrorService} from '../../tools/errorbox/error.service';
import {environment} from '../../../environments/environment';
import {ProjektParameter} from '../../projekt/projektparameter';

@Component({
  selector: 'app-ugyfel-projekt',
  templateUrl: './ugyfel-projekt.component.html'
})
export class UgyfelProjektComponent implements OnInit, OnDestroy {
  @Input() Ugyfelkod = -1;

  pp = new ProjektParameter(0, environment.lapmeret);
  ProjektDto: ProjektDto[] = new Array<ProjektDto>();

  eppFrissit = false;

  ugyfelservice: UgyfelService;

  constructor(private _projektservice: ProjektService,
              private _errorservice: ErrorService,
              ugyfelservice: UgyfelService) {
    this.ugyfelservice = ugyfelservice;
  }

  ngOnInit() {
    this.pp.fi = new Array<SzMT>();
    this.pp.fi.push(new SzMT(Szempont.UgyfelKod, this.Ugyfelkod.toString()));

    this._projektservice.Select(this.pp)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.ProjektDto = res.Result;

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
