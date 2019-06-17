import {Component, OnDestroy} from '@angular/core';
import {VolumeService} from '../volume.service';

@Component({
  selector: 'app-volume-container',
  templateUrl: './volume-container.component.html'
})
export class VolumeContainerComponent implements OnDestroy {
  volumeservice: VolumeService;

  constructor(volumeservice: VolumeService) {
    this.volumeservice = volumeservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
