import {CsoportDto} from './csoportdto';

export class CsoportResult {
  Error: string = '';
  Result: CsoportDto[] = new Array<CsoportDto>();
}
