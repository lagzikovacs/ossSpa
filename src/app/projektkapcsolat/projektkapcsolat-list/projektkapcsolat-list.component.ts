import {Component, Input, OnDestroy, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-projektkapcsolat-list',
  templateUrl: './projektkapcsolat-list.component.html'
})
export class ProjektkapcsolatListComponent implements OnDestroy {
  @ViewChild('tabla') tabla: ProjektkapcsolatTablaComponent;

  projektkapcsolatservice: ProjektkapcsolatService;

  BizonylatMod = false;
  IratMod = false;
  AjanlatMod = false;

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

  kereses() {
    this.eppFrissit = true;
    this.tabla.clearselections();
    this.projektkapcsolatservice.Kereses()
      .then(res => {
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  setClickedRow(i: number) {
    this.tabla.nemOk();
    this.projektkapcsolatservice.DtoSelectedIndex = i;

    if (this.projektkapcsolatservice.DtoSelectedIndex === -1) {
      return;
    }

    if (this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].Bizonylatkod !== null) {
      this.eppFrissit = true;
      this._bizonylatservice.GetComplex(this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].Bizonylatkod)
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
            this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].Bizonylatkod);
        })
        .then(res2 => {
          if (res2.Error != null) {
            throw res2.Error;
          }

          this._bizonylatkapcsolatservice.Dto = res2.Result;
          return this._bizonylatkifizetesservice.Select(
            this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].Bizonylatkod);
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

    if (this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].Iratkod !== null) {
      this.eppFrissit = true;
      this._iratservice.Get(this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].Iratkod)
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
      this.projektkapcsolatservice.Dto.unshift(dto);
      this.tabla.nemOk();
    } else {
      this.tabla.nemOk();
    }
  }

  onUjirat() {
    this.tabla.clearselections();
    this.tabla.ujiratOk = true;
  }
  onUjiratutan(dto: IratDto) {
    if (dto !== null) {
      // TODO kapcsolatot létrehozni
    } else {
      this.tabla.nemOk();
    }
  }
  onIratSzerkesztesutan(dto: IratDto) {
    if (dto !== null) {
      this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].Keletkezett = dto.Keletkezett;
      this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].Irany = dto.Irany;
      this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].Targy = dto.Targy;
      this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].Tipus = dto.Irattipus;
    }
  }

  ujajanlat() {
    this.eppFrissit = true;
    this._ajanlatservice.CreateNew()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this._ajanlatservice.AjanlatParam = res.Result;

        this.eppFrissit = false;
        this._ajanlatservice.AjanlatContainerMode = AjanlatContainerMode.List;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }


  torlesutan() {
    this.tabla.clearselections();
  }


  onLevalasztas(i: number) {
    this.tabla.nemOk();
    this.projektkapcsolatservice.DtoSelectedIndex = i;
    this.tabla.levalasztasOk = true;
  }
  onLevalasztasutan(ok: boolean) {
    if (ok) {
      this.tabla.clearselections();

      this.projektkapcsolatservice.Dto.splice(this.projektkapcsolatservice.DtoSelectedIndex, 1);
      this.projektkapcsolatservice.DtoSelectedIndex = -1;
    } else {
      this.tabla.nemOk();
    }
  }

  onVagolaprol() {
    this._vagolapservice.Mode = VagolapMode.Projekt;
    this.tabla.clearselections();
    this.tabla.vagolaprolOk = true;
  }
  onVagolaprolutan(ok: boolean) {
    if (ok) {
      // TODO frissítés: lehet majd dto lesz a paraméter és többször is meghívódik
      this.tabla.nemOk();
    } else {
      this.tabla.nemOk();
    }
  }



  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
