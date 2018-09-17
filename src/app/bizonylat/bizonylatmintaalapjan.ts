import {BizonylatTipus} from './bizonylattipus';

export class BizonylatMintaAlapjanParam {
  BizonylatKod: number;
  bizonylatTipus: any;

  constructor(BizonylatKod: number, bizonylatTipus: any) {
    this.BizonylatKod = BizonylatKod;
    this.bizonylatTipus = bizonylatTipus;
  }
}
