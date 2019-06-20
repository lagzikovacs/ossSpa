import {Component, OnDestroy} from '@angular/core';
import {KifizetesService} from '../kifizetes.service';
import {BizonylatService} from '../../bizonylat/bizonylat.service';
import {KifizetesContainerMode} from '../kifizetescontainermode';
import {KifizetesEgyMode} from '../kifizetesegymode';
import {KifizetesSzerkesztesMode} from '../kifizetesszerkesztesmode';
import * as moment from 'moment';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-kifizetes-list',
  templateUrl: './kifizetes-list.component.html'
})
export class KifizetesListComponent implements OnDestroy {
  bizonylatkifizetesservice: KifizetesService;
  ti = -1;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _bizonylatservice: BizonylatService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              bizonylatkifizetesservice: KifizetesService) {
    this.bizonylatkifizetesservice = bizonylatkifizetesservice;
  }

  kereses() {
    this.eppFrissit = true;
    this.bizonylatkifizetesservice.Select(this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Bizonylatkod)
      .then(res => {
        this.eppFrissit = false;

        this.bizonylatkifizetesservice.Dto = res.Result;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  setClickedRow(i: number) {
    this.bizonylatkifizetesservice.DtoSelectedIndex = i;
    this.bizonylatkifizetesservice.uj = false;
    this.bizonylatkifizetesservice.ContainerMode = KifizetesContainerMode.Egy;
    this.bizonylatkifizetesservice.EgyMode = KifizetesEgyMode.Reszletek;
  }
  uj() {
    this.eppFrissit = true;
    this.bizonylatkifizetesservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.bizonylatkifizetesservice.uj = true;
        this.bizonylatkifizetesservice.DtoSelectedIndex = -1;

        this.bizonylatkifizetesservice.DtoEdited = res.Result[0];
        this.bizonylatkifizetesservice.DtoEdited.Datum = moment().toISOString(true);
        this.bizonylatkifizetesservice.DtoEdited.Osszeg = this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Brutto;
        this.bizonylatkifizetesservice.DtoEdited.Penznemkod =
          this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Penznemkod;
        this.bizonylatkifizetesservice.DtoEdited.Penznem = this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Penznem;
        this.bizonylatkifizetesservice.DtoEdited.Fizetesimodkod =
          this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Fizetesimodkod;
        this.bizonylatkifizetesservice.DtoEdited.Fizetesimod =
          this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Fizetesimod;

        this.eppFrissit = false;

        this.bizonylatkifizetesservice.ContainerMode = KifizetesContainerMode.Uj;
        this.bizonylatkifizetesservice.SzerkesztesMode = KifizetesSzerkesztesMode.Blank;
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
