import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DokumentumService} from '../dokumentum.service';
import {IratService} from '../../irat/irat.service';
import {DokumentumDto} from '../dokumentumdto';
import {DokumentumContainerMode} from '../dokumentumcontainermode';
import {DokumentumEgyMode} from '../dokumentumegymode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';

@Component({
  selector: 'app-dokumentum-list',
  templateUrl: './dokumentum-list.component.html'
})
export class DokumentumListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla') tabla: TablaComponent;

  dokumentumservice: DokumentumService;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _iratservice: IratService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              dokumentumservice: DokumentumService) {
    this.dokumentumservice = dokumentumservice;
  }

  ngOnInit() {
    this.eppFrissit = true;
    this.dokumentumservice.Dto = DokumentumDto[0];
    this.dokumentumservice.Select(this._iratservice.Dto[this._iratservice.DtoSelectedIndex].Iratkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.dokumentumservice.Dto = res.Result;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  letoltes(i: number) {
    this.dokumentumservice.DtoSelectedIndex = i;

    this.eppFrissit = true;
    this.dokumentumservice.Kimentes()
      .then(res => {
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  setClickedRow(i: number) {
    this.dokumentumservice.DtoSelectedIndex = i;
    this.dokumentumservice.uj = false;
    this.dokumentumservice.EgyMode = DokumentumEgyMode.Reszletek;
  }
  feltoltes() {
    // csak h üres rekordot mutasson
    this.dokumentumservice.DtoEdited = new DokumentumDto();
    this.dokumentumservice.uj = true;
    this.dokumentumservice.ContainerMode = DokumentumContainerMode.Feltoltes;
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
