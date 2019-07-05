import {Component, Input, OnDestroy, ViewChild} from '@angular/core';
import {IratService} from '../irat.service';
import {SzMT} from '../../dtos/szmt';
import {Szempont} from '../../enums/szempont';
import {IratDto} from '../iratdto';
import {DokumentumService} from '../../dokumentum/dokumentum.service';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';
import {environment} from '../../../environments/environment';
import {IratParameter} from '../iratparameter';

@Component({
  selector: 'app-irat-list',
  templateUrl: './irat-list.component.html'
})
export class IratListComponent implements OnDestroy {
  @ViewChild('tabla') tabla: TablaComponent;

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
  @Input() enProjekt = true;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  iratservice: IratService;
  dokumentumservice: DokumentumService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              iratservice: IratService,
              dokumentumservice: DokumentumService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.IRATMOD]);
    this.iratservice = iratservice;
    this.dokumentumservice = dokumentumservice;
  }

  onKereses() {
    this.iratservice.Dto = new Array<IratDto>();
    this.iratservice.DtoSelectedIndex = -1;
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
    this.eppFrissit = true;
    this.iratservice.Select(this.ip)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.elsokereses) {
          this.iratservice.Dto = res.Result;
          this.elsokereses = false;
        } else {
          const buf = [...this.iratservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.iratservice.Dto = buf;
        }
        this.OsszesRekord = res.OsszesRekord;

        this.ip.rekordtol += this.ip.lapmeret;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onId(i: number) {
    this.iratservice.DtoSelectedIndex = i;
  }

  onUj() {
    this.tabla.ujtetelstart();
  }

  onUjkesz() {
    this.tabla.ujtetelstop();
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
