export class ProjektKapcsolatParameter {
  ProjektKod: number;
  BizonylatKod: number;
  IratKod: number;

  constructor(ProjektKod: number, BizonylatKod: number, IratKod: number) {
    this.ProjektKod = ProjektKod;
    this.BizonylatKod = BizonylatKod;
    this.IratKod = IratKod;
  }
}
