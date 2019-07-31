import {Component, OnDestroy} from '@angular/core';
import {Szempont} from '../../enums/szempont';
import {LogonService} from '../../logon/logon.service';
import {OnlineszamlaService} from '../onlineszamla.service';
import {JogKod} from '../../enums/jogkod';
import {SzMT} from '../../dtos/szmt';
import {OnlineszamlaDto} from '../onlineszamladto';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {environment} from '../../../environments/environment';
import {OnlineszamlaParameter} from '../onlineszamlaparameter';

@Component({
  selector: 'app-navonlineszamla',
  templateUrl: './onlineszamlaellenorzese.component.html'
})
export class OnlineszamlaellenorzeseComponent implements OnDestroy {
  szurok = ['Id', 'Bizonylat Id', 'Bizonylatszám', 'Ügyfél'];
  szempontok = [
    Szempont.Kod, Szempont.BizonylatKod, Szempont.Bizonylatszam, Szempont.Ugyfel
  ];

  mod = false;
  elsokereses = true;
  szempont = 0;
  minta = '';
  up = new OnlineszamlaParameter(0, environment.lapmeret);
  OsszesRekord = 0;

  Dto: OnlineszamlaDto[] = new Array<OnlineszamlaDto>();
  DtoSelectedIndex = -1;

  onlineszamlaservice: OnlineszamlaService;
  spinnerservice: SpinnerService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              spinnerservice: SpinnerService,
              onlineszamlaservice: OnlineszamlaService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.CIKKMOD]);

    this.onlineszamlaservice = onlineszamlaservice;
    this.spinnerservice = spinnerservice;
  }

  onKereses() {
    this.Dto = new Array<OnlineszamlaDto>();
    this.DtoSelectedIndex = -1;
    this.OsszesRekord = 0;

    this.elsokereses = true;
    this.up.rekordtol = 0;
    this.up.fi = new Array<SzMT>();

    this.up.fi.push(new SzMT(this.szempontok[this.szempont],
      this.minta));

    this.onKeresesTovabb();
  }
  onKeresesTovabb() {
    this.spinnerservice.eppFrissit = true;
    this.onlineszamlaservice.Select(this.up)
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

        this.up.rekordtol += this.up.lapmeret;
        this.spinnerservice.eppFrissit = false;
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
