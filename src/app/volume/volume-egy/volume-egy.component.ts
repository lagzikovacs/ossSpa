import {Component, ViewChild} from '@angular/core';
import {VolumeService} from '../volume.service';
import {VolumeContainerMode} from '../volumecontainermode';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {VolumeEgyMode} from '../volumeegymode';

@Component({
  selector: 'app-volume-egy',
  templateUrl: './volume-egy.component.html',
  styleUrls: ['./volume-egy.component.css']
})
export class VolumeEgyComponent {
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
    this.volumeservice.DokumentumkodByVolume(this.volumeservice.Dto[this.volumeservice.DtoSelectedIndex].VOLUMEKOD)
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
}