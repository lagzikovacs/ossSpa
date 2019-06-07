import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ParticioService} from '../particio.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {ParticioEgyMode} from '../particioegymode';
import {ParticioDto} from '../particiodto';
import {deepCopy} from '../../tools/deepCopy';

@Component({
  selector: 'app-particio-egy',
  templateUrl: './particio-egy.component.html'
})
export class ParticioEgyComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  particioservice: ParticioService;
  Ori = new ParticioDto();
  Dto = new ParticioDto();
  eppFrissit = false;

  constructor(particioservice: ParticioService) {
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
        this.errormodal.show(err);
        this.eppFrissit = false;
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
        this.errormodal.show(err);
        this.eppFrissit = false;
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
