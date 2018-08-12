import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ParticioService} from '../../services/segedeszkosz/particio.service';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-particio',
  templateUrl: './particio.component.html',
  styleUrls: ['./particio.component.css']
})
export class ParticioComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  particioservice: ParticioService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              particioservice: ParticioService) {
    this.particioservice = particioservice;
  }

  ngOnInit() {
    this.eppFrissit = true;
    this.particioservice.Get()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.particioservice.Dto = res.Result[0];
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  szallito() {
    this._router.navigate(['szallito'], {relativeTo: this._route});
  }
  nav() {
    this._router.navigate(['nav'], {relativeTo: this._route});
  }
  smtp() {
    this._router.navigate(['smtp'], {relativeTo: this._route});
  }
  bizonylat() {
    this._router.navigate(['bizonylat'], {relativeTo: this._route});
  }
  projekt() {
    this._router.navigate(['projekt'], {relativeTo: this._route});
  }
  volume() {
    this._router.navigate(['volume'], {relativeTo: this._route});
  }
}
