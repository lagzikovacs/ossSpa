import {Component, OnDestroy, ViewChild} from '@angular/core';
import {VolumeService} from '../volume.service';
import {VolumeContainerMode} from '../volumecontainermode';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {VolumeEgyMode} from '../volumeegymode';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-volume-egy',
  templateUrl: './volume-egy.component.html',
  animations: [rowanimation]
})
export class VolumeEgyComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  volumeservice: VolumeService;
  eppFrissit = false;

  constructor(volumeservice: VolumeService) {
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
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
