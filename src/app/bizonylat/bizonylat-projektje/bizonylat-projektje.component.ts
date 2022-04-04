import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProjektDto} from '../../projekt/projektdto';
import {ProjektResult} from '../../projekt/projektresult';
import {ProjektService} from '../../projekt/projekt.service';
import {ErrorService} from '../../common/errorbox/error.service';
import {ProjektkapcsolatService} from '../../projektkapcsolat/projektkapcsolat.service';
import {IratDto} from '../../irat/iratdto';
import {BizonylatDto} from '../bizonylatdto';

@Component({
  selector: 'app-bizonylat-projektje',
  templateUrl: './bizonylat-projektje.component.html'
})
export class BizonylatProjektjeComponent implements OnInit, OnDestroy {
  @Input() item: BizonylatDto;

  BizonylatProjektje: ProjektDto;

  eppFrissit = true;
  nincsProjekt = false;

  projektservice: ProjektService;

  constructor(private _projektkapcsolatservice: ProjektkapcsolatService,
              private _errorservice: ErrorService,
              projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  ngOnInit(): void {
    this.eppFrissit = true;
    this._projektkapcsolatservice.SelectByBizonylat(this.item.Bizonylatkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (res.Result.length === 0) {
          this.nincsProjekt = true;
          return new Promise<ProjektResult>((resolve, reject) => { resolve(new ProjektResult()); });
        } else {
          this.nincsProjekt = false;
          return this.projektservice.Get(res.Result[0].Projektkod);
        }
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (!this.nincsProjekt) {
          this.BizonylatProjektje = res1.Result[0];
        }

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

