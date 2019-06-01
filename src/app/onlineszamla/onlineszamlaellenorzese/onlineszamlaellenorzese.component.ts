import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {Szempont} from '../../enums/szempont';
import {LogonService} from '../../logon/logon.service';
import {OnlineszamlaService} from '../onlineszamla.service';
import {JogKod} from '../../enums/jogkod';
import {SzMT} from '../../dtos/szmt';
import {OnlineszamlaDto} from '../onlineszamladto';

@Component({
  selector: 'app-navonlineszamla',
  templateUrl: './onlineszamlaellenorzese.component.html',
  styleUrls: ['./onlineszamlaellenorzese.component.css']
})
export class OnlineszamlaellenorzeseComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Id', 'Bizonylat Id', 'Bizonylatszám', 'Ügyfél'];
  szempontok = [
    Szempont.Kod, Szempont.BizonylatKod, Szempont.Bizonylatszam, Szempont.Ugyfel
  ];

  eppFrissit = false;
  mod = false;
  elsokereses = true;
  onlineszamlaservice: OnlineszamlaService;

  constructor(private _logonservice: LogonService,
              onlineszamlaservice: OnlineszamlaService  ) {
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
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
