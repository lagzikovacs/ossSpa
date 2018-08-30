import { Component } from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {LogonService} from '../../services/logon.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-projekt-bizonylatesirat',
  templateUrl: './projekt-bizonylatesirat.component.html',
  styleUrls: ['./projekt-bizonylatesirat.component.css']
})
export class ProjektBizonylatesiratComponent {
  projektkapcsolatservice: ProjektkapcsolatService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              projektkapcsolatservice: ProjektkapcsolatService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  ujbizonylat() {
    this._router.navigate(['../bizonylatesiratujbizonylat'], {relativeTo: this._route});
  }
  ujirat() {
    this._router.navigate(['../bizonylatesiratujirat'], {relativeTo: this._route});
  }
  ujajanlat() {
    this._router.navigate(['../bizonylatesiratujajanlat'], {relativeTo: this._route});
  }

  setClickedRow(i: number) {
    this.projektkapcsolatservice.DtoSelectedIndex = i;
    this._router.navigate(['../bizonylatesirategy'], {relativeTo: this._route});
  }
}
