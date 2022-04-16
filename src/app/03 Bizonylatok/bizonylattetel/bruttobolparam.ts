import {BizonylatTetelDto} from './bizonylatteteldto';

export class BruttobolParam {
  dto: BizonylatTetelDto;
  brutto: number;

  constructor(dto: BizonylatTetelDto, brutto: number) {
    this.dto = dto;
    this.brutto = brutto;
  }
}
