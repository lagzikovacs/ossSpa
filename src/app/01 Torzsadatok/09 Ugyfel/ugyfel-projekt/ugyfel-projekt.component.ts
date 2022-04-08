import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UgyfelService} from '../ugyfel.service';
import {SzMT} from '../../../common/dtos/szmt';
import {Szempont} from '../../../common/enums/szempont';
import {ErrorService} from '../../../common/errorbox/error.service';
import {environment} from '../../../../environments/environment';
import {ProjektDto} from '../../../projekt/projektdto';
import {ProjektService} from '../../../projekt/projekt.service';
import {ProjektParameter} from '../../../projekt/projektparameter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ugyfel-projekt',
  templateUrl: './ugyfel-projekt.component.html'
})
export class UgyfelProjektComponent implements OnInit, OnDestroy {
  @Input() Ugyfelkod = -1;

  pp = new ProjektParameter(0, environment.lapmeret);
  ProjektDto: ProjektDto[] = new Array<ProjektDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  ugyfelservice: UgyfelService;

  constructor(private _projektservice: ProjektService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              ugyfelservice: UgyfelService) {
    this.ugyfelservice = ugyfelservice;
  }

  ngOnInit() {
    this.pp.fi = new Array<SzMT>();
    this.pp.fi.push(new SzMT(Szempont.UgyfelKod, this.Ugyfelkod.toString()));

    this.spinner = true;
    this._projektservice.Select(this.pp)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.ProjektDto = res.Result;

        this.spinner = false;
      })
      .catch(err => {
        this.spinner = false;
        this._errorservice.Error = err;
      });
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
