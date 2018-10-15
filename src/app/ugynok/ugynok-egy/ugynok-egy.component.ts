import {Component} from '@angular/core';
import {FeliratkozasService} from '../ugynok.service';
import {FeliratkozasContainerMode} from '../ugynokcontainermode';
import {FeliratkozasEgyMode} from '../ugynokegymode';

@Component({
  selector: 'app-feliratkozas-egy',
  templateUrl: './ugynok-egy.component.html',
  styleUrls: ['./ugynok-egy.component.css']
})
export class FeliratkozasEgyComponent {
  feliratkozasservice: FeliratkozasService;

  constructor(feliratkozasservice: FeliratkozasService) {
    this.feliratkozasservice = feliratkozasservice;
  }

  vissza() {
    this.feliratkozasservice.ContainerMode = FeliratkozasContainerMode.List;
  }
  reszletek() {
    this.feliratkozasservice.EgyMode = FeliratkozasEgyMode.Reszletek;
  }
  projekt() {
    this.feliratkozasservice.EgyMode = FeliratkozasEgyMode.Projekt;
  }
}
