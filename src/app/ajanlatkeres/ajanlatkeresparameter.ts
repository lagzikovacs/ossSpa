import {SzMT} from '../dtos/szmt';

export class AjanlatkeresParameter {
  rekordtol: number;
  lapmeret: number;
  fi: SzMT[];

  constructor(rekordtol: number, lapmeret: number) {
    this.rekordtol = rekordtol;
    this.lapmeret = lapmeret;
    this.fi = SzMT[0];
  }
}
