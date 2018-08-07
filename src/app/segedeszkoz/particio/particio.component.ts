import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ParticioService} from '../../services/particio.service';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-particio',
  templateUrl: './particio.component.html',
  styleUrls: ['./particio.component.css']
})
export class ParticioComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Partíció'];

  eppFrissit = false;
  particioservice: ParticioService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              particioservice: ParticioService) {
    this.particioservice = particioservice;
  }

  onKereses() {
    this.particioservice.elsokereses = true;
    this.particioservice.ekDto.rekordtol = 0;

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.particioservice.Read(this.particioservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.particioservice.elsokereses) {
          this.particioservice.Dto = res.Result;
          this.particioservice.elsokereses = false;
        } else {
          const buf = [...this.particioservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.particioservice.Dto = buf;
        }

        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  selectforzoom(i: number) {
    this.setClickedRow(i);
  }

  setClickedRow(i: number) {
    this.particioservice.DtoSelectedIndex = i;
    this.particioservice.uj = false;
    this._router.navigate(['../particioegy'], {relativeTo: this._route});
  }

  uj() {
    this.eppFrissit = true;
    this.particioservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.particioservice.uj = true;
        this.particioservice.DtoEdited = res.Result[0];
        this.particioservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this._router.navigate(['../particiouj'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}
