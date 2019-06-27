import {Component, OnDestroy} from '@angular/core';
import {BizonylatkapcsolatService} from '../bizonylatkapcsolat.service';
import {BizonylatKapcsolatContainerMode} from '../bizonylatkapcsolatcontainermode';
import {BizonylatService} from '../../bizonylat/bizonylat.service';
import {IratService} from '../../irat/irat.service';
import {DokumentumContainerMode} from '../../dokumentum/dokumentumcontainermode';
import {DokumentumService} from '../../dokumentum/dokumentum.service';
import {VagolapService} from '../../vagolap/vagolap.service';
import {VagolapMode} from '../../vagolap/vagolapmode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-bizonylat-irat-list',
  templateUrl: './bizonylat-irat-list.component.html'
})
export class BizonylatIratListComponent implements OnDestroy {
  bizonylatkapcsolatservice: BizonylatkapcsolatService;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _bizonylatservice: BizonylatService,
              private _iratservice: IratService,
              private _dokumentumservice: DokumentumService,
              private _vagolapservice: VagolapService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              bizonylatkapcsolatservice: BizonylatkapcsolatService) {
    this.bizonylatkapcsolatservice = bizonylatkapcsolatservice;
  }

  kereses() {
    this.eppFrissit = true;
    this.bizonylatkapcsolatservice.Select(this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Bizonylatkod)
      .then(res => {
        this.eppFrissit = false;

        this.bizonylatkapcsolatservice.Dto = res.Result;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  levalasztas(i: number) {
    this.bizonylatkapcsolatservice.DtoSelectedIndex = i;
    this.bizonylatkapcsolatservice.ContainerMode = BizonylatKapcsolatContainerMode.Levalasztas;
  }
  setClickedRow(i: number) {
    this.bizonylatkapcsolatservice.DtoSelectedIndex = i;

    this.eppFrissit = true;
    this._iratservice.Get(this.bizonylatkapcsolatservice.Dto[this.bizonylatkapcsolatservice.DtoSelectedIndex].Iratkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this._iratservice.Dto = res.Result;
        this._iratservice.DtoSelectedIndex = 0;

        this.bizonylatkapcsolatservice.ContainerMode = BizonylatKapcsolatContainerMode.Egy;
        // this._iratservice.ContainerMode = IratContainerMode.List;
        // this._iratservice.EgyMode = IratEgyMode.Dokumentum;
        this._dokumentumservice.ContainerMode = DokumentumContainerMode.List;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  uj() {
    this.bizonylatkapcsolatservice.ContainerMode = BizonylatKapcsolatContainerMode.Uj;
  }
  vagolaprol() {
    this.bizonylatkapcsolatservice.ContainerMode = BizonylatKapcsolatContainerMode.Vagolap;
    this._vagolapservice.Mode = VagolapMode.Bizonylatirat;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
