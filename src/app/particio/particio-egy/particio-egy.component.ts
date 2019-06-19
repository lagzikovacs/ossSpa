import {Component, OnDestroy, OnInit} from '@angular/core';
import {ParticioService} from '../particio.service';
import {ParticioEgyMode} from '../particioegymode';
import {ParticioDto} from '../particiodto';
import {deepCopy} from '../../tools/deepCopy';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-particio-egy',
  templateUrl: './particio-egy.component.html'
})
export class ParticioEgyComponent implements OnInit, OnDestroy {
  particioservice: ParticioService;
  Ori = new ParticioDto();
  Dto = new ParticioDto();
  eppFrissit = false;

  constructor(particioservice: ParticioService,
              private _errorservice: ErrorService) {
    this.particioservice = particioservice;
  }

  ngOnInit() {
    this.eppFrissit = true;
    this.particioservice.Get()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.Ori = res.Result[0];
        this.Dto = deepCopy(this.Ori);

        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  szallito() {
    this.particioservice.EgyMode = ParticioEgyMode.Szallito;
  }
  nav() {
    this.particioservice.EgyMode = ParticioEgyMode.Nav;
  }
  smtp() {
    this.particioservice.EgyMode = ParticioEgyMode.Smtp;
  }
  bizonylat() {
    this.particioservice.EgyMode = ParticioEgyMode.Bizonylat;
  }
  projekt() {
    this.particioservice.EgyMode = ParticioEgyMode.Projekt;
  }
  volume() {
    this.particioservice.EgyMode = ParticioEgyMode.Volume;
  }

  SzerkesztesOk(Mod: ParticioDto) {
    this.eppFrissit = true;
    this.particioservice.Update(Mod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.particioservice.Get();
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.Ori = res1.Result[0];
        this.Dto = deepCopy(this.Ori);

        this.eppFrissit = false;
        this.particioservice.EgyMode = ParticioEgyMode.Blank;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  SzerkesztesCancel() {
    this.Dto = deepCopy(this.Ori);

    this.particioservice.EgyMode = ParticioEgyMode.Blank;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
