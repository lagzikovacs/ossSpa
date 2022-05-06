import {BizonylatDto} from "../../../03 Bizonylatok/bizonylat/bizonylatdto";

export class ProjektKapcsolatParam {
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
