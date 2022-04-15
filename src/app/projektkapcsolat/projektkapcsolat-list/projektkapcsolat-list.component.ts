import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {IratService} from '../../02 Eszkozok/02 Irat/irat/irat.service';
import {BizonylatService} from '../../bizonylat/bizonylat.service';
import {VagolapService} from '../../05 Segedeszkozok/08 Vagolap/vagolap.service';
import {VagolapMode} from '../../05 Segedeszkozok/08 Vagolap/vagolapmode';
import {JogKod} from '../../common/enums/jogkod';
import {ErrorService} from '../../common/errorbox/error.service';
import {ProjektkapcsolatTablaComponent} from '../projektkapcsolat-tabla/projektkapcsolat-tabla.component';
import {IratDto} from '../../02 Eszkozok/02 Irat/irat/iratdto';
import {BizonylatDto} from '../../bizonylat/bizonylatdto';
import {ProjektKapcsolatDto} from '../projektkapcsolatdto';
import {ProjektKapcsolatParameter} from '../projektkapcsolatparameter';
import {BizonylatTipusLeiro} from '../../bizonylat/bizonylattipusleiro';
import {BizonylatTipus} from '../../bizonylat/bizonylattipus';

@Component({
  selector: 'app-projektkapcsolat-list',
  templateUrl: './projektkapcsolat-list.component.html'
})
export class ProjektkapcsolatListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: ProjektkapcsolatTablaComponent;

  @Input() Projektkod = -1;
  @Input() Ugyfelkod = -1;

  BizonylatMod = false;
  IratMod = false;
  AjanlatMod = false;

  Dto = new Array<ProjektKapcsolatDto>();
  DtoSelectedIndex = -1;

  OriginalIrat = new IratDto();
  OriginalBizonylat = new BizonylatDto();
  bizonylatLeiro = new BizonylatTipusLeiro();
  bizonylatTipus = BizonylatTipus.Szamla;

  eppFrissit = false;

  egybizonylat_egymode = 2; // részletek

  egyirat_egymode = 15; // dokumentum

  projektkapcsolatservice: ProjektkapcsolatService;

  constructor(private _logonservice: LogonService,
              private _iratservice: IratService,
              private _bizonylatservice: BizonylatService,
              private _vagolapservice: VagolapService,
              private _errorservice: ErrorService,
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

  onId(i: number) {
    const OldIndex = this.DtoSelectedIndex;

    this.tabla.nemOk();
    this.DtoSelectedIndex = i;

    if (this.DtoSelectedIndex === -1) {
      return;
    }

    if (this.Dto[this.DtoSelectedIndex].Bizonylatkod !== null) {
      this.eppFrissit = true;
      this._bizonylatservice.Get(this.Dto[this.DtoSelectedIndex].Bizonylatkod)
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.OriginalBizonylat = res.Result[0];
          this.bizonylatTipus = this.OriginalBizonylat.Bizonylattipuskod;
          return this._bizonylatservice.BizonylatLeiro(this.bizonylatTipus);
        })
        .then(res1 => {
          if (res1.Error != null) {
            throw res1.Error;
          }

          this.bizonylatLeiro = res1.Result;
          this.eppFrissit = false;

          if (i !== OldIndex) {
            this.egybizonylat_egymode = 2;
          } else {
            this.egybizonylat_egymode = 0;
          }

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

          if (i !== OldIndex) {
            this.egyirat_egymode = 15;
          } else {
            this.egyirat_egymode = 0;
          }

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
