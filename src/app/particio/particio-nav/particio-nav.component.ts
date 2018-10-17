import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ParticioService} from '../particio.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {ParticioEgyMode} from '../particioegymode';

@Component({
  selector: 'app-particio-nav',
  templateUrl: './particio-nav.component.html',
  styleUrls: ['./particio-nav.component.css']
})
export class ParticioNavComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  particioservice: ParticioService;
  eppFrissit = false;

  constructor(particioservice: ParticioService) {
    this.particioservice = particioservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    this.particioservice.Update(this.particioservice.Dto)
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

        this.particioservice.Dto = res1.Result[0];

        this.eppFrissit = false;
        this.navigal();
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    this.particioservice.EgyMode = ParticioEgyMode.Blank;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
