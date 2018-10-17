import {Component, OnDestroy} from '@angular/core';
import {VolumeService} from '../volume.service';

@Component({
  selector: 'app-volume-reszletek',
  templateUrl: './volume-reszletek.component.html',
  styleUrls: ['./volume-reszletek.component.css']
})
export class VolumeReszletekComponent implements OnDestroy {
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
