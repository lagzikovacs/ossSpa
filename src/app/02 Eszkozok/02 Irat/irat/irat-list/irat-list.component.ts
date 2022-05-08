import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, ViewChild} from '@angular/core';
import {IratService} from '../irat.service';
import {SzMT} from '../../../../common/dtos/szmt';
import {Szempont} from '../../../../common/enums/szempont';
import {IratDto} from '../iratdto';
import {LogonService} from '../../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {JogKod} from '../../../../common/enums/jogkod';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {environment} from '../../../../../environments/environment';
import {IratParam} from '../iratparam';
import {propCopy} from '../../../../common/propCopy';
import {TablaExComponent} from '../../../../common/tabla-ex/tabla-ex.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-irat-list',
  templateUrl: './irat-list.component.html'
})
export class IratListComponent implements OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaExComponent;

  @Input() enProjekt = true;

  szurok = ['Id', 'Keletkezett', 'Ügyfél', 'Tárgy', 'Irattipus', 'Küldő'];
  szurok2 = ['-', 'Keletkezett', 'Ügyfél', 'Tárgy', 'Irattipus', 'Küldő'];

  szempontok = [
    Szempont.Kod, Szempont.Keletkezett,
    Szempont.Ugyfel, Szempont.Targy, Szempont.Irattipus,
    Szempont.Kuldo
  ];

  szempont = 0;
  szempont2 = 0;
  minta = '';
  minta2 = '';
  ip = new IratParam(0, environment.lapmeret);
  elsokereses = true;
  OsszesRekord = 0;
  jog = false;
  uj = false;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  Dto = new Array<IratDto>();
  DtoSelectedIndex = -1;

  iratservice: IratService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              iratservice: IratService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.IRATMOD]);

    this.iratservice = iratservice;
  }

  onKereses() {
    this.Dto = new Array<IratDto>();
    this.DtoSelectedIndex = -1;
    this.OsszesRekord = 0;

    this.elsokereses = true;
    this.ip.rekordtol = 0;
    this.ip.fi = new Array<SzMT>();

    if (this.szempont === this.szempont2 && this.szempont !== 0) {
      this._errorservice.Error = 'Ne válasszon azonos szempontokat!';
      return;
    }

    this.ip.fi.push(new SzMT(this.szempontok[this.szempont], this.minta));
    if (this.szempont2 > 0) {
      this.ip.fi.push(new SzMT(this.szempontok[this.szempont2], this.minta2));
    }

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  async onKeresesTovabb() {
    this.spinner = true;
    try {
      const res = await this.iratservice.Select(this.ip);
      if (res.Error != null) {
        throw res.Error;
      }

      if (this.elsokereses) {
        this.Dto = res.Result;
        this.elsokereses = false;
      } else {
        const buf = [...this.Dto];
        res.Result.forEach(element => {
          buf.push(element);
        });
        this.Dto = buf;
      }
      this.OsszesRekord = res.OsszesRekord;

      this.ip.rekordtol += this.ip.lapmeret;
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  onId(i: number) {
    this.DtoSelectedIndex = i;

    this.uj = false;
    this.tabla.egytetelstart();
  }

  doUjtetel() {
    this.uj = true;
    this.tabla.ujtetelstart();
  }

  onUjtetelkesz(dto: IratDto) {
    if (dto !== undefined) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }

  onTorlesutan() {
    this.Dto.splice(this.DtoSelectedIndex, 1);
    this.DtoSelectedIndex = -1;
    this.tabla.clearselections();
  }

  onSzerkesztesutan(dto: IratDto) {
    propCopy(dto, this.Dto[this.DtoSelectedIndex]);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
