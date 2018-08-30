import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {ProjektService} from '../projekt.service';
import {ProjektteendoService} from '../projektteendo.service';
import {SzamlazasirendService} from '../szamlazasirend.service';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';

@Component({
  selector: 'app-projektegy',
  templateUrl: './projektegy.component.html',
  styleUrls: ['./projektegy.component.css']
})
export class ProjektegyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektservice: ProjektService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              projektservice: ProjektService,
              private _projektkapcsolatservice: ProjektkapcsolatService,
              private _szamlazasirendservice: SzamlazasirendService,
              private _projektteendoservice: ProjektteendoService) {
    this.projektservice = projektservice;
  }

  vissza() {
    this._router.navigate(['/projekt']);
  }
  reszletek() {
    this._router.navigate(['reszletek'], {relativeTo: this._route});
  }
  torles () {
    this._router.navigate(['torles'], {relativeTo: this._route});
  }
  modositas() {
    this.projektservice.uj = false;
    this._router.navigate(['szerkesztes'], {relativeTo: this._route});
  }

  stsz() {
    this.projektservice.uj = false;
    this.projektservice.DtoEdited = Object.assign({}, this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
    this._router.navigate(['stsz'], {relativeTo: this._route});
  }
  muszakiallapot() {
    this.projektservice.uj = false;
    this.projektservice.DtoEdited = Object.assign({}, this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
    this._router.navigate(['muszakiallapot'], {relativeTo: this._route});
  }
  inverter() {
    this.projektservice.uj = false;
    this.projektservice.DtoEdited = Object.assign({}, this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
    this._router.navigate(['inverter'], {relativeTo: this._route});
  }
  napelem() {
    this.projektservice.uj = false;
    this.projektservice.DtoEdited = Object.assign({}, this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
    this._router.navigate(['napelem'], {relativeTo: this._route});
  }
  iratminta() {
    this._router.navigate(['iratminta'], {relativeTo: this._route});
  }
  bizonylatesirat() {
    this.eppFrissit = true;
    this._projektkapcsolatservice.Select(this.projektservice.Dto[this.projektservice.DtoSelectedIndex].PROJEKTKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this._projektkapcsolatservice.Dto = res.Result;

        this.eppFrissit = false;
        this._router.navigate(['bizonylatesirat'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  szamlazasirend() {
    this.eppFrissit = true;
    this._szamlazasirendservice.Select(this.projektservice.Dto[this.projektservice.DtoSelectedIndex].PROJEKTKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this._szamlazasirendservice.Dto = res.Result;

        this.eppFrissit = false;
        this._router.navigate(['szamlazasirend'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  teendo() {
    this.eppFrissit = true;
    this._projektteendoservice.Select(this.projektservice.Dto[this.projektservice.DtoSelectedIndex].PROJEKTKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this._projektteendoservice.Dto = res.Result;

        this.eppFrissit = false;
        this._router.navigate(['projektteendo'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}