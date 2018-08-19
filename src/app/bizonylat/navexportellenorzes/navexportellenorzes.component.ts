import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {Szempont} from '../../enums/szempont';
import {ActivatedRoute, Router} from '@angular/router';
import {LogonService} from '../../services/segedeszkosz/logon.service';
import {NavexportellenorzesService} from '../../services/bizonylat/navexportellenorzes.service';
import {JogKod} from '../../enums/jogkod';

@Component({
  selector: 'app-navonlineszamla',
  templateUrl: './navexportellenorzes.component.html',
  styleUrls: ['./navexportellenorzes.component.css']
})
export class NavexportellenorzesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Id', 'Bizonylatkod', 'Bizonylatszám', 'Ügyfél'];
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

}
