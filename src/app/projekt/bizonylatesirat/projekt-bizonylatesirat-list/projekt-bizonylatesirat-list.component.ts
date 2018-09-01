import {Component, ViewChild} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {LogonService} from '../../../services/logon.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-projekt-bizonylatesirat-list',
  templateUrl: './projekt-bizonylatesirat-list.component.html',
  styleUrls: ['./projekt-bizonylatesirat-list.component.css']
})
export class ProjektBizonylatesiratListComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektkapcsolatservice: ProjektkapcsolatService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              projektkapcsolatservice: ProjektkapcsolatService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  kereses() {
    this.eppFrissit = true;
    this.projektkapcsolatservice.Kereses()
      .then(res => {
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
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
