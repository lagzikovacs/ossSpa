import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Szempont} from '../../../../common/enums/szempont';
import {SzMT} from '../../../../common/dtos/szmt';
import {ProjektService} from '../projekt.service';
import {ProjektDto} from '../projektdto';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {environment} from '../../../../../environments/environment';
import {ProjektParam} from '../projektparam';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projekt-emailalapjan',
  templateUrl: './projekt-emailalapjan.component.html'
})
export class ProjektEmailalapjanComponent implements OnInit, OnDestroy {
  @Input() Email = '';

  pp = new ProjektParam(0, environment.lapmeret);
  ProjektDto = new Array<ProjektDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  projektservice: ProjektService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  async ngOnInit() {
    this.ProjektDto = new Array<ProjektDto>();

    this.pp.fi = new Array<SzMT>();
    this.pp.fi.push(
      new SzMT(Szempont.UgyfelEmail, this.Email));

    this.spinner = true;
    try {
      const res = await this.projektservice.Select(this.pp);
      if (res.Error != null) {
        throw res.Error;
      }

      this.ProjektDto = res.Result;
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
