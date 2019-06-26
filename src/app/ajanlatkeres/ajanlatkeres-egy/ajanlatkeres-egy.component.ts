import {Component, OnDestroy} from '@angular/core';
import {AjanlatkeresService} from '../ajanlatkeres.service';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {rowanimation} from '../../animation/rowAnimation';
import {EgyMode} from '../../enums/egymode';

@Component({
  selector: 'app-ajanlatkeres-egy',
  templateUrl: './ajanlatkeres-egy.component.html',
  animations: [rowanimation]
})
export class FeliratkozasEgyComponent implements OnDestroy {
  egymode = EgyMode.Reszletek;
  ajanlatkeresservice: AjanlatkeresService;
  enprojekt = false;
  ri = -1;

  constructor(private _logonservice: LogonService,
              ajanlatkeresservice: AjanlatkeresService) {
    this.enprojekt = _logonservice.Jogaim.includes(JogKod[JogKod.PROJEKT]);
    this.ajanlatkeresservice = ajanlatkeresservice;
  }

  reszletek() {
    this.egymode = EgyMode.Reszletek;
  }
  projekt() {
    this.egymode = EgyMode.Projekt;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
