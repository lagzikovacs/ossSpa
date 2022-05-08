import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProjektkapcsolatService} from '../../../01 Projekt/projektkapcsolat/projektkapcsolat.service';
import {ProjektDto} from '../../../01 Projekt/projekt/projektdto';
import {IratDto} from '../iratdto';
import {ProjektService} from '../../../01 Projekt/projekt/projekt.service';
import {ErrorService} from '../../../../common/errorbox/error.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-irat-projektje',
  templateUrl: './irat-projektje.component.html'
})
export class IratProjektjeComponent implements OnInit, OnDestroy {
  @Input() item: IratDto;

  IratProjektje: ProjektDto;

  eppFrissit = true;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }
  nincsProjekt = true;

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
      const res = await this._projektkapcsolatservice.SelectByIrat(this.item.Iratkod);
      if (res.Error != null) {
        throw res.Error;
      }

      if (res.Result.length === 0) {
        this.nincsProjekt = true;

        this.spinner = false;
      } else {
        this.nincsProjekt = false;

        const res1 = await this.projektservice.Get(res.Result[0].Projektkod);
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.IratProjektje = res1.Result[0];

        this.spinner = false;
      }
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
