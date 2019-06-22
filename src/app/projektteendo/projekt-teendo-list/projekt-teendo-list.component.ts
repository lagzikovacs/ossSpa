import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ProjektteendoService} from '../projektteendo.service';
import {ProjektteendoContainerMode} from '../projektteendocontainermode';
import {ProjektteendoEgyMode} from '../projekttendoegymode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';

@Component({
  selector: 'app-projekt-teendo-list',
  templateUrl: './projekt-teendo-list.component.html'
})
export class ProjektTeendoListComponent implements OnDestroy {
  @ViewChild('tabla') tabla: TablaComponent;

  projektteendoservice: ProjektteendoService;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(projektteendoservice: ProjektteendoService,
              private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService) {
    this.projektteendoservice = projektteendoservice;
  }

  kereses() {
    this.tabla.clearselections();

    this.eppFrissit = true;
    this.projektteendoservice.Kereses()
      .then(res => {
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  setClickedRow(i: number) {
    this.projektteendoservice.DtoSelectedIndex = i;
    this.projektteendoservice.uj = false;
    this.projektteendoservice.EgyMode = ProjektteendoEgyMode.Reszletek;
  }
  uj() {
    this.eppFrissit = true;
    this.projektteendoservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.projektteendoservice.uj = true;
        this.projektteendoservice.DtoEdited = res.Result[0];
        this.projektteendoservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.projektteendoservice.ContainerMode = ProjektteendoContainerMode.Uj;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  torlesutan() {
    this.tabla.clearselections();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
