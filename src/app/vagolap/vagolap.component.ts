import {Component, OnDestroy, OnInit} from '@angular/core';
import {VagolapService} from '../05 Segedeszkozok/08 Vagolap/vagolap.service';
import {VagolapDto} from '../05 Segedeszkozok/08 Vagolap/vagolapdto';
import {VagolapMode} from '../05 Segedeszkozok/08 Vagolap/vagolapmode';

@Component({
  selector: 'app-vagolap',
  templateUrl: './vagolap.component.html'
})
export class VagolapComponent implements OnInit, OnDestroy {
  vagolapservice: VagolapService;

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

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
