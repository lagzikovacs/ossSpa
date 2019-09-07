export class KapcsolatihaloPos {
  Ugyfelkod: number;
  X: number;
  Y: number;
  UtolsoModositas: any;

  constructor(Ugyfelkod: number, X: number, Y: number, UtolsoModositas: any) {
    this.Ugyfelkod = Ugyfelkod;
    this.X = X;
    this.Y = Y;
    this.UtolsoModositas = UtolsoModositas;
  }
}
