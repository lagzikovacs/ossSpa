import {BizonylatDto} from './bizonylatdto';

export class BizonylatKibocsatasParam {
  Dto: BizonylatDto;
  Bizonylatszam: string;

  constructor(Dto: BizonylatDto, Bizonylatszam: string) {
    this.Dto = Dto;
    this.Bizonylatszam = Bizonylatszam;
  }
}
