import {Component, OnDestroy, OnInit} from '@angular/core';
import {ParticioService} from '../particio.service';
import {ParticioDto} from '../particiodto';
import {deepCopy} from '../../tools/deepCopy';
import {ErrorService} from '../../tools/errorbox/error.service';
import {EgyMode} from '../../enums/egymode';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-particio-egy',
  templateUrl: './particio-egy.component.html',
  animations: [rowanimation]
})
export class ParticioEgyComponent implements OnInit, OnDestroy {
  Ori = new ParticioDto();
  Dto = new ParticioDto();

  EgyMode = EgyMode.Blank;

  eppFrissit = false;

  particioservice: ParticioService;

  constructor(private _errorservice: ErrorService,
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

        this.EgyMode = EgyMode.Szallito;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  szallito() {
    this.EgyMode = EgyMode.Szallito;
  }
  nav() {
    this.EgyMode = EgyMode.Nav;
  }
  bizonylat() {
    this.EgyMode = EgyMode.Bizonylat;
  }
  projekt() {
    this.EgyMode = EgyMode.Projekt;
  }
  volume() {
    this.EgyMode = EgyMode.Volume;
  }
  email() {
    this.EgyMode = EgyMode.Email;
  }

  onSzerkesztesOk(Mod: ParticioDto) {
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
        this.EgyMode = EgyMode.Blank;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  onSzerkesztesCancel() {
    this.Dto = deepCopy(this.Ori);

    this.EgyMode = EgyMode.Blank;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
