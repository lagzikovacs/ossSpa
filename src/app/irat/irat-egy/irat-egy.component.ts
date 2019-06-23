import {Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {IratService} from '../irat.service';
import {IratContainerMode} from '../iratcontainermode';
import {IratEgyMode} from '../irategymode';
import {DokumentumService} from '../../dokumentum/dokumentum.service';
import {DokumentumContainerMode} from '../../dokumentum/dokumentumcontainermode';
import {ProjektkapcsolatService} from '../../projektkapcsolat/projektkapcsolat.service';
import {BizonylatesIratContainerMode} from '../../projektkapcsolat/bizonylatesiratcontainermode';
import {ProjektService} from '../../projekt/projekt.service';
import {ProjektResult} from '../../projekt/projektresult';
import {BizonylatkapcsolatService} from '../../bizonylatkapcsolat/bizonylatkapcsolat.service';
import {BizonylatKapcsolatContainerMode} from '../../bizonylatkapcsolat/bizonylatkapcsolatcontainermode';
import {VagolapService} from '../../vagolap/vagolap.service';
import {AbuComponent} from '../../tools/abu/abu.component';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {rowanimation} from '../../animation/rowAnimation';
import {deepCopy} from '../../tools/deepCopy';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-irat-egy',
  templateUrl: './irat-egy.component.html',
  animations: [rowanimation]
})
export class IratEgyComponent implements OnDestroy {
  @ViewChild(AbuComponent) abu: AbuComponent;
  projektservice: ProjektService;
  iratservice: IratService;
  dokumentumservice: DokumentumService;
  nincsProjekt = false;
  mod = false;
  ri = -1;
  pri = -1;

  @Input() enProjekt = true;
  @Output() torlesutan = new EventEmitter<void>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _logonservice: LogonService,
              private _projektkapcsolatservice: ProjektkapcsolatService,
              private _bizonylatkapcsolatservice: BizonylatkapcsolatService,
              private _vagolapservice: VagolapService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              iratservice: IratService,
              dokumentumservice: DokumentumService,
              projektservice: ProjektService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.IRATMOD]);
    this.iratservice = iratservice;
    this.dokumentumservice = dokumentumservice;
    this.projektservice = projektservice;
  }

  reszletek() {
    this.iratservice.EgyMode = IratEgyMode.Reszletek;
  }
  torles() {
    this.iratservice.EgyMode = IratEgyMode.Torles;
  }
  modositas() {
    this.iratservice.uj = false;
    this.iratservice.DtoEdited = deepCopy(this.iratservice.Dto[this.iratservice.DtoSelectedIndex]);
    this.iratservice.EgyMode = IratEgyMode.Modositas;
  }
  dokumentum() {
    this.iratservice.EgyMode = IratEgyMode.Dokumentum;
    this.dokumentumservice.ContainerMode = DokumentumContainerMode.List;
  }
  fotozaslink() {
    this.iratservice.EgyMode = IratEgyMode.FotozasLink;
  }
  projekt() {
    this.eppFrissit = true;
    this._projektkapcsolatservice.SelectByIrat(this.iratservice.Dto[this.iratservice.DtoSelectedIndex].Iratkod)
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
          this.projektservice.Dto = res1.Result;
          this.projektservice.DtoSelectedIndex = 0;
        }

        this.iratservice.EgyMode = IratEgyMode.Projekt;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  vagolap() {
    this._vagolapservice.iratotvagolapra();
    this.abu.Uzenet('Az irat a vágólapra került!');
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.iratservice.Delete(this.iratservice.Dto[this.iratservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.iratservice.Dto.splice(this.iratservice.DtoSelectedIndex, 1);
        this.iratservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.torlesutan.emit();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  TorlesCancel() {
    this.iratservice.EgyMode = IratEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}