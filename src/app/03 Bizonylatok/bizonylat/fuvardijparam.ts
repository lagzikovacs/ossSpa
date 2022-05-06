import {BizonylatDto} from './bizonylatdto';

export class FuvardijParam {
  dtoAnyagszamla: BizonylatDto;
  dtoFuvarszamla: BizonylatDto;
  Fuvardij: number;

  constructor(dtoAnyagszamla: BizonylatDto, dtoFuvarszamla: BizonylatDto, Fuvardij: number) {
    this.dtoAnyagszamla = dtoAnyagszamla;
    this.dtoFuvarszamla = dtoFuvarszamla;
    this.Fuvardij = Fuvardij;
  }
}
