import {Component, OnInit, ViewChild} from '@angular/core';
import {VolumeService} from '../volume.service';
import {VolumeContainerMode} from '../volumecontainermode';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {VolumeEgyMode} from "../volumeegymode";

@Component({
  selector: 'app-volume-list',
  templateUrl: './volume-list.component.html',
  styleUrls: ['./volume-list.component.css']
})
export class VolumeListComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  eppFrissit = false;
  volumeservice: VolumeService;

  constructor(volumeservice: VolumeService) {
    this.volumeservice = volumeservice;
  }

  ngOnInit() {
    this.onKereses();
  }

  onKereses() {
    this.volumeservice.elsokereses = true;
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

        if (this.volumeservice.elsokereses) {
          this.volumeservice.Dto = res.Result;
          this.volumeservice.elsokereses = false;
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
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  setClickedRow(i: number) {
    this.volumeservice.DtoSelectedIndex = i;
    this.volumeservice.ContainerMode = VolumeContainerMode.Egy;
    this.volumeservice.EgyMode = VolumeEgyMode.Reszletek;
  }
}
