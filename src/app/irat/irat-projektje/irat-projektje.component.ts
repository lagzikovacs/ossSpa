import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EgyMode} from '../../common/enums/egymode';
import {ProjektResult} from '../../02 Eszkozok/01 Projekt/projekt/projektresult';
import {ProjektkapcsolatService} from '../../projektkapcsolat/projektkapcsolat.service';
import {ProjektDto} from '../../02 Eszkozok/01 Projekt/projekt/projektdto';
import {IratDto} from '../iratdto';
import {ProjektService} from '../../02 Eszkozok/01 Projekt/projekt/projekt.service';
import {ErrorService} from '../../common/errorbox/error.service';

@Component({
  selector: 'app-irat-projektje',
  templateUrl: './irat-projektje.component.html'
})
export class IratProjektjeComponent implements OnInit, OnDestroy {
  @Input() item: IratDto;

  IratProjektje: ProjektDto;

  eppFrissit = true;
  nincsProjekt = true;

  projektservice: ProjektService;

  constructor(private _projektkapcsolatservice: ProjektkapcsolatService,
              private _errorservice: ErrorService,
              projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  ngOnInit(): void {
    this.eppFrissit = true;
    this._projektkapcsolatservice.SelectByIrat(this.item.Iratkod)
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
          this.IratProjektje = res1.Result[0];
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
