import {Component, ViewChild} from '@angular/core';
import {CikkService} from '../../../services/torzs/cikk.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {LogonService} from '../../../services/segedeszkosz/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {CikkMozgasParameter} from '../../../dtos/torzs/cikk/cikkmozgasparameter';

@Component({
  selector: 'app-cikkegy',
  templateUrl: './cikkegy.component.html',
  styleUrls: ['./cikkegy.component.css']
})
export class CikkegyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  cikkservice: CikkService;
  mod = false;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              cikkservice: CikkService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.CIKKMOD]);
    this.cikkservice = cikkservice;
  }

  vissza() {
    this._router.navigate(['../cikk'], {relativeTo: this._route});
  }
  reszletek() {
    this._router.navigate(['reszletek'], {relativeTo: this._route});
  }
  torles () {
    this._router.navigate(['torles'], {relativeTo: this._route});
  }
  modositas() {
    this.cikkservice.uj = false;
    this.cikkservice.DtoEdited = Object.assign({}, this.cikkservice.Dto[this.cikkservice.DtoSelectedIndex]);
    this._router.navigate(['szerkesztes'], {relativeTo: this._route});
  }
  beszerzes() {
    this.cikkservice.BizonylattipusKod = 3;
    this.beszerzeskivet();
  }
  kivet() {
    this.cikkservice.BizonylattipusKod = 2;
    this.beszerzeskivet();
  }
  beszerzeskivet() {
    this.eppFrissit = true;
    this.cikkservice.Mozgas(new CikkMozgasParameter(this.cikkservice.Dto[this.cikkservice.DtoSelectedIndex].CIKKKOD,
      this.cikkservice.BizonylattipusKod))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.cikkservice.MozgasDto = res.Result;

        this.eppFrissit = false;
        this._router.navigate(['beszerzeskivet'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}
