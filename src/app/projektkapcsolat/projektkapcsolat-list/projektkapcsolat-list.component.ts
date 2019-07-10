import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {LogonService} from '../../logon/logon.service';
import {IratService} from '../../irat/irat.service';
import {AjanlatContainerMode} from '../../ajanlat/ajanlatcontainermode';
import {BizonylatService} from '../../bizonylat/bizonylat.service';
import {BizonylatkapcsolatService} from '../../bizonylatkapcsolat/bizonylatkapcsolat.service';
import {KifizetesService} from '../../kifizetes/kifizetes.service';
import {BizonylatEgyMode} from '../../bizonylat/bizonylategymode';
import {VagolapService} from '../../vagolap/vagolap.service';
import {VagolapMode} from '../../vagolap/vagolapmode';
import {AjanlatService} from '../../ajanlat/ajanlat.service';
import {JogKod} from '../../enums/jogkod';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {ProjektkapcsolatTablaComponent} from '../projektkapcsolat-tabla/projektkapcsolat-tabla.component';
import {IratDto} from '../../irat/iratdto';
import {BizonylatDto} from '../../bizonylat/bizonylatdto';
import {ProjektKapcsolatDto} from '../projektkapcsolatdto';
import {ProjektKapcsolatParameter} from '../projektkapcsolatparameter';

@Component({
  selector: 'app-projektkapcsolat-list',
  templateUrl: './projektkapcsolat-list.component.html'
})
export class ProjektkapcsolatListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla') tabla: ProjektkapcsolatTablaComponent;

  @Input() Projektkod = -1;
  @Input() Ugyfelkod = -1;

  BizonylatMod = false;
  IratMod = false;
  AjanlatMod = false;

  Dto = new Array<ProjektKapcsolatDto>();
  DtoSelectedIndex = -1;

  OriginalIrat = new IratDto();
  OriginalBizonylat = new BizonylatDto();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  projektkapcsolatservice: ProjektkapcsolatService;

  constructor(private _logonservice: LogonService,
              private _iratservice: IratService,
              private _bizonylatservice: BizonylatService,
              private _bizonylatkapcsolatservice: BizonylatkapcsolatService,
              private _bizonylatkifizetesservice: KifizetesService,
              private _vagolapservice: VagolapService,
              private _ajanlatservice: AjanlatService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              projektkapcsolatservice: ProjektkapcsolatService) {
    this.BizonylatMod = this._logonservice.Jogaim.includes(JogKod[JogKod.BIZONYLATMOD]);
    this.IratMod = this._logonservice.Jogaim.includes(JogKod[JogKod.IRATMOD]);
    this.AjanlatMod = this._logonservice.Jogaim.includes(JogKod[JogKod.AJANLATKESZITES]);
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  ngOnInit() {
    this.onKereses();
  }

  onKereses() {
    this.eppFrissit = true;
    this.tabla.clearselections();
    this.projektkapcsolatservice.Select(this.Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.Dto = res.Result;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  setClickedRow(i: number) {
    this.tabla.nemOk();
    this.DtoSelectedIndex = i;

    if (this.DtoSelectedIndex === -1) {
      return;
    }

    if (this.Dto[this.DtoSelectedIndex].Bizonylatkod !== null) {
      this.eppFrissit = true;
      this._bizonylatservice.GetComplex(this.Dto[this.DtoSelectedIndex].Bizonylatkod)
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this._bizonylatservice.Dto = [res.Result[0].Dto];
          this._bizonylatservice.DtoSelectedIndex = 0;
          this._bizonylatservice.bizonylatTipus = this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Bizonylattipuskod;

          this._bizonylatservice.TetelDto = res.Result[0].LstTetelDto;
          this._bizonylatservice.AfaDto = res.Result[0].LstAfaDto;
          this._bizonylatservice.TermekdijDto = res.Result[0].LstTermekdijDto;

          return this._bizonylatservice.GetBizonylatLeiro(); // ez megcsinálja az értékadásokat is
        })
        .then(res1 => {
          if (res1.Error != null) {
            throw res1.Error;
          }

          return this._bizonylatkapcsolatservice.Select(
            this.Dto[this.DtoSelectedIndex].Bizonylatkod);
        })
        .then(res2 => {
          if (res2.Error != null) {
            throw res2.Error;
          }

          this._bizonylatkapcsolatservice.Dto = res2.Result;
          return this._bizonylatkifizetesservice.Select(
            this.Dto[this.DtoSelectedIndex].Bizonylatkod);
        })
        .then(res3 => {
          if (res3.Error != null) {
            throw res3.Error;
          }

          this._bizonylatkifizetesservice.Dto = res3.Result;

          this._bizonylatservice.EgyMode = BizonylatEgyMode.Reszletek;
          this.eppFrissit = false;

          this.tabla.bizonylatOk = true;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    }

    if (this.Dto[this.DtoSelectedIndex].Iratkod !== null) {
      this.eppFrissit = true;
      this._iratservice.Get(this.Dto[this.DtoSelectedIndex].Iratkod)
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.OriginalIrat = res.Result[0];
          this.eppFrissit = false;
          this.tabla.iratOk = true;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    }
  }

  onUjbizonylat() {
    this.tabla.clearselections();
    this.tabla.ujbizonylatOk = true;
  }
  onUjbizonylatutan(dto: ProjektKapcsolatDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
      this.tabla.nemOk();
    } else {
      this.tabla.nemOk();
    }
  }

  // az app-irat-szerkesztes komponenssel dolgoznak
  onUjirat() {
    this.tabla.clearselections();
    this.tabla.ujiratOk = true;
  }
  onUjiratutan(dto: IratDto) {
    if (dto !== null) {
      this.eppFrissit = true;
      this.projektkapcsolatservice.AddIratToProjekt(new ProjektKapcsolatParameter(
            this.Projektkod, 0, dto.Iratkod, undefined))
        .then(res1 => {
          if (res1.Error != null) {
            throw res1.Error;
          }

          return this.projektkapcsolatservice.Get(res1.Result);
        })
        .then(res2 => {
          if (res2.Error != null) {
            throw res2.Error;
          }

          this.Dto.unshift(res2.Result[0]);
          this.eppFrissit = false;
          this.tabla.nemOk();
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.tabla.nemOk();
    }
  }
  onIratSzerkesztesutan(dto: IratDto) {
    if (dto !== null) {
      this.Dto[this.DtoSelectedIndex].Keletkezett = dto.Keletkezett;
      this.Dto[this.DtoSelectedIndex].Irany = dto.Irany;
      this.Dto[this.DtoSelectedIndex].Targy = dto.Targy;
      this.Dto[this.DtoSelectedIndex].Tipus = dto.Irattipus;
    }
  }

  onUjajanlat() {
    this.tabla.clearselections();
    this.tabla.ujajanlatOk = true;
  }
  onAjanlatutan(dto: ProjektKapcsolatDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
      this.tabla.nemOk();
    } else {
      this.tabla.nemOk();
    }
  }


  // TODO app-bizonylat-egy eseménye, vszeg később nem kell
  torlesutan() {
    this.tabla.clearselections();
  }


  onLevalasztas(i: number) {
    this.tabla.nemOk();
    this.DtoSelectedIndex = i;
    this.tabla.levalasztasOk = true;
  }
  onLevalasztasutan(ok: boolean) {
    if (ok) {
      this.tabla.clearselections();

      this.Dto.splice(this.DtoSelectedIndex, 1);
      this.DtoSelectedIndex = -1;
    } else {
      this.tabla.nemOk();
    }
  }

  onVagolaprol() {
    this._vagolapservice.Mode = VagolapMode.Projekt;
    this.tabla.clearselections();
    this.tabla.vagolaprolOk = true;
  }
  onVagolaprolutan(dto: ProjektKapcsolatDto) {
    this.Dto.unshift(dto);
  }
  onVagolaprolutanvege() {
    this.tabla.nemOk();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
