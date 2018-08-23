export class CikkMozgasParameter {
  CikkKod: number;
  BizonylatTipusKod: number;

  constructor(CikkKod: number, BizonylatTipusKod: number) {
    this.CikkKod = CikkKod;
    this.BizonylatTipusKod = BizonylatTipusKod;
  }
}
