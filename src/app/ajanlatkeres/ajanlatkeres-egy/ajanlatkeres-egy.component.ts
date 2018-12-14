import {Component, OnDestroy} from '@angular/core';
import {AjanlatkeresService} from '../ajanlatkeres.service';
import {AjanlatkeresContainerMode} from '../ajanlatkerescontainermode';
import {AjanlatkeresEgyMode} from '../ajanlatkeresegymode';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';

@Component({
  selector: 'app-ajanlatkeres-egy',
  templateUrl: './ajanlatkeres-egy.component.html',
  styleUrls: ['./ajanlatkeres-egy.component.css']
})
export class FeliratkozasEgyComponent implements OnDestroy {
  ajanlatkeresservice: AjanlatkeresService;
  enprojekt = false;

  constructor(private _logonservice: LogonService,
              ajanlatkeresservice: AjanlatkeresService) {
    this.enprojekt = _logonservice.Jogaim.includes(JogKod[JogKod.PROJEKT]);
    this.ajanlatkeresservice = ajanlatkeresservice;
  }

  vissza() {
    this.ajanlatkeresservice.ContainerMode = AjanlatkeresContainerMode.List;
  }
  reszletek() {
    this.ajanlatkeresservice.EgyMode = AjanlatkeresEgyMode.Reszletek;
  }
  projekt() {
    this.ajanlatkeresservice.EgyMode = AjanlatkeresEgyMode.Projekt;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}