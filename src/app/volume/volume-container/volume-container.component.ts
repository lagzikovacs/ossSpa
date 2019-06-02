import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VolumeService} from '../volume.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';

@Component({
  selector: 'app-volume-container',
  templateUrl: './volume-container.component.html',
  styleUrls: ['./volume-container.component.css']
})
export class VolumeContainerComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  volumeservice: VolumeService;
  eppFrissit = false;

  constructor(volumeservice: VolumeService) {
    this.volumeservice = volumeservice;
  }

  ngOnInit() {
    if (this.volumeservice.GridSettings === undefined || this.volumeservice.ReszletekSettings === undefined) {
      this.eppFrissit = true;
      this.volumeservice.GetGridSettings()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.volumeservice.GridSettings = res.Result;

          return this.volumeservice.GetReszletekSettings();
        })
        .then(res1 => {
          if (res1.Error !== null) {
            throw res1.Error;
          }

          this.volumeservice.ReszletekSettings = res1.Result;

          this.eppFrissit = false;
        })
        .catch(err => {
          this.errormodal.show(err);
          this.eppFrissit = false;
        });
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
