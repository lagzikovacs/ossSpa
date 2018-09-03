import {BizonylatDto} from '../../bizonylat/bizonylatdto';

export class ProjektKapcsolatParameter {
  ProjektKod: number;
  BizonylatKod: number;
  IratKod: number;
  Dto: BizonylatDto;

  constructor(ProjektKod: number, BizonylatKod: number, IratKod: number, Dto: BizonylatDto) {
    this.ProjektKod = ProjektKod;
    this.BizonylatKod = BizonylatKod;
    this.IratKod = IratKod;
    this.Dto = Dto;
  }
}
