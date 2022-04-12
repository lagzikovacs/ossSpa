import {SzMT} from '../../../common/dtos/szmt';

export class ProjektParam {
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
