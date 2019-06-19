import {Component, OnDestroy} from '@angular/core';
import {VolumeService} from '../volume.service';
import {VolumeContainerMode} from '../volumecontainermode';
import {VolumeEgyMode} from '../volumeegymode';
import {rowanimation} from '../../animation/rowAnimation';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-volume-egy',
  templateUrl: './volume-egy.component.html',
  animations: [rowanimation]
})
export class VolumeEgyComponent implements OnDestroy {
  volumeservice: VolumeService;
  eppFrissit = false;

  constructor(volumeservice: VolumeService,
              private _errorservice: ErrorService) {
    this.volumeservice = volumeservice;
  }

  vissza() {
    this.volumeservice.ContainerMode = VolumeContainerMode.List;
  }
  reszletek() {
    this.volumeservice.EgyMode = VolumeEgyMode.Reszletek;
  }
  ellenorzes() {
    this.eppFrissit = true;
    this.volumeservice.DokumentumkodByVolume(this.volumeservice.Dto[this.volumeservice.DtoSelectedIndex].Volumekod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.eppFrissit = false;
        this.volumeservice.dbv = res.Result;
        this.volumeservice.EgyMode = VolumeEgyMode.Teszt;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
