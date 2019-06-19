import {Component, OnDestroy} from '@angular/core';
import {Szempont} from '../../enums/szempont';
import {LogonService} from '../../logon/logon.service';
import {OnlineszamlaService} from '../onlineszamla.service';
import {JogKod} from '../../enums/jogkod';
import {SzMT} from '../../dtos/szmt';
import {OnlineszamlaDto} from '../onlineszamladto';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-navonlineszamla',
  templateUrl: './onlineszamlaellenorzese.component.html'
})
export class OnlineszamlaellenorzeseComponent implements OnDestroy {
  szurok = ['Id', 'Bizonylat Id', 'Bizonylatszám', 'Ügyfél'];
  szempontok = [
    Szempont.Kod, Szempont.BizonylatKod, Szempont.Bizonylatszam, Szempont.Ugyfel
  ];

  eppFrissit = false;
  mod = false;
  elsokereses = true;
  onlineszamlaservice: OnlineszamlaService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              onlineszamlaservice: OnlineszamlaService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.CIKKMOD]);
    this.onlineszamlaservice = onlineszamlaservice;
  }

  onKereses() {
    this.onlineszamlaservice.Dto = new Array<OnlineszamlaDto>();
    this.onlineszamlaservice.DtoSelectedIndex = -1;
    this.onlineszamlaservice.OsszesRekord = 0;

    this.elsokereses = true;
    this.onlineszamlaservice.up.rekordtol = 0;
    this.onlineszamlaservice.up.fi = new Array<SzMT>();

    this.onlineszamlaservice.up.fi.push(new SzMT(this.szempontok[this.onlineszamlaservice.szempont],
      this.onlineszamlaservice.minta));

    this.onKeresesTovabb();
  }
  onKeresesTovabb() {
    this.eppFrissit = true;
    this.onlineszamlaservice.Select(this.onlineszamlaservice.up)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.elsokereses) {
          this.onlineszamlaservice.Dto = res.Result;
          this.elsokereses = false;
        } else {
          const buf = [...this.onlineszamlaservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.onlineszamlaservice.Dto = buf;
        }
        this.onlineszamlaservice.OsszesRekord = res.OsszesRekord;

        this.onlineszamlaservice.up.rekordtol += this.onlineszamlaservice.up.lapmeret;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
