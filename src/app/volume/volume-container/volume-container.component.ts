import { Component } from '@angular/core';
import {VolumeService} from '../volume.service';

@Component({
  selector: 'app-volume-container',
  templateUrl: './volume-container.component.html',
  styleUrls: ['./volume-container.component.css']
})
export class VolumeContainerComponent {
  volumeservice: VolumeService;

  constructor(volumeservice: VolumeService) {
    this.volumeservice = volumeservice;
  }
}
