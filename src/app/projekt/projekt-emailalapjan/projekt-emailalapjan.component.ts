import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Szempont} from '../../enums/szempont';
import {SzMT} from '../../dtos/szmt';
import {ProjektService} from '../projekt.service';
import {ProjektDto} from '../projektdto';
import {ErrorService} from '../../tools/errorbox/error.service';
import {environment} from '../../../environments/environment';
import {ProjektParameter} from '../projektparameter';

@Component({
  selector: 'app-projekt-emailalapjan',
  templateUrl: './projekt-emailalapjan.component.html'
})
export class ProjektEmailalapjanComponent implements OnInit, OnDestroy {
  @Input() Email = '';

  pp = new ProjektParameter(0, environment.lapmeret);
  ProjektDto = new Array<ProjektDto>();

  eppFrissit = false;

  projektservice: ProjektService;

  constructor(private _errorservice: ErrorService,
              projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  ngOnInit() {
    this.ProjektDto = new Array<ProjektDto>();

    this.pp.fi = new Array<SzMT>();
    this.pp.fi.push(
      new SzMT(Szempont.UgyfelEmail, this.Email));

    this.eppFrissit = true;
    this.projektservice.Select(this.pp)
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
