import {Component} from '@angular/core';
import {FeliratkozasService} from '../feliratkozas.service';
import {FeliratkozasContainerMode} from '../feliratkozascontainermode';
import {FeliratkozasEgyMode} from '../feliratkozasegymode';

@Component({
  selector: 'app-feliratkozas-egy',
  templateUrl: './feliratkozas-egy.component.html',
  styleUrls: ['./feliratkozas-egy.component.css']
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
