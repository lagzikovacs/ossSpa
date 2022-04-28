export class LetoltesParam {
  DokumentumKod: number;
  KezdoPozicio: number;
  Olvasando: number;

  constructor(DokumentumKod: number, Olvasando: number) {
    this.DokumentumKod = DokumentumKod;
    this.KezdoPozicio = 0;
    this.Olvasando = Olvasando;
  }
}
