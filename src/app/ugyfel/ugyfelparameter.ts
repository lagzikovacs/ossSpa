import {SzMT} from '../dtos/szmt';

export class UgyfelParameter {
  rekordtol: number;
  lapmeret: number;
  csoport: number;
  fi: SzMT[];

  constructor(rekordtol: number, lapmeret: number) {
    this.rekordtol = rekordtol;
    this.lapmeret = lapmeret;
    this.csoport = 0;
    this.fi = SzMT[0];
  }
}
