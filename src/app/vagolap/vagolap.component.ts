import {Component, OnInit} from '@angular/core';
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
export class VagolapComponent implements OnInit {
  vagolapservice: VagolapService;
  eppFrissit = false;

  constructor(vagolapservice: VagolapService) {
    this.vagolapservice = vagolapservice;
  }

  ngOnInit() {
    for (let i = 0; i < this.vagolapservice.Dto.length; i++) {
      this.vagolapservice.Dto[i].selected = false;
    }
  }

  torles() {
    this.vagolapservice.Dto = new Array<VagolapDto>();
  }

  isdisabled(i: number) {
    if (this.vagolapservice.Mode === VagolapMode.List) {
      return true;
    }
    if (this.vagolapservice.Mode === VagolapMode.Bizonylatirat && this.vagolapservice.Dto[i].tipus === 1) {
      return true;
    }

    return false;
  }
}
