import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {HelysegService} from '../helyseg.service';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {HelysegContainerMode} from '../helysegcontainermode';
import {HelysegEgyMode} from '../helysegegymode';

@Component({
  selector: 'app-helyseg-egy',
  templateUrl: './helyseg-egy.component.html',
  styleUrls: ['./helyseg-egy.component.css']
})
export class HelysegEgyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  helysegservice: HelysegService;
  mod = false;
  eppFrissit = false;

  constructor(private _logonservice: LogonService,
              helysegservice: HelysegService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.helysegservice = helysegservice;
  }

  vissza() {
    this.helysegservice.ContainerMode = HelysegContainerMode.List;
  }
  reszletek() {
    this.helysegservice.EgyMode = HelysegEgyMode.Reszletek;
  }
  torles () {
    this.helysegservice.EgyMode = HelysegEgyMode.Torles;
  }
  modositas() {
    this.helysegservice.uj = false;
    this.helysegservice.DtoEdited = Object.assign({}, this.helysegservice.Dto[this.helysegservice.DtoSelectedIndex]);
    this.helysegservice.EgyMode = HelysegEgyMode.Modositas;
  }
}
