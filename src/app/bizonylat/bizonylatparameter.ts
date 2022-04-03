import {SzMT} from '../common/dtos/szmt';
import {BizonylatTipus} from './bizonylattipus';

export class BizonylatParameter {
  rekordtol: number;
  lapmeret: number;
  BizonylatTipus: BizonylatTipus;
  fi: SzMT[];

  constructor(rekordtol: number, lapmeret: number) {
    this.rekordtol = rekordtol;
    this.lapmeret = lapmeret;
    this.fi = SzMT[0];
  }
}
