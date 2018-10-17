import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ParticioService} from "../particio.service";
import {ErrormodalComponent} from "../../errormodal/errormodal.component";
import {ParticioEgyMode} from "../particioegymode";

@Component({
  selector: 'app-particio-egy',
  templateUrl: './particio-egy.component.html',
  styleUrls: ['./particio-egy.component.css']
})
export class ParticioEgyComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  particioservice: ParticioService;
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
        this.particioservice.Dto = res.Result[0];
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

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
