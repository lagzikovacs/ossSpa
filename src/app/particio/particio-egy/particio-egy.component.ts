import {Component, OnDestroy, OnInit} from '@angular/core';
import {ParticioService} from '../particio.service';
import {ParticioEgyMode} from '../particioegymode';
import {ParticioDto} from '../particiodto';
import {deepCopy} from '../../tools/deepCopy';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-particio-egy',
  templateUrl: './particio-egy.component.html'
})
export class ParticioEgyComponent implements OnInit, OnDestroy {
  Ori = new ParticioDto();
  Dto = new ParticioDto();

  EgyMode = ParticioEgyMode.Szallito;

  particioservice: ParticioService;
  spinnerservice: SpinnerService;

  constructor(private _errorservice: ErrorService,
              spinnerservice: SpinnerService,
              particioservice: ParticioService) {
    this.particioservice = particioservice;
    this.spinnerservice = spinnerservice;
  }

  ngOnInit() {
    this.spinnerservice.eppFrissit = true;
    this.particioservice.Get()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.Ori = res.Result[0];
        this.Dto = deepCopy(this.Ori);

        this.spinnerservice.eppFrissit = false;
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  szallito() {
    this.EgyMode = ParticioEgyMode.Szallito;
  }
  nav() {
    this.EgyMode = ParticioEgyMode.Nav;
  }
  smtp() {
    this.EgyMode = ParticioEgyMode.Smtp;
  }
  bizonylat() {
    this.EgyMode = ParticioEgyMode.Bizonylat;
  }
  projekt() {
    this.EgyMode = ParticioEgyMode.Projekt;
  }
  volume() {
    this.EgyMode = ParticioEgyMode.Volume;
  }

  onSzerkesztesOk(Mod: ParticioDto) {
    this.spinnerservice.eppFrissit = true;
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

        this.spinnerservice.eppFrissit = false;
        this.EgyMode = ParticioEgyMode.Blank;
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  onSzerkesztesCancel() {
    this.Dto = deepCopy(this.Ori);

    this.EgyMode = ParticioEgyMode.Blank;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
