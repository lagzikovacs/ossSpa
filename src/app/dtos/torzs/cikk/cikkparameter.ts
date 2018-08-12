import {SzMT} from '../../szmt';

export class CikkParameter {
  rekordtol: number;
  lapmeret: number;
  fi: SzMT[];

  constructor(rekordtol: number, lapmeret: number) {
    this.rekordtol = rekordtol;
    this.lapmeret = lapmeret;
    this.fi = SzMT[0];
  }
}
