import {Component, Input, OnDestroy, ViewChild} from '@angular/core';
import {IratService} from '../irat.service';
import {SzMT} from '../../dtos/szmt';
import {Szempont} from '../../enums/szempont';
import {IratDto} from '../iratdto';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';
import {environment} from '../../../environments/environment';
import {IratParameter} from '../iratparameter';
import {propCopy} from '../../tools/propCopy';

@Component({
  selector: 'app-irat-list',
  templateUrl: './irat-list.component.html'
})
export class IratListComponent implements OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaComponent;

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
  ip = new IratParameter(0, environment.lapmeret);
  elsokereses = true;
  OsszesRekord = 0;
  jog = false;

  Dto = new Array<IratDto>();
  DtoSelectedIndex = -1;

  iratservice: IratService;
  spinnerservice: SpinnerService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              spinnerservice: SpinnerService,
              iratservice: IratService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.IRATMOD]);

    this.iratservice = iratservice;
    this.spinnerservice = spinnerservice;
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

  onKeresesTovabb() {
    this.spinnerservice.eppFrissit = true;
    this.iratservice.Select(this.ip)
      .then(res => {
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
        this.spinnerservice.eppFrissit = false;
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onId(i: number) {
    this.DtoSelectedIndex = i;
  }

  doUjtetel() {
    this.tabla.ujtetelstart();
  }
  onUjtetelkesz(dto: IratDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }
  onSzerkesztesutan(dto: IratDto) {
    propCopy(dto, this.Dto[this.DtoSelectedIndex]);
  }
  onTorlesutan() {
    this.Dto.splice(this.DtoSelectedIndex, 1);
    this.DtoSelectedIndex = -1;

    this.tabla.clearselections();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
