import {Component, OnDestroy} from '@angular/core';
import {ProjektteendoService} from '../projektteendo.service';
import {ProjektteendoContainerMode} from '../projektteendocontainermode';
import {ProjektteendoEgyMode} from '../projekttendoegymode';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-projekt-teendo-list',
  templateUrl: './projekt-teendo-list.component.html'
})
export class ProjektTeendoListComponent implements OnDestroy {
  projektteendoservice: ProjektteendoService;
  eppFrissit = false;
  ti = -1;

  constructor(projektteendoservice: ProjektteendoService,
              private _errorservice: ErrorService) {
    this.projektteendoservice = projektteendoservice;
  }

  kereses() {
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
    this.projektteendoservice.ContainerMode = ProjektteendoContainerMode.Egy;
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

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
