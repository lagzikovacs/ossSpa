import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {Szempont} from '../../enums/szempont';
import {ActivatedRoute, Router} from '@angular/router';
import {LogonService} from '../../services/segedeszkosz/logon.service';
import {NavexportellenorzesService} from '../../services/bizonylat/navexportellenorzes.service';
import {JogKod} from '../../enums/jogkod';
import {SzMT} from '../../dtos/szmt';
import {NavfeltoltesDto} from '../../dtos/bizonylat/navfeltoltesdto';

@Component({
  selector: 'app-navonlineszamla',
  templateUrl: './navexportellenorzes.component.html',
  styleUrls: ['./navexportellenorzes.component.css']
})
export class NavexportellenorzesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Id', 'Bizonylat Id', 'Bizonylatszám', 'Ügyfél'];
  szempontok = [
    Szempont.Kod, Szempont.BizonylatKod, Szempont.Bizonylatszam, Szempont.Ugyfel
  ];

  eppFrissit = false;
  mod = false;
  navexportellenorzesservice: NavexportellenorzesService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              navexportellenorzesservice: NavexportellenorzesService  ) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.CIKKMOD]);
    this.navexportellenorzesservice = navexportellenorzesservice;
  }

  onKereses() {
    this.navexportellenorzesservice.Dto = new Array<NavfeltoltesDto>();
    this.navexportellenorzesservice.DtoSelectedIndex = -1;
    this.navexportellenorzesservice.OsszesRekord = 0;

    this.navexportellenorzesservice.elsokereses = true;
    this.navexportellenorzesservice.up.rekordtol = 0;
    this.navexportellenorzesservice.up.fi = new Array<SzMT>();

    this.navexportellenorzesservice.up.fi.push(new SzMT(this.szempontok[this.navexportellenorzesservice.szempont],
      this.navexportellenorzesservice.minta));

    this.onKeresesTovabb();
  }
  onKeresesTovabb() {
    this.eppFrissit = true;
    this.navexportellenorzesservice.Select(this.navexportellenorzesservice.up)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.navexportellenorzesservice.elsokereses) {
          this.navexportellenorzesservice.Dto = res.Result;
          this.navexportellenorzesservice.elsokereses = false;
        } else {
          const buf = [...this.navexportellenorzesservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.navexportellenorzesservice.Dto = buf;
        }
        this.navexportellenorzesservice.OsszesRekord = res.OsszesRekord;

        this.navexportellenorzesservice.up.rekordtol += this.navexportellenorzesservice.up.lapmeret;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}
