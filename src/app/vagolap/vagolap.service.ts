import { Injectable } from '@angular/core';
import {VagolapDto} from './vagolapdto';
import {VagolapMode} from "./vagolapmode";
import {IratService} from "../irat/irat/irat.service";
import {BizonylatService} from "../bizonylat/bizonylat.service";

@Injectable({
  providedIn: 'root'
})
export class VagolapService {
  cim = 'Vágólap';
  Dto = new Array<VagolapDto>();
  Mode = VagolapMode.List;

  constructor(private _iratservice: IratService,
              private _bizonylatservice: BizonylatService) { }

  iratotvagolapra() {
    const d = new VagolapDto();
    d.tipus = 0;
    d.iratkod = this._iratservice.Dto[this._iratservice.DtoSelectedIndex].Iratkod;
    d.irattipus = this._iratservice.Dto[this._iratservice.DtoSelectedIndex].Irattipus;
    d.ugyfelnev = this._iratservice.Dto[this._iratservice.DtoSelectedIndex].Ugyfelnev;
    d.ugyfelcim = this._iratservice.Dto[this._iratservice.DtoSelectedIndex].Ugyfelcim;

    this.Dto.push(d);
  }
  bizonylatotvagolapra() {
    const d = new VagolapDto();
    d.tipus = 1;
    d.bizonylatkod = this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].BIZONYLATKOD;
    d.bizonylatszam = this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].BIZONYLATSZAM;
    d.bizonylattipus = this._bizonylatservice.bizonylatLeiro.BizonylatNev;
    d.ugyfelnev = this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].UGYFELNEV;
    d.ugyfelcim = this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].UGYFELCIM;

    this.Dto.push(d);
  }
  kijeloltiratokszama(): number {
    let kijeloltdb = 0;
    for (let i = 0; i < this.Dto.length; i++) {
      if (this.Dto[i].tipus === 0 && this.Dto[i].selected) {
        ++kijeloltdb;
      }
    }
    return kijeloltdb;
  }
  kijeloltekszama(): number {
    let kijeloltdb = 0;
    for (let i = 0; i < this.Dto.length; i++) {
      if (this.Dto[i].selected) {
        ++kijeloltdb;
      }
    }
    return kijeloltdb;
  }
}
