import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {VolumeService} from '../../../services/segedeszkosz/volume.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-volumeegy',
  templateUrl: './volumeegy.component.html',
  styleUrls: ['./volumeegy.component.css']
})
export class VolumeegyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  volumeservice: VolumeService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              volumeservice: VolumeService) {
    this.volumeservice = volumeservice;
  }

  vissza() {
    this._router.navigate(['../volume'], {relativeTo: this._route});
  }
  reszletek() {
    this._router.navigate(['reszletek'], {relativeTo: this._route});
  }
  ellenorzes() {
    this.eppFrissit = true;
    this.volumeservice.DokumentumkodByVolume(this.volumeservice.Dto[this.volumeservice.DtoSelectedIndex].VOLUMEKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.eppFrissit = false;
        this.volumeservice.dbv = res.Result;
        this._router.navigate(['teszt'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}
