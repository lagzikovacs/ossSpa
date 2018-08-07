import {Szempont} from '../enums/szempont';

export class SzMT {
  Szempont: Szempont;
  Minta: string;

  constructor (szempont: Szempont, minta: string) {
    this.Szempont = szempont;
    this.Minta = minta;
  }
}
