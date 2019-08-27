import {SzMT} from '../dtos/szmt';
import {FromTo} from '../enums/fromto';

export class UgyfelkapcsolatParam {
  rekordtol: number;
  lapmeret: number;
  fi: SzMT[];
  FromTo: FromTo;

  constructor(rekordtol: number, lapmeret: number) {
    this.rekordtol = rekordtol;
    this.lapmeret = lapmeret;
  }
}
