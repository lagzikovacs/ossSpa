import {Component, OnDestroy, OnInit} from '@angular/core';
import {VolumeService} from '../volume.service';
import {VolumeContainerMode} from '../volumecontainermode';
import {VolumeEgyMode} from '../volumeegymode';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-volume-list',
  templateUrl: './volume-list.component.html'
})
export class VolumeListComponent implements OnInit, OnDestroy {
  eppFrissit = false;
  elsokereses = true;
  volumeservice: VolumeService;
  ti = -1;

  constructor(volumeservice: VolumeService,
              private _errorservice: ErrorService) {
    this.volumeservice = volumeservice;
  }

  ngOnInit() {
    this.onKereses();
  }

  onKereses() {
    this.elsokereses = true;
    this.volumeservice.ekDto.rekordtol = 0;

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.volumeservice.Read()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.elsokereses) {
          this.volumeservice.Dto = res.Result;
          this.elsokereses = false;
        } else {
          const buf = [...this.volumeservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.volumeservice.Dto = buf;
        }

        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  setClickedRow(i: number) {
    this.volumeservice.DtoSelectedIndex = i;
    this.volumeservice.ContainerMode = VolumeContainerMode.Egy;
    this.volumeservice.EgyMode = VolumeEgyMode.Reszletek;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
