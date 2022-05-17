import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProjektDto} from '../../../02 Eszkozok/01 Projekt/projekt/projektdto';
import {ProjektResult} from '../../../02 Eszkozok/01 Projekt/projekt/projektresult';
import {ProjektService} from '../../../02 Eszkozok/01 Projekt/projekt/projekt.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {ProjektkapcsolatService} from '../../../02 Eszkozok/01 Projekt/projektkapcsolat/projektkapcsolat.service';
import {BizonylatDto} from '../bizonylatdto';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylat-projektje',
  templateUrl: './bizonylat-projektje.component.html'
})
export class BizonylatProjektjeComponent implements OnInit, OnDestroy {
  @Input() item: BizonylatDto;

  BizonylatProjektje: ProjektDto;

  nincsProjekt = false;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  projektservice: ProjektService;

  constructor(private _projektkapcsolatservice: ProjektkapcsolatService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  async ngOnInit() {
    this.spinner = true;
    try {
      const res = await this._projektkapcsolatservice.SelectByBizonylat(this.item.Bizonylatkod);
      if (res.Error != null) {
        throw res.Error;
      }

      this.nincsProjekt = res.Result.length === 0;

      if (!this.nincsProjekt) {
        const res1 = await this.projektservice.Get(res.Result[0].Projektkod);
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.BizonylatProjektje = res1.Result[0];
      }

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

