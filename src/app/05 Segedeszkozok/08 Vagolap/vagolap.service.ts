import { Injectable } from '@angular/core';
import {VagolapDto} from './vagolapdto';
import {VagolapMode} from './vagolapmode';
import {IratDto} from '../../02 Eszkozok/02 Irat/irat/iratdto';
import {BizonylatDto} from '../../03 Bizonylatok/bizonylat/bizonylatdto';

@Injectable({
  providedIn: 'root'
})
export class VagolapService {
  cim = 'Vágólap';
  Dto = new Array<VagolapDto>();
  Mode = VagolapMode.List;

  iratotvagolapra(_IratDto: IratDto) {
    const d = new VagolapDto();

    d.tipus = 0;
    d.iratkod = _IratDto.Iratkod;
    d.irattipus = _IratDto.Irattipus;
    d.ugyfelnev = _IratDto.Ugyfelnev;
    d.ugyfelcim = _IratDto.Ugyfelcim;

    this.Dto.push(d);
  }

  bizonylatotvagolapra(_BizonylatDto: BizonylatDto, Bizonylattipus: string) {
    const d = new VagolapDto();

    d.tipus = 1;
    d.bizonylatkod = _BizonylatDto.Bizonylatkod;
    d.bizonylatszam = _BizonylatDto.Bizonylatszam;
    d.bizonylattipus = Bizonylattipus;
    d.ugyfelnev = _BizonylatDto.Ugyfelnev;
    d.ugyfelcim = _BizonylatDto.Ugyfelcim;

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
