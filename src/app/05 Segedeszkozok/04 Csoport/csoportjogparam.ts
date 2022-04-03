export class CsoportJogParam {
  CsoportKod: number;
  LehetsegesJogKod: number;
  Be: boolean;

  constructor (CsoportKod: number, LehetsegesJogKod: number, Be: boolean) {
    this.CsoportKod = CsoportKod;
    this.LehetsegesJogKod = LehetsegesJogKod;
    this.Be = Be;
  }
}
