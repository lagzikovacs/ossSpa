import {FelhasznaloDto} from './felhasznalodto';

export class FelhasznaloResult {
  Error: string = '';
  Result: FelhasznaloDto[] = new Array<FelhasznaloDto>();
}