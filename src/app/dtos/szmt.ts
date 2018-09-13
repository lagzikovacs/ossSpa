import {Szempont} from '../enums/szempont';

export class SzMT {
  Szempont: Szempont;
  Minta: any;

  constructor (szempont: Szempont, minta: any) {
    this.Szempont = szempont;
    this.Minta = minta;
  }
}
