import { Component } from '@angular/core';
import {VolumeService} from '../../../../services/segedeszkosz/volume.service';

@Component({
  selector: 'app-volume-reszletek',
  templateUrl: './volume-reszletek.component.html',
  styleUrls: ['./volume-reszletek.component.css']
})
export class VolumeReszletekComponent {
  volumeservice: VolumeService;

  constructor(volumeservice: VolumeService) {
    this.volumeservice = volumeservice;
  }
}
