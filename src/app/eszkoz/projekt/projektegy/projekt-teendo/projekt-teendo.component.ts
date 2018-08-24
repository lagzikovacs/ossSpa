import {Component, ViewChild} from '@angular/core';
import {ProjektteendoService} from '../../../../services/eszkoz/projekt/projektteendo.service';
import {LogonService} from '../../../../services/segedeszkosz/logon.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-projekt-teendo',
  templateUrl: './projekt-teendo.component.html',
  styleUrls: ['./projekt-teendo.component.css']
})
export class ProjektTeendoComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektteendoservice: ProjektteendoService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              projektteendoservice: ProjektteendoService) {
    this.projektteendoservice = projektteendoservice;
  }

  uj() {
    this.eppFrissit = true;
    this.projektteendoservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.projektteendoservice.uj = true;
        this.projektteendoservice.DtoEdited = res.Result[0];
        this.projektteendoservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this._router.navigate(['../teendouj'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  setClickedRow(i: number) {
    this.projektteendoservice.DtoSelectedIndex = i;
    this.projektteendoservice.uj = false;
    this._router.navigate(['../teendoegy'], {relativeTo: this._route});
  }
}
