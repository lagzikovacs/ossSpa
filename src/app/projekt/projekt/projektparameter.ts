import {SzMT} from '../../dtos/szmt';

export class ProjektParameter {
  rekordtol: number;
  lapmeret: number;
  statusz: number;
  fi: SzMT[];

  constructor(rekordtol: number, lapmeret: number) {
    this.rekordtol = rekordtol;
    this.lapmeret = lapmeret;
    this.fi = SzMT[0];
  }
}
