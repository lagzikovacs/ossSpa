import { Component } from '@angular/core';
import {VagolapService} from './vagolap.service';
import {VagolapDto} from './vagolapdto';
import {IratService} from '../irat/irat/irat.service';
import {BizonylatService} from '../bizonylat/bizonylat.service';
import {VagolapMode} from './vagolapmode';
import {ProjektService} from '../projekt/projekt/projekt.service';
import {ProjektkapcsolatService} from '../projekt/bizonylatesirat/projektkapcsolat.service';
import {ProjektKapcsolatParameter} from '../projekt/bizonylatesirat/projektkapcsolatparameter';
import {BizonylatkapcsolatService} from '../bizonylat/bizonylatirat/bizonylatkapcsolat.service';
import {BizonylatKapcsolatParam} from '../bizonylat/bizonylatirat/bizonylatkapcsolatparam';

@Component({
  selector: 'app-vagolap',
  templateUrl: './vagolap.component.html',
  styleUrls: ['./vagolap.component.css']
})
export class VagolapComponent {
  vagolapservice: VagolapService;
  eppFrissit = false;

  constructor(private _bizonylatservice: BizonylatService,
              private _projektservice: ProjektService,
              private _projektkapcsolatservice: ProjektkapcsolatService,
              private _bizonylatkapcsolatservice: BizonylatkapcsolatService,
              vagolapservice: VagolapService) {
    this.vagolapservice = vagolapservice;
  }

  torles() {
    this.vagolapservice.Dto = new Array<VagolapDto>();
  }

  beszur(i: number) {
    switch (this.vagolapservice.Dto[i].tipus) {
      case 0: // irat a kiválasztott tétel
        switch (this.vagolapservice.Mode) {
          case VagolapMode.Projekt:
            this._projektkapcsolatservice.AddIratToProjekt(new ProjektKapcsolatParameter(
              this._projektservice.Dto[this._projektservice.DtoSelectedIndex].PROJEKTKOD,
              0,
              this.vagolapservice.Dto[i].iratkod,
              null
            ));
          break;
          case VagolapMode.Bizonylatirat:
            this._bizonylatkapcsolatservice.AddIratToBizonylat(new BizonylatKapcsolatParam(
              this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].BIZONYLATKOD,
              this.vagolapservice.Dto[i].iratkod
            ));
          break;
        }
      break;
      case 1: // bizonylat a kiválasztott tétel
        switch (this.vagolapservice.Mode) {
          case VagolapMode.Projekt:
            this._projektkapcsolatservice.AddBizonylatToProjekt(new ProjektKapcsolatParameter(
              this._projektservice.Dto[this._projektservice.DtoSelectedIndex].PROJEKTKOD,
              this.vagolapservice.Dto[i].bizonylatkod,
              0,
              null
            ));
          break;
        }
      break;
    }
  }
}
