export class CsoportFelhasznaloParameter {
  CsoportKod: number
  FelhasznaloKod: number;
  Be: boolean;

  constructor (CsoportKod: number, FelhasznaloKod: number, Be: boolean) {
    this.CsoportKod = CsoportKod;
    this.FelhasznaloKod = FelhasznaloKod;
    this.Be = Be;
  }
}
