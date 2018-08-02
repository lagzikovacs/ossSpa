import {Szempont} from '../enums/szempont';

export class SzMT {
  Szempont: Szempont;
  Minta: string;

  constructor (Szempont: Szempont, Minta: string) {
    this.Szempont = Szempont;
    this.Minta = Minta;
  }
}
