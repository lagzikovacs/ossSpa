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

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  particioservice: ParticioService;

  constructor(private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
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
        this.EgyMode = ParticioEgyMode.Blank;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  SzerkesztesCancel() {
    this.Dto = deepCopy(this.Ori);

    this.EgyMode = ParticioEgyMode.Blank;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
