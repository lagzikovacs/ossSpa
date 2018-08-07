import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {ParticioService} from '../../../services/particio.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-particioegy',
  templateUrl: './particioegy.component.html',
  styleUrls: ['./particioegy.component.css']
})
export class ParticioegyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  particioservice: ParticioService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              particioservice: ParticioService) {
    this.particioservice = particioservice;
  }

  vissza() {
    this._router.navigate(['../particio'], {relativeTo: this._route});
  }
  torles () {
    this._router.navigate(['torles'], {relativeTo: this._route});
  }
  preparemodositas() {
    this.particioservice.uj = false;
    this.particioservice.DtoEdited = Object.assign({}, this.particioservice.Dto[this.particioservice.DtoSelectedIndex]);
  }
  modositas() {
    this.preparemodositas();
    this._router.navigate(['szerkesztes'], {relativeTo: this._route});
  }

  szallito() {
    this.preparemodositas();
    this._router.navigate(['szallito'], {relativeTo: this._route});
  }
  nav() {
    this.preparemodositas();
    this._router.navigate(['nav'], {relativeTo: this._route});
  }
  smtp() {
    this.preparemodositas();
    this._router.navigate(['smtp'], {relativeTo: this._route});
  }
  bizonylat() {
    this.preparemodositas();
    this._router.navigate(['bizonylat'], {relativeTo: this._route});
  }
  projekt() {
    this.preparemodositas();
    this._router.navigate(['projekt'], {relativeTo: this._route});
  }
  volume() {
    this.preparemodositas();
    this._router.navigate(['volume'], {relativeTo: this._route});
  }
}
